const router = require("express").Router();

router.get("/", async (req, res) => {
  if (req.session.userId) {
    const response = await fetch("http://localhost:3001/api/ideas");
    const {randomIdea, userOfIdea} = await response.json();

    res.render("index", { loggedIn: true, randomIdea, userOfIdea });
  } else {
    res.render("index", { loggedIn: false });
  }
});

router.get("/signup", (req, res) => {
    if (req.session.userId) {
      res.redirect("/");;
    } else {
      res.render("signup", { loggedIn: false });
    }
  });


router.get("/login", (req, res) => {
    if (req.session.userId) {
      res.redirect("/");;
    } else {
      res.render("login", { loggedIn: false });
    }
  });

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        req.session.userId = data.userId;
        console.log(req.session.userId)
        res.redirect('/');
      } else {
        res.status(401).send('Ugyldig brukernavn eller passord');
      }
    });
})

router.post("/signup", (req, res) => {
    const { username, password } = req.body;
    fetch('http://localhost:3001/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        res.redirect('/login');
      } else {
        res.status(401).send('Ugyldig brukernavn eller passord');
      }
    });
})

module.exports = router;
