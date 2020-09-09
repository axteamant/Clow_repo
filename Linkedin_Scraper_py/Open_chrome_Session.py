from linkedin_scraper import Person, actions
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
import threading

from Proxy_Retriver import Proxy_Retriver
PROXY=proxy_TEST =Proxy_Retriver().get_free_proxies()[10]
webdriver.DesiredCapabilities.CHROME['proxy']={
                    "httpProxy": PROXY,
                    "ftpProxy":PROXY,
                    "sslProxy":PROXY,
                    "noProxy":None,
                    "proxyType":"MANUAL",
                    "autodetect":False
                }
driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get("https://www.google.com/")

        