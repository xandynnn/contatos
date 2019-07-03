import axios from 'axios';

const apis = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

// Users
export const postContato = ( user ) => apis.post( 'contato', user );
export const getContatos = () => apis.get('contato');
// export const auth = ( user ) => apis.post('auth/authenticate', user );
// export const getUserById= (id) => apis.get(`auth/users/${id}`);
// export const delUser = ( id ) => apis.delete('user/' + id);


const Api = {
	getContatos,
	postContato
}

export default Api;
