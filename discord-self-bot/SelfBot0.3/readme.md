# Discord self bot with api secured jwt-token

This is a working self bot . 

this is only for testing and fun, no other intention.

Read the policy of Discord before downloading and use this software.

## Installation

Need [python3](https://www.python.org/downloads/)

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install depenendency.

```bash
pip install -r requirements.txt
```

## Configuration
this version need a map (Object) of different Bot objects , you have to set a name of 
all Bots in this way:
```json
  "bot_pool":
        {
            "name_1":
            {
            },
            "name_2":
            {
            }
        }
```
## Bot Configuration
to define a single bot you have to define this Bot Object properties 

+ **setOfServer** :   list of server to send message
+ **server_id**   : id server 
+  **server_message** : server message, this is a good tool to trigger other real Discord bot
  **server_random_range_string**: this make more hard to detect patterns
+ **mintime**: scheduler min time
+ **maxtime**  :scheduler max time
+ **setOfUser**: list of users that sand this message (random)
+ **code** : authentication  token
+ **author** :  define author that send this message. i report an example
```json
author : 
 {"avatar" : "",
            "discriminator": "",
            "id": "",
            "public_flags": ""
            "username": ""
 }
```
## Api 
flask run on  **5000**

## Bot_api_controller
**/bot/restart** secured  [POST] restart that discord  bot with that bot_name 
```json
 {
    "bot_name" : "name of bot to deactivate",
 }
```
**/bot/kill** secured  [POST] kill that discord  bot with that bot_name 
```json
 {
    "bot_name" : "name of bot to deactivate",
 }
```
## config_api_controller

**/config/index** secured  [GET] get all json configuration object

**/config/change** secured  [POST] set a new configuration and restart bot

this call need a json object like 
```json
{
	"myconfig":{
    "gmail_password": "psw",
    "gmail_user": "alexei.vezzola@gmail.com",
    "maxtime": 7300,
    "mintime": 7200,
    "setOfServer": [
        {
            "server_id": 0000000000000000,
            "server_message": "mex",
            "server_random_range_string": "15"
        }
    ],
    "setOfUser": [
        {
            "author": {
                "avatar": "myavatar",
                "discriminator": "0000",
                "id": "00000000000",
                "public_flags": "0",
                "username": "myname"
            },
            "code": "token"
        }
    ],
    "to": [
        "mymails to send"
    ]
}}
```
## user_api_controller
**/login** [POST] login
```json
 {
    "username" : "psw",
    "password" : "username"
 }
```
**/user/add** secured  [POST] add a new user 
```json
 {
    "username" : "psw",
    "password" : "username"
 }
```
**/user/remove** secured  [DELETE] add a new user 
```json
 {
    "username" : "psw",
    "password" : "username"
 }
```
## Thanks you and and have a nice day
