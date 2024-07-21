from .message import Message

# Chat Class
class Chat:
    def __init__(self, title: str="Group Chat!"):
        self.title = title
        self.messages: list[Message] = []

    def to_dict(self) -> dict[str, str | list[dict[str, str]]]:
        messages = [message.to_dict() for message in self.messages]
        results = {
            "title": self.title,
            "messages": messages
        }
        return results

    def add_message(self, json: dict[str, str]):
        message = Message(json["author"], json["content"])
        self.messages.append(message)
