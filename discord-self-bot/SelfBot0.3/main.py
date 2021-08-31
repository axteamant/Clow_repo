#!/usr/bin/env python
# -*- coding: utf-8 -*-
from fake_useragent import UserAgent
import time
import logging
from services.server_runner import server_runner
from datetime import datetime
from services.thread_loader import thread_loader
from services.loggingconfig import setup_custom_logger, Logs
logger = setup_custom_logger('bots')

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
    logger.debug('Logger Configuration')
    tL = thread_loader()
  
    logger.debug(timestamp() +"set up api config.....")
    api=tL.api
    logger.debug(timestamp() +"end api config.....")
    logger.debug(timestamp() +"start thread of api.....")
    
    api.start()
if __name__=="__main__":
    startservices()
    while True:
        time.sleep(1)
