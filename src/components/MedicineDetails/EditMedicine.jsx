import React from 'react';
import MedicineForm from './MedicineForm.jsx';

const EditMedicine = () => {
    return (
        <div>
            <h1>Edit Medicine</h1>
            <MedicineForm isEdit={true} />
        </div>
    );
};

export default EditMedicine;