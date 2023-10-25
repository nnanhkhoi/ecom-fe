import axios from 'axios'

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
}

const API = 'https://api.pujakaitem.com/api/products'

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      }

    case 'SET_API_DATA':
      const featureData = action.payload.filter((curElem) => {
        return curElem.featured === true
      })

      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featureProducts: featureData,
      }

    case 'API_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }

    case 'SET_SINGLE_LOADING':
      return {
        ...state,
        isSingleLoading: true,
      }

    case 'SET_SINGLE_PRODUCT':
      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload,
      }

    case 'SET_SINGLE_ERROR':
      return {
        ...state,
        isSingleLoading: false,
        isError: true,
      }

    default:
      return state
  }
}

export const getProducts = () => {
  return async (dispatch) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const res = await axios.get(API)
      const products = await res.data
      dispatch({ type: 'SET_API_DATA', payload: products })
    } catch (error) {
      dispatch({ type: 'API_ERROR' })
    }
  }
}

// my 2nd api call for single product

export const getSingleProduct = async (url) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_SINGLE_LOADING' })
    try {
      const res = await axios.get(url)
      const singleProduct = await res.data
      dispatch({ type: 'SET_SINGLE_PRODUCT', payload: singleProduct })
    } catch (error) {
      dispatch({ type: 'SET_SINGLE_ERROR' })
    }
  }
}

export default productReducer
