import React from 'react';
import MedicineForm from './MedicineForm.jsx';

const AddMedicine = () => {
    return (
        <div className="px-4 py-2">
            <h1 className="text-xl font-bold mb-4">Add Medicine</h1>
            <MedicineForm isEdit={false} />
        </div>
    );
};

export default AddMedicine;