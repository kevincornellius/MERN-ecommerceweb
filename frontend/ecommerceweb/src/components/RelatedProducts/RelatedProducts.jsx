import React from 'react'
import { ShopContext } from '../../context/ShopContext';
import './RelatedProducts.css'
import Items from '../Items/Items';

const RelatedProducts = (props) => {
    let ctr = 0;
    const product = props.theProduct;
    const { all_product } = React.useContext(ShopContext);
    // console.log(all_product)
    return (
        <div>
            <div className="related-products">
                <h1>Related Products</h1>
                <div className="cards-related">
                    {all_product.map((item, i) => {
                        if (item.category === product.category && item.id !== product.id && ctr < 4) {
                            ctr++;
                            return <Items key={i} id={item.id} name={item.name} new_price={item.new_price} old_price={item.old_price} image={item.image} />
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default RelatedProducts
