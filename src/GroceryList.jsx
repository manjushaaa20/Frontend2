import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GroceryList.css';

const GroceryList = () => {
    const [groceries, setGroceries] = useState([]);
    const [formData, setFormData] = useState({ name: '', category: '', price: '', stock: '' });
    const [editingId, setEditingId] = useState(null);

    const API_URL = 'http://localhost:9080/api/groceries'; // Change to your backend URL

    useEffect(() => {
        fetchGroceries();
    }, []);

    const fetchGroceries = async () => {
        const response = await axios.get(API_URL);
        setGroceries(response.data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`${API_URL}/${editingId}`, formData);
        } else {
            await axios.post(API_URL, formData);
        }
        setFormData({ name: '', category: '', price: '', stock: '' });
        setEditingId(null);
        fetchGroceries();
    };

    const handleEdit = (grocery) => {
        setFormData({ name: grocery.name, category: grocery.category, price: grocery.price, stock: grocery.stock });
        setEditingId(grocery.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchGroceries();
    };

    return (
        <div>
            <h1>Grocery Management</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
                <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} required />
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required />
                <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleInputChange} required />
                <button type="submit">{editingId ? 'Update' : 'Add'} Grocery</button>
            </form>
            <ul>
                {groceries.map(grocery => (
                    <li key={grocery.id}>
                        <strong>{grocery.name}</strong> (Category: {grocery.category}, Price: {grocery.price}, Stock: {grocery.stock})
                        <button onClick={() => handleEdit(grocery)}>Edit</button>
                        <button onClick={() => handleDelete(grocery.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroceryList;
