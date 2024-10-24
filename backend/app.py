from datetime import datetime
from flask import Flask, jsonify, render_template, request, send_from_directory
from models import BaseModel, db, Tags, Tasks, User
from flask_cors import CORS
# To create tables
from sqlalchemy import Column, Date, Enum, String, Integer

app = Flask(__name__, template_folder='/frontend/public')
CORS(app, resources={r"/*": {"origins": "*"}})
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
    user = User.query.get(user_email)
    data = request.json
    task = Tasks.query.get(data['task_id'])
    user.tasks.append(task)
    db.session.commit()
    return jsonify({'message': 'Task added to user'}), 200

@app.route('/tasks/all', methods=['GET'])
def get_all_tasks():
    tasks = Tasks.query.all()
    return jsonify([task.to_dict() for task in tasks])

# user
# @app.route('/users/add', methods=['GET'])
# def add_user_form():
#     return render_template('/frontend/public/pages/user.html')

@app.route('/users/add', methods=['POST'])
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
    db.session.add(new_tag)
    db.session.commit()
    
    return jsonify(new_tag.to_dict()), 201

@app.route('/tags/all', methods=['GET'])
def get_all_tags():
    tags = Tags.query.all()
    return jsonify([tag.to_dict() for tag in tags])

# app.register_blueprint(tag_bp)
# # app.register_blueprint(task_bp)
# app.register_blueprint(user_bp)


if __name__ == '__main__':
    app.run(debug=True)
