import requests
import random
import string
from fake_useragent import UserAgent
import schedule
import time
import json
from mail_service import mail_service
from threading import Thread, Event
import flask
import threading
class bot(threading.Thread):
    def __init__(self, sleep_interval=1):
        super().__init__()
        f = open("configuration.json",)
        self.config=json.load(f)
        self._kill = threading.Event()
        self._interval = sleep_interval

    def run(self):
        schedule.every(int(self.config.get("mintime"))).to(int(self.config.get("maxtime"))).seconds.do(self.fake_request)
        while True:
            schedule.run_pending()
            is_killed = self._kill.wait(self._interval)
            if is_killed:
                break
        schedule.clear()
        print("Killing Thread")
    def fake_request(self):
        for server in self.config.get("setOfServer"):
            setOfUser= self.config.get("setOfUser")
            randomuser=random.randint(0, len(setOfUser)-1) 
            ua = UserAgent()
            server_id=server.get("server_id")
            server_message = server.get("server_message")
            server_random_range_string=server.get("server_random_range_string")
            headers = {
            'User-Agent':str(ua.chrome),
            'authorization':setOfUser[randomuser].get("code") ,
            "method":"POST",
            "path":f"api/v9/channels/{server_id}/messages",
            "accept-encoding": "gzip, deflate, br",
            "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6Iml0LUlUIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKExpbnV4OyBBbmRyb2lkIDYuMDsgTmV4dXMgNSBCdWlsZC9NUkE1OE4pIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85MS4wLjQ0NzIuMTY0IE1vYmlsZSBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiOTEuMC40NDcyLjE2NCIsIm9zX3ZlcnNpb24iOiI2LjAiLCJyZWZlcnJlciI6Imh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vIiwicmVmZXJyaW5nX2RvbWFpbiI6Ind3dy5nb29nbGUuY29tIiwic2VhcmNoX2VuZ2luZSI6Imdvb2dsZSIsInJlZmVycmVyX2N1cnJlbnQiOiIiLCJyZWZlcnJpbmdfZG9tYWluX2N1cnJlbnQiOiIiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjo5MTIzOSwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0="
            }
        
            print(headers)
            url = f'https://discord.com/api/v9/channels/{server_id}/messages'
            payload={
                "content": str(server_message)+ " " +''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(random.randint(int(server_random_range_string),int(server_random_range_string)+10 ))) ,
                'author': setOfUser[randomuser].get("author"),
                'channel_id': server_id
                
            }
            x = requests.post(url, data = payload, headers=headers)
            if x.status_code != requests.codes.ok:
                mail_service().sendMail(x ,self.config)
        print("send request succesfully "  )
    def kill(self):
        self._kill.set()


    
