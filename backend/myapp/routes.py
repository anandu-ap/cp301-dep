
from unittest import result
from myapp import app, bcrypt, mail, db
from flask import render_template, redirect, url_for, flash, make_response,request, json,jsonify, session
from myapp.models import User, Leave, Role, ProcessedLeave, CancelLeave
from myapp.forms import (AddUserForm, LoginForm,MailForm, ChangePasswordForm, CasualLeaveForm, NonCasualLeaveForm, DeleteUserForm,
                         LeaveCategoryForm, SelectSortForm1, SelectSortForm2, RejectRemarks, LeaveCancellationForm, RequestResetForm, ResetPasswordForm)
from datetime import datetime
from flask_user import roles_required, SQLAlchemyAdapter, UserManager
from sqlalchemy import desc, false
from flask_mail import Message
from flask_cors import CORS
from functools import wraps
from datetime import datetime, timedelta
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, get_jwt_identity, jwt_required
import pandas as pd

CORS(app)


db_adapter = SQLAlchemyAdapter(db, User) 
user_manager = UserManager(db_adapter, app)    



@app.route('/login',methods=['GET','POST'])
def login_page():
    request_data = request.get_json()
    
    if 1:
        attempted_user = User.query.filter_by(username=request_data['username']).first()
        if attempted_user and attempted_user.check_password_correction(attempted_password=request_data['password']):
            if attempted_user.isfirst == 10:
                return redirect(url_for('reset_request'))
            else:
                
                access_tocken = create_access_token(identity=attempted_user.username)
                refresh_tocken = create_refresh_token(identity=attempted_user.username)
                return jsonify({"success_msg" : 1, "access_tocken": access_tocken, "refresh_tocken": refresh_tocken, "user_id": attempted_user.id, "role": str(attempted_user.roles[0])})
                
        elif(not attempted_user):
            return jsonify({'msg':'User does not exist'})
            
        else:
            return jsonify({'msg':'Username and password do not match! Please try again'})
            

@app.route('/refresh')
class RefreshResource():
    @jwt_required(refresh=True)
    def post(self):

        current_user=get_jwt_identity()

        new_access_token=create_access_token(identity=current_user)

        return make_response(jsonify({"access_token":new_access_token}),200)


@app.route('/logout')

def logout_page():
    session['logged_in'] = False
    flash("You have been logged out!", category='info')
    return jsonify({'msg':'logged out'})

#Dashboard for applicant

def fun1(list):
    result = []
    for each in list:
        element = {
        "id" : each.Leave.id,
        "applied_date":each.Leave.applied_date, 
        "applied_time": each.Leave.applied_time, 
        "leave_category":each.Leave.leave_category,
        "start_date":each.Leave.start_date, 
        "end_date":each.Leave.end_date
        }
        result.append(element)
    return result

@app.route('/Applicant/<user_id>/dashboard', methods=['GET'])
def applicant_account_page(user_id):
    
    return jsonify({'user_id':user_id, 'role':'Applicant'})


@app.route('/latest_five_leaves/<user_id>', methods=['GET'])
def latest_five_leaves(user_id):
    latest_five = []
    leave_history = db.session.query(Leave, ProcessedLeave).outerjoin(ProcessedLeave, Leave.id == ProcessedLeave.leave_id).filter(Leave.user_id == user_id).order_by(desc(Leave.applied_date),desc(Leave.applied_time)).all()
    if len(leave_history) <= 5:
        latest_five = leave_history
    else:
        latest_five = leave_history[:5]
    return jsonify({"latest_leaves":fun1(latest_five)})

#leave applications of applicant

@app.route('/<role>/<user_id>/leave_applications', methods=['GET','POST'])
def applicant_leaves_page(role, user_id):
    try:
        leave_history = []
        leave_history = db.session.query(Leave, ProcessedLeave).outerjoin(ProcessedLeave, Leave.id == ProcessedLeave.leave_id).filter(Leave.user_id == user_id).all()
        return jsonify({"success_msg":1,"leaves":fun1(leave_history)})
    except:
        return jsonify({"success_msg":0})


#Dashboard for HOD

@app.route('/HOD/<user_id>/dashboard')
def hod_account_page(user_id):
    latest_five = []
    leave_history = db.session.query(Leave, ProcessedLeave).outerjoin(ProcessedLeave, Leave.id == ProcessedLeave.leave_id).filter(Leave.user_id == user_id).order_by(desc(Leave.applied_date),desc(Leave.applied_time)).all()
    if len(leave_history) <= 5:
        latest_five = leave_history
    else:
        latest_five = leave_history[:5]
    return jsonify({"success":1, 'username':user_id, 'role':'HOD', "latest_leaves":fun1(latest_five)})


# Leave requests for HOD
def leave_serializer(leave):
    return{
        'applied_date' : leave.Leave.applied_date,
        'applied_time': leave.Leave.applied_time, 
        'leave_category' : leave.Leave.leave_category,
        'start_date' : leave.Leave.start_date, 
        'end_date' : leave.Leave.end_date
    }




#Dashboard for Dean

@app.route('/Authority/<user_id>/dashboard')
def authority_account_page(user_id):
    latest_five = []
    leave_history = db.session.query(Leave, ProcessedLeave).outerjoin(ProcessedLeave, Leave.id == ProcessedLeave.leave_id).filter(Leave.user_id == user_id).order_by(desc(Leave.applied_date),desc(Leave.applied_time)).all()
    if len(leave_history) <= 5:
        latest_five = leave_history
    else:
        latest_five = leave_history[:5]
    return jsonify({"success":1, 'user_id':user_id, 'role':'Authority', "latest_leaves":fun1(latest_five)})






#Dashboard for Administration Section

@app.route('/Administration/<user_id>/dashboard')
def administration_account_page(user_id):
    latest_five = []
    leave_history = db.session.query(Leave, ProcessedLeave).outerjoin(ProcessedLeave, Leave.id == ProcessedLeave.leave_id).filter(Leave.user_id == user_id).order_by(desc(Leave.applied_date),desc(Leave.applied_time)).all()
    if len(leave_history) <= 5:
        latest_five = leave_history
    else:
        latest_five = leave_history[:5]
    return jsonify({"success":1, 'user_id':user_id, 'role':'Administration', "latest_leaves":fun1(latest_five)})





#Dashboard for Admin User

@app.route('/Admin/<user_id>/dashboard')
def admin_account_page(user_id):
    return jsonify({"success":1, "user_id":user_id, "role":"Admin"})

# Page to add a new user by admin

@app.route('/Admin/dashboard/adduser', methods=['GET', 'POST'])
def add_user_page():
    request_data = request.get_json()
    try:
        user_to_create = User(username=request_data["username"],
                              email_address=request_data["email"],
                              name=request_data["name"],
                              faculty_staff = request_data["faculty_staff"],
                              department=request_data["department"],
                              designation=request_data["designation"],
                              password='iitrpr',
                              remaining_leaves=30,
                              isfirst=1)
        user_to_create.roles=[Role.query.filter_by(name=request_data["role"]).first()]
        db.session.add(user_to_create)
        db.session.commit()
        # flash(f'User added successfully with role "{request_data["role"]}"', category='success')
        return jsonify({"success_msg" : 1})
    except:
        return jsonify({"success_msg" : 0})



@app.route('/Admin/<user_id>/dashboard/adduser_by_excel', methods=['GET', 'POST'])
def add_user_excel_page(user_id):
    if 1:    
        request_data = request.get_json()
        df = pd.read_excel(request_data['filename'])
        for ind in df.index:
            user_to_create = User(username=df['Username'][ind],
                                  email_address=df['Email'][ind],
                                  name=df['Name'][ind],
                                  faculty_staff = df['Faculty_Staff'][ind],
                                  department=df['Department'][ind],
                                  designation=df['Designation'][ind],
                                  password='iitrpr',
                                  remaining_leaves=30,
                                  isfirst=1)
            user_to_create.roles=[Role.query.filter_by(name=df['Role'][ind]).first()]
            db.session.add(user_to_create)
            db.session.commit()
        return jsonify({"success_msg":1})
    


# Page to display all users to admin
def fun2(list):
    result = []
    for each in list:
        element = {
            "username" : each.username,
            "name" : each.name,
            "email" : each.email_address,
            "department" : each.department,
            "faculty_staff" : each.faculty_staff,
            "designation" : each.designation,
            'id' : each.id
        } 
        result.append(element)
    return result

@app.route('/Admin/dashboard/users',methods=['GET'])
def all_users_page():
    users = User.query.all()
    return jsonify({"users":fun2(users)})



@app.route('/<role>/<user_id>/leave category/casual',methods=['GET','POST'])
def casual_leave_application_page(role, user_id):
    request_data = request.get_json()
    try:
        now = datetime.now()
        date_time = now.strftime("%Y-%m-%d %H:%M")
        applied_leave = Leave(user_id=user_id,
                              leave_category='Casual',
                              start_date=request_data["start_date"],
                              end_date=request_data["end_date"],
                              no_of_days=request_data["no_of_days"],
                              purpose_of_leave=request_data["purpose"],
                              nature_of_leave=request_data["nature_of_leave"],
                              alternative_arrangements=request_data["alternative_arrangements"],
                              station_leave_required=request_data["station_leave_required"],
                              sl_start_date=request_data["sl_start_date"],
                              sl_end_date=request_data["sl_end_date"],
                              address_during_leave=request_data["address"],
                              phone_number=request_data["phone_number"],
                              applied_date=date_time[:10],
                              applied_time=date_time[11:])
        db.session.add(applied_leave)
        db.session.commit()
        return jsonify({"success_msg":1})
    except:
        return jsonify({"success_msg":0})




@app.route('/<role>/<user_id>/leave category/noncasual',methods=['GET','POST'])
def non_casual_leave_application_page(role,user_id):
    request_data = request.get_json()
    try:
        now = datetime.now()
        date_time = now.strftime("%Y-%m-%d %H:%M")
        applied_leave = Leave(user_id=user_id,
                              leave_category='Non Casual',
                              start_date=request_data["start_date"],
                              end_date=request_data["end_date"],
                              no_of_days=request_data["no_of_days"],
                              purpose_of_leave=request_data["purpose"],
                              nature_of_leave=request_data["nature_of_leave"],
                              alternative_arrangements=request_data["alternative_arrangements"],
                              station_leave_required=request_data["station_leave_required"],
                              sl_start_date=request_data["sl_start_date"],
                              sl_end_date=request_data["sl_end_date"],
                              address_during_leave=request_data["address"],
                              phone_number=request_data["phone_number"],
                              applied_date=date_time[:10],
                              applied_time=date_time[11:])
        db.session.add(applied_leave)
        db.session.commit()
        return jsonify({"success":1})
    except:
        return jsonify({"success_msg":0})


@app.route('/<role>/<user_name>/<msg>/success')
def success_page(role,user_name, msg):
    return render_template('success.html',message=msg)


# Page showing applied leave of applicant
def fun3():
    return 1
def fun4():
    return 1
def fun5():
    return 1

@app.route('/<role>/<user_id>/leave_applications/<leave_id>')
def applied_leave_page(role, user_id, leave_id):
    try:
        leave_application = Leave.query.filter_by(id=leave_id).first()
        leave_status = ProcessedLeave.query.filter_by(leave_id = leave_id).first()
        cancel_leave = CancelLeave.query.filter_by(leave_id = leave_id).first()
        user = User.query.filter(User.id == user_id).first()
        if(leave_status != None and cancel_leave != None):
            return jsonify({
            "success_msg":1,
            "leave_id":leave_application.id,
            "name":user.name,
            "department":user.department,
            "designation":user.designation,
            "applied_date":leave_application.applied_date,
            "applied_time":leave_application.applied_time,
            "leave_category":leave_application.leave_category,
            "nature_of_leave":leave_application.nature_of_leave,
            "start_date":leave_application.start_date,
            "end_date":leave_application.end_date,
            "no_of_days":leave_application.no_of_days,
            "purpose_of_leave":leave_application.purpose_of_leave,
            "alternative_arrangements":leave_application.alternative_arrangements,
            "station_leave_required":leave_application.station_leave_required,
            "sl_start_date":leave_application.sl_start_date,
            "sl_end_date":leave_application.sl_end_date,
            "address_during_leave":leave_application.address_during_leave,
            "phone":leave_application.phone_number,
            "hod_status":leave_status.hod_status,
            "hod_remarks":leave_status.hod_remarks,
            "administration_status":leave_status.administration_status,
            "administration_remarks":leave_status.administration_remarks,
            "dean_registrar_status":leave_status.dean_registrar_status,
            "dean_registrar_remarks":leave_status.dean_registrar_remarks,
            "cancel":1,
            "cancel_leave_remarks":cancel_leave.remarks,
            "cancel_from":cancel_leave.from_date,
            "cancellation_status":cancel_leave.status
            })
        elif(leave_status != None and cancel_leave == None):
            return jsonify({
            "success_msg":1,
            "leave_id":leave_application.id,
            "name":user.name,
            "department":user.department,
            "designation":user.designation,
            "applied_date":leave_application.applied_date,
            "applied_time":leave_application.applied_time,
            "leave_category":leave_application.leave_category,
            "nature_of_leave":leave_application.nature_of_leave,
            "start_date":leave_application.start_date,
            "end_date":leave_application.end_date,
            "no_of_days":leave_application.no_of_days,
            "purpose_of_leave":leave_application.purpose_of_leave,
            "alternative_arrangements":leave_application.alternative_arrangements,
            "station_leave_required":leave_application.station_leave_required,
            "sl_start_date":leave_application.sl_start_date,
            "sl_end_date":leave_application.sl_end_date,
            "address_during_leave":leave_application.address_during_leave,
            "phone":leave_application.phone_number,
            "hod_status":leave_status.hod_status,
            "hod_remarks":leave_status.hod_remarks,
            "administration_status":leave_status.administration_status,
            "administration_remarks":leave_status.administration_remarks,
            "dean_registrar_status":leave_status.dean_registrar_status,
            "dean_registrar_remarks":leave_status.dean_registrar_remarks,
            "cancel":0,
            "cancel_leave_remarks":"",
            "cancel_from":"",
            "cancellation_status":""
            })
        elif(leave_status == None):
            return jsonify({
            "success_msg":1,
            "leave_id":leave_application.id,
            "name":user.name,
            "department":user.department,
            "designation":user.designation,
            "applied_date":leave_application.applied_date,
            "applied_time":leave_application.applied_time,
            "leave_category":leave_application.leave_category,
            "nature_of_leave":leave_application.nature_of_leave,
            "start_date":leave_application.start_date,
            "end_date":leave_application.end_date,
            "no_of_days":leave_application.no_of_days,
            "purpose_of_leave":leave_application.purpose_of_leave,
            "alternative_arrangements":leave_application.alternative_arrangements,
            "station_leave_required":leave_application.station_leave_required,
            "sl_start_date":leave_application.sl_start_date,
            "sl_end_date":leave_application.sl_end_date,
            "address_during_leave":leave_application.address_during_leave,
            "phone":leave_application.phone_number,
            "hod_status":"",
            "hod_remarks":"",
            "administration_status":"",
            "administration_remarks":"",
            "dean_registrar_status":"",
            "dean_registrar_remarks":"",
            "cancel":0,
            "cancel_leave_remarks":"",
            "cancel_from":"",
            "cancellation_status":""
            })
        else:
            pass
    except:
        return jsonify({"success_msg":0}),404


    




@app.route('/<role>/<user_id>/leave requests/<request_type>/<leave_id>')
def requested_leave_page(role, leave_id, user_id, request_type):
    try :
        leave_application = Leave.query.filter_by(id=leave_id).first()
        leave_status = ProcessedLeave.query.filter_by(leave_id = leave_id).first()
        user = User.query.filter_by(id=leave_application.user_id).first()
        cancel_leave = None
        if(request_type == 'Cancel'):
            cancel_leave = CancelLeave.query.filter_by(leave_id = leave_id).first()

        if(leave_status != None and cancel_leave != None):
            return jsonify({
            "success_msg":1,
            "leave_id":leave_application.id,
            "name":user.name,
            "department":user.department,
            "designation":user.designation,
            "remaining_leaves":user.remaining_leaves,
            "applied_date":leave_application.applied_date,
            "applied_time":leave_application.applied_time,
            "leave_category":leave_application.leave_category,
            "nature_of_leave":leave_application.nature_of_leave,
            "start_date":leave_application.start_date,
            "end_date":leave_application.end_date,
            "no_of_days":leave_application.no_of_days,
            "purpose_of_leave":leave_application.purpose_of_leave,
            "alternative_arrangements":leave_application.alternative_arrangements,
            "station_leave_required":leave_application.station_leave_required,
            "sl_start_date":leave_application.sl_start_date,
            "sl_end_date":leave_application.sl_end_date,
            "address_during_leave":leave_application.address_during_leave,
            "phone":leave_application.phone_number,
            "hod_status":leave_status.hod_status,
            "hod_remarks":leave_status.hod_remarks,
            "administration_status":leave_status.administration_status,
            "administration_remarks":leave_status.administration_remarks,
            "dean_registrar_status":leave_status.dean_registrar_status,
            "dean_registrar_remarks":leave_status.dean_registrar_remarks,
            "cancel":1,
            "cancel_leave_remarks":cancel_leave.remarks,
            "cancel_from":cancel_leave.from_date,
            "cancellation_status":cancel_leave.status
            })
        elif(leave_status != None and cancel_leave == None):
            return jsonify({
            "success_msg":1,
            "leave_id":leave_application.id,
            "name":user.name,
            "department":user.department,
            "designation":user.designation,
            "remaining_leaves":user.remaining_leaves,
            "applied_date":leave_application.applied_date,
            "applied_time":leave_application.applied_time,
            "leave_category":leave_application.leave_category,
            "nature_of_leave":leave_application.nature_of_leave,
            "start_date":leave_application.start_date,
            "end_date":leave_application.end_date,
            "no_of_days":leave_application.no_of_days,
            "purpose_of_leave":leave_application.purpose_of_leave,
            "alternative_arrangements":leave_application.alternative_arrangements,
            "station_leave_required":leave_application.station_leave_required,
            "sl_start_date":leave_application.sl_start_date,
            "sl_end_date":leave_application.sl_end_date,
            "address_during_leave":leave_application.address_during_leave,
            "phone":leave_application.phone_number,
            "hod_status":leave_status.hod_status,
            "hod_remarks":leave_status.hod_remarks,
            "administration_status":leave_status.administration_status,
            "administration_remarks":leave_status.administration_remarks,
            "dean_registrar_status":leave_status.dean_registrar_status,
            "dean_registrar_remarks":leave_status.dean_registrar_remarks,
            "cancel":0,
            "cancel_leave_remarks":"",
            "cancel_from":"",
            "cancellation_status":""
            })
        elif(leave_status == None):
            return jsonify({
            "success_msg":1,
            "leave_id":leave_application.id,
            "name":user.name,
            "department":user.department,
            "designation":user.designation,
            "remaining_leaves":user.remaining_leaves,
            "applied_date":leave_application.applied_date,
            "applied_time":leave_application.applied_time,
            "leave_category":leave_application.leave_category,
            "nature_of_leave":leave_application.nature_of_leave,
            "start_date":leave_application.start_date,
            "end_date":leave_application.end_date,
            "no_of_days":leave_application.no_of_days,
            "purpose_of_leave":leave_application.purpose_of_leave,
            "alternative_arrangements":leave_application.alternative_arrangements,
            "station_leave_required":leave_application.station_leave_required,
            "sl_start_date":leave_application.sl_start_date,
            "sl_end_date":leave_application.sl_end_date,
            "address_during_leave":leave_application.address_during_leave,
            "phone":leave_application.phone_number,
            "hod_status":"",
            "hod_remarks":"",
            "administration_status":"",
            "administration_remarks":"",
            "dean_registrar_status":"",
            "dean_registrar_remarks":"",
            "cancel":0,
            "cancel_leave_remarks":"",
            "cancel_from":"",
            "cancellation_status":""
            })
        else:
            pass
    except:
        return jsonify({"success_msg":0}), 404




@app.route('/<role>/<user_id>/leave requests/<leave_id>/cancel/<status>')
def cancel_page(role, leave_id, user_id, request_type, status):
    try:
        leave_application = Leave.query.filter_by(id=leave_id).first()
        user = None
        if(leave_application != None):
            user = User.query.filter_by(id=leave_application.user_id).first()
        cancel_leave = CancelLeave.query.filter_by(leave_id = leave_id).first()
        if(status == 'Cancel'):
            user.remaining_leaves += int(leave_application.end_date) - int(cancel_leave.end_date)
            cancel_leave.status = 'Cancelled from'+cancel_leave.from_date
            leave_application.end_date = cancel_leave.from_date
        else:
            cancel_leave.status = 'Can not be cancelled'
        db.session.commit()
        return jsonify({"success_msg":1})
    except:
        return jsonify({"success_msg":0})


@app.route('/<role>/<user_id>/leave requests', methods=['GET'])
def leave_request_page(role, user_id):
    current_user = User.query.filter(User.id == user_id).first()
    if role == 'HOD':
        leave_requests = db.session.query(Leave, User, ProcessedLeave).filter(User.department == current_user.department, Leave.user_id == User.id, User.id != current_user.id).outerjoin(ProcessedLeave, Leave.id == ProcessedLeave.leave_id).all()
        cancellation_requests = db.session.query(Leave, CancelLeave, User, ProcessedLeave).filter(Leave.id == CancelLeave.leave_id, CancelLeave.status == None, User.department == current_user.department, User.faculty_staff == current_user.faculty_staff, Leave.user_id == User.id, User.id != current_user.id).outerjoin(ProcessedLeave, Leave.id == ProcessedLeave.leave_id).all()
        return jsonify({"leave_requests":fun1(leave_requests), "leave_cancellation_requests":fun1(cancellation_requests)})
    elif role == 'Administration':
        # new_leave_requests = db.session.query(Leave, ProcessedLeave).filter(ProcessedLeave.hod_status.in_(['Recommended','Not Recommended']), ProcessedLeave.administration_status == None).outerjoin(ProcessedLeave, Leave.id == ProcessedLeave.leave_id).order_by(Leave.applied_date, Leave.applied_time).all()
        leave_requests = db.session.query(Leave, ProcessedLeave).filter(Leave.leave_category == 'Non Casual', ProcessedLeave.hod_status != None).outerjoin(ProcessedLeave, Leave.id == ProcessedLeave.leave_id).all()
        return jsonify({"leave_requests":fun1(leave_requests)})
    elif role == 'Authority':
        # new_leave_requests = db.session.query(Leave, User, ProcessedLeave).filter(ProcessedLeave.administration_status == 'Verified', ProcessedLeave.dean_registrar_status == None, Leave.user_id == User.id, User.faculty_staff == current_user.faculty_staff).outerjoin(ProcessedLeave, Leave.id == ProcessedLeave.leave_id).order_by(Leave.applied_date, Leave.applied_time).all()
        leave_requests = db.session.query(Leave, User, ProcessedLeave).filter(Leave.leave_category == 'Non Casual', ProcessedLeave.administration_status == 'Verified', Leave.user_id == User.id, User.faculty_staff == current_user.faculty_staff).outerjoin(ProcessedLeave, Leave.id == ProcessedLeave.leave_id).all()
        cancellation_requests = db.session.query(Leave, User,CancelLeave, ProcessedLeave).filter(Leave.leave_category == 'Non Casual', ProcessedLeave.administration_status == 'Verified', Leave.user_id == User.id, User.faculty_staff == current_user.faculty_staff, Leave.id == CancelLeave.leave_id, CancelLeave.status == None).outerjoin(ProcessedLeave, Leave.id == ProcessedLeave.leave_id).order_by(Leave.applied_date, Leave.applied_time).all()
        return jsonify({"leave_requests":fun1(leave_requests), "leave_cancellation_requests":fun1(cancellation_requests)})
    else:
        return jsonify({"success_msg":0}), 404

@app.route('/<role>/<user_id>/leave requests/<leave_id>/<status>/<action>')
def approve_reject_page(role, user_id, leave_id, status, action):
    try:
        leave_application = Leave.query.filter_by(id=leave_id).first()
        if role == "HOD":
            if(action == 'insert'):
                if(leave_application.leave_category == 'Casual'):
                    if (status == 'Sanctioned'):
                        user = User.query.filter(User.id == leave_application.user_id).first()
                        user.remaining_leaves -= leave_application.no_of_days
                        db.session.commit()
                    leave_to_insert = ProcessedLeave(leave_id = leave_id, hod_status = status, administration_status = 'None', dean_registrar_status = 'None')
                else:
                    leave_to_insert = ProcessedLeave(leave_id = leave_id, hod_status = status, administration_status="",dean_registrar_status="")
                db.session.add(leave_to_insert)
            
            else:
                leave_to_update = ProcessedLeave.query.filter_by(leave_id = leave_id).first()
                leave_to_update.hod_status = status
        elif role == 'Administration':
            leave_to_update = ProcessedLeave.query.filter_by(leave_id = leave_id).first()
            leave_to_update.administration_status = status
        elif role == 'Authority':
            if (status == 'Sanctioned'):
                user = User.query.filter(User.id == leave_application.user_id).first()
                user.remaining_leaves -= leave_application.no_of_days
                db.session.commit()
            leave_to_update = ProcessedLeave.query.filter_by(leave_id = leave_id).first()
            leave_to_update.dean_registrar_status = status
        else:
            pass
        db.session.commit()
        return jsonify({"success_msg":1})
    except:
        return jsonify({"success_msg":0})




@app.route('/<role>/<user_id>/<type> requests/<leave_id>/remarks', methods=['GET','POST'])
def remarks_page(role, user_id, type, leave_id):
    request_data = request.get_json()
    if type == 'leave':
        leave_to_update = ProcessedLeave.query.filter_by(leave_id = leave_id).first()
        try:
            if(role == 'HOD'):
                leave_to_update.hod_remarks = request_data['remarks']
            elif(role == 'Authority'):
                leave_to_update.authority_remarks = request_data['remarks']
            elif(role == 'Administration'):
                leave_to_update.administration_remarks = request_data['remarks']
            else:
                pass
            db.session.commit()
            return jsonify({"success_msg":1})
        except:
            return jsonify({"success_msg":0}), 404
   



@app.route('/<role>/<user_id>/leave_applications/<leave_id>/withdraw')
def withdraw_leave_page(role, user_id, leave_id):
    if 1:
        db.session.query(Leave).filter(Leave.id == leave_id).delete()
        db.session.commit()
        return jsonify({"success_msg":1})
    # except:
    #     return jsonify({"success_msg":0})


@app.route('/<role>/<user_id>/leave_applications/<leave_id>/cancel/remarks', methods = ['GET','POST'])
def applicant_cancel_leave(role, user_id, leave_id):
    request_data = request.get_json()
    try:
        leave_to_cancel = CancelLeave(leave_id = leave_id,
                                      remarks = request_data["remarks"],
                                      from_date = request_data["from_date"])
        db.session.add(leave_to_cancel)
        db.session.commit()
        return jsonify({"success_msg":1})
    except:
        return jsonify({"success_msg":0})



def fun_user(list):
    result = []
    for each in list:
        element = {
        "id":each.id,
        "username":each.username,
        "name":each.name,
        "email":each.email_address,
        "faculty_staff":each.faculty_staff,
        "department":each.department,
        "designation":each.designation,
        "role":str(each.role[0])
        }
        result.append(element)
    return result


@app.route('/<role>/<user_id>/profile', methods=['GET'])
def profile_page(role, user_id):
    try:
        user = User.query.filter(User.id == user_id).first()
        return jsonify({"success_msg":1 ,"id":user.id, "username":user.username, "name":user.name, "email":user.email_address, "faculty_staff":user.faculty_staff, "department":user.department, "designation":user.designation, "role":str(user.roles[0])})
    except:
        return jsonify({"success_msg":0}),404

@app.route('/remaining_leaves/<user_id>', methods = ['GET'])
def remaining_leaves(user_id):
    user = User.query.filter(User.id == user_id).first()
    return jsonify({"name":user.name, "remaining_leaves":user.remaining_leaves})




def send_reset_email(user):
    token = user.get_reset_token()
    msg = Message('Password Reset Request', sender = 'noreply@depy8.com', recipients=[user.email_address])
    msg.body = f'''To reset your password, copy the following token:
    {token}
    
    If you did not make this request then simply ignore this email and no change will be made.
    '''
    # msg.body = f'''To reset your password, copy the following link:
    # {url_for("reset_token", token=token, _external=True)}
    
    # If you did not make this request then simply ignore this email and no change will be made.
    # '''
    mail.send(msg)
    return jsonify({"success_msg":1,"token":token, "user_id":user.id})


@app.route('/reset_password', methods=['GET', 'POST'])
def reset_request():
    request_data = request.get_json()
    if 1:
        user = User.query.filter_by(email_address = request_data["email"]).first()
        if not user:
            return jsonify({"success_msg":0, "msg":"Invalid Email Address"})
        return send_reset_email(user)
            
@app.route('/reset_password/<user_id>', methods = ['GET', 'POST'])
def reset_password(user_id):
    request_data = request.get_json()
    if request_data['token1'] == request_data['token2']:
        user = User.query.filter(User.id == user_id).first()
        if request_data['password1'] != request_data['password2']:
            return jsonify({"success_msg":0, "msg":"Password do not match each other"})

        hashed_password = bcrypt.generate_password_hash(request_data["password1"]).decode('utf-8')
        user.password_hash = hashed_password
        db.session.commit()
        return jsonify({"success_msg":1,"msg":"Password updated successfully"})
    return jsonify({"success_msg":0, "msg":"Invalid or expired token"})



@app.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_token(token):
    user = User.verify_reset_token(token)
    if not user:
        return jsonify({"success_msg":0,"redirect":"reset_request","msg":"That is an invalid or expired tocken"})
    request_data = request.get_json()
    if request_data["password1"] == request_data["password2"]:
        hashed_password = bcrypt.generate_password_hash(request_data["password1"]).decode('utf-8')
        user.password_hash = hashed_password
        db.session.commit()
        return jsonify({"success_msg":1, "msg":"Your password has been updated"})




@app.route('/Admin/<user_id>/dashboard/users/<target_user>', methods=['GET','POST'])
def view_user_page_for_admin(user_id, target_user):
    user = User.query.filter(User.id == target_user).first()
    return {"user_id":user_id, "role":"Admin", "user":fun_user(user)}




@app.route('/Admin/dashboard/deleteuser/<target_user>', methods=['GET','POST'])
def delete_user_page(target_user):
    try:
        db.session.query(User).filter(User.id == target_user).delete()
        db.session.commit()
        flash(f'User has been deleted successfully', 'success')
        return jsonify({"success_msg" : 1})
    except:
        return jsonify({"success_msg" : 0})



@app.route('/Admin/<user_id>/dashboard/users/<target_user>/edit', methods=['GET','POST'])
def edit_user_page(user_id, target_user):
    request_data = request.get_json()
    user = User.query.filter(User.id == target_user).first()

    user.name = request_data["name"]
    user.faculty_staff = request_data["faculty_staff"]
    user.designation = request_data["designation"]
    user.department = request_data["department"]
    user.email_address = request_data["email"]
    db.session.commi()
    user = User.query.filter(User.id == target_user).first()
    
    return {"success":1, "user":fun_user(user)}

