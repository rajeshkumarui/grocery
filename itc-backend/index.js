import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: "https://grocery-client-phi.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

mongoose
  .connect(
    "mongodb+srv://rajesh:rajesh003@cluster0.0kqjs4v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((success) => {
    app.listen(9002, () => {
      console.log("BE started at port 9002");
      // console.log(success)
    });
    console.log("database conneceted successfully....");
  })
  .catch((error) => console.log(error));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const UserDetails = new mongoose.model("UserDetails", userSchema);

// Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserDetails.findOne({ email: email })
    .then((user) => {
      if (user) {
        console.log(user.password); 
        if (password == user.password) {
          res.send({ message: "User logged in successfully", user: user });
        } 
        else {
          res.send({ message: "password incorrect", status: 401 });
        }
      } 

      else {
        res.send({ message: "user not registered", status: 404 });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  //res.send("My api login");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  UserDetails.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.send({ message: "user already registerd" });
        console.log("user already registerd...");
      } else {
        if (!name || !email || !password) {
          return res.status(400).json({ error: "All fields are required" });
        } else {
          const user = new UserDetails({
            name,
            email,
            password,
          });
          user.save();
          res
            .status(201)
            .send({ message: "User registered successfully", data: req.body });
          // console.log("User Register Successfully...");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});