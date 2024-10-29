from datetime import datetime
from flask import Flask, jsonify, render_template, request, send_from_directory
from models import BaseModel, db, Tags, Tasks, User, UserTasks
from flask_cors import CORS, cross_origin
import logging


# To create tables
from sqlalchemy import Column, Date, Enum, String, Integer

app = Flask(__name__, template_folder='/frontend/public')
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['INSTANCE_PATH'] = '../instance/'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

db.init_app(app)

        
with app.app_context():
    db.create_all()
    print(db)
    
# @app.route('/')
# def index():
#     render_template('index.html')

# tasks

@app.errorhandler(Exception)
def handle_error(e):
    return jsonify({"error": str(e)}), 500

def validate_date(date_str):
    try:
        due_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        return due_date
    except ValueError:
        raise ValueError("Invalid date format. Use YYYY-MM-DD.")
    
    

@app.route('/tasks/add', methods=['POST'])
def add_tasks():
    try:
        data = request.get_json()
        name = data.get('name')
        title = data.get('title')
        description = data.get('description')
        due_date_str = data['due_date']
        validate_date(due_date_str)
        due_date = datetime.strptime(due_date_str, "%Y-%m-%d").date()
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

        return jsonify({"id": new_task.id, **new_task.to_dict()}), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "An error occurred"}), 500
    

@app.route('/users/<string:user_email>/tasks', methods=['PUT'])
def add_task_to_user(user_email):
    user = db.session.get(User, user_email)
    data = request.json
    task = db.session.get(Tasks, data['task_id'])
    if task is None:
        return jsonify({"error": "Task not found"}), 404
    user.tasks.append(task)
    db.session.commit()
    return jsonify({'message': 'Task added to user'}), 200

# @app.route('/tasks/all', methods=['GET'])
# def get_all_tasks():
#     tasks = Tasks.query.all()
#     return jsonify([task.to_dict() for task in tasks])

@app.route('/tasks/all', methods=['GET'])
def get_all_tasks():
    user_tasks = UserTasks.query.all()
    tasks = []
    for ut in user_tasks:
        task = Tasks.query.get(ut.task_id)
        if task:
            tasks.append(task.to_dict())
        else:
            # Log or handle missing task
            print(f"Missing task ID: {ut.task_id}")
    return jsonify(tasks)

# @app.route('/tasks/by_lastname/<lastname>', methods=['GET'])
# def get_tasks_by_lastname(lastname):
#     tasks = Tasks.query.filter_by(last_name=lastname).all()
#     return jsonify([task.to_dict() for task in tasks])

# user
# @app.route('/users/add', methods=['GET'])
# def add_user_form():
#     return render_template('/frontend/public/pages/user.html')
logging.basicConfig(filename='app.log', level=logging.ERROR)
@app.route('/users/add', methods=['POST'])
@cross_origin(origins='http://localhost:3000')
def add_user():
    try:
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')
        first_name = data.get('first_name')
        last_name = data.get('last_name')

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        if not isinstance(email, str) or not isinstance(password, str):
            return jsonify({"error": "Invalid data types"}), 400

        new_user = User(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )
        
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
        'id': new_user.id,
        'email': new_user.email,
        'first_name': new_user.first_name,
        'last_name': new_user.last_name
    }), 201
    
    except Exception as e:
        logging.error(f"Error: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/user/all', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

# tags

# @app.route('/tags/add', methods=['GET'])
# def add_tag_form():
#     return render_template('/frontend/public/pages/addTag.html')

@app.route('/tags/add', methods=['POST'])
def add_tag():
    name = request.json.get('name')
    if not name:
        return jsonify({"error": "Name is required"}), 400

    new_tag = Tags(name=name)
    try:
        db.session.add(new_tag)
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    return jsonify(new_tag.to_dict()), 201

# app.register_blueprint(tag_bp)
# # app.register_blueprint(task_bp)
# app.register_blueprint(user_bp)


if __name__ == '__main__':
    app.run(debug=True)
