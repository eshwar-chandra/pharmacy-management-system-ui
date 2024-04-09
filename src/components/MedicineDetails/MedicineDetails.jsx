import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

const MedicineDetails = () => {
    // Dummy data for the medicine list
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [showEditOption, setShowEditOption] = useState(false);
    const navigate = useNavigate();

    const medicines = [
        { name: 'Medicine 1', id: 'Type 1' },
        { name: 'Medicine 2', id: 'Type 2' },
        // Add more medicines as needed
    ];
    const handleMedicineClick = (medicine) => {
        console.log('Medicine clicked:', medicine);
        setSelectedMedicine(medicine);
        setShowEditOption(true);
        setDialogOpen(true); // Open the dialog when a medicine is clicked

    };

    const handleEditClick = () => {
        navigate(`/edit-medicine/${selectedMedicine.id}`);
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
                    <div key={index} className="p-1 border rounded mb-2">
                        <h2 className="text-sm" onClick={() => handleMedicineClick(medicine)}>{medicine.name}</h2>
                        {showEditOption && selectedMedicine === medicine && (
                            <button onClick={handleEditClick}>Edit</button>
                        )}
                    </div>
                ))}
                {/* Pagination goes here */}
                <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
                    <DialogTitle>Edit Medicine</DialogTitle>
                {/* Dialog content goes here */}
                </Dialog>
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