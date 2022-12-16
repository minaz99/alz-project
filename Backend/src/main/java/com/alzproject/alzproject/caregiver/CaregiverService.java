package com.alzproject.alzproject.caregiver;

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
                                String phoneNumber,
                                String addressId,
                                String needs) {
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
    }
}
