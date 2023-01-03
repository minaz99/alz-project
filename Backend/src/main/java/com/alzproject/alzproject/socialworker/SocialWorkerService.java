package com.alzproject.alzproject.socialworker;

import com.alzproject.alzproject.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class SocialWorkerService {

    private final SocialWorkerRepository socialWorkerRepository;
    private final UserRepository userRepository;

    @Autowired
    public SocialWorkerService(SocialWorkerRepository socialWorkerRepository, UserRepository userRepository) {
        this.socialWorkerRepository = socialWorkerRepository;
        this.userRepository = userRepository;
    }

    public List<SocialWorker> getActiveSocialWorkers() {
        List<SocialWorker> all = socialWorkerRepository.findAll()
                .stream()
                .filter(obj -> obj instanceof SocialWorker)
                .map(obj -> (SocialWorker) obj)
                .collect(Collectors.toList());
        all.removeIf(s -> !s.isActivated());
        return all;
    }

    public List<SocialWorker> getNotActivatedSocialWorkers() {
        List<SocialWorker> all = socialWorkerRepository.findAll()
                .stream()
                .filter(obj -> obj instanceof SocialWorker)
                .map(obj -> (SocialWorker) obj)
                .collect(Collectors.toList());
        all.removeIf(SocialWorker::isActivated);
        return all;
    }

    public SocialWorker getSocialWorker(Long id){
        return socialWorkerRepository.findById(id)
                .filter(obj -> obj instanceof SocialWorker)
                .map(obj -> (SocialWorker) obj)
                .orElseThrow(() -> new IllegalStateException("Non-existing social worker id"));
    }

    public void registerSocialWorker(SocialWorker socialWorker) {
        boolean socialWorkerExists = userRepository.findUserByEmail(socialWorker.getEmail()).isPresent();
        if(socialWorkerExists){
            throw new IllegalStateException("Existing email. Cannot register social worker!");
        }

        //encrypt password

        socialWorkerRepository.save(socialWorker);
    }

    public void deleteSocialWorker(Long id) {
        boolean idExists = socialWorkerRepository.findById(id)
                .filter(obj -> obj instanceof SocialWorker)
                .map(obj -> (SocialWorker) obj).isPresent();
        if(!idExists){
            throw new IllegalStateException("Non-existing social worker id");
        }
        socialWorkerRepository.deleteById(id);
    }

    @Transactional
    public void activateSocialWorker(Long id){
        SocialWorker socialWorker = socialWorkerRepository.findById(id)
                .filter(obj -> obj instanceof SocialWorker)
                .map(obj -> (SocialWorker) obj)
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
                                   String addressId,
                                   String coordinates) {

        SocialWorker socialWorker = socialWorkerRepository.findById(id)
                .filter(obj -> obj instanceof SocialWorker)
                .map(obj -> (SocialWorker) obj)
                .orElseThrow(() -> new IllegalStateException("Non-existing social worker id"));

        if(firstName != null && !firstName.isEmpty() &&
                !Objects.equals(socialWorker.getFirstName(), firstName)){
            socialWorker.setFirstName(firstName);
        }

        if(lastName != null && !lastName.isEmpty() &&
                !Objects.equals(socialWorker.getLastName(), lastName)){
            socialWorker.setLastName(lastName);
        }

        boolean emailExists = socialWorkerRepository.findUserByEmail(email).isPresent();

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

        if(coordinates != null && !coordinates.isEmpty() &&
                !Objects.equals(socialWorker.getCoordinates(), coordinates)){
            socialWorker.setCoordinates(coordinates);
        }
    }
}
