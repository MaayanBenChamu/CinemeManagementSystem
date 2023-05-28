from ast import If, Subscript
from tkinter import N
from DAL.Members import Members_DB
from DAL.Subscriptions import Subscriptions_DB
from DAL.Movies import Movies_DB


class Members_BLL:
    def __init__(self):
        self.__members_db = Members_DB()
        self.__movies_db = Movies_DB()
        self.__subs_db = Subscriptions_DB()
# [GET]

    def get_all_members(self):
        members = self.__members_db.get_all_members()
        return members

    def get_member_by_id(self, id):
        # get the member data
        member = self.__members_db.get_member_by_id(id)

        # get subscriptions by member id
        subs = self.__subs_db.get_subscriptions_by_members_id(id)

        # check if the member has any movies that he`s subscribed to
        if subs == None:
            return member
        
        if not subs["Movies"]:
            return member

        
        moviesList = []
        # get the movie name from the 'Movies' array that the member subs to.
        for mov in subs["Movies"]:
            movieData = self.__movies_db.get_movie_by_id(mov["movieId"])

            #  organize the relevant data
            obj = {
                "date" : mov["date"],
                "movieName" : movieData["Name"],
                "_id" : movieData["_id"]
            }
            # push to the movies list 
            moviesList.append(obj)

        member["Movies"] = moviesList

        return member

# [PUT]
    def update_one_member(self, id, obj):

        # set the member object parameters
        member = {
            "Name": obj["Name"],
            "Email": obj["Email"],
            "City": obj["City"]
        }

        stat = self.__members_db.update_one_member(id, member)
        return stat

# [POST]
    def add_member(self, obj):
        member = {
            "Name": obj["Name"],
            "Email": obj["Email"],
            "City": obj["City"]
        }
        stat = self.__members_db.add_member(member)
        return stat

# [DELETE]
    def delete_member(self, id):
        subsStat = self.__subs_db.delete_subs_by_member_id(id)
        stat = self.__members_db.delete_member(id)
        return stat + subsStat

# m = members_BLL()
# print(m.get_all_members())
