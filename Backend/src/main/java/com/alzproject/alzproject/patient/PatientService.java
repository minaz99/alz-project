package com.alzproject.alzproject.patient;

import com.alzproject.alzproject.user.User;
import com.alzproject.alzproject.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PatientService{

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository, UserRepository userRepository) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    public List<User> getPatients() {
        return patientRepository.findAll()
                .stream()
                .filter(obj -> obj instanceof Patient)
                .map(obj -> (Patient) obj)
                .collect(Collectors.toList());
    }

    public Patient getPatient(Long id) {
        return patientRepository.findById(id)
                .filter(obj -> obj instanceof Patient)
                .map(obj -> (Patient) obj)
                .orElseThrow(() -> new IllegalStateException("Non-existing patient id"));
    }

    public void registerPatient(Patient patient) {
        boolean patientExists = userRepository.findUserByEmail(patient.getEmail()).isPresent();
        if(patientExists){
            throw new IllegalStateException("Existing email. Cannot register patient!");
        }
//        String encodedPassword = bCryptPasswordEncoder
//                .encode(patient.getPassword());
//
//        patient.setPassword(encodedPassword);

        patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        boolean idExists = patientRepository.findById(id)
                .filter(obj -> obj instanceof Patient)
                .map(obj -> (Patient) obj).isPresent();
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
                              String coordinates,
                              String illnessType,
                              String conditionDescription,
                              String needs) {

        Patient patient = patientRepository.findById(id)
                .filter(obj -> obj instanceof Patient)
                .map(obj -> (Patient) obj)
                .orElseThrow(() -> new IllegalStateException("Non-existing patient id"));

        if(firstName != null && !firstName.isEmpty() &&
                !Objects.equals(patient.getFirstName(), firstName)){
            patient.setFirstName(firstName);
        }

        if(lastName != null && !lastName.isEmpty() &&
                !Objects.equals(patient.getLastName(), lastName)){
            patient.setLastName(lastName);
        }

        boolean emailExists = userRepository.findUserByEmail(email).isPresent();

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

        if(coordinates != null && !coordinates.isEmpty() &&
                !Objects.equals(patient.getCoordinates(), coordinates)){
            patient.setCoordinates(coordinates);
        }

        if(illnessType != null && !illnessType.isEmpty() &&
                !Objects.equals(patient.getIllnessType(), illnessType)){
            patient.setIllnessType(illnessType);
        }

        if(conditionDescription != null && !conditionDescription.isEmpty() &&
                !Objects.equals(patient.getConditionDescription(), conditionDescription)){
            patient.setConditionDescription(conditionDescription);
        }

        if(needs != null && !needs.isEmpty() &&
                !Objects.equals(patient.getNeeds(), needs)){
            patient.setNeeds(needs);
        }
    }
}
