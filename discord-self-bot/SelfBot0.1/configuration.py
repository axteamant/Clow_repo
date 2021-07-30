import json
from types import SimpleNamespace as Namespace
from typing import List
import string
class User:
    def __init__(self) -> None:
        self.code=""
        self.author = Author()
class Server:
    def __init__(self) -> None:
        self.server_id=0
        self.server_message=""
        self.server_random_range_string=""
class Author:
    def __init__(self) -> None:
        self.avatar=""  
        self.discriminator=""
        self.id=0
        self.public_flags=0
        self.username=""
from types import SimpleNamespace 
class configuration:
    def __init__(self) -> None:
        self.setOfServer=List<Server>()
        self.mintime=0
        self.maxtime=0
        self.setOfUser=List<Author>()
        self.to= List<string>(),
        self.gmail_user=""
        self.gmail_password=""
        pass
    @classmethod
    def from_dict(cls, dict):
        obj = cls()
        obj.__dict__.update(dict)
        return obj

    @staticmethod
    def startconfig():
        f = open("configuration.json","r")
        line= " ".join([l.rstrip() for l in f]) 
        f.close()
        return json.loads(line, object_hook=lambda d: SimpleNamespace(**d))
conf  =configuration.startconfig()
print(conf.setOfUser[0])
