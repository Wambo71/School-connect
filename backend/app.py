from flask import Flask
from flask_cors import CORS
from models import db, Department

from routes.student_routes import student_bp 
from routes.course_routes import course_bp
from routes.staff_routes import staff_bp
from routes.department_routes import department_bp  


app = Flask(__name__)
CORS(app)

# =========================
# DATABASE CONFIG
# =========================
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///institution.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# =========================
# INIT DB
# =========================
db.init_app(app)

# =========================
# REGISTER BLUEPRINTS
# =========================
app.register_blueprint(student_bp, url_prefix="/api")
app.register_blueprint(course_bp, url_prefix="/api")
app.register_blueprint(staff_bp, url_prefix="/api")
app.register_blueprint(department_bp, url_prefix="/api")


@app.route('/')
def home():
    return {
        "message": "Institution Management Portal API Running"
    }


# =========================
# CREATE TABLES + SEED DATA
# =========================
with app.app_context():
    db.create_all()

    # SEED DEPARTMENTS ONLY ONCE
    if Department.query.count() == 0:
        departments = [
            "Languages",
            "Sciences",
            "ICT",
            "Business",
            "Technical Studies",
            "Humanities",
            "Music",
            "French"
        ]

        for name in departments:
            db.session.add(Department(name=name))

        db.session.commit()
        print("Departments seeded successfully")


# =========================
# RUN APP
# =========================
if __name__ == '__main__':
    app.run(debug=True)