from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import os
from apscheduler.schedulers.blocking import BlockingScheduler
import json
configuration=dict()
def init():
  with open('config.json') as f:
    return json.load(f)
def login(driver, credential):
    pass 
def stamping(action, driver):
    pass 
def job(action):
  options = webdriver.ChromeOptions() 
  chrome_prefs = {}
  options.experimental_options["prefs"] = chrome_prefs
  chrome_prefs["profile.default_content_settings"] = {"images": 3}
  chrome_prefs["profile.managed_default_content_settings"] = {"images": 3}
  options.add_argument(f"user-data-dir={os.environ['USERPROFILE']}/AppData/Local/Google/Chrome/User Data/") #Path to your chrome profile
  driver = webdriver.Chrome(ChromeDriverManager().install() ,chrome_options=options)
  driver.get("https://www.linkedin.com/feed/?trk=homepage-basic_google-one-tap-submit")
  credential= {
      "Username":configuration["userconfig"]["username"],
      "Password":configuration["userconfig"]["password"]
  }
  login(driver, credential)
  stamping(action, driver) #ACTIONx

if __name__ == "__main__":
    job(0)
