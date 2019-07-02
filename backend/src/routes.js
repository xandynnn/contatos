const routes = require('express').Router();

routes.get('/', async (req,res) => {
    return res.send({
		name: 'API Contatos',
		info:{
			title: 'Contato',
			description: 'API para um serviço de gestão de contatos',
			license:{
				name: 'MIT License',
				url: 'https://opensource.org/licenses/MIT'
			},
			version: '1.0.0'
		},
		urls:{
			get: `${process.env.APP_URL}/contato`
		}
	});
});

module.exports = routes;
