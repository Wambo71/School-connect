from flask import Blueprint, request, jsonify
from models import db, Course

course_bp = Blueprint("course_bp", __name__)

# ==================================
# CREATE COURSE
# ==================================
@course_bp.route("/courses", methods=["POST"])
def add_course():
    data = request.get_json()

    try:
        new_course = Course(
            course_name=data["course_name"],
            course_code=data["course_code"]
        )

        db.session.add(new_course)
        db.session.commit()

        return jsonify({
            "message": "Course added successfully",
            "course": new_course.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": str(e)
        }), 400


# ==================================
# GET ALL COURSES
# ==================================
@course_bp.route("/courses", methods=["GET"])
def get_courses():

    courses = Course.query.all()

    return jsonify([
        course.to_dict() for course in courses
    ]), 200


# ==================================
# GET SINGLE COURSE
# ==================================
@course_bp.route("/courses/<int:id>", methods=["GET"])
def get_course(id):

    course = Course.query.get(id)

    if not course:
        return jsonify({
            "message": "Course not found"
        }), 404

    return jsonify(course.to_dict()), 200


# ==================================
# UPDATE COURSE
# ==================================
@course_bp.route("/courses/<int:id>", methods=["PUT"])
def update_course(id):

    course = Course.query.get(id)

    if not course:
        return jsonify({
            "message": "Course not found"
        }), 404

    data = request.get_json()

    course.course_name = data.get(
        "course_name",
        course.course_name
    )

    course.course_code = data.get(
        "course_code",
        course.course_code
    )

    db.session.commit()

    return jsonify({
        "message": "Course updated successfully",
        "course": course.to_dict()
    }), 200


# ==================================
# DELETE COURSE
# ==================================
@course_bp.route("/courses/<int:id>", methods=["DELETE"])
def delete_course(id):

    course = Course.query.get(id)

    if not course:
        return jsonify({
            "message": "Course not found"
        }), 404

    db.session.delete(course)
    db.session.commit()

    return jsonify({
        "message": "Course deleted successfully"
    }), 200