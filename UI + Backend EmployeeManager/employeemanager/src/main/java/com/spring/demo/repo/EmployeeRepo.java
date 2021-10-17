package com.spring.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.demo.model.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long>{

	void deleteAllById(Long id);

	 Employee findEmployeeById(Long id);

}
