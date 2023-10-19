const AnnonceModel = require('../Modals/AnnonceSchema');

exports.CompareCheck = async (req, res, next) => {
    const userid = req.userid;
    const AnnonceId = req.params.id; 

    console.log('this is user id ',userid );
    try {
        const annonce = await AnnonceModel.findById(AnnonceId);
        if (userid === annonce.userId.toString()) {
            next();
        } else {
            console.log('')
            return res.status(403).json({ message: 'Access denied. You are not authorized' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error while checking authorization.' });
    }
};