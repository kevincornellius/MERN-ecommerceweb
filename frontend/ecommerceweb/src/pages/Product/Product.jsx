import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { useParams } from 'react-router-dom'
import Items from '../../components/Items/Items'
import ProductInfo from '../../components/ProductInfo/ProductInfo'
import starEmpty from '../../assets/Vector.png'
import starFilled from '../../assets/Frame.png'
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts'
import Payment1 from '../../assets/Payment Options.png'
import './Product.css'

const Product = () => {

    const { all_product } = useContext(ShopContext);


    const { productId } = useParams();

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchedProduct = all_product.find((e) => e.id === Number(productId));
        if (fetchedProduct) {
            setProduct(fetchedProduct);
        } else {
            console.log("Product not found");
        }
    }, [all_product, productId]);


    return (
        <div>


            <ProductInfo theProduct={product} />
            <RelatedProducts theProduct={product} />


        </div>
    )
}

export default Product
