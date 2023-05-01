from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, User, Group, Game
from database.schemas import group_schema, groups_schema, game_schema, games_schema, user_schema
class GroupsResource(Resource):
    @jwt_required()
    def post(self):
        player_id = get_jwt_identity()
        form_data = request.get_json()
        new_group = group_schema.load(form_data)
        new_group.player_id = player_id
        db.session.add(new_group)
        db.session.commit()
        return group_schema.dump(new_group), 201
    
    @jwt_required()
    def get(self):
        player_id = get_jwt_identity()
        print(player_id)
        player_groups = Group.query.filter_by(player_id=player_id).all()
        print(player_groups)
        return groups_schema.dump(player_groups), 200
        # return 200

    @jwt_required()
    def delete(self, group_id):
        group_from_db = Group.query.get_or_404(group_id)
        db.session.delete(group_from_db)
        db.session.commit()
        return "", 204
class GamesResource(Resource):
    def post(self):
        form_data = request.get_json()
        new_game = game_schema.load(form_data)
        db.session.add(new_game)
        db.session.commit()
        return game_schema.dump(new_game), 201

    def get(self):
        games = Game.query.all()
        return games_schema.dump(games), 200
    
class UserResource(Resource):
    def put(self, user_id):
        user_from_db = User.query.get_or_404(user_id)
        if 'username' in request.json:
            user_from_db.username = request.json['username']
        if 'game_preference' in request.json:
            user_from_db.game_preference = request.json ['game_preference']
        if 'bio' in request.json:
            user_from_db.bio = request.json['bio']
        if 'picture' in request.json:
            user_from_db.picture = request.json['picture']
        db.session.commit()
        return user_schema.dump(user_from_db), 200