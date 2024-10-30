import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Edit = ({ employee, onClose }) => {
    const { data, setData, put, errors } = useForm({
        name: employee.name || '',
        age: employee.age || '',
        position: employee.position || '',
        hired_date: employee.hired_date || '',
    });

    const [dateError, setDateError] = useState('');

    useEffect(() => {
        setData({
            name: employee.name,
            age: employee.age,
            position: employee.position,
            hired_date: employee.hired_date,
        });
    }, [employee]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedDate = new Date(data.hired_date).toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];

        if (selectedDate > today) {
            setDateError('Hired Date cannot be in the future.');
            return;
        }

        setDateError('');
        put(`/employees/${employee.id}`, {
            onSuccess: () => onClose(),
        });
    };

    const handleAgeChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,3}$/.test(value)) {
            setData('age', value);
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setData('name', value);
        }
    };

    return (
        <div className="relative p-8 bg-gray-800 dark:bg-gray-900 text-gray-100 rounded-xl shadow-2xl max-w-md mx-auto overflow-hidden border border-gray-700">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-2xl font-bold focus:outline-none transform transition hover:scale-110"
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>

            <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
                Edit Employee
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter Name"
                        value={data.name}
                        onChange={handleNameChange}
                        required
                        className="w-full p-3 bg-gray-700 text-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
                </div>

                {/* Age Field */}
                <div className="flex flex-col">
                    <label htmlFor="age" className="text-sm font-medium text-gray-300 mb-2">
                        Age
                    </label>
                    <input
                        type="number"
                        id="age"
                        placeholder="Enter Age"
                        value={data.age}
                        onChange={handleAgeChange}
                        required
                        className="w-full p-3 bg-gray-700 text-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.age && <span className="text-red-500 text-sm mt-1">{errors.age}</span>}
                </div>

                {/* Position Field */}
                <div className="flex flex-col">
                    <label htmlFor="position" className="text-sm font-medium text-gray-300 mb-2">
                        Position
                    </label>
                    <input
                        type="text"
                        id="position"
                        placeholder="Enter Position"
                        value={data.position}
                        onChange={(e) => setData('position', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-700 text-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.position && <span className="text-red-500 text-sm mt-1">{errors.position}</span>}
                </div>

                {/* Hired Date Field */}
                <div className="flex flex-col">
                    <label htmlFor="hired_date" className="text-sm font-medium text-gray-300 mb-2">
                        Hired Date
                    </label>
                    <input
                        type="date"
                        id="hired_date"
                        value={data.hired_date}
                        onChange={(e) => setData('hired_date', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-700 text-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {dateError && <span className="text-red-500 text-sm mt-1">{dateError}</span>}
                    {errors.hired_date && <span className="text-red-500 text-sm mt-1">{errors.hired_date}</span>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 dark:bg-indigo-700 text-white font-bold py-3 mt-4 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-indigo-800 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default Edit;