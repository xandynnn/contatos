import React, { Component } from 'react'
import Api from '../../Services/Api';

//
//  Styles
//
import './styles.css';

//
//  Images
//
import boy from './../../Assets/boy.svg';

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            contatos:[]
        }
    }

    componentWillMount(){
        this.loadContatos();
    }

    loadContatos = () => {
        Api.getContatos().then(res=>{
            this.setState({
                isLoading:false,
                contatos: res.data.contatos
            })
        })
    }

    render() {
        return (
            <div className="page">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="pageHeader">
                                <h1>Home</h1>
                            </div>
                        </div>

                        {
                            this.state.contatos.map(contato=>(
                                <div className="col-xs-12 col-md-6">
                                    <div className="card" key={contato._id}>
                                        <figure>
                                            <img src={boy} alt={contato.nome} />
                                        </figure>
                                        <div className="info">
                                            <h2>{contato.nome}</h2>
                                            <p><strong>{contato.canal}:</strong> {contato.valor}</p>
                                            <div className="descricao">
                                                <p>{contato.obs}</p>
                                            </div>
                                        </div>
                                        <div className="actions">
                                            <button className="edit"><span>Editar</span></button>
                                            <button className="remove"><span>Remover</span></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
    
                    </div>
                </div>
            </div>
        )
    }
}
