const express = require("express");
const app = express();
const ejs = require("ejs");
const session = require("express-session");

const indexRoute = require("./routes/indexRoute");

//MIDDLEWARE
app.set('view engine', 'ejs');
app.use(
  session({
    secret: "A",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public'));

app.use(indexRoute)


app.listen(3000, () => {
  console.log("Frontend-server startet på port 3000");
});
