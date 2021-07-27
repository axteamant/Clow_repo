import requests
import random
import string
from fake_useragent import UserAgent
import schedule
import time
import json
f = open("configutations.json",)
config =json.load(f)
def fake_request():
    for server in config.get("setOfServer"):
        setOfUser= config.get("setOfUser")
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
            "content": str(server_message)+ " " +''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(int(server_random_range_string))) ,
            'author': setOfUser[randomuser].get("author"),
            'channel_id': server_id
            
        }
        x = requests.post(url, data = payload, headers=headers)
        print("send request succesfully "  )
fake_request()
print("starting..........")
schedule.every(60*3).to(60*5).seconds.do(fake_request)
print("started...........")
while True:
    schedule.run_pending()
    time.sleep(1)