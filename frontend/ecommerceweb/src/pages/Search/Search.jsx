import React, { useState, useContext } from 'react'
import './Search.css'
import { ShopContext } from '../../context/ShopContext';
import Items from '../../components/Items/Items';

const Search = () => {

    const [itemRes, setItemRes] = useState([]);

    const { searchItems } = useContext(ShopContext);

    const changeHandle = async (e) => {

        console.log(e.target.value);
        setItemRes(await searchItems(e.target.value));
    }

    return (
        <div>
            <div className="search">
                <input type="text" name='str' placeholder='Search Item' onChange={changeHandle} />
                <div className='searchRes'>
                    {itemRes.map((item, i) => {
                        return (

                            <Items key={i} id={item.id} name={item.name} new_price={item.new_price} old_price={item.old_price} image={item.image} />

                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default Search
