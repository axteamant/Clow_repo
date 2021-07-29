
from fake_useragent import UserAgent
import threading
from bot import bot
from server_runner import server_runner
import logging
from datetime import datetime
def timestamp():
    return "["+ str(datetime.now()) +"] "
class thread_loader:

    def __init__(self) :
        self.bot = None
        self.start_bot()
        self.api = threading.Thread(target=server_runner.start, args=(self,))
        logging.basicConfig(filename='startup.log',level=logging.DEBUG)
        pass
    def start_bot(self):
        logging.debug(timestamp() +"set up bot config.....")
        self.bot = bot(sleep_interval=2)
        logging.debug(timestamp() +"end  bot config.....")
        logging.debug(timestamp() +"start thread of bot.....")
        self.bot.start()
    def restart_bot(self):
        self.kill_bot()
        print("restart")
        self.start_bot()
        pass
    def kill_bot(self):
        logging.debug(timestamp() +"start killing bot ")
        self.bot.kill()