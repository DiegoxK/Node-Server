import { Request, Response } from "express";
import employees from "../models/employees.json";

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  salary: number;
}

interface EmployeeData {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
}

const employeeData: EmployeeData = {
  employees: employees,
  setEmployees: function (data: Employee[]) {
    this.employees = data;
  },
};

export const getAllEmployees = (_req: Request, res: Response) => {
  res.status(200).json(employeeData.employees);
};

export const createNewEmployee = (req: Request, res: Response) => {
  const newEmployee: Employee = {
    id: employeeData.employees.length + 1,
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
    salary: req.body.salary,
  };

  if (
    !newEmployee.name ||
    !newEmployee.position ||
    !newEmployee.department ||
    !newEmployee.salary
  ) {
    return res.status(400).json({ msg: "Please include all fields" });
  }

  employeeData.setEmployees([...employeeData.employees, newEmployee]);
  res.status(201).json(employeeData.employees);
};

export const updateEmployee = (req: Request, res: Response) => {
  const found = employeeData.employees.some(
    (employee) => employee.id === parseInt(req.params.id)
  );

  if (found) {
    const updatedEmployee = req.body;
    employeeData.employees.forEach((employee) => {
      if (employee.id === parseInt(req.params.id)) {
        employee.name = updatedEmployee.name
          ? updatedEmployee.name
          : employee.name;
        employee.position = updatedEmployee.position
          ? updatedEmployee.position
          : employee.position;
        employee.department = updatedEmployee.department
          ? updatedEmployee.department
          : employee.department;
        employee.salary = updatedEmployee.salary
          ? updatedEmployee.salary
          : employee.salary;
      }
    });
    res.status(200).json(employeeData.employees);
  } else {
    res
      .status(400)
      .json({ msg: `No employee with the id of ${req.params.id}` });
  }
};

export const deleteEmployee = (req: Request, res: Response) => {
  const found = employeeData.employees.some(
    (employee) => employee.id === parseInt(req.params.id)
  );

  if (found) {
    employeeData.setEmployees(
      employeeData.employees.filter(
        (employee) => employee.id !== parseInt(req.params.id)
      )
    );
    res.status(200).json(employeeData.employees);
  } else {
    res
      .status(400)
      .json({ msg: `No employee with the id of ${req.params.id}` });
  }
};

export const getEmployee = (req: Request, res: Response) => {
  const employee = employeeData.employees.find(
    (employee) => employee.id === parseInt(req.params.id)
  );

  if (!employee) {
    res
      .status(400)
      .json({ msg: `No employee with the id of ${req.params.id}` });
  }

  res.status(200).json(employee);
};
