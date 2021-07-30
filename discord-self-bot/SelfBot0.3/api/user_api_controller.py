from repository.user_repository import user_repository
from flask import Flask, jsonify, request
import json
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
user_repository  = user_repository()
class user_api_controller:
    def __init__(self,app, thread_bot):
        self.config= thread_bot.config
        @app.route('/login', methods=['POST'])
        def login():
            print(request.json)
            username =user_repository.login(
                {
                    "username" : request.json.get('username', None),
                    "password" : request.json.get('password', None)
                }
            )
            if username is not None:
                ret = {'access_token': create_access_token(identity=username)}
                return jsonify(ret), 200
            return jsonify({"msg": "Bad username or password"}), 401
        @app.route('/user/add', methods=['POST'])
        @jwt_required()
        def insertuser():
            print(request.json)
            username =user_repository.insertUser(
                {
                    "username" : request.json.get('username', None),
                    "password" : request.json.get('password', None)
                }
            )
            return jsonify({"status":"ok"}), 200
        @app.route('/user/remove', methods=['DELETE'])
        @jwt_required()
        def deleteuser():
            print(request.json)
            username =user_repository.deleteUser(
                {
                    "username" : request.json.get('username', None),
                }
            )
            return jsonify({"status":"ok"}), 200
        @app.route('/user/index', methods=['GET'])
        @jwt_required()
        def indexuser():
            all =user_repository.selectalluser()
            return jsonify(all), 200