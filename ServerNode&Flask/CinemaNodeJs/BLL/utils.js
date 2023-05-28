const UserModel = require("../models/UsersModel");
const PremissionsBLL = require("./PermissionsBLL");

// User login functions
const getAllUsersNames = async () => {
  const usersNames = await UserModel.find({})
  return usersNames
}

const checkIfUserNameExist = async (name) => {
  const check = await UserModel.findOne({username : name})
  return check
}

// USERS FILE FUNCTIONS:

const addUserNameToDB = async (name) => {
  // Add userName to dataBase users
  const userDB = { username: name };
  const user = new UserModel(userDB);
  await user.save();

  // Get the ObjectId from the user that has been added to the DB
  const userWithID = await UserModel.findOne(userDB);

  return userWithID;
};

const updateUserNameInDB = async (id, userName) => {
  await UserModel.findByIdAndUpdate(id, { username: userName });
};

const deleteUserNameInDB = async (id) => {
    await UserModel.findByIdAndDelete(id);
}
// PREMISSIONS FILE FUNCTIONS:

const updatePremissions = async (pId, pObj) => {
  //Get the existing premissions data from the json file
  const existPremissions = await PremissionsBLL.getAllPermissions();

  // Find the premission Index by the id
  const index = existPremissions?.findIndex((prem) => prem.id === pId);

  // Change the user object in the exist Users array
  const prem = { id: pId, ...pObj };
  existPremissions[index] = prem;

  // Update the premissions in jsonFile
  await PremissionsBLL.addNewPremission(existPremissions);
  return "Premissions updated";
};

const addNewPremission = async (userIs, arr) => {
  //Get the existing premissions data from the json file
  const existPremissions = await PremissionsBLL.getAllPermissions();

  // Creat object with the relevent data for the premissionsJson
  const premissionsForJson = {
    id: userIs,
    premissions: arr,
  };

  //Append the premissions data
  existPremissions?.push(premissionsForJson);

  //Save the newUser
  const status = await PremissionsBLL.addNewPremission(existPremissions);
  return status;
};

const DeletePremissions = async (pId) => {
  //Get the existing premissions data from the json file
  const existPremissions = await PremissionsBLL.getAllPermissions();

    // Find the premission Index by the id
    const index = existPremissions?.findIndex((prem) => prem.id === pId);
    if(index === -1) return "no premissions found"

    // Remove premissions from the premissions array
    existPremissions.splice(index,1)

    // Rewrite permissions json File without the delete permission
     await PremissionsBLL.addNewPremission(existPremissions)

     return "Premission deleted"

};

module.exports = {
  checkIfUserNameExist,


  addUserNameToDB,
  updateUserNameInDB,
  deleteUserNameInDB,

  addNewPremission,
  updatePremissions,
  DeletePremissions,
};
