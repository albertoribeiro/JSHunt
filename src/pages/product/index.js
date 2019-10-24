import React, {Component} from 'react';
import api from '../../services/api';
import './styles.css';
import {Link} from 'react-router-dom';

export default class Product extends Component{
    
    state={
        product:{},
    };

    async componentDidMount(){
      
        const {id} = this.props.match.params;
        const response = await api.get(`/products/${id}`);

        this.setState({product: response.data});
    }
 
    back = () => {
 
    }
    render(){

        const {product } = this.state;

        return (
            <div>
                <div className="product-info">
                    <h1>{product.title}</h1>
                    <h1>{product.description}</h1>

                    <p>
                        URL: <a hef={product.url}>{product.url}</a>
                    </p>
                </div>  
                <div className="actions">
                    <Link to={`/`}>Voltar</Link>
                </div>
            </div>
              
            
        );
    }
}

