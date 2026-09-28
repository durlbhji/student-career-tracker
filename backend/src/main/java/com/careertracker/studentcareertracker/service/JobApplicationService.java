package com.careertracker.studentcareertracker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.careertracker.studentcareertracker.entity.JobApplication;
import com.careertracker.studentcareertracker.repository.JobApplicationRepository;

@Service
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;

    public JobApplicationService(JobApplicationRepository jobApplicationRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
    }

    public JobApplication saveApplication(JobApplication application) {
        return jobApplicationRepository.save(application);
    }

    public List<JobApplication> getAllApplications() {
        return jobApplicationRepository.findAll();
    }
    public void deleteApplication(Long id) {
    jobApplicationRepository.deleteById(id);
}
public JobApplication updateApplication(
        Long id, JobApplication updatedApplication) {

    JobApplication application = jobApplicationRepository
            .findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Application not found"));

    application.setCompany(updatedApplication.getCompany());
    application.setRole(updatedApplication.getRole());
    application.setLocation(updatedApplication.getLocation());
    application.setStatus(updatedApplication.getStatus());
    application.setApplicationDate(
            updatedApplication.getApplicationDate());

    return jobApplicationRepository.save(application);
}
}