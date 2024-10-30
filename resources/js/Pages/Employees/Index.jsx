import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Create from './Create';
import Edit from './Edit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch, faEdit, faTrash, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const Index = () => {
    const { employees, search } = usePage().props;
    const { data, setData, get } = useForm({
        search: search || '',
    });

    const [sortBy, setSortBy] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        get('/employees', { preserveState: true });
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        applySort();
    };

    const toggleSortDirection = () => {
        const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newDirection);
        applySort(newDirection);
    };

    const applySort = (direction = sortDirection) => {
        router.get('/employees', {
            search: data.search,
            sort_by: sortBy,
            sort_direction: direction,
        }, { preserveState: true });
    };

    const openEditModal = (employee) => {
        setSelectedEmployee(employee);
        setEditModalOpen(true);
    };

    const openDeleteModal = (employee) => {
        setSelectedEmployee(employee);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        router.delete(`/employees/${selectedEmployee.id}`, {
            onSuccess: () => setDeleteModalOpen(false),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Employees</h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">

                            {/* Create New Employee Button */}
                            <div className="mb-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                                <button
                                    onClick={() => setCreateModalOpen(true)}
                                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-3 rounded-md shadow hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-105 flex items-center space-x-2"
                                >
                                    <FontAwesomeIcon icon={faUserPlus} />
                                    <span>Add New Employee</span>
                                </button>


                                {/* Sort and Search Bar */}
                                <div className="flex flex-col md:flex-row items-center md:space-x-4 w-full md:w-auto space-y-2 md:space-y-0">
                                    {/* Sort By Dropdown */}
                                    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md">
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">Sort:</span>
                                        <select
                                            value={sortBy}
                                            onChange={handleSortChange}
                                            className="bg-gray-100 dark:bg-gray-900 dark:text-gray-200 rounded-md px-3 py-2 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105"
                                        >
                                            <option value="">Choose...</option>
                                            <option value="name">Name</option>
                                            <option value="age">Age</option>
                                            <option value="hired_date">Hired Date</option>
                                        </select>
                                        <button
                                            onClick={toggleSortDirection}
                                            className="flex items-center justify-center bg-blue-500 text-white rounded-md p-2 shadow-md hover:bg-blue-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            aria-label="Toggle Sort Direction"
                                        >
                                            {sortDirection === 'asc' ? (
                                                <FontAwesomeIcon icon={faSortUp} />
                                            ) : (
                                                <FontAwesomeIcon icon={faSortDown} />
                                            )}
                                        </button>

                                    </div>

                                    {/* Search Bar */}
                                    <form onSubmit={handleSearch} className="flex items-center w-full md:w-auto relative">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={data.search}
                                            onChange={(e) => setData('search', e.target.value)}
                                            className="bg-gray-200 dark:bg-gray-800 dark:text-gray-200 rounded-lg p-3 w-full pr-10 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 shadow transition transform hover:scale-105"
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition"
                                            aria-label="Search"
                                        >
                                            <FontAwesomeIcon icon={faSearch} size="lg" />
                                        </button>
                                    </form>


                                </div>
                            </div>

                            {/* Employee Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                                    <thead className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-950 dark:to-gray-800">
                                        <tr>
                                            <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">Name</th>
                                            <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">Age</th>
                                            <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">Position</th>
                                            <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">Hired Date</th>
                                            <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">Created By</th>
                                            <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">Created At</th>
                                            <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">Updated At</th>
                                            <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.data.map((employee) => (
                                            <tr key={employee.id} className="hover:bg-blue-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-md">
                                                <td className="p-3 text-gray-800 dark:text-gray-200 whitespace-nowrap">{employee.name}</td>
                                                <td className="p-3 text-gray-800 dark:text-gray-200 whitespace-nowrap">{employee.age}</td>
                                                <td className="p-3 text-gray-800 dark:text-gray-200 whitespace-nowrap">{employee.position}</td>
                                                <td className="p-3 text-gray-800 dark:text-gray-200 whitespace-nowrap">{new Date(employee.hired_date).toLocaleDateString()}</td>
                                                <td className="p-3 text-gray-800 dark:text-gray-200 whitespace-nowrap">{employee.creator ? employee.creator.name : 'N/A'}</td>
                                                <td className="p-3 text-gray-800 dark:text-gray-200 whitespace-nowrap">{new Date(employee.created_at).toLocaleString()}</td>
                                                <td className="p-3 text-gray-800 dark:text-gray-200 whitespace-nowrap">{new Date(employee.updated_at).toLocaleString()}</td>
                                                <td className="p-3 flex space-x-4">
                                                    <button
                                                        onClick={() => openEditModal(employee)}
                                                        className="text-yellow-500 hover:text-yellow-600 transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                        aria-label="Edit"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} size="lg" />
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(employee)}
                                                        className="text-red-500 hover:text-red-600 transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                        aria-label="Delete"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} size="lg" />
                                                    </button>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Links */}
                            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                                <span className="text-gray-600 dark:text-gray-200">Page {employees.current_page} of {employees.last_page}</span>
                                <div className="flex space-x-2">
                                    {employees.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`
                    px-4 py-2 rounded-md shadow-md transition transform hover:scale-105
                    ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-blue-500 hover:text-white'}
                    ${link.url === null ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                `}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal show={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} maxWidth="md">
                <Create onClose={() => setCreateModalOpen(false)} />
            </Modal>
            {selectedEmployee && (
                <Modal show={isEditModalOpen} onClose={() => setEditModalOpen(false)} maxWidth="md">
                    <Edit employee={selectedEmployee} onClose={() => setEditModalOpen(false)} />
                </Modal>
            )}
            <Modal show={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} maxWidth="sm">
                <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Confirm Delete</h2>
                    <p className="text-base text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                        Are you sure you want to delete <strong className="text-gray-800 dark:text-gray-200">{selectedEmployee?.name}</strong>? This action cannot be undone.
                    </p>
                    <div className="mt-8 flex justify-center space-x-4">
                        <button
                            onClick={() => setDeleteModalOpen(false)}
                            className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-gray-600 hover:to-gray-800 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-red-600 hover:to-red-800 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>

        </AuthenticatedLayout>
    );
};

export default Index;
