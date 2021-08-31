from repository.user_repository import user_repository
from flask import Flask, jsonify, request
import json
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

class config_api_controller:
    def __init__(self,app, thread_bot, bot_api_controller):
        self.bot_api_controller=bot_api_controller
        self.config= thread_bot.config
        self.thread_bot= thread_bot
        app.config["DEBUG"] = False
        @app.route('/config/index', methods=['GET'])
        #@jwt_required()
        def myconfig():
            return jsonify(self.config), 200
        @app.route('/config/change', methods=['POST'])
        #@jwt_required()
        def changeconfig():
            app.logger.warn(""" change condiguration!!!! 
            old configuration: 
                %s
            """,str(jsonify(self.config)))
            bot_api_controller.thread_bot
            #TODO verificare cosa è cambiato e riavviare il singolo servizio
            #se cambia tutto riavviare tutti i bot.
            all= request.json.get('myconfig', None)
            if all is None:
                return jsonify({"status":"need myconfig"}), 400
            with open('configuration.json', 'w') as f:
                json.dump(all, f) 
                
            bot_api_controller.thread_bot.restartservices()
            return jsonify({"status":"restarted bot"}), 200