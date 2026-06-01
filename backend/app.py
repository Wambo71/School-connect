from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from models import db, Department

# =========================
# INIT APP
# =========================
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "https://school-connect-4.onrender.com"}})

# =========================
# CONFIG
# =========================
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///institution.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config["JWT_SECRET_KEY"] = "super-secret-key"

# =========================
# INIT EXTENSIONS
# =========================
db.init_app(app)
jwt = JWTManager(app)

# =========================
# IMPORT ROUTES (AFTER app init)
# =========================
from routes.student_routes import student_bp 
from routes.course_routes import course_bp
from routes.staff_routes import staff_bp
from routes.department_routes import department_bp  
from routes.auth_routes import auth_bp

# =========================
# REGISTER BLUEPRINTS
# =========================
app.register_blueprint(student_bp, url_prefix="/api")
app.register_blueprint(course_bp, url_prefix="/api")
app.register_blueprint(staff_bp, url_prefix="/api")
app.register_blueprint(department_bp, url_prefix="/api")
app.register_blueprint(auth_bp, url_prefix="/api")

# =========================
# HOME ROUTE
# =========================
@app.route('/')
def home():
    return {"message": "Institution Management Portal API Running"}

# =========================
# CREATE TABLES + SEED DATA
# =========================
with app.app_context():
    db.create_all()

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
# RUN SERVER
# =========================
if __name__ == '__main__':
    app.run(port=5000, debug=True)