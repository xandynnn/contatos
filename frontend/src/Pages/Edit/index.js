import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';

//
//  Services
//
import Api from '../../Services/Api';

//
//  Styles
//
import './styles.css';

export default class Edit extends Component {

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

    componentWillMount(){
        this.loadContact(this.getId());
    };

    //
    //  Get ID Param
    //
    getId(){
        return this.props.match.params.id
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
    //  Carrega o contato
    //
    loadContact = id => {
        Api.getContatoId(id).then( res => {
            const {nome, canal, valor, _id : id, obs} = res.data.contato;
            this.setState({ nome, canal, valor, id, obs })
        })
    }

    //
    //  Change events
    //
    handleChanges = e => {
        const target = e.target;
        const fieldName = target.name;
        if ( fieldName === 'canal' ){
            this.setState({ 
                placeValor: 'Seu ' + e.target.value,
                valor: '',
                [fieldName] : e.target.value 
            }, ()=>{
                
                
                if ( target.value === 'email' )
                    this.validateEr('valor', 'email');
                
                if ( target.value === 'celular' )
                    this.validateEr('valor', 'celular');

                if ( target.value === 'fixo' )
                    this.validateEr('valor', 'fixo');

            })
        }else{
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

            })
        }
    };

    //
    //  Submit
    //
    handleSubmit = async e => {
        e.preventDefault();
        const { nome, canal, valor, obs } = this.state;
        const contato = {nome, canal, valor, obs};
        const errors = this.state.error;
        if ( !errors.nome.value && !errors.valor.value && !errors.canal.value  ){
            try{
                await Api.putContato(this.getId(), contato);
                this.props.history.push('/');
            } catch(err) {
                console.log(err);
            }
        }
    }

    //
    //  Render
    //
    render() {

        const sState = this.state;
        const sError = sState.error;
       
        return (
           <div className="page">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-6 col-md-offset-3">
                            <div className="boxRegister">
                                <header>
                                    <h2>Editar contato</h2>
                                    <Link to={`/`} className="back"><span>Home</span></Link>
                                </header>
                                <div className="content">
                                    <form onSubmit={this.handleSubmit}>
                                        <fieldset>
                                            <legend>Editar contato</legend>
                                            <div className="formGroup">
                                                <input type="text" name="nome" onBlur={this.handleChanges} value={sState.nome} placeholder="Nome" onChange={this.handleChanges} />
                                                { sError.nome.value && sError.nome.msg !== '' && 
                                                    <span className="msgErro">{sError.nome.msg}</span>
                                                }
                                            </div>
                                            <div className="formGroup">
                                                <span className="sStl">
                                                    <select name="canal" value={sState.canal} onChange={this.handleChanges} >
                                                        <option value="email">E-mail</option>
                                                        <option value="celular">Celular</option>
                                                        <option value="fixo">Telefone fixo</option>
                                                    </select>
                                                </span>
                                            </div>
                                            <div className="formGroup">
                                                { sState.canal ==="email" &&
                                                    <input type="text" name="valor" onBlur={this.handleChanges} value={sState.valor} onChange={this.handleChanges} placeholder={sState.placeValor} />
                                                }

                                                { sState.canal ==="celular" &&
                                                    <InputMask type="text" name="valor" onBlur={this.handleChanges} value={sState.valor} onChange={this.handleChanges} placeholder={sState.placeValor} mask="(99) 99999-9999" maskChar=" " />
                                                }

                                                { sState.canal ==="fixo" &&
                                                    <InputMask type="text" name="valor" onBlur={this.handleChanges} value={sState.valor} onChange={this.handleChanges} placeholder={sState.placeValor} mask="(99) 9999-9999" maskChar=" " />
                                                }

                                                { sError.valor.value && sError.valor.msg !== '' && 
                                                    <span className="msgErro">{sError.valor.msg}</span>
                                                }
                                            </div>
                                            <div className="formGroup">
                                                <input type="text" name="obs" onBlur={this.handleChanges} value={sState.obs} onChange={this.handleChanges} placeholder="Observações" />
                                                { sError.obs.value && 
                                                    <span className="msgErro">{sError.obs.msg}</span>
                                                }
                                            </div>
                                            <div className="formGroup">
                                                
                                                { !sError.nome.value && !sError.valor.value &&
                                                    <button type="submit">Alterar contato</button>
                                                }
                                               
                                                { ( sError.nome.value || sError.valor.value ) &&
                                                    <button type="submit" disabled>Alterar contato</button>
                                                }

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
