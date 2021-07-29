import smtplib
class mail_service:
    
    def __init__(self,):
        super().__init__()
    def sendMail(self,x, config):
        to = config.get("to")
        gmail_user= config.get("gmail_user")
        gmail_password = config.get("gmail_password")
        try:
            print((x.text))
            server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
            server.ehlo()
            server.login(gmail_user, gmail_password)
            server.sendmail(gmail_user, to, f"""
            error Authomatic sending message {x.status_code}
            result:
            """
            )
            server.close()
        except  Exception as e:
            print(e)
            print ('Something went wrong...')