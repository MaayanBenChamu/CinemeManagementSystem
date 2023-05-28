from flask import Blueprint, jsonify, request
from BLL.Subscriptions  import Subscriptions_BLL

subsApp = Blueprint("subscription" , __name__)

subs_bll = Subscriptions_BLL()

# [GET]
@subsApp.route("/" , methods=["GET"])
def get_all_subscriptions():

    allSubs = subs_bll.get_all_subscriptions()
    return jsonify(allSubs)
 

@subsApp.route( "/<id>" , methods=["GET"])
def get_subscription_by_id(id):

        subscription = subs_bll.get_subscription_by_id(id)
        return jsonify(subscription)

# [PUT]
@subsApp.route("/<id>" , methods=["PUT"])
def update_one_subscriptions(id):
    obj = request.json
    stat = subs_bll.update_one_subscription(id , obj)
    return jsonify(stat)

# [POST]
@subsApp.route("/" , methods=["POST"])
def add_subscription():
    obj = request.json
    stat = subs_bll.add_subscription(obj)
    return jsonify(stat)


# [DELETE]
@subsApp.route("<id>" , methods=["DELETE"])
def delete_subs(id):
    stat = subs_bll.delete_subscription(id)
    return jsonify(stat)