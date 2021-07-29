import flask
class server_runner:
    def __init__(self, thread_bot):
        super().__init__()
        self.thread_bot= thread_bot
        self.thread_bot=thread_bot
        app = flask.Flask(__name__)
        app.config["DEBUG"] = False
        @app.route('/', methods=['GET'])
        def home():
            return "<h1>Hello bot</p>"    
        @app.route('/restart', methods=['GET'])
        def restart():
            self.thread_bot.restart_bot()
            return "<h1>restarted</p>"
        @app.route('/kill_bot', methods=['GET'])
        def kill_bot():
            self.thread_bot.kill_bot()
            return "<h1>killed</p>"
        app.run()
    @classmethod
    def start (cls, thread_bot):
        server_flask= server_runner(thread_bot)
