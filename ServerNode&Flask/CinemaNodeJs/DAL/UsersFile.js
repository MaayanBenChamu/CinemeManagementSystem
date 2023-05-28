const jsonfile = require("jsonfile")

const UsersFile = "./data/Users.json"

const getAllUsers = async () => {
    return jsonfile.readFile(UsersFile)
}

const addUser = async (obj) => {
    await jsonfile.writeFile(UsersFile, obj)
}

module.exports = { getAllUsers, addUser}