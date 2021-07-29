from fake_useragent import UserAgent
import time
import logging
from server_runner import server_runner
from datetime import datetime
from thread_loader import thread_loader

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
