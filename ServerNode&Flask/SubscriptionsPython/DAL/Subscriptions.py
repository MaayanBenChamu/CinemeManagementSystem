from pymongo import MongoClient
from bson import ObjectId


class Subscriptions_DB:
    def __init__(self):
        self.__Client = MongoClient('localhost', 27017)
        self.__DB = self.__Client['SubscriptionsDB']
        self.__Subs_Coll = self.__DB['Subscriptions']

# GET

    def get_all_subscriptions(self):
        subscriptions = list(self.__Subs_Coll.find({}))
        return subscriptions

    def get_subscription_by_id(self, id):
        subscription = self.__Subs_Coll.find_one({"_id": ObjectId(id)})
        return subscription

    def get_subscriptions_by_members_id(self, id):
        subscription = self.__Subs_Coll.find_one({"MemberId": id})
        return subscription

    def get_subscriptions_by_movie_id(self, id):
        Subscriptions = list( self.__Subs_Coll.find({ "Movies": { "$elemMatch": { "movieId": id } } }))
        return Subscriptions

# PUT
    def update_one_subscription(self, id, obj):
        self.__Subs_Coll.update_one({"_id": ObjectId(id)}, {"$set": obj})
        return "The subscription has been updated successfully"

# POST:
    def add_subscription(self, obj):
        self.__Subs_Coll.insert_one(obj)
        return "The new subscription has been added successfully"

# DELETE:
    def delete_subscription(self, id):
        self.__Subs_Coll.delete_one({"_id": ObjectId(id)})
        return "The subscription has been deleted"
        
    def delete_subs_by_member_id(self, id):
        self.__Subs_Coll.delete_one({"MemberId": id})
        return "The member subscription has been deleted"

