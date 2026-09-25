package com.careertracker.studentcareertracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.careertracker.studentcareertracker.entity.Interview;

public interface InterviewRepository extends JpaRepository<Interview, Long> {

}