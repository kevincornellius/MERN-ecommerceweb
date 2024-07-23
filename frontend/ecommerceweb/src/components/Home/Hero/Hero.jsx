import React from 'react'
import './Hero.css'
import photo1 from '../../../assets/Home/Vector.png'
import photo2 from '../../../assets/Home/image.png'
import photo3 from '../../../assets/Home/image1.png'
import photo4 from '../../../assets/Home/image2.png'
import logos from '../../../assets/Home/logos.png'
// import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div>
            <div className="hero">
                <div className="tophero">
                    <img className='lr' src={photo1} alt="" />
                    <div className="midhero">
                        <img src={photo4} alt="" />
                        <h1>ULTIMATE</h1>
                        <h2>SALE</h2>
                        <p>NEW COLLECTION</p>
                        <button onClick={() => { window.scrollTo({ top: 700, behavior: 'smooth' }); }}>SHOP NOW</button>
                        <img src={photo2} alt="" />
                    </div>
                    <img className='lr' src={photo3} alt="" />

                </div>
                <div className="bothero">
                    <img src={logos} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Hero
