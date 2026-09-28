
package com.careertracker.studentcareertracker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.careertracker.studentcareertracker.entity.Interview;
import com.careertracker.studentcareertracker.repository.InterviewRepository;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;

    public InterviewService(InterviewRepository interviewRepository) {
        this.interviewRepository = interviewRepository;
    }

    public Interview saveInterview(Interview interview) {
        return interviewRepository.save(interview);
    }

    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }

    public Interview updateInterview(Long id, Interview updatedInterview) {
        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview not found"));

        interview.setCompany(updatedInterview.getCompany());
        interview.setRole(updatedInterview.getRole());
        interview.setInterviewDate(updatedInterview.getInterviewDate());
        interview.setRound(updatedInterview.getRound());
        interview.setResult(updatedInterview.getResult());
        interview.setNotes(updatedInterview.getNotes());

        return interviewRepository.save(interview);
    }

    public void deleteInterview(Long id) {
        interviewRepository.deleteById(id);
    }
}