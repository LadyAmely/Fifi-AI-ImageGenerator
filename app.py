import base64
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, send_from_directory
from io import BytesIO
from huggingface_hub import InferenceClient

load_dotenv()
api_token = os.getenv('API_TOKEN')

app = Flask(__name__, static_folder='client/build', static_url_path='/')

if not os.path.exists('static'):
    os.makedirs('static')

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
    return response


@app.route('/')
def serve_react():
    return send_from_directory(app.static_folder, 'index.html')

client = InferenceClient("stabilityai/stable-diffusion-3.5-large", token=api_token)

def generate_image(prompt):
    image = client.text_to_image(prompt)
    return image

def image_to_base64(image):
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return img_str

@app.route('/api/generate-image', methods=['POST'])
def generate_image_route():
    data = request.json
    prompt = data.get('prompt', '')

    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400

    try:
        print(f"Generating image for prompt: {prompt}")
        image = generate_image(prompt)

        image_path = "static/generated_image.png"
        image.save(image_path)
        img_base64 = image_to_base64(image)

        return jsonify({'image_base64': img_base64})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': f"An error occurred: {str(e)}"}), 500

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True, port=5000)
