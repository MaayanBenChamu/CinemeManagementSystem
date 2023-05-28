from cmath import log
from re import sub
from DAL.Movies import Movies_DB
from DAL.Subscriptions import Subscriptions_DB
from DAL.Members import Members_DB


class Movies_BLL:
    def __init__(self):
        self.__movies_db = Movies_DB()
        self.__subs_db = Subscriptions_DB()
        self.__members_db = Members_DB()

# [GET]

    def get_all_movies(self):
        movies = self.__movies_db.get_all_movies()
        return movies

    def get_movie_by_id(self, id):
        # get the movie data
        movie = self.__movies_db.get_movie_by_id(id)

        # get subscriptions by movie id
        subs = self.__subs_db.get_subscriptions_by_movie_id(id)

        # check if the movies has any members subscribed
        if subs == None:
            return movie

        membersList = []
        # get the movie name from the 'Movies' array that the member subs to.
        for mem in subs:
            memberData = self.__members_db.get_member_by_id(mem["MemberId"])



            for m in mem["Movies"]:
                
                if m["movieId"] == id:
                    memberData["date"] = m["date"]

            # push to the movies list
            membersList.append(memberData)

        movie["Members"] = membersList

        return movie

# [PUT]
    def update_one_movie(self, id, obj):

        # set the movie object parameters
        movie = {
            "Genres": obj["Genres"],
            "Image": obj["Image"],
            "Name": obj["Name"],
            "Premiered": obj["Premiered"]
        }

        stat = self.__movies_db.update_one_movie(id, movie)
        return stat

# [POST]
    def add_movie(self, obj):
        movie = {
            "Genres": obj["Genres"],
            "Image": obj["Image"],
            "Name": obj["Name"],
            "Premiered": obj["Premiered"]
        }

        stat = self.__movies_db.add_movie(movie)
        return stat

# [DELETE]
    def delete_movie(self, id):
        subscriptions = self.__subs_db.get_subscriptions_by_movie_id(id)

        subsStat = ""
        if subscriptions == None:
            subsStat = "no subs"

        for subs in subscriptions:
            index = -1
            # Find the mov Index by its id
            for i in range(len(subs["Movies"])):
                if subs["Movies"][i]['movieId'] == id:
                    index = i
                break

            # Remove irrelevant data from json Object
            subs["Movies"].pop(index)

            # Change the subscriptions in db
            stat = self.__subs_db.update_one_subscription(subs["_id"] , subs)
            subsStat = stat

        # Delete the movie from the movieDB
        stat = self.__movies_db.delete_movie(id)
        print(subsStat)
        return stat 

# m = Movies_BLL()
# print(m.get_all_movies())
