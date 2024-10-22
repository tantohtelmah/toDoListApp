# routes/task_routes.py
from flask import Blueprint, render_template, request, jsonify
from models import Tasks
from db import db

task_bp = Blueprint('tasks', __name__, url_prefix='/tasks')

# @task_bp.route('/add', methods=['GET'])
# def add_task_form():
#     return render_template('/frontend/publicpublic/pages/addTask.html')

@task_bp.route('/add', methods=['POST'])
def add_tasks():
    try:
        data = request.get_json()
        name = data.get('name')
        title = data.get('title')
        description = data.get('description')
        due_date = data.get('due_date')
        status = data.get('status', 'pending')

        if not name or not title or not description:
            return jsonify({"error": "Name, title, and description are required"}), 400

        new_task = Tasks(
            name=name,
            title=title,
            description=description,
            due_date=due_date,
            status=status
        )
        db.session.add(new_task)
        db.session.commit()

        return jsonify(new_task.to_dict()), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "An error occurred"}), 500

@task_bp.route('/all', methods=['GET'])
def get_all_tasks():
    tasks = Tasks.query.all()
    return jsonify([task.to_dict() for task in tasks])
