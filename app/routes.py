from flask import current_app as app, render_template, request, jsonify
from .chat import Chat

# Chat
chat = Chat()

@app.route('/')
def index():
    return render_template("index.html", title=chat.title)

@app.route("/get_messages", methods=["GET"])
def get_messasges():
    return jsonify(chat.to_dict())

@app.route("/post_message", methods=["POST"])
def post_message():
    json = request.json
    chat.add_message(json)
    return jsonify(status="Received")
