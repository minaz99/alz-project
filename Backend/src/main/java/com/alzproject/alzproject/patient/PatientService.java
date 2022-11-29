package com.alzproject.alzproject.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class PatientService{

    private final PatientRepository patientRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatient(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Non-existing id"));
        return patient;
    }

    public void registerPatient(Patient patient) {
        boolean patientExists = patientRepository.findPatientByEmail(patient.getEmail()).isPresent();
        if(patientExists){
            throw new IllegalStateException("Existing email");
        }
//        String encodedPassword = bCryptPasswordEncoder
//                .encode(patient.getPassword());
//
//        patient.setPassword(encodedPassword);

        patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        boolean idExists = patientRepository.findById(id).isPresent();
        if(!idExists){
            throw new IllegalStateException("Non-existing id");
        }
        patientRepository.deleteById(id);
    }

    @Transactional
    public void updatePatient(Long id, String firstName, String lastName, String email) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Non-existing id"));

        if(firstName.length() > 0 &&
                !Objects.equals(patient.getFirstName(), firstName)){
            patient.setFirstName(firstName);
        }

        if(lastName.length() > 0 &&
                !Objects.equals(patient.getLastName(), lastName)){
            patient.setLastName(lastName);
        }

        boolean emailExists = patientRepository.findPatientByEmail(email).isPresent();

        if(email.length() > 0 &&
                !Objects.equals(patient.getEmail(), email) && !emailExists){
            patient.setEmail(email);
        }
    }

    public List<Long> getCaregivers(Long patientId) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalStateException("Non-existing id"));

        List<String> caregivers = Arrays.asList((patient.getCaregivers()).split("[,]", 0));

        if(caregivers.size() == 0){
            throw new IllegalStateException("No caregivers");
        }

        List<Long> caregiverIds = new ArrayList<>();
        for(String s : caregivers) caregiverIds.add(Long.valueOf(s));

        return caregiverIds;
    }

    @Transactional
    public void addCaregivers(Long patientId, Long caregiverId) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalStateException("Non-existing id"));

        //check if the caregiver exists
        //check if the list is empty

        List<String> caregivers = Arrays.asList((patient.getCaregivers()).split("[,]", 0));

        if(caregivers.size() == 0){
            throw new IllegalStateException("No caregivers");
        }

        List<Long> caregiverIds = new ArrayList<>();
        for(String s : caregivers) caregiverIds.add(Long.valueOf(s));

        if(!caregiverIds.contains(caregiverId)){
            caregiverIds.add(caregiverId);
        }else{
            throw new IllegalStateException("Caregiver already added");
        }

        String newCaregivers = "";
        for(Long l : caregiverIds) newCaregivers = newCaregivers + l + ",";

        patient.setCaregivers(newCaregivers);
    }

    @Transactional
    public void deleteCaregivers(Long patientId, Long caregiverId) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalStateException("Non-existing id"));

        //check if the caregiver exists
        //check if the list is empty

        List<String> caregivers = Arrays.asList((patient.getCaregivers()).split("[,]", 0));

        if(caregivers.size() == 0){
            throw new IllegalStateException("No caregivers");
        }

        List<Long> caregiverIds = new ArrayList<>();
        for(String s : caregivers) caregiverIds.add(Long.valueOf(s));

        if(caregiverIds.contains(caregiverId)){
            caregiverIds.remove(caregiverIds.indexOf(caregiverId));
        }else{
            throw new IllegalStateException("Non-existing caregiver for this patient");
        }

        String newCaregivers = "";
        for(Long l : caregiverIds) newCaregivers = newCaregivers + l + ",";

        patient.setCaregivers(newCaregivers);
    }
}
