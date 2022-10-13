const Publication = require('../models/Publication');
const fs = require('fs');

// Création de post
exports.createPublication = (req, res, next) => {

    const publicationObject = JSON.parse(req.body.publication);

    delete publicationObject._id;

    delete publicationObject.userId;

    const publication = new Publication({
        ...publicationObject,
        userId: req.auth.userId,
        author: req.auth.userId,
    });

    if (req.file && req.file.filename) {
        publication.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }

    publication.save()
    .then(() => {
        res.status(201).json({ message: "Objet enregistré !" })
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json({ error });
    })
};

//Obtenir un post
exports.getOnePublication = (req, res, next) => {

    Publication.findOne({
        _id: req.params.id
    })
    .then(
        (publication) => {
            res.status(200).json(publication);
        }
    )
    .catch(
        (error) => {
            res.status(404).json({ error: error });
        }
    );
};

//Modifier un post
exports.modifyPublication = (req, res, next) => {

    const publicationObject = req.file ? {
        ...JSON.parse(req.body.publication),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } 
    : { ...req.body };

    delete publicationObject._userId;

    Publication.findOne({ _id: req.params.id })
    .then((publication) => {

        if (publication.userId != req.auth.userId && !req.auth.isAdmin) {
            res.status(401).json({ message: 'Non-autorisé' });
        } 
        else {

            if (req.file && publication.imageUrl) {

                const filename = publication.imageUrl.split('/images/')[1];

                fs.unlink(`images/${filename}`, () => {
                    Publication.updateOne({ _id: req.params.id }, { ...publicationObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                    .catch(error => res.status(401).json({ error }));
                })
            } 
            else {

                Publication.updateOne({ _id: req.params.id }, { ...publicationObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                .catch(error => res.status(401).json({ error }));
            }
        }
    })
    .catch((error) => {

        console.log(error);

        return res.status(400).json({ error });
    });
};

//Supprimer un post
exports.deletePublication = (req, res, next) => {

    Publication.findOne({ _id: req.params.id })
    .then(publication => {

        if (publication.userId != req.auth.userId && !req.auth.isAdmin ) {

            res.status(401).json({ message: 'Non-autorisé' });
        } 
        else {

            const filename = publication.imageUrl.split('/images/')[1];

            fs.unlink(`images/${filename}`, () => {

                Publication.deleteOne({ _id: req.params.id })
                .then(() => {

                    res.status(200).json({ message: 'Objet supprimé !' })
                })
                .catch(error => 
                    
                    res.status(401).json({ error }));
            });
        }
    })
    .catch((error) => {

        return res.status(500).json({ error: error });
    });
};

//Obtenir tous les posts
exports.getAllPublication = (req, res, next) => {

    Publication.find()
    .populate({
        path: 'author',
        options: { select: "pseudo" }
    })
    .exec((err, publications) => {

        if (err) return res.status(500).send(new Error('Database error!'));
        return res.status(200).json(publications);
    });
};

//Liker un post
exports.likePublication = (req, res, next) => {

    Publication.findOne({ _id: req.params.id })
    .then(publication => {

        switch (req.body.like) {

            case 1:
                if (!(publication.usersLiked.includes(req.body.userId))) {

                    publication.likes++;

                    publication.usersLiked.push(req.body.userId);
                } 
                else {

                    return res.status(403).json({ error: "Vous avez déjà noté cette publication !" })
                }
                break;

            case 0:
                if (publication.usersLiked.includes(req.body.userId)) {

                    const userIndex = publication.usersLiked.findIndex(id => id == req.body.userId);

                    publication.usersLiked.splice(userIndex, 1);

                    publication.likes--;
                }
                break;
            
            default:

            return res.status(500).json({ error: "Une erreur inconnue est survenue !" });
        }

        Publication.updateOne({ _id: req.params.id }, publication)
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => {
        
        console.log(error);
        
        return res.status(500).json({ error })
    })
}