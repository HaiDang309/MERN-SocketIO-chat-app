const UserModel = require("../model/user.model");

const jwt = require("jsonwebtoken");


const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
    const { username, email, password, avatar, messages } = req.body;
    try {
      const user = await UserModel.create({
        username,
        email,
        password,
        avatar,
        messages,
      });
      res.status(201).json({ user: user._id });
    } catch (err) {
      res.status(200).send({ err });
    }
}

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge });
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(200).json({ err });
  }
};