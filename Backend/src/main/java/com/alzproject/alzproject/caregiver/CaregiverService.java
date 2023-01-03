package com.alzproject.alzproject.caregiver;

import com.alzproject.alzproject.user.User;
import com.alzproject.alzproject.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CaregiverService {

    private final CaregiverRepository caregiverRepository;
    private final UserRepository userRepository;

    @Autowired
    public CaregiverService(CaregiverRepository caregiverRepository, UserRepository userRepository) {
        this.caregiverRepository = caregiverRepository;
        this.userRepository = userRepository;
    }

    public List<User> getCaregivers() {
        return caregiverRepository.findAll()
                .stream()
                .filter(obj -> obj instanceof Caregiver)
                .map(obj -> (Caregiver) obj)
                .collect(Collectors.toList());
    }

    public Caregiver getCaregiver(Long id) {
        return caregiverRepository.findById(id)
                .filter(obj -> obj instanceof Caregiver)
                .map(obj -> (Caregiver) obj)
                .orElseThrow(() -> new IllegalStateException("Non-existing caregiver id"));
    }

    public void registerCaregiver(Caregiver caregiver) {
        boolean caregiverExists = userRepository.findUserByEmail(caregiver.getEmail()).isPresent();
        if(caregiverExists){
            throw new IllegalStateException("Existing email. Cannot register caregiver!");
        }

        //encrypt password

        caregiverRepository.save(caregiver);
    }

    public void deleteCaregiver(Long id) {
        boolean idExists = caregiverRepository.findById(id)
                .filter(obj -> obj instanceof Caregiver)
                .map(obj -> (Caregiver) obj).isPresent();
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
                                String coordinates,
                                String needs) {
        Caregiver caregiver = caregiverRepository.findById(id)
                .filter(obj -> obj instanceof Caregiver)
                .map(obj -> (Caregiver) obj)
                .orElseThrow(() -> new IllegalStateException("Non-existing caregiver id"));

        if(firstName != null && !firstName.isEmpty() &&
        !Objects.equals(caregiver.getFirstName(), firstName)){
            caregiver.setFirstName(firstName);
        }

        if(lastName != null && !lastName.isEmpty() &&
                !Objects.equals(caregiver.getLastName(), lastName)){
            caregiver.setLastName(lastName);
        }

        boolean emailExists = caregiverRepository.findUserByEmail(email).isPresent();

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

        if(coordinates != null && !coordinates.isEmpty() &&
                !Objects.equals(caregiver.getCoordinates(), coordinates)){
            caregiver.setCoordinates(coordinates);
        }

        if(needs != null && !needs.isEmpty() &&
                !Objects.equals(caregiver.getNeeds(), needs)){
            caregiver.setNeeds(needs);
        }
    }
}
