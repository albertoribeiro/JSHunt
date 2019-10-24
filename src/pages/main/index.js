import React, {Component} from 'react';
import api from '../../services/api';
import './styles.css';
import {Link} from 'react-router-dom';

export default class Main extends Component{
    state = {
        products: [],
        productInfo:{},
        page: 1,
    }
    componentDidMount(){
        this.loadProducs();
    }

    loadProducs = async (page =1 ) => {
        const response = await api.get(`/products?page=${page}`);
        const {docs,...productInfo} = response.data;
        this.setState({products:docs, productInfo, page});  
    };

    prevPage = () => {
        const {page} = this.state;
        console.log('page =>' + page);
        if(page ===1) return;
        const pageNumber = page - 1;
        this.loadProducs(pageNumber);

    }
    nextPage = () => {
        const {page,productInfo} = this.state;
        if(page === productInfo.pages) return;
        console.log('page =>' + page);
        const pageNumber = page +1 ; 
        this.loadProducs(pageNumber);
    }
    render(){
        //return <h1>Quantidade de produtos: {this.state.products.length}</h1>
        const {products,productInfo,page} = this.state;
        return (
            <div className='product-list'>
                {products.map(PRODUCT => (
                    <article  key={PRODUCT._id}>
                        <strong>{PRODUCT.title}</strong>
                        <p>{PRODUCT.description}</p>

                        <Link to={`/products/${PRODUCT._id}`}>Acessar</Link>
                    </article>
                    
                ))}
                <div className="actions">
                    <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page===productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>   
        );
    }
}

