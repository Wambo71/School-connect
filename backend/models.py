from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# =========================
# STUDENT MODEL
# =========================
class Student(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    course = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "course": self.course
        }


# =========================
# STAFF MODEL
# =========================
class Staff(db.Model):
    __tablename__ = "staff"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    department_id = db.Column(db.Integer, db.ForeignKey("departments.id"))

    department = db.relationship("Department", backref="staff")

    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "department": self.department.name if self.department else None
        }
# =========================
# COURSE MODEL
# =========================
class Course(db.Model):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(100), nullable=False)
    course_code = db.Column(db.String(20), unique=True, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "course_name": self.course_name,
            "course_code": self.course_code
        }
    ### ========================###
    ### DEPARTMENT MODEL
    ### ========================###
class Department(db.Model):
    __tablename__ = "departments"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)


    department_id = db.Column(db.Integer, db.ForeignKey("departments.id"))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
   