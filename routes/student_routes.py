from flask import Blueprint, request, jsonify
from models import db, Student

student_bp = Blueprint("student_bp", __name__)

# =========================
# ADD STUDENT
# =========================
@student_bp.route("/students", methods=["POST"])
def add_student():
    data = request.json

    new_student = Student(
        full_name=data["full_name"],
        email=data["email"],
        course=data["course"]
    )

    db.session.add(new_student)
    db.session.commit()

    return jsonify({"message": "Student added successfully"}), 201


# =========================
# GET ALL STUDENTS
# =========================
@student_bp.route("/students", methods=["GET"])
def get_students():
    students = Student.query.all()
    return jsonify([s.to_dict() for s in students])


# =========================
# UPDATE STUDENT
# =========================
@student_bp.route("/students/<int:id>", methods=["PUT"])
def update_student(id):
    student = Student.query.get_or_404(id)
    data = request.json

    student.full_name = data.get("full_name", student.full_name)
    student.email = data.get("email", student.email)
    student.course = data.get("course", student.course)

    db.session.commit()

    return jsonify({"message": "Student updated successfully"})


# =========================
# DELETE STUDENT
# =========================
@student_bp.route("/students/<int:id>", methods=["DELETE"])
def delete_student(id):
    student = Student.query.get_or_404(id)

    db.session.delete(student)
    db.session.commit()

    return jsonify({"message": "Student deleted successfully"})