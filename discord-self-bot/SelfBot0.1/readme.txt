Selfbot0.1
This is a working self bot . 
this is only for testing and fun, no other intention.
Read the policy of Discord before downloading and use this software.

configuration.json:
setOfServer : list of server to send message
  server_id: id server 
  server_message : server message, this is a good tool to trigger other real Discord bot
  server_random_range_string: this make more hard to detect patterns
mintime : scheduler min time
"maxtime":scheduler max time
setOfUser: list of users that sand this message (random)
"code" : authentication  token
author : 
 {"avatar" : "",
            "discriminator": "",
            "id": "",
            "public_flags": ""
            "username": ""
 }
 this can be find easy with chrome inspector in headers
To run need python3 and pip
.\runner.bat to start on Windows
./runner.sh to start on linux
 
