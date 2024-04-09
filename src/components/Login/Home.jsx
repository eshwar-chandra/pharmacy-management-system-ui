import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ username, onLogout }) => {
    return (
        <div>
            <nav className="flex items-center justify-between p-6 bg-blue-500">
                <div>
                    <button className="text-white">🍔</button>
                </div>
                <div className="flex items-center">
                    <span className="text-white mr-4">Welcome, {username}!</span>
                    <Link to="/login" onClick={onLogout} className="bg-white text-blue-500 rounded px-4 py-2">Logout</Link>
                </div>
            </nav>
            {/* Your dashboard content here */}
        </div>
    );
};

export default HomePage;