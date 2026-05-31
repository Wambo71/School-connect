from flask import Blueprint, request, jsonify
from models import db, Department

department_bp = Blueprint("department_bp", __name__)

# CREATE
@department_bp.route("/departments", methods=["POST"])
def add_department():
    data = request.get_json()

    dept = Department(name=data["name"])

    db.session.add(dept)
    db.session.commit()

    return jsonify(dept.to_dict()), 201


# GET ALL
@department_bp.route("/departments", methods=["GET"])
def get_departments():
    depts = Department.query.all()
    return jsonify([d.to_dict() for d in depts])


# UPDATE
@department_bp.route("/departments/<int:id>", methods=["PUT"])
def update_department(id):
    dept = Department.query.get_or_404(id)

    data = request.get_json()
    dept.name = data.get("name", dept.name)

    db.session.commit()

    return jsonify(dept.to_dict())


# DELETE
@department_bp.route("/departments/<int:id>", methods=["DELETE"])
def delete_department(id):
    dept = Department.query.get_or_404(id)

    db.session.delete(dept)
    db.session.commit()

    return jsonify({"message": "Department deleted"})