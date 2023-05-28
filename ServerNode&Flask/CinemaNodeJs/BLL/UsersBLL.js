const usersFile = require("../DAL/UsersFile");
const loginBLL = require("./LoginBLL");
const premBLL = require("./PermissionsBLL");

// GET:
const getAllUsers = async () => {
  const Users = await usersFile.getAllUsers();

  const newUsers = Users?.map(async (user, index) => {
    const Allprems = await premBLL.getAllPermissions();
    const uName = await loginBLL.getOneUsernameByID(user.id);

    return (UserObj = {
      ...user,
      permissions: Allprems[index].permissions,
      username: uName,
    });
  });
  const allUsers = await Promise.all(newUsers);
  return allUsers;
};

const getUserById = async (uId) => {
  //Get the existing users data from the users json file
  const existUsers = await usersFile.getAllUsers();

  // Get the username from the DB by its ID
  const uName = await loginBLL.getOneUsernameByID(uId);

  // Get all the user permissions
  const prems = await premBLL.getPremissionById(uId)
  // Find the user Index by its id
  const index = existUsers.findIndex((u) => u.id === uId);

  if (index === -1) return "no user found";
  const newuser = { ...existUsers[index],
    permissions: prems.permissions,
    username: uName,
   };

  return newuser;
};

// PUT:
const updateUser = async (uId, userObj) => {
  //Get the existing users data from the users json file
  const existUsers = await usersFile.getAllUsers();

  // Update username in DataBase
  await loginBLL.updateUserNameInDB(uId, userObj.username);

  // Update the premissions in its json file
  const premStat = await premBLL.updatePremissions(uId, {
    permissions: userObj.permissions,
  });

  // Find the user Index by its id
  const index = existUsers?.findIndex((user) => user.id === uId);

  // Remove irrelevant data from json Object
  delete userObj.username;
  delete userObj.permissions;

  // Change the user object in the exist Users array
  const user = { id: uId, ...userObj };
  existUsers[index] = user;

  // Update the user in jsonFile
  await usersFile.addUser(existUsers);

  // Return status
  return `User updated and ${premStat}`;
};

// POST:
const addNewUser = async (newUser) => {
  //Get the existing users data from the users json file
  const existUsers = await usersFile.getAllUsers();

  // Add userName to the users collection in DB and Get Its ObjectId
  const userWithID = await loginBLL.addUserNameToDB(newUser.username);

  // Creat object with the relevent data for the usersJson
  const userForUsersJson = {
    id: userWithID._id,
    FirstName: newUser.FirstName,
    LastName: newUser.LastName,
    CreateDate: newUser.CreateDate,
  };

  // Add the premissions arr to the premissionJson file
  const premStat = await premBLL.addNewPremission(
    userWithID._id,
    newUser.permissions
  );

  //Append the user data
  existUsers?.push(userForUsersJson);

  //Save the newUser
  await usersFile.addUser(existUsers);

  // Return status
  return `User Added and ${premStat}`;
};

// DELETE:
const deleteUser = async (uId) => {
  //Get the existing users data from the users json file
  const existUsers = await usersFile.getAllUsers();

  // Find the user Index by its id
  const index = existUsers.findIndex((u) => u.id === uId);
  if (index === -1) return "no user found";

  // Remove the user object from the users json file
  existUsers.splice(index, 1);

  // Remove the premissions related to the user from premissions json file
  const premStat = await premBLL.DeletePremissions(uId);

  // Delete userName from data-base
  await loginBLL.deleteUserNameInDB(uId);

  await usersFile.addUser(existUsers);
  return `user deleted and ${premStat}`;
};

module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUser,
  deleteUser,
};
