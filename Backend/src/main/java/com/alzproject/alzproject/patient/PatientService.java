package com.alzproject.alzproject.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

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
        return patientRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Non-existing patient id"));
    }

    public void registerPatient(Patient patient) {
        boolean patientExists = patientRepository.findPatientByEmail(patient.getEmail()).isPresent();
        if(patientExists){
            throw new IllegalStateException("Existing patient");
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
            throw new IllegalStateException("Non-existing patient id");
        }
        patientRepository.deleteById(id);
    }

    @Transactional
    public void updatePatient(Long id,
                              String firstName,
                              String lastName,
                              String email,
                              String password,
                              LocalDate dateOfBirth,
                              String phoneNumber,
                              String addressId,
                              String illnessType,
                              String conditionDescription) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Non-existing patient id"));

        if(firstName != null && !firstName.isEmpty() &&
                !Objects.equals(patient.getFirstName(), firstName)){
            patient.setFirstName(firstName);
        }

        if(lastName != null && !lastName.isEmpty() &&
                !Objects.equals(patient.getLastName(), lastName)){
            patient.setLastName(lastName);
        }

        boolean emailExists = patientRepository.findPatientByEmail(email).isPresent();

        if(email != null && !email.isEmpty() &&
                !Objects.equals(patient.getEmail(), email) && !emailExists){
            patient.setEmail(email);
        }

        if(password != null && !password.isEmpty() &&
                !Objects.equals(patient.getPassword(), password)){
            patient.setPassword(password);
        }

        if(dateOfBirth != null &&
                !Objects.equals(patient.getDateOfBirth(), dateOfBirth)){
            patient.setDateOfBirth(dateOfBirth);
        }

        if(phoneNumber != null && !phoneNumber.isEmpty() &&
                !Objects.equals(patient.getPhoneNumber(), phoneNumber)){
            patient.setPhoneNumber(phoneNumber);
        }

        if(addressId != null && !addressId.isEmpty() &&
                !Objects.equals(patient.getAddressId(), addressId)){
            patient.setAddressId(addressId);
        }

        if(illnessType != null && !illnessType.isEmpty() &&
                !Objects.equals(patient.getIllnessType(), illnessType)){
            patient.setIllnessType(illnessType);
        }

        if(conditionDescription != null && !conditionDescription.isEmpty() &&
                !Objects.equals(patient.getConditionDescription(), conditionDescription)){
            patient.setConditionDescription(conditionDescription);
        }
    }
}
