import React from 'react'
import './Home.css'
import Hero from '../../components/Home/Hero/Hero'
import NewArrivals from '../../components/Home/NewArrivals/NewArrivals'

const Home = () => {
    return (
        <div>
            <div className="home">
                <Hero />
                <NewArrivals />
            </div>
        </div>
    )
}

export default Home
