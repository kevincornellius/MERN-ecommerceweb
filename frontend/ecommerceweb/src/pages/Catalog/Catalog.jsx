import React, { useContext } from 'react'
import './Catalog.css'
import { ShopContext } from '../../context/ShopContext'
import Items from '../../components/Items/Items'

const Catalog = (props) => {
    const { all_product } = useContext(ShopContext);

    return (
        <div>
            <div className="catalog">
                <h1>{props.category === 'women' ? "Women" : props.category === 'men' ? "Men" : "Kids"}</h1>

                <div className="catalog-content">
                    <div className="catalog-filters">

                        <h2>Filters</h2>
                        <div className="divisorsCatalogFilters">
                            <h3>Size</h3>

                            <div className="baten"> <button>S</button>
                                <button>M</button>
                                <button>L</button>
                                <button>XL</button></div>

                        </div>

                        <div className="divisorsCatalogFilters">
                            <h3>Prices</h3>
                            <p>$0-$50</p>
                            <p>$50-$100</p>
                            <p>$100-$150</p>
                            <p>$150-$200</p>
                            <p>$200+</p>
                        </div>
                        <div className="divisorsCatalogFilters">
                            <h3>Brands</h3>
                            <p>Chanel</p>
                            <p>Louis Vuitton</p>
                            <p>Prada</p>
                            <p>Calvin Klein</p>
                            <p>Denim</p>
                        </div>
                        <div className="divisorsCatalogFilters">
                            <h3>Collection</h3>
                            <p>All Products</p>
                            <p>Best Sellers</p>
                            <p>New Arrivals</p>
                        </div>
                    </div>
                    <div className="catalog-cards">

                        {all_product.map((item, i) => {
                            if (props.category === item.category) {

                                return <Items key={i} id={item.id} name={item.name} new_price={item.new_price} old_price={item.old_price} image={item.image} />
                            } else {
                                return null;
                            }
                        })}


                    </div>
                </div>


            </div>

        </div>
    )
}

export default Catalog
