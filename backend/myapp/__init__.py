import os
from flask import Flask
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myapp.db'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://deppostgres:depapp@localhost:5432/depflaskapp'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://testpostgres:testapp@localhost:5432/testflaskapp'
app.config['SECRET_KEY'] = '3d2b6211cb0a21119bc3df49'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)   

app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'anandudepy8@gmail.com'
app.config['MAIL_PASSWORD'] = 'depy8@123'
mail = Mail(app)

JWTManager(app)

# @app.before_first_request
# def create_table():
#     db.create_all()

from myapp import routes


# user_=User(username='user4',email_address='user4@gmail.com',name='I_am_user4',department='DEP1',designation='HOD',password='user4@123')
# user_.roles=[Role.query.filter_by(name='Authority').first()]
