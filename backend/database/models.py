from flask_bcrypt import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    game_preference = db.Column(db.String(510))
    bio = db.Column(db.String(510))
    picture = db.Column(db.String(510))
    # group = db.relationship("Group", secondary = "user_group", backref = 'user')
    


    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return self.username

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(255), nullable=False)
    model = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer)
    # Adds user_id as an Integer column on the car table which references the id column on user table
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # Establishes object relation between car-user so we can grab values like car.user.username
    user = db.relationship("User")

# TODO: Add your models below, remember to add a new migration and upgrade database
user_group = db.Table('user_group',
                      db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
                      db.Column('group_id', db.Integer, db.ForeignKey('group.id'))
                )
class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    owner = db.relationship("User")
    bio = db.Column(db.String(510), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    game = db.relationship("Game")
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'))
    meeting_time = db.Column(db.String(255), nullable=False)
    meeting_day = db.Column(db.Date, nullable=False)
    attendees = db.relationship("User", secondary = user_group, backref = 'groups')

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(510), nullable=False)

