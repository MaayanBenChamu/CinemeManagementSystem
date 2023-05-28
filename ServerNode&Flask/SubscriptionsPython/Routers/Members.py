from flask import Blueprint, jsonify, request
from BLL.Members import Members_BLL

membersApp = Blueprint("members", __name__)

members_bll = Members_BLL()

# [GET]


@membersApp.route("/", methods=["GET"])
def get_all_members():

    allMembers = members_bll.get_all_members()
    return jsonify(allMembers)


@membersApp.route("/<id>", methods=["GET"])
def get_member_by_id(id):

    member = members_bll.get_member_by_id(id)
    return jsonify(member)

# [PUT]


@membersApp.route("/<id>", methods=["PUT"])
def update_one_members(id):
    obj = request.json
    stat = members_bll.update_one_member(id, obj)
    return jsonify(stat)

# [POST]


@membersApp.route("/", methods=["POST"])
def add_member():
    member = request.json

    if ('Email' in member) and ('Name' in member) and ('City' in member):
        stat = members_bll.add_member(member)
        return jsonify(stat)
    else:
        return jsonify("missing member`s data")


# [DELETE]
@membersApp.route("<id>", methods=["DELETE"])
def delete_members(id):
    stat = members_bll.delete_member(id)
    return jsonify(stat)
