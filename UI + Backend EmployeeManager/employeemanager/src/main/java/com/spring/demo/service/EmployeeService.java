package com.spring.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.demo.exception.UserNotFoundException;
import com.spring.demo.model.Employee;
import com.spring.demo.repo.EmployeeRepo;
@Service
@Transactional
public class EmployeeService {

	private final EmployeeRepo employeeRepo;
	
	@Autowired
	public EmployeeService(EmployeeRepo employeeRepo) {
		
		this.employeeRepo=employeeRepo;
	}
	
	public Employee addEmployee(Employee employee) {
		employee.setEmployeeCode(UUID.randomUUID().toString());
		return employeeRepo.save(employee);
	}
	
	public List<Employee> findAllEmployees() {
        return employeeRepo.findAll();
    }

    public Employee updateEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    public  Employee findEmployeeById(Long id) {
        return employeeRepo.findEmployeeById(id);
    }

    public void deleteEmployee(Long id){
        employeeRepo.deleteAllById(id);
    }
}
