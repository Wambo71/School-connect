from flask import Blueprint, request, jsonify
from models import db, Staff, Department

staff_bp = Blueprint("staff_bp", __name__)

# ==================================
# CREATE STAFF (FIXED)
# ==================================
@staff_bp.route("/staff", methods=["POST"])
def add_staff():
    data = request.get_json()

    try:
        new_staff = Staff(
            full_name=data["full_name"],
            email=data["email"],
            department_id=data["department_id"]  # ✅ FIXED
        )

        db.session.add(new_staff)
        db.session.commit()

        return jsonify({
            "message": "Staff member created successfully",
            "staff": new_staff.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": str(e)
        }), 400


# ==================================
# GET ALL STAFF
# ==================================
@staff_bp.route("/staff", methods=["GET"])
def get_staff():
    staff_members = Staff.query.all()

    return jsonify([
        staff.to_dict() for staff in staff_members
    ]), 200


# ==================================
# GET SINGLE STAFF
# ==================================
@staff_bp.route("/staff/<int:id>", methods=["GET"])
def get_single_staff(id):

    staff = Staff.query.get(id)

    if not staff:
        return jsonify({"message": "Staff member not found"}), 404

    return jsonify(staff.to_dict()), 200


# ==================================
# UPDATE STAFF (FIXED)
# ==================================
@staff_bp.route("/staff/<int:id>", methods=["PUT"])
def update_staff(id):

    staff = Staff.query.get(id)

    if not staff:
        return jsonify({"message": "Staff member not found"}), 404

    data = request.get_json()

    staff.full_name = data.get("full_name", staff.full_name)
    staff.email = data.get("email", staff.email)
    staff.department_id = data.get("department_id", staff.department_id)  # ✅ FIXED

    db.session.commit()

    return jsonify({
        "message": "Staff updated successfully",
        "staff": staff.to_dict()
    }), 200


# ==================================
# DELETE STAFF
# ==================================
@staff_bp.route("/staff/<int:id>", methods=["DELETE"])
def delete_staff(id):

    staff = Staff.query.get(id)

    if not staff:
        return jsonify({"message": "Staff member not found"}), 404

    db.session.delete(staff)
    db.session.commit()

    return jsonify({
        "message": "Staff deleted successfully"
    }), 200