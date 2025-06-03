from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/home', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the Home Page!"})

if __name__ == '__main__':
    app.run(debug=True, port=8080)