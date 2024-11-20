<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index(Request $request)
{
    $search = $request->input('search');
    $sortBy = $request->input('sort_by'); 
    $sortDirection = $request->input('sort_direction', 'asc'); // Default sort direction 'asc'

    $employees = Employee::with('creator')
        ->when($search, function ($query, $search) {
            return $query->where('name', 'like', "%{$search}%")
                         ->orWhere('position', 'like', "%{$search}%");
        })
        ->when($sortBy, function ($query, $sortBy) use ($sortDirection) {
            // Apply sorting and ensure case-insensitive sorting for names
            if ($sortBy === 'name') {
                return $query->orderByRaw("LOWER(name) {$sortDirection}");
            }
            return $query->orderBy($sortBy, $sortDirection);
        })
        ->paginate(10) // Paginate with 10 employees per page
        ->appends(['sort_by' => $sortBy, 'sort_direction' => $sortDirection]); // Persist sort parameters in pagination

    return Inertia::render('Employees/Index', [
        'employees' => $employees,
        'search' => $search,
        'sort_by' => $sortBy,
        'sort_direction' => $sortDirection,
    ]);
}


    public function create()
    {
        return Inertia::render('Employees/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) {
                    if (Employee::whereRaw('LOWER(name) = ?', [strtolower($value)])->exists()) {
                        $fail('An employee with this name already exists. Please use a different name.');
                    }
                }
            ],
            'age' => 'required|integer|min:1|max:999', // Ensures age is an integer between 1 and 999
            'position' => 'required|string|max:255',
            'hired_date' => 'required|date|before_or_equal:today', // Ensures date is not in the future
        ], [
            'age.min' => 'The age must be at least 1.',
            'age.max' => 'The age must be a number between 1 and 999.',
            'hired_date.date' => 'Please enter a valid date for the hired date.',
            'hired_date.before_or_equal' => 'The hired date cannot be in the future.',
        ]);

        Employee::create([
            'name' => $request->name,
            'age' => $request->age,
            'position' => $request->position,
            'hired_date' => $request->hired_date,
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('employees.index')->with('success', 'Employee created successfully.');
    }

    public function edit(Employee $employee)
    {
        return Inertia::render('Employees/Edit', [
            'employee' => $employee
        ]);
    }

    public function update(Request $request, Employee $employee)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer',
            'position' => 'required|string|max:255',
            'hired_date' => 'required|date|before_or_equal:today',
        ], [
            'hired_date.before_or_equal' => 'The hired date cannot be in the future.',
        ]);

        $employee->update($request->all());
        return redirect()->route('employees.index')->with('success', 'Employee updated successfully.');
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return redirect()->route('employees.index')->with('success', 'Employee deleted successfully.');
    }
}
