
package com.careertracker.studentcareertracker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.careertracker.studentcareertracker.entity.DsaTopic;
import com.careertracker.studentcareertracker.repository.DsaTopicRepository;

@Service
public class DsaTopicService {

    private final DsaTopicRepository dsaTopicRepository;

    public DsaTopicService(DsaTopicRepository dsaTopicRepository) {
        this.dsaTopicRepository = dsaTopicRepository;
    }

    public DsaTopic saveTopic(DsaTopic topic) {
        return dsaTopicRepository.save(topic);
    }

    public List<DsaTopic> getAllTopics() {
        return dsaTopicRepository.findAll();
    }

    public DsaTopic updateTopic(Long id, DsaTopic updatedTopic) {
        DsaTopic existingTopic = dsaTopicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DSA topic not found"));

        existingTopic.setTopic(updatedTopic.getTopic());
        existingTopic.setStatus(updatedTopic.getStatus());
        existingTopic.setProgress(updatedTopic.getProgress());

        return dsaTopicRepository.save(existingTopic);
    }

    public void deleteTopic(Long id) {
        dsaTopicRepository.deleteById(id);
    }
}