import React, { useContext, useState } from 'react'
import './NewArrivals.css'
import Items from '../../Items/Items';
import { ShopContext } from '../../../context/ShopContext';
// import all_product from '../../../assets/Assets/all_product';
import { Link } from 'react-router-dom'

const NewArrivals = () => {
    const [actButton, setActButton] = useState('men');
    const { all_product } = useContext(ShopContext);
    const { curr, setCurr } = React.useContext(ShopContext);

    let ctr = 0;
    return (
        <div>

            <div className="newA">
                <h1>New Arrivals</h1>
                <p>Discover the latest trends with our new arrivals. Shop now to update your wardrobe with the freshest styles.</p>
                <div className="buttonCategory">
                    <ul>
                        <button className={actButton === 'men' ? 'activeButton' : 'butt'} onClick={() => setActButton('men')}> Men's Fashion</button>
                        <button className={actButton === 'women' ? 'activeButton' : 'butt'} onClick={() => setActButton('women')}> Women's Fashion</button>
                        <button className={actButton === 'kids' ? 'activeButton' : 'butt'} onClick={() => setActButton('kids')}> Kids' Fashion</button>
                    </ul>
                </div>
                <div className="cards">
                    {(all_product.slice().reverse()).map((item, i) => {
                        if (actButton === item.category && ctr < 6) {
                            ctr++;
                            return <Items key={i} id={item.id} name={item.name} new_price={item.new_price} old_price={item.old_price} image={item.image} />
                        } else {
                            return null;
                        }
                    })}
                </div>
                <Link to={'/' + actButton} onClick={() => setCurr(actButton)}>  <button className='vmore'> View More</button></Link>
            </div>
        </div >
    )
}

export default NewArrivals
