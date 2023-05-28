const jsonfile = require("jsonfile")

const PermissionsFile = "./data/Permissions.json"

const getAllPermissions = async () => {
    return jsonfile.readFile(PermissionsFile)
}

const addPermission = async (obj) => {
    await jsonfile.writeFile(PermissionsFile, obj)
}

module.exports = { getAllPermissions, addPermission}