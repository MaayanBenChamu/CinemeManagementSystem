from pymongo import MongoClient
from bson import ObjectId


class Members_DB:
    def __init__(self):
        self.__Client = MongoClient('localhost', 27017)
        self.__DB = self.__Client['SubscriptionsDB']
        self.__Members_Coll = self.__DB['Members']

# GET
    def get_all_members(self):
        members = list(self.__Members_Coll.find({}))
        return members

    def get_member_by_id(self, id):
        member = self.__Members_Coll.find_one({"_id": ObjectId(id)})
        return member

# PUT
    def update_one_member(self, id, obj):
        self.__Members_Coll.update_one({"_id": ObjectId(id)}, {"$set": obj})
        return "The member has been updated successfully"

# POST:
    def add_member(self, obj):
        self.__Members_Coll.insert_one(obj)
        return "The new member has been added successfully"

# DELETE:
    def delete_member(self, id):
        self.__Members_Coll.delete_one({"_id" : ObjectId(id)})
        return "The member has been deleted"
