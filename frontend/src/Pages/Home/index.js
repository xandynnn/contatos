import React, { Component } from 'react';

//
//  Serviços 
//
import Api from './../../Services/Api';
import Util from './../../Services/Util';

//
//  Styles
//
import './styles.css';

//
//  Images
//
import boy from './../../Assets/boy.svg';

//
//  Componente
//
export default class Home extends Component {

    //
    //  Construtor
    //
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            contatos:[],
            pagination:{
                paginaAtual:'',
                totalPaginas:'',
                qtdTotalContatos:'',
                showQtd:''
            },
            qtdDefinida:[
                { valor:5, label:'5 contatos/pág' },
                { valor:10, label:'10 contatos/pág' },
                { valor:25, label:'25 contatos/pág' },
                { valor:50, label:'50 contatos/pág' },
                { valor:100, label:'100 contatos/pág' }
            ]
        }
    }

    //
    //  Montagem do componente após render
    //
    componentDidMount(){
        this.loadContatos( Util.getCurrentPage(), Util.getQtdResults() );
    }

    //
    //  Carrega os contatos com os parametros pagina e qtd items a serem mostrados
    //
    loadContatos = (page, size) => {
        this.setState({isLoading: true})
        let params = '?page=' + page + '&size=' + size;
        Api.getContatos(params).then(res=>{
            console.log(res.data)
            this.setState({
                isLoading:false,
                contatos: res.data.contatos,
                pagination:{
                    paginaAtual: Number(page),
                    totalPaginas: Number(res.data.paginas),
                    qtdTotalContatos: Number(res.data.total),
                    showQtd: Number(size)
                }
            })
        })
        this.props.history.push(`/${params}`)
    }

    //
    //  Paginação
    //
    handlePag = (nextPage) => {
        this.loadContatos(nextPage, this.state.pagination.showQtd );
        console.log(this.state.pagination)
    }

    //
    //  Filtro quantidade de itens a serem mostrados
    //
    handleChanges = (e) => {
        this.setState({  pagination:{ showQtd: e.target.value } });
        this.loadContatos('1', e.target.value );
    }

    //
    //  Remover um contato
    //
    deletarContato = id => {
        this.setState({isLoading:true})
        Api.removerContato(id).then( res => {
            
            const listaCotatos = this.state.contatos.filter( contato => {
                return contato._id !== id;
            });

            this.setState({ contatos: [...listaCotatos], isLoading:false });

        }).catch(err => {
            console.log(err);
        });
  
    }

    //
    //  Render da aplicação
    //
    render() {

        let paginacao = this.state.pagination;

        return (
            <div className="page">
                <div className="container">

                    <div className="row">
                        <div className="col-xs-12">
                            <div className="pageHeader">
                                <h1>Lista de contatos</h1>
                            </div>
                        </div>
                    </div>

                    {!this.state.isLoading &&
                        console.log(this.state.qtdDefinida)
                    }
   
                    <div className="row">
                        <div className="col-xs-12 col-md-4 col-md-offset-8">
                            <div className="filtros">
                                <div className="sStl">
                                    <select name="filtro" value={this.state.pagination.showQtd} onChange={this.handleChanges} >
                                        { this.state.qtdDefinida.map((item,idx)=>(
                                            <option key={idx} value={item.valor}>{item.label}</option>
                                        )) }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    { this.state.isLoading &&
                        <div className="loading"></div>
                    }
                   
                    { !this.state.isLoading &&
                    <React.Fragment>

                    <div className="row">
                       
                        { this.state.contatos.map(contato=>(
                            <div key={contato._id} className="col-xs-12 col-sm-6">
                                <div className="card" >
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
                                        <button className="edit" onClick={()=>{this.props.history.push(`/edit/${contato._id}`)}} ><span>Editar</span></button>
                                        <button className="remove" onClick={(e)=>this.deletarContato(contato._id)} ><span>Remover</span></button>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
    
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="pagination">
                                <ul>

                                    { paginacao.paginaAtual > 1 &&
                                        <li><button onClick={()=> this.handlePag(paginacao.paginaAtual - 1) }><span className="prev"></span></button></li>
                                    }
                                    
                                    { paginacao.paginaAtual > 1 && paginacao.paginaAtual >= 3 &&
                                        <li><button onClick={()=> this.handlePag(1) }>1</button></li>
                                    }
                                    
                                    { (paginacao.paginaAtual - 2) > 1 && <li><span>...</span></li> }

                                    { (paginacao.paginaAtual - 1) >= 1 && <li><button onClick={()=> this.handlePag(paginacao.paginaAtual-1) }>{paginacao.paginaAtual-1}</button></li> }
                                        
                                    <li className="active"><span>{ paginacao.paginaAtual }</span></li>
                                    
                                    { (paginacao.paginaAtual + 1) <= paginacao.totalPaginas && <li><button onClick={()=> this.handlePag(paginacao.paginaAtual+1) }>{paginacao.paginaAtual+1}</button></li> }

                                    { (paginacao.paginaAtual + 2) < paginacao.totalPaginas && <li><span>...</span></li> }

                                    { paginacao.paginaAtual < paginacao.totalPaginas && paginacao.paginaAtual <= ( paginacao.totalPaginas - 2 ) &&
                                        <li><button onClick={()=> this.handlePag(paginacao.totalPaginas) }>{paginacao.totalPaginas}</button></li>
                                    }

                                    { paginacao.paginaAtual < paginacao.totalPaginas &&
                                    <li><button onClick={()=> this.handlePag(paginacao.paginaAtual+1) }><span className="next"></span></button></li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    </React.Fragment>
                    }
                </div>
            </div>
        )
    }
}