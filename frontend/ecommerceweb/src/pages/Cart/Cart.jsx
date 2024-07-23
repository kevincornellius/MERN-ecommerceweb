import React from 'react'
import './Cart.css'
import { ShopContext } from '../../context/ShopContext'

const Cart = () => {
    const { cartItems, all_product, setToCart, makePayment } = React.useContext(ShopContext);
    let total = 0;
    return (
        <div>
            <div className="cart-page">
                <h1>Shopping Cart</h1>
                <div className="title-info-cart">
                    <h2>Product</h2>
                    <h2>Name</h2>
                    <h2>Price</h2>
                    <h2>Quantity</h2>
                    <h2>Total</h2>
                </div>
                <div className="cart-content">
                    {all_product.map((item, i) => {
                        if (cartItems[item.id] > 0) {
                            total += item.new_price * cartItems[item.id];
                            return (

                                <div key={i} className="cart-items">
                                    <img src={item.image} alt="" />
                                    <div className="cart-items-name">
                                        <h3>{item.name}</h3>
                                        <p onClick={() => setToCart(item.id, 0)}>Remove</p>
                                    </div>
                                    <h3>${item.new_price}</h3>
                                    <input type="number" defaultValue={cartItems[item.id]} min={1} onChange={(e) => setToCart(item.id, e.target.value)} />
                                    <h3>${cartItems[item.id] * item.new_price}</h3>
                                </div>

                            )
                        } else {
                            return null;
                        }
                    })}
                </div>
                <div className="checkout-cart">
                    <h1>Totals</h1>
                    <div className="block-checkout">
                        <p>Subtotal</p>
                        <p>${total}</p>
                    </div>
                    <div className="block-checkout">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <div className="block-checkout">
                        <h1>Total</h1>
                        <h1>${total}</h1>
                    </div>
                    <button onClick={() => { makePayment() }}>Checkout</button>
                </div>
            </div>
        </div >
    )
}

export default Cart
