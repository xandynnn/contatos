import axios from 'axios';

const apis = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

// Users
export const postContato = ( contato ) => apis.post( 'contato', contato );
export const getContatos = ( params ) => apis.get('contato' + params );
export const getContatoId= (id) => apis.get(`contato/${id}`);
export const putContato = ( id, contato ) => apis.put(`contato/${id}`, contato);
export const removerContato = ( id ) => apis.delete('contato/' + id);

const Api = {
	getContatos,
	postContato,
	getContatoId,
	putContato,
	removerContato
}

export default Api;
