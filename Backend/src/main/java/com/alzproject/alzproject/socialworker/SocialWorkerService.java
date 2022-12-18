package com.alzproject.alzproject.socialworker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
public class SocialWorkerService {

    private final SocialWorkerRepository socialWorkerRepository;

    @Autowired
    public SocialWorkerService(SocialWorkerRepository socialWorkerRepository) {
        this.socialWorkerRepository = socialWorkerRepository;
    }

    public List<SocialWorker> getActiveSocialWorkers() {
        List<SocialWorker> all = socialWorkerRepository.findAll();
        all.removeIf(s -> !s.isActivated());
        return all;
    }

    public List<SocialWorker> getNotActivatedSocialWorkers() {
        List<SocialWorker> all = socialWorkerRepository.findAll();
        all.removeIf(s -> s.isActivated());
        return all;
    }

    public SocialWorker getSocialWorker(Long id) {
        return socialWorkerRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Non-existing social worker id"));
    }

    public void registerSocialWorker(SocialWorker socialWorker) {

        boolean socialWorkerExists = socialWorkerRepository.findSocialWorkerByEmail(socialWorker.getEmail()).isPresent();
        if(socialWorkerExists){
            throw new IllegalStateException("Existing social worker");
        }

        //encrypt password

        socialWorkerRepository.save(socialWorker);
    }

    public void deleteSocialWorker(Long id) {

        boolean idExists = socialWorkerRepository.findById(id).isPresent();
        if(!idExists){
            throw new IllegalStateException("Non-existing social worker id");
        }
        socialWorkerRepository.deleteById(id);
    }

    @Transactional
    public void activateSocialWorker(Long id){

        SocialWorker socialWorker = socialWorkerRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Non-existing social worker id"));

        socialWorker.setActivated(true);
    }

    @Transactional
    public void updateSocialWorker(Long id,
                                   String firstName,
                                   String lastName,
                                   String email,
                                   String password,
                                   LocalDate dateOfBirth,
                                   String phoneNumber,
                                   String addressId) {

        SocialWorker socialWorker = socialWorkerRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Non-existing social worker id"));

        if(firstName != null && !firstName.isEmpty() &&
                !Objects.equals(socialWorker.getFirstName(), firstName)){
            socialWorker.setFirstName(firstName);
        }

        if(lastName != null && !lastName.isEmpty() &&
                !Objects.equals(socialWorker.getLastName(), lastName)){
            socialWorker.setLastName(lastName);
        }

        boolean emailExists = socialWorkerRepository.findSocialWorkerByEmail(email).isPresent();

        if(email != null && !email.isEmpty() &&
                !Objects.equals(socialWorker.getEmail(), email) && !emailExists){
            socialWorker.setEmail(email);
        }

        //encrypt pass
        if(password != null && !password.isEmpty() &&
                !Objects.equals(socialWorker.getPassword(), password)){
            socialWorker.setPassword(password);
        }

        if(dateOfBirth != null &&
                !Objects.equals(socialWorker.getDateOfBirth(), dateOfBirth)){
            socialWorker.setDateOfBirth(dateOfBirth);
        }

        if(phoneNumber != null && !phoneNumber.isEmpty() &&
                !Objects.equals(socialWorker.getPhoneNumber(), phoneNumber)){
            socialWorker.setPhoneNumber(phoneNumber);
        }

        if(addressId != null && !addressId.isEmpty() &&
                !Objects.equals(socialWorker.getAddressId(), addressId)){
            socialWorker.setAddressId(addressId);
        }
    }
}
