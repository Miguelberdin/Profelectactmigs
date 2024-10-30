import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';

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
        <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-2xl">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-3xl font-bold focus:outline-none"
                style={{
                    padding: '0.25rem 0.5rem',
                    lineHeight: '1',
                    backgroundColor: 'transparent',
                    borderRadius: '50%',
                }}
            >
                &times;
            </button>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
                Edit Employee
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter Name"
                        value={data.name}
                        onChange={handleNameChange}
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 shadow-sm"
                    />
                    {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
                </div>

                {/* Age Field */}
                <div className="flex flex-col">
                    <label htmlFor="age" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Age
                    </label>
                    <input
                        type="number"
                        id="age"
                        placeholder="Enter Age"
                        value={data.age}
                        onChange={handleAgeChange}
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 shadow-sm"
                    />
                    {errors.age && <span className="text-red-500 text-sm mt-1">{errors.age}</span>}
                </div>

                {/* Position Field */}
                <div className="flex flex-col">
                    <label htmlFor="position" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Position
                    </label>
                    <input
                        type="text"
                        id="position"
                        placeholder="Enter Position"
                        value={data.position}
                        onChange={(e) => setData('position', e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 shadow-sm"
                    />
                    {errors.position && <span className="text-red-500 text-sm mt-1">{errors.position}</span>}
                </div>

                {/* Hired Date Field */}
                <div className="flex flex-col">
                    <label htmlFor="hired_date" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Hired Date
                    </label>
                    <input
                        type="date"
                        id="hired_date"
                        value={data.hired_date}
                        onChange={(e) => setData('hired_date', e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 shadow-sm"
                    />
                    {dateError && <span className="text-red-500 text-sm mt-1">{dateError}</span>}
                    {errors.hired_date && <span className="text-red-500 text-sm mt-1">{errors.hired_date}</span>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-3 rounded-md shadow hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default Edit;
