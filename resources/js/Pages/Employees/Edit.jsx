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

        // Validate that the hired_date is not in the future
        const selectedDate = new Date(data.hired_date).toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];

        if (selectedDate > today) {
            setDateError('Hired Date cannot be in the future.');
            return;
        }

        setDateError(''); // Clear date error if date is valid

        put(`/employees/${employee.id}`, {
            onSuccess: () => onClose(),
        });
    };

    // Limit age to three digits and ensure it is a number
    const handleAgeChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,3}$/.test(value)) {
            setData('age', value);
        }
    };

    // Allow only letters in the name field
    const handleNameChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setData('name', value);
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
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
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
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
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
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
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    {errors.position && <span className="text-red-500 text-sm">{errors.position}</span>}
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
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    {dateError && <span className="text-red-500 text-sm">{dateError}</span>}
                    {errors.hired_date && <span className="text-red-500 text-sm">{errors.hired_date}</span>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-bold py-3 mt-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default Edit;
