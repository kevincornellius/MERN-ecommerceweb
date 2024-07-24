# Full Stack Projects - E-commerce web 

This project utilizes the MERN stack and is integrated with Stripe (beta) for the checkout process. Additionally, it uses Cloudinary for cloud storage of item images, with Multer as the middleware. The frontend demo is accessible at: https://ecommerceweb-frontend.vercel.app/. Please note that the search bar functionality might be flawed due to free hosting limitations.

### Demo Account 
- **Username**: demoaccount@demo.com
- **Password**: thisisademoaccount
  

## Features

### Frontend (Customer View)

- **Login/Signup**: Users can create an account or log in to access their personalized shopping experience.
- **New Arrivals**: Display the latest products available in the store.
- **Wishlist**: Users can add products to their wishlist for future reference.
- **Search Menu**: Allows users to search for products (note: may have limitations due to hosting issues).
- **Cart**: Integrated with Stripe for secure payment processing.

### Admin Dashboard

The admin panel, not deployed publicly for security reasons, includes the following features:
- **Product Management**: View a list of products, add new products.
- **User Management**: View a list of registered users, manage user accounts, and delete users if necessary.



## Technology Stack

- **Frontend**: React.js, Redux, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Payment Integration**: Stripe API
- **Image Storage**: Cloudinary with Multer middleware
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS
