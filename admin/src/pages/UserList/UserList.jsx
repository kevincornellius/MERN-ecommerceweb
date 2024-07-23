import React, { useState, useEffect } from 'react'
import './UserList.css'

const UserList = () => {

    const [allUser, setAllUser] = useState([]);
    const [allProduct, setAllProduct] = useState([]);

    const fetchData = async () => {

        await fetch(`${import.meta.env.VITE_API_URL}/getalluser`).then((res) => res.json()).then((data) => { setAllUser(data) });
        await fetch(`${import.meta.env.VITE_API_URL}/allproducts`).then((res) => res.json()).then((data) => { setAllProduct(data) });
    }

    useEffect(() => {
        fetchData();
    }, [])

    const removeUser = async (userId) => {
        console.log(userId);
        await fetch(`${import.meta.env.VITE_API_URL}/deleteuserbyid`, {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "id": userId }),
        });
    }
    return (
        <div>
            <div className="user-list">
                <h1>User List</h1>
                {allUser.map((item, i) => {
                    return (
                        <div key={i} className="user-each" >
                            <p>ID: {item._id}</p>
                            <p>Username: {item.name}</p>
                            <p>Email: {item.email}</p>
                            <p>Password: {item.password}</p>
                            <p>Date Created: {item.date}</p>
                            <p>Cart Items: </p>
                            <div className="user-cart-profile">
                                {allProduct.map((product, j) => {
                                    if (item.cartData[product.id] > 0) {
                                        return (
                                            <div key={j} className="item-cart-profile">
                                                <img src={product.image} alt="" />
                                                <p>{product.name}</p>
                                                <p>{item.cartData[product.id]}</p>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            <p>Wishlist Items: </p>
                            <div className="user-wishlist-profile">
                                {allProduct.map((product, j) => {
                                    if (item.starData === undefined) {
                                        return null;
                                    }
                                    if (item.starData[product.id]) {
                                        return (
                                            <div key={j} className="item-cart-profile">
                                                <img src={product.image} alt="" />
                                                <p>{product.name}</p>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            {/* <p onClick={() => { removeUser(item._id); window.location.reload(); }} className='remove-user'>Remove user</p> */}
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default UserList
