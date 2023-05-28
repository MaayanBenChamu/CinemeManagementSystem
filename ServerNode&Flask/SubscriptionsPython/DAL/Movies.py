from pymongo import MongoClient
from bson import ObjectId


class Movies_DB:
    def __init__(self):
        self.__Client = MongoClient('localhost', 27017)
        self.__DB = self.__Client['SubscriptionsDB']
        self.__Movies_Coll = self.__DB['Movies']

# GET
    def get_all_movies(self):
        movies = list(self.__Movies_Coll.find({}))
        return movies

    def get_movie_by_id(self, id):
        movie = self.__Movies_Coll.find_one({"_id": ObjectId(id)})
        return movie

# PUT
    def update_one_movie(self, id, obj):
        self.__Movies_Coll.update_one({"_id": ObjectId(id)}, {"$set": obj})
        return "The movie has been updated successfully"

# POST:
    def add_movie(self, obj):
        self.__Movies_Coll.insert_one(obj)
        return "The new movie has been added successfully"

# DELETE:
    def delete_movie(self, id):
        self.__Movies_Coll.delete_one({"_id" : ObjectId(id)})
        return "The movie has been deleted"
