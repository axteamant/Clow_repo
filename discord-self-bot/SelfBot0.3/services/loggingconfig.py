import logging
from logging.handlers import RotatingFileHandler
Logs ={
 "bots":"default.log",
 "flask":"flask.log"
}
def setup_custom_logger(name):
    handler = setup_handler(name)  
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)
    logger.addHandler(handler)

    return logger
def setup_handler(name):
    formatter = logging.Formatter(fmt='%(asctime)s - %(levelname)s - %(module)s - %(message)s')
    handler = RotatingFileHandler( Logs[name],maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)
    handler.setFormatter(formatter)  
    return handler
def getlog(name="bots"):
    return logging.getLogger(name)
