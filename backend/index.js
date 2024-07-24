
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY)
const app = express();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY2,
    api_secret: process.env.CLOUDINARY_KEY
});

const corsOptions = {
    origin: ['https://ecommerceweb-frontend.vercel.app', 'http://localhost:5173', 'http://localhost:5174', 'https://js.stripe.com', 'https://checkout.stripe.com/'],// frontend IP and port
    default: 'https://ecommerceweb-frontend.vercel.app',
    optionsSuccessStatus: 200,


};

app.use(express.json());
app.use(cors(corsOptions));




// Connection with MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

const port = process.env.PORT || 4000;

// API Creation
app.get("/", (req, res) => {
    res.send("Express APP running");
})



//Image Storage

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "error"
            })
        }

        res.status(200).json({
            success: true,
            message: "Uploaded",
            data: result,
            image_url: result.secure_url
        })

        console.log(result);

    })
})


//Product Schema MongoDB

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        default: undefined,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    }
})

const User = mongoose.model("User", {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    }, cartData: {
        type: Object,
    }, starData: {
        type: Object,
    }, date: {
        type: Date,
        default: Date.now,
    }
})

//User APIs



app.post('/signup', async (req, res) => {

    if (await User.findOne({ email: req.body.email })) {
        return res.status(400).json({ success: false, errors: "Email already in use" })
    }
    let cart = []
    for (let i = 0; i < 1000; i++) {
        cart[i] = 0;
    }
    const targetUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
        starData: cart,
    })

    await targetUser.save();

    const data = {
        targetUser: {
            id: targetUser.id
        }
    }

    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, token })
})

app.post('/login', async (req, res) => {

    let targetUser = await User.findOne({ email: req.body.email });
    if (targetUser) {
        if (targetUser.password === req.body.password) {
            const data = {
                targetUser: {
                    id: targetUser.id,
                }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {

            res.json({ success: false, errors: "Wrong Password" });
        }
    } else {
        res.json({ success: false, errors: "Email address is not registered" })
    }
})

//Middleware fetching

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" })
    } else {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data.targetUser;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using valid token" })
        }
    }
}

//Get User Info & Delete

app.get('/getalluser', async (req, res) => {

    let pointUser = await User.find({});
    // pointUser.cartData[req.body.itemID] += req.body.qnt;  
    res.send(pointUser);

})
app.post('/getuserinfo', fetchUser, async (req, res) => {

    let pointUser = await User.findOne({ _id: req.user.id });
    // pointUser.cartData[req.body.itemID] += req.body.qnt;  
    res.send(pointUser);

})

app.post('/deleteuser', fetchUser, async (req, res) => {

    await User.findOneAndDelete({ _id: req.user.id });
    // pointUser.cartData[req.body.itemID] += req.body.qnt;  
    res.json({
        success: 1,
        id: req.user.id,
    })

})

app.post('/deleteuserbyid', async (req, res) => {

    await User.findOneAndDelete({ _id: req.body.id });
    // pointUser.cartData[req.body.itemID] += req.body.qnt;
    console.log("removed user with id" + req.body.id);
    res.json({
        success: 1,
        id: req.id,
    })

})

//User Cart & Star

app.post('/getusercart', fetchUser, async (req, res) => {

    let pointUser = await User.findOne({ _id: req.user.id });
    // pointUser.cartData[req.body.itemID] += req.body.qnt;
    res.send(pointUser.cartData);
    // console.log(req.body, req.user);
})

app.post('/getuserstar', fetchUser, async (req, res) => {

    let pointUser = await User.findOne({ _id: req.user.id });
    // pointUser.cartData[req.body.itemID] += req.body.qnt;
    res.send(pointUser.starData);
    // console.log(req.body, req.user);
})

app.post('/toogleuserstar', fetchUser, async (req, res) => {

    let pointUser = await User.findOne({ _id: req.user.id });
    console.log(req.body.itemID);
    pointUser.starData[req.body.itemID] = pointUser.starData[req.body.itemID] ? 0 : 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { starData: pointUser.starData });

    res.send();
    // console.log(req.body, req.user);
})

app.post('/addusercart', fetchUser, async (req, res) => {

    let pointUser = await User.findOne({ _id: req.user.id });
    pointUser.cartData[req.body.itemID] += req.body.qnt;

    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: pointUser.cartData });
    res.send();
    // console.log(req.body, req.user);
})

app.post('/setusercart', fetchUser, async (req, res) => {

    let pointUser = await User.findOne({ _id: req.user.id });
    pointUser.cartData[req.body.itemID] = req.body.qnt;

    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: pointUser.cartData });
    res.send();
    // console.log(req.body, req.user);
    console.log("Set Item");
})


//Checking out - STRIPE

app.post('/create-payment', async (req, res) => {

    const { cartProducts } = req.body;
    console.log("Creating Payment with Stripe..");
    const lineItem = cartProducts.map((product) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.name,
                images: [product.image],
            },
            unit_amount: Math.round(Number(product.new_price * 100)),
        }, quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItem,
        mode: "payment",
        success_url: "https://ecommerceweb-frontend.vercel.app/",
        cancel_url: "https://ecommerceweb-frontend.vercel.app/",
    })
    console.log(session.url);
    console.log(lineItem[0].price_data.product_data);


    res.json({ url: session.url })
})

// Product

app.post('/addProduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length) {
        id = products.slice(-1)[0].id + 1;

    } else {
        id = 1;
    }

    const newproduct = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        old_price: req.body.old_price,
        new_price: req.body.new_price,
    })

    await newproduct.save();
    res.json(
        {
            success: true,
            name: req.body.name,
        }
    )
})

app.post('/removeProduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({
        success: 1,
        id: req.body.id,
    })
})

app.get('/allproducts', async (req, res) => {
    let allProducts = await Product.find({});
    console.log("All product given")
    res.send(allProducts);
})

app.post('/searchproducts', async (req, res) => {
    const regex = new RegExp(req.body.searchStr, 'i')
    let allProducts = await Product.find({ name: { $regex: regex } });
    console.log("Search product given")
    res.send(allProducts);
})

app.listen(port, '0.0.0.0', (error) => {
    if (!error) {
        console.log("Running on " + port);
    } else {

        console.log("Error: " + error)
    }
})


