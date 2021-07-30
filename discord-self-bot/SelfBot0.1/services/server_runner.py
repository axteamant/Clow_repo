from flask import Flask, jsonify
from flask_restplus import Api, Resource
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from api.bot_api_controller import bot_api_controller
from api.user_api_controller import user_api_controller
from api.config_api_controller import config_api_controller
class server_runner:
    def __init__(self, thread_bot):
        super().__init__()
        self.thread_bot= thread_bot 
        app = Flask(__name__)
        app.secret_key = 'mysuperKEY'
        jwt = self.jwt_config(app)
        self.bot_api_controller= bot_api_controller(app, self.thread_bot)
        self.user_api_controller=user_api_controller(app, self.thread_bot)
        self.config_api_controller=config_api_controller(app, self.thread_bot,self.bot_api_controller)
        app.run()
    @classmethod
    def start (cls, thread_bot):
        server_flask= server_runner(thread_bot)
    def jwt_config(self,app):
        return  JWTManager(app)

