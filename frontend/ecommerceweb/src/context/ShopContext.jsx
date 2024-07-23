import React, { createContext, useState, useEffect } from 'react'
// import all_product from '../assets/Assets/all_product';
import { loadStripe } from '@stripe/stripe-js';

export const ShopContext = createContext(null);

const cartInit = () => {
    let cart = {};
    for (let i = 0; i < 10000; i++) {
        cart[i] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    // const contextValue = { all_product };
    const [curr, setCurr] = useState('')
    const [userInfo, setUserInfo] = useState([])
    const [cartItems, setCartItems] = useState(cartInit())
    const [starItems, setStarItems] = useState(cartInit())

    const [searchRes, setSearchRes] = useState([])

    const [all_product, set_all_product] = useState([])



    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/allproducts`).then((res) => res.json()).then((data) => { set_all_product(data) })

        if (localStorage.getItem('auth-token')) {
            //User Info
            fetch(`${import.meta.env.VITE_API_URL}/getuserinfo`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: "",
            }).then((resp) => resp.json()).then((data) => setUserInfo(data));

            if (userInfo != []) {
                fetch(`${import.meta.env.VITE_API_URL}/getusercart`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json',
                    },
                    body: "",
                }).then((resp) => resp.json()).then((data) => setCartItems(data));

                fetch(`${import.meta.env.VITE_API_URL}/getuserstar`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json',
                    },
                    body: "",
                }).then((resp) => resp.json()).then((data) => setStarItems(data));

            } else {
                console.log(userInfo.name)
                localStorage.removeItem('auth-token');
            }



        }
    }, [])



    const totalCart = () => {
        let ret = 0;
        for (let i = 0; i < all_product.length; i++) {
            ret += Number(cartItems[i]);
        }
        return Number(ret);
    }

    const addToCart = (itemId, qnt) => {

        if (localStorage.getItem('auth-token')) {
            setCartItems((prev) => ({ ...prev, [itemId]: Number(prev[itemId]) + Number(qnt) }));
            fetch(`${import.meta.env.VITE_API_URL}/addusercart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemID": itemId, "qnt": qnt }),
            });
        } else {
            window.alert("Please login first");
        }
    }

    const makePayment = async () => {

        if (localStorage.getItem('auth-token')) {

            const stripe = await loadStripe(`${import.meta.env.STRIPE_KEY}`);

            let productBody = [];
            all_product.map((item, i) => {
                if (cartItems[item.id] > 0) {
                    const theItem = item;
                    theItem.quantity = cartItems[item.id];
                    productBody.push(theItem);
                }
            })

            // let sesUrl = "";
            const res = await fetch(`${import.meta.env.VITE_API_URL}/create-payment`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "cartProducts": productBody }),
            }).then((resp) => resp.json()).then((data) => window.location.href = data.url);

            // console.log(res);

        } else {
            window.alert("Please login first");
        }
    }

    const toogleStar = (itemId) => {

        if (localStorage.getItem('auth-token')) {
            let cur = starItems[itemId];
            setStarItems((prev) => ({ ...prev, [itemId]: cur ? 0 : 1 }));
            fetch(`${import.meta.env.VITE_API_URL}/toogleuserstar`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemID": itemId }),
            });

            console.log(starItems, "X");
        } else {
            window.alert("Please login first");
        }
    }




    const setToCart = (itemId, qnt) => {

        if (localStorage.getItem('auth-token')) {
            setCartItems((prev) => ({ ...prev, [itemId]: qnt }));
            fetch(`${import.meta.env.VITE_API_URL}/setusercart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemID": itemId, "qnt": qnt }),
            });
        } else {
            window.alert("Please login first");
        }
    }

    const deleteUser = () => {
        if (localStorage.getItem('auth-token')) {
            fetch(`${import.meta.env.VITE_API_URL}/deleteuser`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: "",
            });
        }
    }

    const searchItems = async (subStr) => {
        fetch(`${import.meta.env.VITE_API_URL}/searchproducts`, {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "searchStr": subStr }),
        }).then((resp) => resp.json()).then((data) => { setSearchRes(data) });
        return searchRes;
    }


    //User
    const signUp = async (formData) => {

        let resp;

        await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((res) => res.json()).then((data) => { resp = data });

        if (resp.success) {
            console.log("Signed Up", formData);
            localStorage.setItem('auth-token', resp.token);
            window.location.replace('/');
        } else {

            window.alert(resp.errors);
        }
    }

    const logIn = async (formData) => {
        let resp;

        await fetch(`${import.meta.env.VITE_API_URL}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((res) => res.json()).then((data) => { resp = data });

        if (resp.success) {
            console.log("Logged in", formData);
            localStorage.setItem('auth-token', resp.token);
            window.location.replace('/');
        } else {

            window.alert(resp.errors);
        }
    }

    const ValueStore = {
        curr, setCurr, cartItems, addToCart, setToCart, totalCart, deleteUser, userInfo,
        all_product, set_all_product, logIn, signUp, starItems, toogleStar, searchItems, makePayment,
    }
    return (
        <ShopContext.Provider value={ValueStore}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;

