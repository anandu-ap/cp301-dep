
from flask import Flask
from sqlalchemy import ForeignKey
from myapp import db, login_manager, app
from myapp import bcrypt
from flask_user import UserMixin
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(length=30),nullable=False,unique=True)
    name = db.Column(db.String(length=30),nullable=False)
    faculty_staff = db.Column(db.String(20), nullable = False)
    designation = db.Column(db.String(length=30),nullable=False)
    department = db.Column(db.String(length=30),nullable=False)
    email_address = db.Column(db.String(length=50),nullable=False,unique=True)
    password_hash = db.Column(db.String(length=60),nullable=False)
    leaves = db.relationship('Leave', backref='applicant', lazy=True)
    roles = db.relationship('Role', secondary='user_roles')
    isfirst = db.Column(db.Integer(), nullable=False)
    remaining_leaves = db.Column(db.Integer(), nullable=False)

    
    @property
    def password(self):
        return self.password
    @password.setter
    def password(self, plain_text_password):
        self.password_hash = bcrypt.generate_password_hash(plain_text_password).decode('utf-8')
    
    def check_password_correction(self,attempted_password):
        return bcrypt.check_password_hash(self.password_hash, attempted_password)

    def get_reset_token(self, expires_sec=1800):
        s = Serializer(app.config['SECRET_KEY'], expires_sec)
        return s.dumps({'user_id': self.id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token)['user_id']
        except:
            return None
        return User.query.get(user_id)

    def __repr__(self):
        return f'User {self.id} {self.username}'



class Role(db.Model):
    id = db.Column(db.Integer(),primary_key=True)
    name = db.Column(db.String(20),unique=True)

    def __repr__(self):
        return f'{self.name}'


class UserRoles(db.Model):
    __tablename__ = 'user_roles'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id', ondelete='CASCADE'))
    role_id = db.Column(db.Integer(), db.ForeignKey('role.id', ondelete='CASCADE'))


    def __repr__(self):
        return f'User {self.user_id} -> Role {self.role_id}'



class Leave(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(),db.ForeignKey('user.id'),nullable=False)
    nature_of_leave = db.Column(db.String(length=50), nullable=False)
    leave_category = db.Column(db.String(20), nullable=False)
    start_date = db.Column(db.Text(),nullable=False)
    end_date = db.Column(db.Text(),nullable=False)
    no_of_days = db.Column(db.Integer(),nullable=False)
    purpose_of_leave = db.Column(db.String(length=1024), nullable=False)
    alternative_arrangements = db.Column(db.String(length=100),default='No')
    station_leave_required = db.Column(db.String(),nullable=False)
    sl_start_date = db.Column(db.Text())
    sl_end_date = db.Column(db.Text())
    address_during_leave = db.Column(db.String(length=100),nullable=False)
    phone_number = db.Column(db.String(length=15),nullable=False)
    applied_date = db.Column(db.Text(), nullable=False)
    applied_time = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f'Leave {self.id}'

class ProcessedLeave(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    leave_id = db.Column(db.Integer(),db.ForeignKey('leave.id'),nullable=False)
    hod_status = db.Column(db.String(50), nullable=False)
    hod_remarks = db.Column(db.String(200))
    administration_status = db.Column(db.String(50))
    administration_remarks = db.Column(db.String(200))
    dean_registrar_status = db.Column(db.String(50))
    dean_registrar_remarks = db.Column(db.String(200))
    


class CancelLeave(db.Model):
    id = db.Column(db.Integer(), primary_key = True)
    leave_id = db.Column(db.Integer(), db.ForeignKey('leave.id'), nullable = False)
    remarks = db.Column(db.String(200),nullable = False)
    from_date = db.Column(db.Text(), nullable = False)
    status = db.Column(db.String(50))