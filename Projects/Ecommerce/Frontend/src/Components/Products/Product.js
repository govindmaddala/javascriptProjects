import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component';
import './product.css'
// const options = {
//     edit: false,
//     color: "#000000",
//     activeColor: "tomato",
//     value: 3.5,
//     size: window.innerWidth < 600 ? 20 : 25,
//     isHalf: true
// }
const Product = ({ product }) => {

    const options = {
        edit: false,
        color: "#000000",
        activeColor: "tomato",
        value: product.rating,
        size: window.innerWidth < 600 ? 20 : 25,
        isHalf: true
    }
    console.log(product.images[0].url);
    return (
        <>
            <Link className='productCard' to={product._id}>
                <img src={product.images[0].url} alt={product.name} />
                
                <p>{product.name}</p>
                <div>
                    <ReactStars {...options} /><span>{product.reviewCount} reviews</span>
                    <span>`₹ {product.price}/-`</span>
                    <span>Stock: {product.stock}</span>
                </div>
            </Link>
        </>
    )
}

export default Product
