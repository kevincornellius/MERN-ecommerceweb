import React, { useState } from 'react'
import './AddProduct.css'
import uploadArea from '../../assets/upload_area.svg'
const AddProduct = () => {
    const [image, setImage] = useState(false)
    const [productDesc, setProductDesc] = useState({
        name: '',
        category: 'men',
        new_price: '',
        old_price: '',
        image: '',
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {

        setProductDesc({ ...productDesc, [e.target.name]: e.target.value })
    }
    const convertBase64 = (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            return reader.result;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    const submitProduct = async () => {
        console.log(productDesc);
        let resp;
        let newProduct = productDesc;

        let formData = new FormData();
        formData.append('product', image);

        const base64 = convertBase64(image);
        console.log("YO", base64);
        await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: JSON.stringify({ image: base64 }),
        }).then((res) => res.json()).then((data) => { resp = data })

        if (resp.success) {

            newProduct.image = resp.image_url;
            await fetch(`${import.meta.env.VITE_API_URL}/addProduct`, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            }).then((res) => res.json()).then((data) => {
                data.success ? alert("Product Added") : alert("Failed");
            })
        }

    }
    return (
        <div>
            <div className="addproduct">
                <h1> New Product </h1>
                <div className="add-product-form">
                    <p>Product Name</p>
                    <input value={productDesc.name} onChange={changeHandler} type="text" name='name' placeholder='Product Name' />
                    <p>Price</p>
                    <input value={productDesc.new_price} onChange={changeHandler} type="number" name='new_price' min={0} placeholder='Product Price' />
                    <p>Price before discount (optional)</p>
                    <input value={productDesc.old_price} onChange={changeHandler} type="number" name='old_price' min={0} placeholder='Optional' />
                    <p>Product Category</p>
                    <select value={productDesc.category} onChange={changeHandler} name="category">
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                    </select>

                    <label htmlFor="image-upload">
                        <p>Product Image</p>
                        <img src={image ? URL.createObjectURL(image) : uploadArea} className="upload-area" alt="" />
                    </label>
                    <input onChange={imageHandler} type="file" name='image' id='image-upload' hidden />

                    <button onClick={() => submitProduct()}>Add Product</button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
