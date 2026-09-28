
package com.careertracker.studentcareertracker.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careertracker.studentcareertracker.entity.ResumeProfile;
import com.careertracker.studentcareertracker.service.ResumeProfileService;

@RestController
@RequestMapping("/api/resume")
public class ResumeProfileController {

    private final ResumeProfileService resumeProfileService;

    public ResumeProfileController(ResumeProfileService resumeProfileService) {
        this.resumeProfileService = resumeProfileService;
    }

    @PostMapping
    public ResumeProfile createProfile(@RequestBody ResumeProfile profile) {
        return resumeProfileService.saveProfile(profile);
    }

    @GetMapping
    public List<ResumeProfile> getAllProfiles() {
        return resumeProfileService.getAllProfiles();
    }

    @PutMapping("/{id}")
    public ResumeProfile updateProfile(
            @PathVariable Long id,
            @RequestBody ResumeProfile profile) {
        return resumeProfileService.updateProfile(id, profile);
    }
}