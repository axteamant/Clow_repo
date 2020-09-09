import requests
import concurrent.futures
from Scrape_my_app_2 import Scrape_my_app_2
import Settings
import random
from Proxy_Retriver import Proxy_Retriver

def batch():
    futures = []
    with concurrent.futures.ThreadPoolExecutor(max_workers = Settings.max_workers_thread) as executor:
        for url in Settings.wiki_page_urls:
            listProxy= Proxy_Retriver.get_free_proxies()
            futures.append(executor.submit(Scrape_my_app_2.scrape,  
            proxy_ip=listProxy[listProxy[random.randint(0, len(listProxy)-1)]],lista=url))
        for future in concurrent.futures.as_completed(futures):
            print(future.result())
