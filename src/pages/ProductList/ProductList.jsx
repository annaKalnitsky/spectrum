import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../services/api';
import './productList.scss';
import { Link } from 'react-router-dom';
import { imager } from '../../services/functions';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const calculateDiscount = (minPrice, maxPrice) => {
    if (minPrice === maxPrice) return 0;

    const discount = ((maxPrice - minPrice) / maxPrice) * 100;
    return Math.round(discount);
  };

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error to get all products:', error);
      });
  }, []);

  return (
    <div className="product__list">
      <h1 className="product__list-title">Products</h1>
      <div className="title-divider"></div>
      <div className="product__grid">
        {products.map((product) => {
          const discount = calculateDiscount(
            parseFloat(product.min_price),
            parseFloat(product.max_price),
          );
          return (
            <Link className="product__link" to={`/product/${product.id}`} key={product.id}>
              <div key={product.id} className="product__item">
                <div className="product__item-img">
                  <img src={imager(product.images[0].url)} alt={product.images[0].title} />
                  {discount > 0 && (
                    <div className="discount-label">
                      <div className="discount-label-background"></div>
                      <span>{discount}% off</span>
                    </div>
                  )}
                </div>
                <h2 className="product__item-title">{product.title}</h2>
                <span className="product__item-price">
                  ${product.min_price}
                  {calculateDiscount(product.min_price, product.max_price) > 0 && (
                    <span className="product__item-max-price">${product.max_price}</span>
                  )}
                </span>
                <p className="product__item-description">{product.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
