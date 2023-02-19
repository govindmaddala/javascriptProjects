import React, { useEffect } from 'react'
import { Fragment } from 'react'
import './Home.css'
import { CgMouse } from 'react-icons/cg'
import Product from '../Products/Product'
import '../Products/product.css'
import { getProduct } from '../../actions/ProductAction';
import {useSelector,useDispatch} from 'react-redux'

const Home = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProduct())
  },[dispatch])

  const {loading,products,productsCount} = useSelector(state=>state.product)
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome to our E-commerce Site</p>
        <h1>Find your favourite products below</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeheading">Feature Products</h2>

      <div id="container">
        {products.map((product) => {
          return <Product product={product} key={products.indexOf(product)} />
        })}
      </div>
    </Fragment>
  )
}

export default Home
