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
  driver.execute_script("""var res = document.getElementsByTagName("input"); for(var x in res ) 
      {
      if( res[x].id!=null)
      {if(   res[x].placeholder.toLowerCase().includes("user") && res[x].hidden==false ) {res[x].value=arguments[0]["Username"]}
      else if (  res[x].placeholder.toLowerCase().includes("password") && res[x].hidden==false ) {res[x].value=arguments[0]["Password"]}}
      if(res[x].type=="submit") var submit=  res[x]
      }submit.click()
    """, credential)
def stamping(action, driver):
  driver.execute_script(
  """
    var iframe = document.getElementsByTagName("iframe")[1];
    var win= iframe.contentWindow.document
    win.getElementsByTagName("input")[win.getElementsByTagName("input").length- arguments[0] ].click();
  """, action)
def job(action):
  options = webdriver.ChromeOptions() 
  chrome_prefs = {}
  options.experimental_options["prefs"] = chrome_prefs
  chrome_prefs["profile.default_content_settings"] = {"images": 3}
  chrome_prefs["profile.managed_default_content_settings"] = {"images": 3}
  options.add_argument(f"user-data-dir={os.environ['USERPROFILE']}/AppData/Local/Google/Chrome/User Data/") #Path to your chrome profile
  driver = webdriver.Chrome(ChromeDriverManager().install() ,chrome_options=options)
  driver.get("https://www.myinfinityportal.it/mipcridav")
  credential= {
      "Username":configuration["userconfig"]["username"],
      "Password":configuration["userconfig"]["password"]
  }
  login(driver, credential)
  stamping(action, driver) #ACTIONx
  driver.quit()
if __name__ == "__main__":
  configuration= init()
  print(configuration)
  scheduler = BlockingScheduler()
  try:
    for config in configuration["CronExp"] :
      print(config)
      start_hour = config["startHour"].split(":")
      scheduler.add_job(job, 'cron', args=[config["action"]], day_of_week=config["working_days"], hour=start_hour[0], minute=start_hour[1])
  except Exception as e:
    print(e)
    pass
  scheduler.start()
