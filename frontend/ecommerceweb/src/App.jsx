import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Catalog from './pages/Catalog/Catalog'
import Product from './pages/Product/Product'
import Cart from './pages/Cart/Cart'
import LoginSign from './pages/LoginSign/LoginSign'
import Footer from './components/Footer/Footer'
import ScrollToTop from '../helpers/ScrollToTop'
import Profile from './pages/Profile/Profile'
import Starred from './pages/Starred/Starred'
import Search from './pages/Search/Search'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/women' element={<Catalog category='women' />} />
          <Route path='/men' element={<Catalog category='men' />} />
          <Route path='/kids' element={<Catalog category='kids' />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/search' element={<Search />} />
          <Route path='/starred' element={<Starred />} />
          <Route path='/login' element={<LoginSign />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  )
}

export default App
