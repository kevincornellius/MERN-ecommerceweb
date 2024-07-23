import React from 'react'
import './Footer.css'
import image1 from '../../assets/image 2.png'
import image3 from '../../assets/image.png'
import image2 from '../../assets/image 3.png'
const Footer = () => {
    return (
        <div>
            <div className="footer">
                <div className="follow-footer">
                    <h1>Follow Us On Instagram</h1>
                    <p>Stay connected and get inspired. Follow us on social media for the latest updates, trends, and exclusive content.</p>
                </div>
                <img className='divisorf' src={image3} alt="" />
                <div className="subs-foot">
                    <img className='ler' src={image1} alt="" />
                    <div className="subscribe-footer">
                        <h1>Subscribe To Our Newsletter</h1>
                        <p>Stay updated with the latest trends and exclusive offers. Subscribe to our newsletter and never miss out on new arrivals and special deals.</p>
                        <input type="email" placeholder='your email' />
                        <button>Subscribe Now</button>
                    </div>
                    <img className='ler' src={image2} alt="" />
                </div>

                <div className="text-foo">
                    Copyright © 2024 Kevin Cornellius . All Rights Reseved.
                </div>
            </div>

        </div>
    )
}

export default Footer
