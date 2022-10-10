const User = require("../models/User");
const ObjectID = require("mongoose").Types.ObjectId;
require("dotenv").config();
const jwt = require("jsonwebtoken");

//voir liste des utilisateurs
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
};

// voir infos d'un utilisateur(profil)
exports.userInfo = (req, res) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  User.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknow: " + err);
  }).select("-password");
};

//mettre à jour ou modifier un utilisateur
exports.updateUser = async (req, res) => { 
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const role = decodedToken.role;
  if (decodedToken.id != req.params.id && role != "ADMIN")
    return res.status(403).send("Vous n'avez pas le droit de modifier le profil");

  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          pseudo: req.body.pseudo,
          email: req.body.email,
          photo: req.body.photo
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(500).send({ message: err });
      }
    ).clone();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  if (req.auth.userId != req.params.id && !req.auth.isAdmin)
    return res.status(400).send("Vous n'avez pas le droit de supprimer cet utilisateur");

  try {
    await User.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
