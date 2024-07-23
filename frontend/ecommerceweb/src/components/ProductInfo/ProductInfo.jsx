import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import Items from '../../components/Items/Items'
import starEmpty from '../../assets/Vector.png'
import starFilled from '../../assets/Frame.png'
import Payment1 from '../../assets/Payment Options.png'
import { ShopContext } from '../../context/ShopContext'

const ProductInfo = (props) => {

    const [quant, setQuant] = useState(1);
    const [starred, setStarred] = useState(false);
    const { addToCart, toogleStar, starItems } = useContext(ShopContext);

    const product = props.theProduct;

    // console.log(product);
    useEffect(() => {
        let stt = starItems[product.id];
        if (stt) {
            setStarred(true);
        } else {
            setStarred(false);
        }
        console.log(stt);
    }, [product, starItems])

    const toogleFav = () => {


        toogleStar(Number(product.id));
        // setStarred(starred => !starred);
    }
    return (
        <div>
            <div className="product-page">
                <div className="img-select">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="main-product-img">
                    <img src={product.image} alt="" />
                </div>
                <div className="product-desc">
                    <h2>cornellius</h2>
                    <h1>{product.name} <button onClick={() => toogleFav()}><img src={starred ? starFilled : starEmpty} alt="" /></button></h1>
                    <div className="review-star">
                        <img src={starFilled} alt="" />
                        <img src={starFilled} alt="" />
                        <img src={starFilled} alt="" />
                        <img src={starFilled} alt="" />
                        <img src={starEmpty} alt="" />
                        <p>(3)</p>
                    </div>
                    <div className="pricing-product">
                        <h3>${product.new_price}</h3>
                        {product.old_price === undefined ? '' : <h4>${product.old_price}</h4>}
                        {product.old_price === undefined ? '' : <p>SAVE ${product.old_price - product.new_price}</p>}
                    </div>
                    <p>Select Size:</p>
                    <div className="size-button-product">
                        <button>S</button>
                        <button>M</button>
                        <button>L</button>
                        <button>XL</button>
                    </div>
                    <p>Quantity: </p>
                    <div className="checkout-product">
                        <input type="number" defaultValue={1} min={1} onChange={(e) => { setQuant(Number(e.target.value)) }} />
                        <button onClick={() => { addToCart(product.id, Number(quant)) }}>Add to Cart</button>
                    </div>
                    <img className='paycard' src={Payment1} alt="" />
                </div>
            </div>
        </div>
    )
}

export default ProductInfo
