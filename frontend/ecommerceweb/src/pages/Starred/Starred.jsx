import React from 'react'
import './Starred.css'
import starFilled from '../../assets/Frame.png'
import { ShopContext } from '../../context/ShopContext'
import Items from '../../components/Items/Items'

const Starred = () => {
    const { starItems, all_product, toogleStar } = React.useContext(ShopContext);

    return (
        <div>
            <div className="starred">
                <h1>Starred Items</h1>
                <div className="star-cards">
                    {all_product.map((item, i) => {
                        if (starItems[item.id])
                            return (
                                <div key={i} className="star-card">
                                    {/* <img className="item-star-photo" src={item.image} alt="" />
                                <p>{item.name}</p> */}
                                    <Items id={item.id} name={item.name} new_price={item.new_price} old_price={item.old_price} image={item.image} />
                                    <img onClick={() => (toogleStar(item.id))} className="cancel-star" src={starFilled} alt="" />
                                </div>

                            )
                    })}
                </div>

            </div>
        </div>
    )
}

export default Starred
