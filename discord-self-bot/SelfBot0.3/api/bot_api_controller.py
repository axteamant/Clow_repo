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
        @app.route('/bot/restart', methods=['GET'])
        @jwt_required()
        def restart():
            self.thread_bot.restart_bot()
            return jsonify({"status":"restarted bot"}), 200

        @app.route('/bot/kill', methods=['GET'])
        @jwt_required()
        def kill_bot():
            print(thread_bot)
            self.thread_bot.kill_bot()
            return jsonify({"status":"killed bot"}), 200
        pass
        @app.route('/protected', methods=['GET'])
        @jwt_required()
        def protected():
            current_username = get_jwt_identity()
            return jsonify({'hello_from': current_username}), 200


