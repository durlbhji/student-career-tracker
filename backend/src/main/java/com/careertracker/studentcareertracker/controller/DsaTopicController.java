
package com.careertracker.studentcareertracker.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careertracker.studentcareertracker.entity.DsaTopic;
import com.careertracker.studentcareertracker.service.DsaTopicService;

@RestController
@RequestMapping("/api/dsa")
public class DsaTopicController {

    private final DsaTopicService dsaTopicService;

    public DsaTopicController(DsaTopicService dsaTopicService) {
        this.dsaTopicService = dsaTopicService;
    }

    @PostMapping
    public DsaTopic createTopic(@RequestBody DsaTopic topic) {
        return dsaTopicService.saveTopic(topic);
    }

    @GetMapping
    public List<DsaTopic> getAllTopics() {
        return dsaTopicService.getAllTopics();
    }

    @PutMapping("/{id}")
    public DsaTopic updateTopic(
            @PathVariable Long id,
            @RequestBody DsaTopic topic) {
        return dsaTopicService.updateTopic(id, topic);
    }

    @DeleteMapping("/{id}")
    public void deleteTopic(@PathVariable Long id) {
        dsaTopicService.deleteTopic(id);
    }
}