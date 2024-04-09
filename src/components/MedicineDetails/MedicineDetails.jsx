import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MedicineDetails = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    // const [medicines, setMedicines] = useState([]);

    // useEffect(() => {
    //     //Api from backend
    //     fetch(`https://api.com/medicines?page=${currentPage}&limit=${itemsPerPage}`)
    //         .then(response => response.json())
    //         .then(data => setMedicines(data.medicines));
    // }, [currentPage]);

    const medicines = [
        { name: 'Medicine 1', id: '1' },
        { name: 'Medicine 2', id: '2' },
        { name: 'Medicine 3', id: '3' },
    ];

    const handleMedicineClick = (medicine) => {
        navigate(`/edit-medicine/${medicine.id}`);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="px-4 py-2">
            <h1 className="text-xl font-bold mb-4">Medicine Details</h1>

            {/* Search */}
            <div className="flex mb-4">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 text-smleading-tight focus:outline-none focus:shadow-outline mr-2" type="text" placeholder="Search by medicine name" />
                <button className="bg-custom-green hover:bg-green-700 text-white  text-sm font-bold py-2 px-4 rounded">
                    Search
                </button>
            </div>

            {/* Medicine List */}
            <div className="mb-4">
                {medicines.map((medicine, index) => (
                    <div key={index} className="p-1 border rounded mb-2 cursor-pointer" onClick={() => handleMedicineClick(medicine)}>
                        <h2 className="text-sm">{medicine.name}</h2>
                    </div>
                ))}
            </div>

            {/* Add Medicine */}
            <div className="fixed bottom-0 right-0 m-4">
                <Link to="/add-medicine" className="bg-custom-green hover:bg-green-700 text-sm text-white font-bold py-2 px-4 rounded">
                    Add Medicine
                </Link>
            </div>
        </div>
    );
};

export default MedicineDetails;