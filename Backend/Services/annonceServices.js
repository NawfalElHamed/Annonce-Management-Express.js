class AnnonceService {
    constructor(AnnonceRepo) {
        this.AnnonceRepo = AnnonceRepo;
    }

    async Create(req) {
        try {
            const response = {};

            const { Title, Type, MinSalary, MaxSalary, Country, userId } = req.body;

c    
            if (!Title || !Type || !MinSalary || !MaxSalary || !Country || !userId) {
                throw new Error('Missing required fields');
            }
    
            const NewAnnounce = {
                userId, 
                Title,
                Type,
                MinSalary,
                MaxSalary,
                Country,
            };
    
            const announce = await this.AnnonceRepo.Create(NewAnnounce);
            return announce;
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    }


    async ShowAnnoncesByUserId(req) {
        const userId = req.userid; 
        const annonce = await this.AnnonceRepo.ShowAnnoncesByUserId(userId);

        return annonce;
    }

    async deleteAnnonce(req) {
        const {id} = req.params
        const deletedAnnonce = await this.AnnonceRepo.deleteAnnonce({_id:id})
        return deletedAnnonce;
      }
    
      async updateAnnonce(req) {
        const {id} = req.params
        console.log('id:', req.body);
        const updatedAnnonce = await this.AnnonceRepo.Edit(id, req.body);
        return updatedAnnonce;
      }


}


module.exports = { AnnonceService };
