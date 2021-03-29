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

module.exports.updateUser = async (req, res) => {
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.body.uid },
      {
        username: req.body.username,
      },
      {
        new: true,
      },
      (err, docs) => {
        if(!err) return res.json({updatedUser: docs})
        if(err) return res.status(500).json({message: err});
      }
    );
  } catch(err) {
    return res.status(500).json({message: err});
  }

};