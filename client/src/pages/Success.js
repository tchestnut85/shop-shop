import React, { useEffect } from 'react';

import { ADD_ORDER } from '../utils/mutations';
import Jumbotron from '../components/Jumbotron';
import { idbPromise } from '../utils/helpers';
import { useMutation } from '@apollo/react-hooks';

function Success() {

    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
        async function saveOrder() {
            const cart = await idbPromise('cart', 'get');
            const products = cart.map(item => item._id);

            if (products.length) {
                const { data } = await addOrder({ variables: { products } });
                const productData = data.addOrder.products;

                productData.forEach((item) => {
                    idbPromise('cart', 'delete', item);
                });
            }
        }

        saveOrder();
    }, [addOrder]);

    setTimeout(() => {
        window.location.assign('/');
    }, 3000);

    return (
        <div>
            <Jumbotron>
                <h1>SUCCESS!</h1>
                <h2>
                    Your purchase is completed.
                </h2>
                <br />
                <h2>
                    You will now be redirected to the homepage.
                </h2>
            </Jumbotron>
        </div>
    );
}

export default Success;