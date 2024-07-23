import React from 'react'
import './Profile.css'
import { ShopContext } from '../../context/ShopContext'


const Profile = () => {
    const { deleteUser, userInfo } = React.useContext(ShopContext);
    return (
        <div>
            <div className="profile">
                <h1>{"Hello, " + userInfo.name}</h1>
                <div className="actbutton-profile">
                    <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
                    <button onClick={() => { deleteUser(); localStorage.removeItem('auth-token'); window.location.replace('/'); window.alert("Account Deleted") }}>Delete Account</button>
                </div>

            </div>

        </div>
    )
}

export default Profile
