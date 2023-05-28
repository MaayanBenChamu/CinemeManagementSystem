const express = require("express")
const cors = require("cors")
require("./configuration/database")

// create our express app 
const app = express()

// middleware
app.use(express.json())
app.use(cors())

// routers
const UserRouter = require("./Routers/UsersRouter")
const PremissionsRouter = require("./Routers/PremissionsRouter")
const LoginRouter = require("./Routers/LoginRouter")

// http://localhost:8000/api/...
app.use("/api/users", UserRouter)
app.use("/api/premissions", PremissionsRouter)
app.use("/api/login", LoginRouter)

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
})