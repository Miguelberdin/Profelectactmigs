import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Create = ({ onClose }) => {
    const { data, setData, post, errors } = useForm({
        name: '',
        age: '',
        position: '',
        hired_date: '',
    });

    const [dateError, setDateError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedDate = new Date(data.hired_date).toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];

        if (selectedDate > today) {
            setDateError('Hired Date cannot be in the future.');
            return;
        }

        setDateError('');
        post('/employees', {
            onSuccess: () => onClose(),
            onError: () => {},
        });
    };

    return (
        <div className="relative p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-2xl max-w-md mx-auto overflow-hidden">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-2xl font-bold focus:outline-none transform transition hover:scale-110"
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                Add New Employee
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
                        onChange={(e) => setData('name', e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                        required
                        className="w-full p-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                        onChange={(e) => {
                            if (e.target.value.length <= 3) {
                                setData('age', e.target.value.replace(/\D/, ''));
                            }
                        }}
                        required
                        className="w-full p-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                        className="w-full p-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                        className="w-full p-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {dateError && <span className="text-red-500 text-sm mt-1">{dateError}</span>}
                    {errors.hired_date && <span className="text-red-500 text-sm mt-1">{errors.hired_date}</span>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 dark:bg-indigo-700 text-white font-bold py-3 mt-4 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-indigo-800 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Add Employee
                </button>
            </form>
        </div>
    );
};

export default Create;
