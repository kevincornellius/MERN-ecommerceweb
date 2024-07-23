import React, { useState, useEffect } from 'react'
import './ProductList.css'
import trashIcon from '../../assets/trash.png'
import editIcon from '../../assets/edit.png'

const ProductList = () => {

    const [allProduct, setAllProduct] = useState([]);

    const fetchData = async () => {

        await fetch(`${import.meta.env.VITE_API_URL}/allproducts`).then((res) => res.json()).then((data) => { setAllProduct(data) });
    }

    const removeProduct = async (id) => {

        await fetch(`${import.meta.env.VITE_API_URL}/removeProduct`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        })

        await fetchData();
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <div className="productlist">
                <h1>Product List</h1>
                <div className="title-product">
                    <p>ID</p>
                    <p>Image</p>
                    <p>Name</p>
                    <p>Old Price</p>
                    <p>Sell Price</p>
                    <p>Category</p>
                    <p>Edit/Remove</p>
                </div>
                {allProduct.map((item, i) => {
                    return (
                        <div key={i} className="productCards">
                            <h1>{item.id}</h1>
                            <div className="product-image">
                                <img src={item.image} alt="" />
                            </div>
                            <h1>{item.name}</h1>
                            <h1>{item.old_price !== undefined ? '$' + item.old_price : '-'}</h1>
                            <h1>${item.new_price}</h1>
                            <h1>{item.category}</h1>
                            <div className="action-button">
                                {/* <img src={editIcon} alt="" /> */}
                                <img onClick={() => { removeProduct(item.id) }} src={trashIcon} alt="" />
                            </div>
                        </div>
                    )
                })}



            </div>
        </div>
    )
}

export default ProductList
