import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import spinner from "../../assets/spinner.gif";
import { useQuery } from '@apollo/react-hooks';

function ProductList() {

  const state = useSelector(state => state);
  const { currentCategory } = state;
  const dispatch = useDispatch();

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      // if there's data to be stored, store it in the global state object
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });

      // let's also take each product and save it to IndexedDB
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      // since we're offline, get all of the data from the 'products' store
      idbPromise('products', 'get').then((products) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map(product => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
          <h3>Loading Products...</h3>
        )}
      { loading ?
        <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
