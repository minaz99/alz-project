package com.alzproject.alzproject.patient;

import com.alzproject.alzproject.registration.Gender;
import com.alzproject.alzproject.registration.RegisteredBy;
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
                              Gender gender,
                              String phoneNumber,
                              String addressId,
                              String illnessType,
                              String conditionDescription,
                              String caregivers,
                              RegisteredBy registeredBy) {

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

        if(gender != null &&
                !Objects.equals(patient.getGender(), gender)){
            patient.setGender(gender);
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

        if(caregivers != null && !caregivers.isEmpty() &&
                !Objects.equals(patient.getCaregivers(), caregivers)){
            patient.setCaregivers(caregivers);
        }

        if(registeredBy != null &&
                !Objects.equals(patient.getRegisteredBy(), registeredBy)){
            patient.setRegisteredBy(registeredBy);
        }
    }

//    public List<Caregiver> getCaregivers(Long patientId) {
//
//        Patient patient = patientRepository.findById(patientId)
//                .orElseThrow(() -> new IllegalStateException("Non-existing patient id"));
//
//        List<String> caregivers = Arrays.asList((patient.getCaregivers()).split("[,]", 0));
//
//        if(caregivers.size() == 0){
//            throw new IllegalStateException("No caregivers assigned");
//        }
//
//        List<Caregiver> caregiverIds = new ArrayList<>();
//        //for(String s : caregivers) caregiverIds.add(caregiverService.getCaregiver(Long.valueOf(s)));
//
//        return caregiverIds;
//    }
//
//    @Transactional
    public void addCaregivers(Long patientId, Long caregiverId) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalStateException("Non-existing patient id"));

        String[] caregivers = patient.getCaregivers().split(",",0);

        List<Long> caregiverIds = new ArrayList<>();
        for(String s : caregivers) caregiverIds.add(Long.valueOf(s));

        if(!caregiverIds.contains(caregiverId)){
            caregiverIds.add(caregiverId);
        }else{
            throw new IllegalStateException("Caregiver is already added for this patient");
        }

        String newCaregivers = "";
        for(Long l : caregiverIds) newCaregivers = newCaregivers.concat(l + ",");

        //caregiverService.addPatients(caregiverId, patientId);
        patient.setCaregivers(newCaregivers);
    }
//
//    @Transactional
//    public void deleteCaregivers(Long patientId, Long caregiverId) {
//
//        Patient patient = patientRepository.findById(patientId)
//                .orElseThrow(() -> new IllegalStateException("Non-existing patient id"));
//
//        List<String> caregivers = Arrays.asList((patient.getCaregivers()).split("[,]", 0));
//
//        if(caregivers.size() == 0){
//            throw new IllegalStateException("No caregivers");
//        }
//
//        List<Long> caregiverIds = new ArrayList<>();
//        for(String s : caregivers) caregiverIds.add(Long.valueOf(s));
//
//        if(caregiverIds.contains(caregiverId)){
//            caregiverIds.remove(caregiverId);
//        }else{
//            throw new IllegalStateException("Non-existing caregiver for this patient");
//        }
//
//        String newCaregivers = "";
//        for(Long l : caregiverIds) newCaregivers = newCaregivers.concat(l + ",");
//
//        //caregiverService.deletePatients(caregiverId, patientId);
//        patient.setCaregivers(newCaregivers);
//    }
}
