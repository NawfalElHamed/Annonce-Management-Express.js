const mongoose = require('mongoose');
class AnnonceRepository {
    constructor(annonceModel) {
        this.annonceModel = annonceModel;
    }
    async Create(annonce) {
        const { Title, Type, MinSalary, MaxSalary, Country, userId } = annonce;
        const createannonce = await this.annonceModel.create({
            Title,
            Type,
            MinSalary,
            MaxSalary,
            Country,
            userId
        })
        return createannonce.populate(['userId'])

    }

    async ShowAnnoncesByUserId(userId) {
        const annonce = await this.annonceModel.find({ userId });
        return annonce;
    }
    

    async deleteAnnonce(id) {
        return this.annonceModel.deleteOne({_id:id});
      }

      async Edit(id, annonceData) {
        return this.annonceModel.findOneAndUpdate({_id:id},{$set:annonceData},{new:true});
      }


}

module.exports = { AnnonceRepository };