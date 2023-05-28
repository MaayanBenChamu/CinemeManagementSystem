from flask import Blueprint, jsonify, request
from BLL.Movies  import Movies_BLL


moviesApp = Blueprint("movies" , __name__)

movies_bll = Movies_BLL()

# [GET]
@moviesApp.route("/" , methods=["GET"])
def get_all_movies():

    allMovies = movies_bll.get_all_movies()
    return jsonify(allMovies)
 

@moviesApp.route( "/<id>" , methods=["GET"])
def get_movie_by_id(id):

        movie = movies_bll.get_movie_by_id(id)
        return jsonify(movie)

# [PUT]
@moviesApp.route("/<id>" , methods=["PUT"])
def update_one_movies(id):
    obj = request.json
    stat = movies_bll.update_one_movie(id , obj)
    return jsonify(stat)

# [POST]
@moviesApp.route("/" , methods=["POST"])
def add_movie():
    obj = request.json
    stat = movies_bll.add_movie(obj)
    return jsonify(stat)


# [DELETE]
@moviesApp.route("<id>" , methods=["DELETE"])
def delete_movies(id):
    stat = movies_bll.delete_movie(id)
    return jsonify(stat)