const express = require("express")
const ObjectID = require('mongodb').ObjectID
const bll = require("../BLL/LoginBLL");
const userBll = require("../BLL/UsersBLL")
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/:name", async (req, res) => {
  const { name } = req.params;

  const user = await bll.getOneUsername(name);
  if (user) {
    res.json(user);
  } else {
    res.json(`username: ${username} not exist`);
  }
});

router.post("/", async (req, res) => {
  // get the username and the password from the request
  const { username, password } = req.body;

  // check if theres a user with that username in the DB
  // if there is a user, save it inside the user variable
  const user = await bll.getOneUsername(username);

  // if there is no user with that username, return an error
  if (user === null) {
    res.status(404).send({ message: "username not found." });

    // check if the user has selected password yet
  } else if (user.password === "") {
    res.status(404).send({
      message: `The user has not yet chosen a password,
      Please go to the registration page`,
    });

    // check the user password with the password from the request body
  } else if (!(user.password === password)) {
    res.status(404).send({ message: "Invalid Password." });
  } else {
    // otherwise, return a web token created by JWT and return the users data
    const myObjectIdString = user._id.toString()
    const userData = await userBll.getUserById(myObjectIdString)

    const token = jwt.sign(
      { username: user.username, id: user._id , role: userData},
      "cinema123"
      //   ,
      //   { expiresIn: 30 }
    );


    res.json({ token });
  }
});
router.post("/verify", (req, res) => {
  const { token } = req.body;

  if (!token) res.status(404).send({ auth: false, msg: "no token provided" });

  jwt.verify(token, "cinema123", (err, decodedToken) => {
    if (err) res.status(401).send({ auth: false, msg: "Invalid Token" });

    res.status(200).send({ auth: true, token: decodedToken });
  });
});

router.put("/signup", async (req, res) => {
  // get the username and the password from the request
  const { username, password } = req.body;

  // check if theres a user with that username in the DB
  // if there is a user, save it inside the user variable
  const user = await bll.getOneUsername(username);

  // if there is no user with that username, return an error
  if (user === null) {
    res.status(404).send({ message: "username not found." });

    // check if the user has selected password yet
  } else if (!(user.password === "")) {
    res.status(401).send({
      message: `A password already exists for this user,
      Please go to the login page`,
    });
  } 
    // Update the password for the username
    await bll.addPasswordToUserInDB(username, password);

    // return a web token created by JWT
    const token = jwt.sign(
      { username: user.username, id: user._id },
      "cinema123"
      //   ,
      //   { expiresIn: 30 }
    );

    res.json({ token });
  
});
module.exports = router;
