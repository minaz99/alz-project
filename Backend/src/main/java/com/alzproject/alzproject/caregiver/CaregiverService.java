package com.alzproject.alzproject.caregiver;

import com.alzproject.alzproject.registration.Gender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
public class CaregiverService {

    private final CaregiverRepository caregiverRepository;

    @Autowired
    public CaregiverService(CaregiverRepository caregiverRepository) {
        this.caregiverRepository = caregiverRepository;
    }

    public List<Caregiver> getCaregivers() {
        return caregiverRepository.findAll();
    }

    public Caregiver getCaregiver(Long id) {
        return caregiverRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Non-existing caregiver id"));
    }

    public void registerCaregiver(Caregiver caregiver) {
        boolean caregiverExists = caregiverRepository.findCaregiverByEmail(caregiver.getEmail()).isPresent();
        if(caregiverExists){
            throw new IllegalStateException("Existing caregiver");
        }

        //encrypt password

        caregiverRepository.save(caregiver);
    }

    public void deleteCaregiver(Long id) {
        boolean idExists = caregiverRepository.findById(id).isPresent();
        if(!idExists){
            throw new IllegalStateException("Non-existing caregiver id");
        }
        caregiverRepository.deleteById(id);
    }

    @Transactional
    public void updateCaregiver(Long id,
                                String firstName,
                                String lastName,
                                String email,
                                String password,
                                LocalDate dateOfBirth,
                                Gender gender,
                                String phoneNumber,
                                String addressId,
                                String needs,
                                String patients) {
        Caregiver caregiver = caregiverRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Non-existing caregiver id"));

        if(firstName != null && !firstName.isEmpty() &&
        !Objects.equals(caregiver.getFirstName(), firstName)){
            caregiver.setFirstName(firstName);
        }

        if(lastName != null && !lastName.isEmpty() &&
                !Objects.equals(caregiver.getLastName(), lastName)){
            caregiver.setLastName(lastName);
        }

        boolean emailExists = caregiverRepository.findCaregiverByEmail(email).isPresent();

        if(email != null && !email.isEmpty() &&
                !Objects.equals(caregiver.getEmail(), email) && !emailExists){
            caregiver.setEmail(email);
        }

        //encrypt pass
        if(password != null && !password.isEmpty() &&
                !Objects.equals(caregiver.getPassword(), password)){
            caregiver.setPassword(password);
        }

        if(dateOfBirth != null &&
                !Objects.equals(caregiver.getDateOfBirth(), dateOfBirth)){
            caregiver.setDateOfBirth(dateOfBirth);
        }

        if(gender != null &&
                !Objects.equals(caregiver.getGender(), gender)){
            caregiver.setGender(gender);
        }

        if(phoneNumber != null && !phoneNumber.isEmpty() &&
                !Objects.equals(caregiver.getPhoneNumber(), phoneNumber)){
            caregiver.setPhoneNumber(phoneNumber);
        }

        if(addressId != null && !addressId.isEmpty() &&
                !Objects.equals(caregiver.getAddressId(), addressId)){
            caregiver.setAddressId(addressId);
        }

        if(needs != null && !needs.isEmpty() &&
                !Objects.equals(caregiver.getNeeds(), needs)){
            caregiver.setNeeds(needs);
        }

        if(patients != null && !patients.isEmpty() &&
                !Objects.equals(caregiver.getPatients(), patients)){
            caregiver.setPatients(patients);
        }
    }

//    public List<Patient> getPatients(Long caregiverId) {
//
//        Caregiver caregiver = caregiverRepository.findById(caregiverId)
//                .orElseThrow(() -> new IllegalStateException("Non-existing caregiver id"));
//
//        List<String> patients = Arrays.asList((caregiver.getPatients()).split("[,]", 0));
//
//        if(patients.size() == 0){
//            throw new IllegalStateException("No patients assigned");
//        }
//
//        List<Patient> patientsIds = new ArrayList<>();
//        for(String s : patients) patientsIds.add(patientService.getPatient(Long.valueOf(s)));
//
//        return patientsIds;
//    }
//
//    @Transactional
//    public void addPatients(Long caregiverId, Long patientId) {
//
//        Caregiver caregiver = caregiverRepository.findById(caregiverId)
//                .orElseThrow(() -> new IllegalStateException("Non-existing caregiver id"));
//
//        String[] patients = caregiver.getPatients().split(",", 0);
//
//        List<Long> patientsIds = new ArrayList<>();
//        for(String s : patients) patientsIds.add(Long.valueOf(s));
//
//        if(!patientsIds.contains(patientId)){
//            patientsIds.add(patientId);
//        }else{
//            throw new IllegalStateException("Patient is already added for this caregiver");
//        }
//
//        String newPatients = "";
//        for(Long l : patientsIds) newPatients = newPatients.concat(l + ",");
//
//        patientService.addCaregivers(patientId, caregiverId);
//        caregiver.setPatients(newPatients);
//    }
//
//    @Transactional
//    public void deletePatients(Long caregiverId, Long patientId) {
//        Caregiver caregiver = caregiverRepository.findById(caregiverId)
//                .orElseThrow(() -> new IllegalStateException("Non-existing caregiver id"));
//
//        List<String> patients = Arrays.asList((caregiver.getPatients()).split("[,]", 0));
//
//        if(patients.size() == 0){
//            throw new IllegalStateException("No patients assigned");
//        }
//
//        List<Long> patientsIds = new ArrayList<>();
//        for(String s : patients) patientsIds.add(Long.valueOf(s));
//
//        if(patientsIds.contains(patientId)){
//            patientsIds.remove(patientId);
//        }else{
//            throw new IllegalStateException("Non-existing patient for this caregiver");
//        }
//
//        String newPatients = "";
//        for(Long l : patientsIds) newPatients = newPatients.concat(l + ",");
//
//        patientService.deleteCaregivers(patientId, caregiverId);
//        caregiver.setPatients(newPatients);
//    }
}
