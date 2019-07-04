import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//
//  Services
//
import Api from '../../Services/Api';

//
//  Styles
//
import './styles.css';

export default class Register extends Component {

    //
    //  Constructor
    //
    constructor(props){
        super(props);
        this.state = {
            nome:'',
            canal:'email',
            valor:'',
            obs:'',
            placeValor:'Seu email'
        }
    }

    //
    //  Change events
    //
    handleChanges = e => {
        this.setState({ [e.target.name] : e.target.value })
        if ( e.target.name === "canal" ){
            this.setState({ placeValor: 'Seu ' + e.target.value })
        }
    };

    //
    //  Submit
    //
    handleSubmit = async e => {
        e.preventDefault();
        const { nome, canal, valor, obs } = this.state;
        const newUser = {nome, canal, valor, obs};
        try{
            await Api.postContato(newUser);
            this.props.history.push('/');
        } catch(err) {
            console.log(err);
        }
    }

    //
    //  Render
    //
    render() {
        return (
           <div className="page">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-6 col-md-offset-3">
                            <div className="boxRegister">
                                <header>
                                    <h2>Registro</h2>
                                    <Link to={`/`} className="back"><span>Home</span></Link>
                                </header>
                                <div className="content">
                                    <form onSubmit={this.handleSubmit}>
                                        <fieldset>
                                            <legend>Registro</legend>
                                            <div className="formGroup">
                                                <input type="text" name="nome" value={this.state.nome} placeholder="Nome" onChange={this.handleChanges} />
                                            </div>
                                            <div className="formGroup">
                                                <span className="sStl">
                                                    <select name="canal" value={this.state.canal} onChange={this.handleChanges} >
                                                        <option value="email">E-mail</option>
                                                        <option value="celular">Celular</option>
                                                        <option value="fixo">Telefone fixo</option>
                                                    </select>
                                                </span>
                                            </div>
                                            <div className="formGroup">
                                                <input type="text" name="valor" value={this.state.valor} onChange={this.handleChanges} placeholder={this.state.placeValor} />
                                            </div>
                                            <div className="formGroup">
                                                <input type="text" name="obs" value={this.state.obs} onChange={this.handleChanges} placeholder="Observações" />
                                            </div>
                                            <div className="formGroup">
                                                <button type="submit">Criar conta</button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}