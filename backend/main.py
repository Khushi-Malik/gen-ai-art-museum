from flask import Flask, jsonify, render_template, request, send_file, session, url_for
import requests
import cohere
import json
import openai 
import os
from pathlib import Path
import re
from flask_cors import CORS  # Import CORS

# Define API Keys and URLs
COHERE_API_KEY = "dCyRc5BzsbXzwTbEbtSTBAe4B4p1f8MhSjDcy4Vj"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
EUROPEANA_API_KEY = os.getenv("EUROPEANA_API_KEY")

openai.api_key = OPENAI_API_KEY


EUROPEANA_API_URL = "https://api.europeana.eu/record/v2/search.json"


# Initialize Flask app
app = Flask(__name__)
# Initialize Cohere client
co = cohere.ClientV2(api_key=COHERE_API_KEY)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Allow CORS for requests from your frontend running on port 3000

def get_paintings_by_category(category: str):
    # Generate relevant descriptions or keywords using Cohere
    response = co.chat(
        model="command-r-plus-08-2024",
        messages=[
            {
                "role": "user",
                "content": f"Provide 1 relevant painting in \" for the {category} without any extra information and just the names."
            }
        ]
    )

    # Debug: Check what content is returned by the API
    # print(f"API Response: {response.message.content}")
    
    # Extract and clean the response
    response_dict = {
        "id": response.id,
        "message": [response.message.content[0].text.strip('\"')],
    }

    # Check the actual content
    info = response_dict["message"][0]
    # print(f"Extracted content: {info}")

    # Split the string by newline to get individual painting lines
    paintings = info.split("\n")
    # print(f"Paintings split by newline: {paintings}")

    # Process the list to only extract the painting names inside quotes
    painting_names = []
    for painting in paintings:
        # Regex to capture text inside quotes
        match = re.search(r'"(.*?)"', painting.strip())  # Capture text inside quotes
        if match:
            painting_names.append(match.group(1).strip())

    return painting_names

# Test with the "Paris" category
# paintings = get_paintings_by_category("1990")
# print(f"Extracted painting names: {paintings}")

# Function to call Cohere and get category
def get_category_from_cohere(category: str):
    # Generate a category using Cohere
    response = co.chat(
        model="command-r-plus-08-2024",
        messages=[
            {
                "role": "user",
                "content": f"Follow the instruction exactly: tell me about this in a funny way in just 1 minute - {category}. Start the writing in a unique and kind way for {category}. Do not start with Well."
            }
        ]
    )
    
    # Parse the response and extract the category (one word)
    response_dict = {
        "id": response.id,
        "message": [response.message.content[0].text.strip('\"')],
    }
    
    info = response_dict["message"][0]
    return info

def get_art_image(category: str):
    params = {
        "wskey": EUROPEANA_API_KEY,  
        "query": category,  
        "rows": 5,  
        "start": 1,  
        "profile": "rich",  
        "media": "true",
    }

    response = requests.get(EUROPEANA_API_URL, params=params)
    # print(f"[DEBUG] Request URL: {response.url}")  # Debugging: Print request URL

    if response.status_code == 200:
        data = response.json()
        # print(json.dumps(data, indent=4))  # Debugging: Print API response

        records = data.get("items", [])
        if records:
            artwork = records[0]
            title = artwork.get("title", ["No Title"])[0]
            creator = artwork.get("dcCreator", ["Unknown Creator"])[0]

            # Function to extract image URL from the aggregations field
            def get_image_url(json_data):
                try:
                    aggregations = json_data.get("object", {}).get("aggregations", [])
                    if aggregations and isinstance(aggregations, list):
                        return aggregations[0].get("edmIsShownBy")  # Get first available image
                except Exception as e:
                    print(f"Error extracting image URL: {e}")
                return None  # Return None if no image is found

            # Extract image URL
            image_url = get_image_url(artwork) or artwork.get("edmIsShownBy")  # Direct image link
            if not image_url:  
                image_url = artwork.get("edmIsShownAt")  # Landing page if no direct image

            print(f"[DEBUG] Title: {title}, Creator: {creator}, Image URL: {image_url}")
            return title, creator, image_url

    print("[ERROR] No image found for this category.")
    return None, None, None  # If no results are found

def text_to_speech(text: str):
    client = openai.OpenAI()

    speech_file_path = Path(__file__).parent / "static/speech.mp3"
    response = client.audio.speech.create(
            model="gpt-4o-mini-tts",
            voice="sage",
            input=text,
            )

    with open(speech_file_path, "wb") as audio_file:
        audio_file.write(response.content)

    return url_for("static", filename="speech.mp3")

    

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        body = request.get_json()
        user_prompt = body["prompt"]

        # Fetch artwork using the extracted category (directly using the prompt)
        art_title, art_artist, art_image = get_art_image(user_prompt)

        # Get category from Cohere (if needed)
        art_monologue = get_category_from_cohere(art_artist+" "+art_title)  # You can use this if needed

        audio_file_path = text_to_speech(art_monologue)

        return jsonify({'response': art_monologue, 
                        'title': art_title, 'artist': art_artist, 'image_url': art_image, 'audio_url': audio_file_path})
        

@app.route("/audio/<filename>")
def get_audio(filename):
    return send_file(f"static/{filename}", mimetype="audio/mp3")

if __name__ == '__main__':
    app.run(debug=True)
