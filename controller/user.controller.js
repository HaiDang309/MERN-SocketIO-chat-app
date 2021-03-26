const UserModel = require("../model/user.model");

module.exports.getAllUser = async (req, res) => {
    const user = await UserModel.find();
    if (user) {
      res.status(200).json({ user });
    }
}

module.exports.getUserById = async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (user) {
    res.status(200).json({ user });
  }
};