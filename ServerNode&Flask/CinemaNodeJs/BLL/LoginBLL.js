const UserModel = require("../models/UsersModel");

const getAllUsersNames = async () => {
  const usersNames = await UserModel.find({})
  return usersNames
}
const getOneUsername = async (name) => {
    const user = await UserModel.findOne({username : name})
    return user
}
const getOneUsernameByID = async (id) => {
    const {username} = await UserModel.findById(id)
    return username
}
const checkIfUserNameExist = async (name) => {
  const check = await UserModel.findOne({username : name})
  if(check){
    return "exist"
    
}
  return "notexist"
}

const addUserNameToDB = async (name) => {
  // Add userName to dataBase users
  const userDB = { username: name , password: ""};
  const user = new UserModel(userDB);
  await user.save();

  // Get the ObjectId from the user that has been added to the DB
  const userWithID = await UserModel.findOne(userDB);

  return userWithID;
};

const updateUserNameInDB = async (id, userName) => {
  await UserModel.findByIdAndUpdate(id, { username: userName });
};

const addPasswordToUserInDB = async (name,password) => {
  await UserModel.findOneAndUpdate({username: name}, { password: password })
};

const deleteUserNameInDB = async (id) => {
    await UserModel.findByIdAndDelete(id);
}




module.exports = {
  checkIfUserNameExist,
  getOneUsernameByID,
  getOneUsername,
  addUserNameToDB,
  updateUserNameInDB,
  addPasswordToUserInDB,
  deleteUserNameInDB,

};
