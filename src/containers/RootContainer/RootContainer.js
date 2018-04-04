import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'underscore';
import ApiClient from './../../lib/api-client';
import './RootContainer.scss';
import Header from './../../components/Header/Header';

const sortByOptions = ['name', 'brand', 'type', 'price', 'size', 'rating'];
export default class RootContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      sotyBySelectedValue: '',
      displayItems: 12,
    };
    this.handleChange = this.handleChange.bind(this);
    this.loadMoreProduct = this.loadMoreProduct.bind(this);
  }

  componentDidMount() {
    ApiClient.products()
    .then((data) => {
      this.setState({
        products: data,
      });
    });
  }

  handleChange(e) {
    this.setState({
      sotyBySelectedValue: e.target.value,
      products: _.sortBy(this.state.products, e.target.value),
    });
  }

  loadMoreProduct() {
    this.setState({
      displayItems: this.state.displayItems + 12,
    });
  }

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
    const displayProducts = this.state.products.slice(0, this.state.displayItems);
    const productGrid = _.map(displayProducts, (item, k) => {
      return this.renderProduct(item, k);
    });

    const sortOptions = _.map(sortByOptions, (option, key) => {
      return (
        <option value={option} key={key}>{option}</option>
      );
    });

    const displayLoadMoreButton = this.state.displayItems <= this.state.products.length ? (
      <button
        type="button"
        className="btn btn-secondary btn-lg btn-block"
        onClick={this.loadMoreProduct}
      >Load More</button>
    ) : null;

    return (
      <div className="root-container">
        <Header />
        <div className="container">
          <div className="sortBy">
            <select
              value={this.state.sotyBySelectedValue}
              onChange={this.handleChange}
            >
              {sortOptions}
            </select>
          </div>
          <div className="card-columns">
            {productGrid}
          </div>
          {displayLoadMoreButton}
        </div>
      </div>
    );
  }
}
