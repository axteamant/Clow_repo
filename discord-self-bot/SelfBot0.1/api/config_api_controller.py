from repository.user_repository import user_repository
from flask import Flask, jsonify, request
import json
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
user_repository  = user_repository()
class config_api_controller:
    def __init__(self,app, thread_bot, bot_api_controller):
        self.bot_api_controller=bot_api_controller
        self.config= thread_bot.config
        self.thread_bot= thread_bot
        app.config["DEBUG"] = False
        @app.route('/config/index', methods=['GET'])
        @jwt_required()
        def myconfig():
            return jsonify(self.config), 200
        @app.route('/config/change', methods=['POST'])
        @jwt_required()
        def changeconfig():
            all= request.json.get('myconfig', None)
            if all is None:
                return jsonify({"status":"need myconfig"}), 400
            with open('configuration.json', 'w') as f:
                json.dump(all, f)
            bot_api_controller.restart()
            return jsonify({"status":"restarted bot"}), 200