package com.careertracker.studentcareertracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.careertracker.studentcareertracker.entity.JobApplication;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

}