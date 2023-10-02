To setup the React Front End do the following :-
    1. Open the frontend/leave_app directory in the terminal/command line and run the following :-
        npm install
    
    2. After the above setup, to run the frontend application, use :
        npm start

    * Requirements :
        Nodejs (VERSION=v16.13.2 or higher)
        npm (VERSION=8.1.2 or higher) 
        npx (VERSION=8.1.2 or higher)

To setup Flask Backend do the following:-
    1. Open the terminal/command line.
    2. Create the vertual environment.
    3. Install all the dependencies using the command,
        pip install -r requirements.txt
    4. To start the application run the following command,
        python run.py
    5. All the tables will be automatically created once the application starts.
    6. Then add Roles and admin user using the terminal,
        python
        from myapp import db
        from myapp.models import Role, User, UserRoles
        role = Role(name='Admin')
        db.session.add(role)
        role = Role(name='Authority')
        db.session.add(role)
        role = Role(name='Administration')
        db.session.add(role)
        role = Role(name='HOD')
        db.session.add(role)
        role = Role(name='Applicant')
        db.session.add(role)
        db.session.commit()

        user=User(username='adminuser',name='name_of_admin',email_address='email',department='DEP',designation='designation           ',faculty_staff='Faculty',password='password',isfirst=0, remaining_leaves = 0)
        db.session.add(user)
        db.session.commit()
	  userrole = UserRoles(user_id =1, role_id=1)
	  db.session.add(userrole)
	  db.session.commit()
        exit()
        python run.py




