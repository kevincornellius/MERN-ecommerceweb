import React from 'react'
import './Admin.css'
import AddProduct from '../AddProduct/AddProduct'
import ProductList from '../ProductList/ProductList'
import UserList from '../UserList/UserList'
import shipIcon from '../../assets/vec1.svg'
import boxIcon from '../../assets/vec2.svg'
import userIcon from '../../assets/Vector-1.svg'
import { Routes, Route, Link } from 'react-router-dom'
import ScrollToTop from '../../../helpers/ScrollToTop'

const Admin = () => {
    return (
        <div>
            <div className="admin">
                <div className="sidebar">
                    <Link to={'/addProduct'}>
                        <h1> <img src={shipIcon} alt="" />Add Product</h1>
                    </Link>
                    <Link to={'/productList'}>
                        <h1><img src={boxIcon} alt="" />Product List</h1>
                    </Link>
                    <Link to={'/userList'}>
                        <h1><img src={userIcon} alt="" />User List</h1>
                    </Link>
                </div>
                <ScrollToTop />
                <Routes>
                    <Route path='/addProduct' element={<AddProduct />} />
                    <Route path='/productList' element={<ProductList />} />
                    <Route path='/userList' element={<UserList />} />
                </Routes>
            </div>

        </div>
    )
}

export default Admin
