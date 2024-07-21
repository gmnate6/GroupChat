# Message Class
class Message:
    def __init__(self, author: str, content: str):
        self.author = author
        self.content = content
    
    def __str__(self) -> str:
        return f"{self.author}:\n{self.content}"
    
    def to_dict(self) -> dict[str, str]:
        return self.__dict__
