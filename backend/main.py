!pip install cohere
!pip install nltk


from flask import Flask, jsonify, request
import requests
import cohere
import json
import nltk # for message post processing


API_KEY = '' # API_KEY

# app = Flask(__name__)

# Set Cohere API Key
co = cohere.ClientV2(api_key=API_KEY)
	
# models = co.models.list()
# print(models)
response = co.chat(
    model="command-r-plus-08-2024",
    messages=[
        {
            "role": "user",
            "content": "follow the instruction exactly: give me one word from the English dictionary.",
        }
    ],
)

response_dict = {
    "id": response.id,
    "message": [response.message.content[0].text.strip('\"')],
}
print(json.dumps(response_dict, indent=4))

# @app.route('/get_artwork', methods=['POST'])
# def get_artwork():
#     user_input = request.json
#     time_place_person = user_input['time_place_person']
    
#     # Fetch artwork from external API (e.g., The Met)
#     artwork_data = fetch_artwork_data(time_place_person)

#     # Generate comedy monologue using Cohere
#     monologue = generate_comedy_monologue(artwork_data)

#     return jsonify({
#         'artwork': artwork_data,
#         'monologue': monologue
#     })

# def fetch_artwork_data(query):
#     # Query external art database (example using The Met API)
#     met_api_url = f"https://collectionapi.metmuseum.org/public/collection/v1/objects?search={query}"
#     response = requests.get(met_api_url)
#     data = response.json()

#     if 'objectIDs' not in data or not data['objectIDs']:
#         return {"error": "No artwork found."}

#     artwork_id = data['objectIDs'][0]  # Pick the first result
#     artwork_details = requests.get(f"https://collectionapi.metmuseum.org/public/collection/v1/objects/{artwork_id}")
    
#     return artwork_details.json()

# def generate_comedy_monologue(artwork_data):
#     # Generate a comedic monologue using Cohere's Generate API
#     prompt = f"Write a humorous stand-up comedy monologue about this artwork: {artwork_data.get('title', 'Unknown Title')}. Include some historical facts, pop culture references, and some funny observations."

#     response = co.generate(
#         model="command-r",  # Or "command" for standard generation
#         prompt=prompt,
#         max_tokens=200,
#         temperature=0.8  # Adjust for more or less randomness
#     )

#     return response.generations[0].text.strip()

# if __name__ == '__main__':
#     app.run(debug=True)
