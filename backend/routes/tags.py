# routes/tag_routes.py
from flask import Blueprint, render_template, request, jsonify
from models import Tags
from db import db


tag_bp = Blueprint('tags', __name__, url_prefix='/tags')

@tag_bp.route('/add', methods=['GET'])
def add_tag_form():
    return render_template('public/pages/addTag.html')

@tag_bp.route('/add', methods=['POST'])
def add_tag():
    name = request.json.get('name')
    if not name:
        return jsonify({"error": "Name is required"}), 400

    new_tag = Tags(name=name)
    db.session.add(new_tag)
    db.session.commit()
    
    return jsonify(new_tag.to_dict()), 201

@tag_bp.route('/all', methods=['GET'])
def get_all_tags():
    tags = Tags.query.all()
    return jsonify([tag.to_dict() for tag in tags])
