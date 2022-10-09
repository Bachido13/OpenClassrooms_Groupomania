const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const rateLimit = require('express-rate-limit');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const userCtrl = require('../controllers/user')

const passLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // Temps défini (en minutes) pour tester l'application
    max: 3 
  });

//auth
router.post("/signup", authCtrl.signup);//s'inscrire
router.post('/login', passLimiter, authCtrl.login);//se connecter
router.get('/logout', auth, authCtrl.logout);//se déconnecter

//user
router.get('/', auth, multer, userCtrl.getAllUsers);//voir liste des utilisateurs
router.get('/:id', auth, multer, userCtrl.userInfo);// voir infos d'un utilisateur(profil)
router.put('/:id', auth, multer,userCtrl.updateUser);//modifier un utilisateur
router.delete('/:id', auth, userCtrl.deleteUser);//supprimer un utilisateur


module.exports = router;