from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, User, Group, Game, Profile
from database.schemas import group_schema, groups_schema, game_schema, games_schema, profile_schema, profiles_schema

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
        player_groups = Group.query.filter_by(player_id=player_id).all()
        return groups_schema.dump(player_groups), 200

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
    
class ProfileResource(Resource):
    @jwt_required()
    def post(self):
        player_id = get_jwt_identity()
        form_data = request.get_json()
        new_profile = profile_schema.load(form_data)
        new_profile.player_id = player_id
        db.session.add(new_profile)
        db.session.commit()
        return profile_schema.dump(new_profile), 201
    
    def get(self):
        profiles = Profile.query.all()
        return profiles_schema.dump(profiles)