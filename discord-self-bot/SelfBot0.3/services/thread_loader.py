
from fake_useragent import UserAgent
import json
import threading
from services.bot import bot
from services.server_runner import server_runner
import logging
from datetime import datetime
def timestamp():
    return "["+ str(datetime.now()) +"] "
class thread_loader:

    def __init__(self) :    
        f = open("configuration.json",)
        self.config=json.load(f)
        self.bots = {}
        self.start_bot()
        self.api = threading.Thread(target=server_runner.start, args=(self,))
        logging.basicConfig(filename='startup.log',level=logging.DEBUG)
        print(self.bots)
        pass
    def start_bot(self):
        logging.debug(timestamp() +"set up bot config.....")
        f = open("configuration.json",)
        self.config=json.load(f)
        for x in self.config.get("bot_pool"):
            print(x)
            self.bots[x] = bot(config=self.config.get("bot_pool").get(x),sleep_interval=2,)
            logging.debug(timestamp() +"end  bot config....." + x)
            logging.debug(timestamp() +"start thread of bot....." + x)
            self.bots[x].start()
    def restart_single_bot(self,botName):
        logging.debug(timestamp() +"set up bot config.....")
        f = open("configuration.json",)
        self.config=json.load(f)
        print(self.config.get("bot_pool"))
        print(self.config.get("bot_pool").get(botName))
        self.bots[botName] = bot(config=self.config.get("bot_pool").get(botName),sleep_interval=2,)
        logging.debug(timestamp() +"end  bot config.....")
        logging.debug(timestamp() +"start thread of bot.....")
        self.bots[botName].start()
        pass

    def restart_bot(self, botName):
        self.bots[botName].kill()
        print("restart")
        self.start_bot()
        pass
    def kill_bot(self,botName):
        logging.debug(timestamp() +"start killing bot ")
        self.bots[botName].kill()
    def killservices(self):
        for x in self.bots:
            self.bots[x].kill()
    def restartallservices(self):
        for x in self.bots:
            self.restart_bot(x)