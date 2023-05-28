from Routers.Movies import moviesApp
from Routers.Members import membersApp
from Routers.Subscriptions import subsApp

from flask import Flask
import json
from bson import ObjectId
from flask_cors import CORS


class JSONEncoder(json.JSONEncoder):
    def default(self,obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return json.JSONEncoder.default(self,obj)


app = Flask(__name__)

CORS(app ,supports_credentials=True)
app.json_encoder = JSONEncoder

app.register_blueprint(moviesApp, url_prefix="/movies")
app.register_blueprint(membersApp, url_prefix="/members")
app.register_blueprint(subsApp, url_prefix="/subscriptions")

app.run(debug=True)