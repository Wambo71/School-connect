from flask import Flask
from flask_cors import CORS
from models import db
from routes.student_routes import student_bp 
from routes.course_routes import course_bp
from routes.staff_routes import staff_bp
from routes.department_routes import department_bp  


app = Flask(__name__)
CORS(app)

# DATABASE CONFIG
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///institution.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# INITIALIZE DATABASE
db.init_app(app)

app.register_blueprint(student_bp, url_prefix="/api")
app.register_blueprint( course_bp, url_prefix="/api")
app.register_blueprint( staff_bp, url_prefix="/api") 
app.register_blueprint(department_bp, url_prefix="/api")   
@app.route('/')
def home():
    return {
        "message": "Institution Management Portal API Running"
    }

# CREATE TABLES
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)