import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MedicineForm = ({ isEdit = false }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [medicine, setMedicine] = useState({
        name: '',
        manf_name: '',
        generic_name: '',
        sell_uom: '',
        uom_price: '',
        package_size: '',
        tax: '',
        unique_identifier: '',
        general_text: '',
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [taxes, setTaxes] = useState([]);
    const [error, setError] = useState({ package_size: '', uom_price: '' });

    useEffect(() => {
        if (isEdit) {
            fetch(`https://api.com/medicines/${id}`) // need to chnage api
                .then(response => response.json())
                .then(data => setMedicine(data));
        }
    }, [isEdit, id]);

    useEffect(() => {
        // Fetching taxes from API
        fetch('https://api.com/taxes') // need to change url
            .then(response => response.json())
            .then(data => setTaxes(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (['package_size', 'uom_price'].includes(name)) {
            if (!/^(\d+\.?\d{0,2}|\.\d{0,2})?$/.test(value) && value !== '') {
                setError(prevError => ({
                    ...prevError,
                    [name]: `Must be a number with up to 2 decimal places.`
                }));
                return;
            } else {
                setError(prevError => ({
                    ...prevError,
                    [name]: ''
                }));
            }
        }
        setMedicine({
            ...medicine,
            [event.target.name]: event.target.value,
        });
    };

    const validateForm = () => {
        const errors = {};
            //validation if needed
        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const method = isEdit ? 'PUT' : 'POST';
        const url = isEdit ? `https://api.com/medicines/${id}` : 'https://api.com/medicines'; //need to change api

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(medicine),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save medicine');
                }
                return response.json();
            })
            .then(data => {
                if (isEdit) {
                    navigate('/medicines');
                } else {
                    navigate(`/edit-medicine/${data.id}`);
                }
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    };

return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex items-center space-x-1">
            <label className="w-1/6 text-sm">Name: <span className="text-custom-green">*</span></label>
            <input type="text" name="name" value={medicine.name} onChange={handleChange} required className="w-1/3 mt-1 border-2 border-gray-300 p-2 rounded-md text-sm" />
        </div>
        <div className="flex items-center space-x-1">
            <label className="w-1/6 text-sm">Manufacturer Name: <span className="text-custom-green">*</span></label>
            <input type="text" name="manf_name" value={medicine.manf_name} onChange={handleChange} required className="w-1/3 mt-1 border-2 border-gray-300 p-2 rounded-md text-sm" />
        </div>
        <div className="flex items-center space-x-1">
            <label className="w-1/6 text-sm">Generic Name: <span className="text-custom-green">*</span></label>
            <input type="text" name="generic_name" value={medicine.generic_name} onChange={handleChange} required className="w-1/3 mt-1 border-2 border-gray-300 p-2 rounded-md text-sm" />
        </div>
        <div className="flex items-center space-x-1">
            <label className="w-1/6 text-sm">Sell UOM: <span className="text-custom-green">*</span></label>
            <select name="sell_uom" value={medicine.sell_uom} onChange={handleChange} required className="w-1/3 mt-1 border-2 border-gray-300 p-2 rounded-md text-sm">
                <option value="">Select...</option>
                <option value="Units">Units</option>
                <option value="Package">Package</option>
            </select>
        </div>
        <div className="flex items-center space-x-1">
            <label className="w-1/6 text-sm">UOM Price: <span className="text-custom-green">*</span></label>
            <input type="text" name="uom_price" value={medicine.uom_price} onChange={handleChange} required className="w-1/3 mt-1 border-2 border-gray-300 p-2 rounded-md text-sm" />
            {error.uom_price && <div className="text-red-500">{error.uom_price}</div>}
        </div>
        <div className="flex items-center space-x-1">
            <label className="w-1/6 text-sm">Package Size: <span className="text-custom-green">*</span></label>
            <input type="text" name="package_size" value={medicine.package_size} onChange={handleChange} required className="w-1/3 mt-1 border-2 border-gray-300 p-2 rounded-md text-sm" />
            {error.package_size && <div className="text-red-500">{error.package_size}</div>}
        </div>
        <div className="flex items-center space-x-1">
            <label className="w-1/6 text-sm">Tax: <span className="text-custom-green">*</span></label>
            <select name="tax_id" value={medicine.tax_id} onChange={handleChange} required className="w-1/3 mt-1 border-2 border-gray-300 p-2 rounded-md text-sm">
                <option value="">Select...</option>
                {taxes.map(tax => (
                    <option key={tax.id} value={tax.id}>{tax.name}</option>
                ))}
            </select>
        </div>
        <div className="flex items-center space-x-1">
            <label className="w-1/6 text-sm">Unique Identifier: <span className="text-custom-green">*</span></label>
            <input type="text" name="unique_identifier" value={medicine.unique_identifier} onChange={handleChange} required className="w-1/3 mt-1 border-2 border-gray-300 p-2 rounded-md text-sm" />
        </div>
        <div className="flex items-center space-x-1">
            <label className="w-1/6 text-sm">General Text:</label>
            <textarea name="general_text" value={medicine.general_text} onChange={handleChange} maxLength="150" className="w-1/3 mt-1 border-2 border-gray-300 p-2 rounded-md text-sm" />
        </div>
        {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
        <div className="fixed bottom-0 right-0 m-4">
            <button type="submit" className="bg-custom-green hover:bg-green-700 text-sm text-white font-bold py-2 px-4 rounded">Save</button>
        </div>
    </form>
);
};

export default MedicineForm;