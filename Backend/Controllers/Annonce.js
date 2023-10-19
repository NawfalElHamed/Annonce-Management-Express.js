

const { AnnonceService } = require('../Services/annonceServices');
const { AnnonceRepository } = require('../Repo/AnnonceRepo')
const AnnounceSchema = require('../Modals/AnnonceSchema')


const AnnonceRepo = new AnnonceRepository(AnnounceSchema)

const annonceServ = new AnnonceService(AnnonceRepo)

exports.Create = async (req, res) => {
  const annonce = await annonceServ.Create(req)
  res.json(annonce)
}

exports.ShowAnnoncesByUserId = async (req, res) => {
  const annonce = await annonceServ.ShowAnnoncesByUserId(req);
  console.log('this is annonce', annonce);
  res.json(annonce);
};

exports.deleteAnnonce = async (req, res) => {
  try {
    annonceServ.deleteAnnonce(req).then(() => {
      res.json({ message: 'annonce deleted successfully.' });
    })
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
}

exports.editAnnonce = async (req, res) => {
  try {
      const updatedAnnonce = await annonceServ.updateAnnonce(req);

      res.status(200).json(updatedAnnonce);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }