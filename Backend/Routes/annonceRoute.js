const express = require('express');
const Router = express.Router();

const { Create, ShowAnnoncesByUserId, deleteAnnonce, editAnnonce } = require('../Controllers/Annonce');

const { TokenCheck } = require('../Middlewares/TokenCheck');
const { CompareCheck } = require('../Middlewares/CompareCheck');

Router.use(TokenCheck);

Router.post('/create', Create);
Router.get('/myannonces', ShowAnnoncesByUserId);
Router.delete('/delete/:id', CompareCheck, deleteAnnonce);
Router.put('/edit/:id', CompareCheck , editAnnonce);

module.exports = Router;
