
package com.careertracker.studentcareertracker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.careertracker.studentcareertracker.entity.ResumeProfile;
import com.careertracker.studentcareertracker.repository.ResumeProfileRepository;

@Service
public class ResumeProfileService {

    private final ResumeProfileRepository resumeProfileRepository;

    public ResumeProfileService(ResumeProfileRepository resumeProfileRepository) {
        this.resumeProfileRepository = resumeProfileRepository;
    }

    public ResumeProfile saveProfile(ResumeProfile profile) {
        return resumeProfileRepository.save(profile);
    }

    public List<ResumeProfile> getAllProfiles() {
        return resumeProfileRepository.findAll();
    }

    public ResumeProfile updateProfile(Long id, ResumeProfile updatedProfile) {
        ResumeProfile profile = resumeProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        profile.setName(updatedProfile.getName());
        profile.setEmail(updatedProfile.getEmail());
        profile.setPhone(updatedProfile.getPhone());
        profile.setGithub(updatedProfile.getGithub());
        profile.setLinkedin(updatedProfile.getLinkedin());
        profile.setSkills(updatedProfile.getSkills());
        profile.setEducation(updatedProfile.getEducation());
        profile.setProjects(updatedProfile.getProjects());

        return resumeProfileRepository.save(profile);
    }
}