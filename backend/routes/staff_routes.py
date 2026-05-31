from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from models import db, Staff

staff_bp = Blueprint("staff_bp", __name__)

# =========================
# CREATE STAFF (PROTECTED)
# =========================
@staff_bp.route("/staff", methods=["POST"])
@jwt_required()
def add_staff():
    data = request.get_json()

    try:
        new_staff = Staff(
            full_name=data["full_name"],
            email=data["email"],
            department_id=data["department_id"]
        )

        db.session.add(new_staff)
        db.session.commit()

        return jsonify({
            "message": "Staff created successfully",
            "staff": new_staff.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# =========================
# GET ALL STAFF (PROTECTED)
# =========================
@staff_bp.route("/staff", methods=["GET"])
@jwt_required()
def get_staff():
    staff = Staff.query.all()

    return jsonify([s.to_dict() for s in staff]), 200


# =========================
# UPDATE STAFF (PROTECTED)
# =========================
@staff_bp.route("/staff/<int:id>", methods=["PUT"])
@jwt_required()
def update_staff(id):

    staff = Staff.query.get(id)

    if not staff:
        return jsonify({"message": "Staff not found"}), 404

    data = request.get_json()

    staff.full_name = data.get("full_name", staff.full_name)
    staff.email = data.get("email", staff.email)
    staff.department_id = data.get("department_id", staff.department_id)

    db.session.commit()

    return jsonify({
        "message": "Staff updated successfully",
        "staff": staff.to_dict()
    }), 200


# =========================
# DELETE STAFF (PROTECTED)
# =========================
@staff_bp.route("/staff/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_staff(id):

    staff = Staff.query.get(id)

    if not staff:
        return jsonify({"message": "Staff not found"}), 404

    db.session.delete(staff)
    db.session.commit()

    return jsonify({"message": "Staff deleted"}), 200