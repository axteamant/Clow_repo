# Discord self bot with api secured jwt-token

This is a working Discord Self bots that send sheduled messages in a random time range. 

this bots are thinked to trigger other bot, for example [DISBOARD](https://disboard.org/it) and use real user to send message via [Discord API](https://discordapi.com/)

Also use an API  to start/stop and configure this [SelfBot0.3](https://github.com/axteamant/Clow_repo/edit/master/discord-self-bot/SelfBot0.3)

this software has no intent to violate [Discord](https://discord.com/terms)'s terms and policy,it is for educational and entertainment purposes only.

**I REJECT ANY  THIRD'S UNPROPROUSE USE**

## Installation

Need [python3](https://www.python.org/ftp/python/3.9.6/python-3.9.6-amd64.exe)

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
+  **server_random_range_string**: this make more hard to detect patterns
+ **mintime**: scheduler min time
+ **maxtime**  :scheduler max time
+ **setOfUser**: list of users that sand this message (random)
+ **code** : authentication  token
+ **author** :  define author that send this message. i report an example
```json
"author" : 
	 {
		"avatar" : "",
		"discriminator": "",
		"id": "",
		"public_flags": "",
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
**/bot/killservices** secured  [GET] kill all bots (threads)
**/bot/restartservices** secured  [GET] restart all services
## config_api_controller

**/config/index** secured  [GET] get all json configuration object

**/config/change** secured  [POST] set a new configuration and restart bot

this call need a json object like 
```json
{
	"myconfig":
	{
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
	}
}
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

## Sqllite

right now there is a really small database called database.db with 2 user
+ first:  **username** = alexeivezzola **password** =  tostapane94

+ second: **username** = username **password** =  password

small script to recrate : 
```sql
	create table users
	(
		username varchar(300),
		password varchar(300)
	)
```
## Thanks you and and have a nice day

