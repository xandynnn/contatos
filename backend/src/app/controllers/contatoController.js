const express = require('express');
const router = express.Router();

const Contato = require('../models/Contato');

router.get('/', async (req,res) => {

    let { page, size } = req.query;
    ( !page ) ? page = 0 : null;
    ( !size ) ? size = 10 : null;
    
    const skip = size * page;
    const limit = Number(size);

    try {
        const total = await Contato.countDocuments();
        const contatos = await Contato.find(null,null,{ skip }).limit(limit);
        const paginas = Math.ceil(total / limit);
        return res.send({ contatos, total, paginas });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Erro ao carregar os contatos' });
    }
});

router.get('/:id', async (req,res) => {
   
    try {
        const contato = await Contato.findById(req.params.id);
        return res.send({ contato });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao carregar o contato' });
    }

});

router.post('/', async (req,res) => {

    try {
        const contato = await Contato.create({ ...req.body });
        return res.send({ contato });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Erro ao criar um novo contato' });
    }

});

router.put('/:id', async (req,res) => {

    try {
        const { nome, canal, valor, obs } = req.body;
        const contato = await Contato.findByIdAndUpdate(req.params.id,{ nome, canal, valor, obs }, { new: true });
        await contato.save();
        return res.send({ contato });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao atualizar o contato' });
    }

});

router.delete('/:id', async (req,res) => {
    
    try {
        await Contato.findByIdAndRemove(req.params.id);
        return res.send({ msg: 'Contato removido com sucesso'});
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao deletar o contato' });
    }

});

module.exports = app => app.use('/contato', router );
