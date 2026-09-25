package com.careertracker.studentcareertracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.careertracker.studentcareertracker.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}