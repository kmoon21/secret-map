import {
    GET_COUNTRY_BY_PRODUCT,
    GET_PRODUCT_BY_COUNTRY,
    LOG_IN,
    LOG_IN_ERROR,
    SORT_BY_NAME,
    SORT_BY_TYPE,
    // ADD_PRODUCT_TO_COUNTRY,
    // DELETE_PRODUCT_FROM_COUNTRY,
} from '../constants';
import axios from 'axios';

export const getProductByCountry = country => async dispatch => {
    let response = await axios.get(`http://localhost:5000/country/${country}`);
    console.log(response)
    dispatch({ type: GET_PRODUCT_BY_COUNTRY, payload: response.data })
}

// export const addProductToCountry = country => async dispatch => {
//     let response = await axios.post(`URL`, country);
//     dispatch({ type: ADD_PRODUCT_TO_COUNTRY, country: response.data.newProductToCountry})
// }

// export const deleteProductFromCountry = id => async dispatch => {
//     let response = await axios.delete(`URL/${id}`);
//     dispatch({ type: DELETE_PRODUCT_FROM_COUNTRY, country: response.data.deletedProduct})
// }

export const login = user => async dispatch => {
    let response = await axios.post('http://localhost:5000/auth/login', user)
    console.log(response)
    // if (response.data.success !== true) {
    //     dispatch({ type: LOG_IN_ERROR, payload: response.data })
    // } else {
    //     dispatch({ type: LOG_IN, payload: response.data })
    // }
}

export const sortByName = dispatch => {
    dispatch({ type: SORT_BY_NAME, payload: 'name'})
}