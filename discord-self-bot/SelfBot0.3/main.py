from fake_useragent import UserAgent
import time
import logging
from services.server_runner import server_runner
from datetime import datetime
from services.thread_loader import thread_loader
__author__ = "Alexei Vezzola"
__copyright__ = "None"
__credits__ = []
__version__ = "0.0.1"
__maintainer__ = "Alexei Vezzola"
__email__ = "alexei.vezzola@gmail.com"
__status__ = "Debug"
def timestamp():
    return "["+ str(datetime.now()) +"] "
def startservices():
    tL = thread_loader()
    logging.basicConfig(filename='startup.log',level=logging.DEBUG)
    logging.debug(timestamp() +"set up api config.....")
    api=tL.api
    logging.debug(timestamp() +"end api config.....")
    logging.debug(timestamp() +"start thread of api.....")
    api.start()
if __name__=="__main__":
    startservices()
    while True:
        time.sleep(1)
