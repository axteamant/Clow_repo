import sqlite3
class user_repository:
    def __init__(self) -> None:
        
        self.connection= sqlite3.connect('database.db',check_same_thread=False)
        self.insertfirsttime()
        pass
    def insertfirsttime(self):
        #cur = self.connection.cursor()
        #cur.execute("create table users (username varchar(300), password varchar(400))")
        #cur.execute("INSERT INTO users VALUES ('pino','pane'),('username', 'password')")
        #self.connection.commit()
        pass
    def login(self, user):
        cur = self.connection.cursor()
        cur.execute("select * from users where username=:username and password=:password", user)
        return cur.fetchone()
    def insertUser(self, user):
        cur = self.connection.cursor()
        cur.execute("INSERT INTO users VALUES (:username,:password)",user)
        self.connection.commit()
    def deleteUser(self, user):
        cur = self.connection.cursor()
        cur.execute("delete from users where username=:username",user)
        self.connection.commit()
    def selectalluser(self):
        cur = self.connection.cursor()
        cur.execute("select * from users ")
        return cur.fetchall()