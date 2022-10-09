const User = require('../models/User');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');

const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(8)                                    // Minimum 8 caractères
    .is().max(100)                                  // Maximum 100 caractères
    .has().uppercase()                              // Doit contenir au moins une majuscule
    .has().lowercase()                              // Doit contenir au moins une minuscule
    .has().digits()                                // Doit avoir au moins un chiffre
    .has().not().spaces()                           // Ne doit pas avoir d'espaces

exports.signup = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password) || !emailValidator.validate(req.body.email)) {
        return res.status(400).json({ error: "Email ou mot de passe non-valide" })
    } else {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash,
                    pseudo: req.body.pseudo
                });
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    }
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userId: user._id,
                    userPseudo: user.pseudo,
                    token: jwt.sign(
                        { userId: user._id },
                        process.env.JWT_SECRET,
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}

exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.clearCookie('jwt');
    res.status(200).json({message:'Réussi'});
}