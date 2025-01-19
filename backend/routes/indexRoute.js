const router = require("express").Router();
const User = require("../models/userModel"); // Changed from "user" to "User"
const Idea = require("../models/ideaModel");
const bcrypt = require("bcryptjs");

router.get("/api/ideas", async (req, res) => {
  try {
    const ideas = await Idea.find();

    const randomIndex = Math.floor(Math.random() * ideas.length);
    const randomIdea = ideas[randomIndex];

    const userOfIdea = await User.findById(randomIdea.user);

    console.log(randomIdea, userOfIdea);
    res.json({ randomIdea, userOfIdea });
  } catch (err) {
    console.log(err);
  }
});

router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ success: false });
    return;
  }

  const userFound = await User.findOne({ username }); // Updated to use "User"

  if (!userFound) {
    res.status(401).json({ success: false });
    return;
  }

  const passwordIsCorrect = await bcrypt.compare(password, userFound.password);

  if (!passwordIsCorrect) {
    res.status(401).json({ success: false });
    return;
  }

  res.json({ success: true, userId: userFound.id });
});

router.post("/api/create-idea", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    res.status(400).json({ success: false });
    return;
  }

  const userFound = await User.findById(req.session.userId); // Updated to use "User"

  if (!userFound) {
    res.status(401).json({ success: false });
    return;
  }

  const idea = new Idea({ content, user: userFound.id });

  try {
    await idea.save();
    res.json({ success: true, ideaId: idea.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

router.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ success: false });
    return;
  }

  const userFound = await User.findOne({ username }); // Updated to use "User"

  if (userFound) {
    res.status(401).json({ success: false });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Updated local variable name
  const newUser = new User({ username, password: hashedPassword });

  try {
    await newUser.save();
    res.json({ success: true });
    console.log(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
    return;
  }
});

module.exports = router;
