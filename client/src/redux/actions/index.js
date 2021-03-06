import {
    GET_COUNTRY_BY_PRODUCT,
    GET_PRODUCT_BY_COUNTRY,
    GET_PRODUCTS,
    GET_COUNTRY,
    ADD_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT,
    INVALID
    // ADD_PRODUCT_TO_COUNTRY,
    // DELETE_PRODUCT_FROM_COUNTRY,
} from '../constants';
import axios from 'axios';

export const searchForCountryOrProduct = searchTerm => async dispatch => {
    try {
        let { data } = await axios.get(`http://localhost:5000/searchcategory/${searchTerm}`);
        dispatch({ type: "SEARCH_CATEGORY", category: data.category })
        switch (data.category) {
            case 'product':
                dispatch(_getProductByName(searchTerm));
                break;
            case 'country':
                dispatch(_getProductByCountry(searchTerm));
                break;
            case 'invalid':
                break;
            default: return;
        }
    } catch (e) {
        dispatch({ type: INVALID })
        console.log("Error: ", e.response.data);
    }

}

const _getProductByCountry = country => async dispatch => {
    let response = await axios.get(`http://localhost:5000/country/${country}`);
    console.log(response)
    dispatch({ type: GET_PRODUCT_BY_COUNTRY, payload: response.data })
}

const _getProductByName = product => async dispatch => {
    let response = await axios.get(`http://localhost:5000/products/${product}`);
    console.log('THE RESPONSE IS', response)
    dispatch({ type: GET_PRODUCTS, payload: response.data })
}

// name is optional, without anything it will return all countries
export const getCountry = () => async dispatch => {
    let response = await axios.get(`http://localhost:5000/country/`);
    console.log(response.data)
    dispatch({ type: GET_COUNTRY, payload: response.data })
}

export const addProduct = product => async dispatch => {
    let response = await axios.post('http://localhost:5000/products/new', product);
    console.log(response)
    // dispatch({ type: ADD_PRODUCT, payload: response.data });
}

export const editProduct = (id, product) => async dispatch => {
    let response = await axios.put(`http://localhost:5000/products/${id}`, product);
    dispatch({ type: EDIT_PRODUCT, products: response.data.product });
}

export const deleteProduct = id => async dispatch => {
    let response = await axios.delete(`http://localhost:5000/products/remove/${id}`);
    console.log(response)
    // dispatch({ type: DELETE_PRODUCT, products: response.data.deletedProduct });
}

// export const addProductToCountry = country => async dispatch => {
//     let response = await axios.post(`URL`, country);
//     dispatch({ type: ADD_PRODUCT_TO_COUNTRY, country: response.data.newProductToCountry})
// }

// export const deleteProductFromCountry = id => async dispatch => {
//     let response = await axios.delete(`URL/${id}`);
//     dispatch({ type: DELETE_PRODUCT_FROM_COUNTRY, country: response.data.deletedProduct})
// }