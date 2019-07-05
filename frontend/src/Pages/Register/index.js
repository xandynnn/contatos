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
            placeValor:'Seu email',
            error:{
                nome:{
                    value:false,
                    msg:'',
                },
                canal: {
                    value:false,
                    msg:'',
                },
                valor: {
                    value:false,
                    msg:'',
                },
                obs: {
                    value:false,
                    msg:'',
                }
            }
        }
    }

    validateMin(field, min = 3){ 
        const { error, ...rest } = this.state;
        ( this.state[field].length < min ) ? error[field] = { value: true, msg: `Campo ${field} precisa ter no mín ${min} caracteres` } : error[field] = { value: false, msg: '' }
        const newState = { ...rest, error:{ ...error  } }
        this.setState({ newState  })
    }

    validateEr( field, erType ){
        const { error, ...rest } = this.state;
        let er;
        if ( erType === "email" ){
            er = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
        }else if ( erType === "celular" ){
            er = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/i;
        }else if ( "fixo" ){
            er = /^\([1-9]{2}\) (?:[2-8]|8[1-9])[0-9]{3}-[0-9]{4}$/i;
        }

        if ( rest[field].length === 0 ) {
            error[field] = { value: true, msg: `Campo ${erType} não pode ficar vazio` }
        }else{ 
            if ( !er.exec(rest[field]) ){
                error[field] = { value: true, msg: `Campo ${erType} está incorreto` }
            }else{
                error[field] = { value: false, msg: '' } 
            }
        }
        const newState = { ...rest, error:{ ...error  } }
        this.setState({ newState })
    }
 
    //
    //  Change events
    //
    handleChanges = e => {
        const fieldName = e.target.name;
        if ( fieldName === 'canal' ){
            this.setState({ placeValor: 'Seu ' + e.target.value })
        }
        this.setState({ 
            [fieldName] : e.target.value 
        }, () =>{
            
            if ( fieldName === 'nome' )
                this.validateMin(fieldName);  
            
            if ( fieldName === 'valor' && this.state.canal === 'email' )
                this.validateEr(fieldName, 'email');
            
            if ( fieldName === 'valor' && this.state.canal === 'celular' )
                this.validateEr(fieldName, 'celular');

            if ( fieldName === 'valor' && this.state.canal === 'fixo' )
                this.validateEr(fieldName, 'fixo');  
            
            if ( fieldName === 'obs')
                this.validateMin(fieldName);

        })
   
    };

    //
    //  Submit
    //
    handleSubmit = async e => {
        e.preventDefault();
        const { nome, canal, valor, obs } = this.state;
        const newUser = {nome, canal, valor, obs};

        e.target.querySelector('fieldset').childNodes.map( field => {
            console.log(field)
        })

        console.log(newUser)

        // try{
        //     await Api.postContato(newUser);
        //     this.props.history.push('/');
        // } catch(err) {
        //     console.log(err);
        // }
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
                                    <h2>Novo contato</h2>
                                    <Link to={`/`} className="back"><span>Home</span></Link>
                                </header>
                                <div className="content">
                                    <form onSubmit={this.handleSubmit}>
                                        <fieldset>
                                            <legend>Registro</legend>
                                            <div className="formGroup">
                                                <input type="text" name="nome" onBlur={this.handleChanges} value={this.state.nome} placeholder="Nome" onChange={this.handleChanges} />
                                                { this.state.error.nome.value && 
                                                    <span className="msgErro">{this.state.error.nome.msg}</span>
                                                }
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
                                                <input type="text" name="valor" onBlur={this.handleChanges} value={this.state.valor} onChange={this.handleChanges} placeholder={this.state.placeValor} />
                                                { this.state.error.valor.value && 
                                                    <span className="msgErro">{this.state.error.valor.msg}</span>
                                                }
                                            </div>
                                            <div className="formGroup">
                                                <input type="text" name="obs" onBlur={this.handleChanges} value={this.state.obs} onChange={this.handleChanges} placeholder="Observações" />
                                                { this.state.error.obs.value && 
                                                    <span className="msgErro">{this.state.error.obs.msg}</span>
                                                }
                                            </div>
                                            <div className="formGroup">
                                                <button type="submit">Criar contato</button>
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
