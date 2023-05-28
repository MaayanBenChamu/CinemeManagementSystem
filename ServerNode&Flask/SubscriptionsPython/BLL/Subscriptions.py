from DAL.Subscriptions import Subscriptions_DB


class Subscriptions_BLL:
    def __init__(self):
        self.__subs_db = Subscriptions_DB()
# [GET]

    def get_all_subscriptions(self):
        subscriptions = self.__subs_db.get_all_subscriptions()
        return subscriptions

    def get_subscription_by_id(self, id):
        subscription = self.__subs_db.get_subscription_by_id(id)
        return subscription

# [PUT]
    def update_one_subscription(self, id, obj):

        # set the subscription object parameters
        subscription = {
            "MemberId": obj["MemberId"],
            "Movies": obj["Movies"]
        }

        stat = self.__subs_db.update_one_subscription(id, subscription)
        return stat

# [POST]
    def add_subscription(self, obj):
        member = self.__subs_db.get_subscriptions_by_members_id(obj["MemberId"])
        if member is None:
            subscription = {
                "MemberId": obj["MemberId"],
                "Movies": [
{                    "movieId" : obj["movieId"],
                    "date" : obj["date"]}
                ] 
            }
            stat = self.__subs_db.add_subscription(subscription)
            return stat
        else:
            movie = {
                "movieId" : obj["movieId"],
                "date" : obj["date"]
            }

            member["Movies"].append(movie)

            stat = self.__subs_db.update_one_subscription(member["_id"], member)
            return stat




# [DELETE]
    def delete_subscription(self, id):
        stat = self.__subs_db.delete_subscription(id)
        return stat

# m = subscriptions_BLL()
# print(m.get_all_subscriptions())
