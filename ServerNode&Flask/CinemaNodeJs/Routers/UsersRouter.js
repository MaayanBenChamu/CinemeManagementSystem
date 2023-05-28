const express = require("express");
const bll = require("../BLL/UsersBLL");

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await bll.getAllUsers();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Get one user by id
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await bll.getUserById(userId);
  res.json(user);
});
// Update user
router.put("/:userId", async (req, res) => {
  // Get the user ID
  const { userId } = req.params;

  // Get the user data from put request
  const newUserData = req.body;

  // Check if newUser fields are missing
  if (
    newUserData.FirstName == null ||
    newUserData.LastName == null ||
    newUserData.CreateDate == null ||
    newUserData.username == null ||
    newUserData.permissions == null
  ) {
    return res.status(401).send({ error: true, msg: "User data missing" });
  }
  // Get the existing users data
  const existUsers = await bll.getAllUsers();

  const userExist = existUsers?.find((user) => user.id === userId);
  if (!userExist) {
    return res.status(409).send({ error: true, msg: "User is not exist" });
  }

  const status = await bll.updateUser(userId, newUserData);
  res.json(status);
});

// Craete new user
router.post("/", async (req, res) => {
  // Get the existing users data
  const existUsers = await bll.getAllUsers();

  // Get the new user object from post request
  const newUser = req.body;

  // Check if newUser fields are missing
  if (
    newUser.FirstName == null ||
    newUser.LastName == null ||
    newUser.CreateDate == null ||
    newUser.username == null ||
    newUser.permissions == null
  ) {
    return res.status(401).send({ error: true, msg: "User data missing" });
  }
  //   Check if newUser already exist
  const userExist = existUsers?.find(
    (user) => user.username === newUser.username
  );

  if (userExist)
    return res.status(409).send({ error: true, msg: "UserName already exist" });

  //get and return the status
  const stat = await bll.addNewUser(newUser);
  res.json(stat);
});

// DELETE user
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  const status = await bll.deleteUser(userId);
  res.json(status);
});
module.exports = router;
