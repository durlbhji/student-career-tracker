package com.careertracker.studentcareertracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.careertracker.studentcareertracker.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}