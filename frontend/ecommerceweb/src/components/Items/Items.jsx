import React from 'react'
import { Link } from 'react-router-dom'
import './Items.css'

const Items = (props) => {
    return (
        <div>

            <div className="items">
                <Link to={'/product/' + props.id}>
                    <img src={props.image} alt="" />
                    <h2>{props.name}</h2>
                    <div className="itemspricing">
                        <h3>${props.new_price}</h3>
                        <h4>{props.old_price === undefined ? '' : '$' + props.old_price}</h4>
                    </div>
                </Link>
            </div>

        </div >
    )
}

export default Items
