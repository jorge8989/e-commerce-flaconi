import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'underscore';
import './RootContainer.scss';
import Header from './../../components/Header/Header';
import productData from './../../../server/resources/productlist.json';

export default class RootContainer extends Component {

  renderProduct(product) {
    const priceInEuro = (product.price / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    const basePrice = (product.price / product.size.replace('ML', '')).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    const ratingStyle = `${product.rating}%`;

    return (
      <div className="card text-center" key={product.id}>
        <img className="card-img-top" src={product.image} alt={product.name} />
        <div className="card-body">
          <strong className="card-text product-name">{product.name.replace(product.type, '')}</strong>
          <p className="card-text type">{product.type}</p>
          <span className="card-text price">ab {priceInEuro} / {product.size.toLowerCase()}</span>
          <p className="card-text base-price"><small>{basePrice} / 100ml</small></p>
          <div className="ratings">
            <div className="empty-stars" />
            <div className="full-stars" style={{ width: ratingStyle }} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const productGrid = _.map(productData, (item, k) => {
      return this.renderProduct(item, k);
    });

    return (
      <div className="root-container">
        <Header />
        <div className="container">
          <div className="card-columns">
            {productGrid}
          </div>
        </div>
      </div>
    );
  }
}
