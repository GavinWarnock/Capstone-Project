from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User, Car, Group, Game

ma = Marshmallow()

# Auth Schemas
class RegisterSchema(ma.Schema):
    """
    Schema used for registration, includes password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    class Meta:
        fields = ("id", "username",  "password", "first_name", "last_name", "email")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)
    
class UserSchema(ma.Schema):
    """
    Schema used for displaying users, does NOT include password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    game_preference = fields.String()
    bio = fields.String()
    picture = fields.String()
    groups = ma.Nested('GroupSchema', many=True)
    group_id = fields.Integer()
    class Meta:
        fields = ("id", "username", "first_name", "last_name", "email", "bio", "picture", "game_preference", "groups")

    @post_load
    def create_profile(self, data, **kwargs):
        return User(**data)

register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)

class GroupMemberSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    game_preference = fields.String()

    class Meta:
        fields = ("id", "username", "first_name", "last_name", "email", "game_preference")
group_member_schema = GroupMemberSchema()
group_members_schema = GroupMemberSchema(many=True)

class OwnerSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    game_preference = fields.String()
    bio = fields.String()
    picture = fields.String()

    class Meta:
        fields = ("id", "username", "first_name", "last_name", "email", "bio", "picture")
owner_schema = OwnerSchema()
owners_schema = OwnerSchema(many=True)

# Car Schemas
class CarSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    make = fields.String(required=True)
    model = fields.String(required=True)
    year = fields.Integer()
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    class Meta:
        fields = ("id", "make", "model", "year", "user_id", "user")
    
    @post_load
    def create_car(self, data, **kwargs):
        return Car(**data)

car_schema = CarSchema()
cars_schema = CarSchema(many=True)


# TODO: Add your schemas below
class GameSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    name = fields.String(required=True)
    bio = fields.String()

    class Meta:
        fields = ("id", "name", "bio")
    
    @post_load
    def create_game(self, data, **kwargs):
        return Game(**data)
    
game_schema = GameSchema()
games_schema = GameSchema(many=True)
class GroupSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    name = fields.String(required=True)
    owner =  ma.Nested(OwnerSchema)
    bio = fields.String()
    owner_id = fields.Integer()
    game = ma.Nested(GameSchema)
    game_id = fields.Integer()
    meeting_time = fields.String(required=True)
    meeting_day = fields.Date(required=True)
    attendees = ma.Nested(GroupMemberSchema, many=True)
    class Meta:
        fields = ("id", "name", "owner", "bio", "owner_id", "game","game_id", "meeting_time", "meeting_day", "attendees")

    @post_load
    def create_group(self, data, **kwargs):
        return Group(**data)

group_schema = GroupSchema()
groups_schema = GroupSchema(many=True)

