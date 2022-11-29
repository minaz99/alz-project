package com.alzproject.alzproject.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        Patient patient = patientRepository.findById(id).orElseThrow(() -> new IllegalStateException("Non-existing id"));

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
}
