import schedule
import time
import thread_holder
import requests
import concurrent.futures
from Scrape_my_app_2 import Scrape_my_app_2
import Settings
print("start")

#schedulazione randomica
schedule.every(int(Settings.sched[0])).to(int(Settings.sched[0])).minutes.do(thread_holder.batch)
while True:
    schedule.run_pending()
    time.sleep(1)