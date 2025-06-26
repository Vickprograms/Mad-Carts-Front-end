import React, { useState } from "react";
import Searchbar from "./Searchbar";
import axios from 'axios';

const CreateProductForm =() => {
    const[form, setForm] = useState({
        name:'',
        category: '',
        price: '',
        quantity: '',
        size: '',
        description: '',
        brand: '',
        image: null
    })

    const handleChange = (e) => {
        const{name,value,files} = e.target;
        setForm({...form, [name]: files ? files[0] : value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        for(let key in form) formData.append(key, form[key]);
        await axios.post('http://127.0.0.1:5555/products', formData);
    };

    return(
       <div>
        <Searchbar/>
        <div>
            <form onSubmit={handleSubmit} className="space-y-4"> 
                  <input name="name" onChange={handleChange} placeholder="Name" />
                  <input name="category" onChange={handleChange} placeholder="Category" />
                  <input name="price" onChange={handleChange} placeholder="Price" type="number" />
                  <input name="quantity" onChange={handleChange} placeholder="Quantity" type="number" />
                  <input name="size" onChange={handleChange} placeholder="Size" />
                  <input name="description" onChange={handleChange} placeholder="Description" />
                  <input name="brand" onChange={handleChange} placeholder="Brand" />
                  <input type="file" name="image" onChange={handleChange} />
                  <button type="submit" className="btn">Submit</button>
            </form>
        </div>
      </div>  
    );
}

export default CreateProductForm