from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chatbot_engine import get_bot_response

app = Flask(__name__)
# Enable CORS so the widget can be embedded safely on technodexterous.com or any external site
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_msg = request.json.get('message', '')
    bot_reply = get_bot_response(user_msg)
    # bot_reply is now a dictionary: {"text": "...", "buttons": [...]}
    return jsonify(bot_reply)

if __name__ == '__main__':
    app.run()
