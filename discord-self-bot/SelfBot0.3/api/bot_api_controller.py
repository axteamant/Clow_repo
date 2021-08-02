from logging import NOTSET
from repository.user_repository import user_repository
from flask import Flask, jsonify, request
import json
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
user_repository  = user_repository()

class bot_api_controller:
    def __init__(self,app, thread_bot):
        self.config= thread_bot.config
        self.thread_bot= thread_bot
        app.config["DEBUG"] = False
        @app.route('/', methods=['GET'])
        def home():
            return jsonify({'hello': 'unprotected'}), 200 
        @app.route('/bot/restart', methods=['POST'])
        #@jwt_required()
        def restart():
            request.json.get('username',None)
            self.thread_bot.restart_single_bot(request.json.get('bot_name',None))
            return jsonify({"status":"restarted bot"}), 200
        @app.route('/bot/killservices', methods=['GET'])
        #@jwt_required()
        def killservices():
            self.thread_bot.killservices()
            return jsonify({"status":"kill all  bot"}), 200
        @app.route('/bot/restartservices', methods=['GET'])
        #@jwt_required()
        def restartservices():
            self.thread_bot.restartallservices()
            return jsonify({"status":"restart all services"}), 200

            restartallservices
        @app.route('/bot/kill', methods=['POST'])
        #@jwt_required()
        def kill_bot():
            print(thread_bot)
            self.thread_bot.kill_bot(request.json.get('bot_name',None))
            return jsonify({"status":"killed bot"}), 200
        pass
        @app.route('/protected', methods=['GET'])
        #@jwt_required()
        def protected():
            current_username = get_jwt_identity()
            return jsonify({'hello_from': current_username}), 200


