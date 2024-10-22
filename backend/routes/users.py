from flask import Blueprint, app, render_template, request, jsonify
from models import User
from db import db

user_bp = Blueprint('users', __name__, url_prefix='/users')

@user_bp.route('/add', methods=['GET'])
def add_user_form():
    return render_template('public/pages/user.html')

@user_bp.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    new_user = User(
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.to_dict()), 201

@user_bp.route('/all', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])
