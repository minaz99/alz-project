package com.alzproject.alzproject.user;

import com.alzproject.alzproject.caregiver.Caregiver;
import com.alzproject.alzproject.caregiver.CaregiverRepository;
import com.alzproject.alzproject.caregiver.CaregiverService;
import com.alzproject.alzproject.patient.Patient;
import com.alzproject.alzproject.patient.PatientRepository;
import com.alzproject.alzproject.patient.PatientService;
import com.alzproject.alzproject.socialworker.SocialWorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserService {

    private final PatientService patientService;
    private final CaregiverService caregiverService;
    private final SocialWorkerService socialWorkerService;
    private final PatientRepository patientRepository;
    private final CaregiverRepository caregiverRepository;

    @Autowired
    public UserService(PatientService patientService,
                       CaregiverService caregiverService,
                       SocialWorkerService socialWorkerService,
                       PatientRepository patientRepository,
                       CaregiverRepository caregiverRepository) {
        this.patientService = patientService;
        this.caregiverService = caregiverService;
        this.socialWorkerService = socialWorkerService;
        this.patientRepository = patientRepository;
        this.caregiverRepository = caregiverRepository;
    }

    public List<Object> getAllUsers(){
        List<Object> allUsers = new ArrayList<>();

        allUsers.addAll(patientService.getPatients());
        allUsers.addAll(caregiverService.getCaregivers());
        allUsers.addAll(socialWorkerService.getActiveSocialWorkers());

        return allUsers;
    }

    public List<Object> getPatientsAndCaregivers(){
        List<Object> allUsers = new ArrayList<>();

        allUsers.addAll(patientService.getPatients());
        allUsers.addAll(caregiverService.getCaregivers());

        return allUsers;
    }

    public List<Object> getPatientsAndSocialWorkers(){
        List<Object> allUsers = new ArrayList<>();

        allUsers.addAll(patientService.getPatients());
        allUsers.addAll(socialWorkerService.getActiveSocialWorkers());

        return allUsers;
    }

    public List<Object> getCaregiversAndSocialWorkers(){
        List<Object> allUsers = new ArrayList<>();

        allUsers.addAll(caregiverService.getCaregivers());
        allUsers.addAll(socialWorkerService.getActiveSocialWorkers());

        return allUsers;
    }

    public List<Caregiver> getCaregiversOfPatient(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalStateException("Non-existing patient id"));

        if(Objects.equals(patient.getCaregivers(), "")){
            throw new IllegalStateException("No caregivers assigned");
        }

        String[] caregivers = (patient.getCaregivers()).split("[,]", 0);

        List<Caregiver> caregiverIds = new ArrayList<>();
        for(String s : caregivers) caregiverIds.add(caregiverService.getCaregiver(Long.valueOf(s)));

        return caregiverIds;
    }

    @Transactional
    public void addCaregiversToPatient(Long patientId, Long caregiverId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalStateException("Non-existing patient id"));

        Caregiver caregiver = caregiverRepository.findById(caregiverId)
                .orElseThrow(() -> new IllegalStateException("Non-existing caregiver id"));

        if(!patient.getCaregivers().contains(caregiverId.toString())) {
            patient.setCaregivers(patient.getCaregivers().concat(caregiverId + ","));
        }else{
            throw new IllegalStateException("Caregiver already added");
        }
        if(!caregiver.getPatients().contains(patientId.toString())){
            caregiver.setPatients(caregiver.getPatients().concat(patientId + ","));
        }else{
            throw new IllegalStateException("Patient already added");
        }
    }

    @Transactional
    public void deleteCaregiversFromPatient(Long patientId, Long caregiverId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalStateException("Non-existing patient id"));

        if(Objects.equals(patient.getCaregivers(), "")){
            throw new IllegalStateException("No caregivers to remove");
        }

        Caregiver caregiver = caregiverRepository.findById(caregiverId)
                .orElseThrow(() -> new IllegalStateException("Non-existing caregiver id"));

        String[] caregivers = (patient.getCaregivers()).split("[,]", 0);

        List<Long> caregiverIds = new ArrayList<>();
        for(String s : caregivers) caregiverIds.add(Long.valueOf(s));

        if(caregiverIds.contains(caregiverId)){
            caregiverIds.remove(caregiverId);
        }else{
            throw new IllegalStateException("Non-existing caregiver for this patient");
        }

        String newCaregivers = "";
        for(Long l : caregiverIds) newCaregivers = newCaregivers.concat(l + ",");

        patient.setCaregivers(newCaregivers);

        String[] patients = (caregiver.getPatients()).split("[,]", 0);

        List<Long> patientsIds = new ArrayList<>();
        for(String s : patients) patientsIds.add(Long.valueOf(s));

        if(patientsIds.contains(patientId)){
            patientsIds.remove(patientId);
        }else{
            throw new IllegalStateException("Non-existing patient for this caregiver");
        }

        String newPatients = "";
        for(Long l : patientsIds) newPatients = newPatients.concat(l + ",");

        caregiver.setPatients(newPatients);
    }

    public List<Patient> getPatientsOfCaregiver(Long caregiverId) {

        Caregiver caregiver = caregiverRepository.findById(caregiverId)
                .orElseThrow(() -> new IllegalStateException("Non-existing caregiver id"));

        if(Objects.equals(caregiver.getPatients(), "")){
            throw new IllegalStateException("No caregivers assigned");
        }

        String[] patients = (caregiver.getPatients()).split("[,]", 0);

        List<Patient> patientsIds = new ArrayList<>();
        for(String s : patients) patientsIds.add(patientService.getPatient(Long.valueOf(s)));

        return patientsIds;
    }

    @Transactional
    public void addPatientsToCaregiver(Long caregiverId, Long patientId) {
        Caregiver caregiver = caregiverRepository.findById(caregiverId)
                .orElseThrow(() -> new IllegalStateException("Non-existing caregiver id"));

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalStateException("Non-existing patient id"));

        if(!caregiver.getPatients().contains(patientId.toString())){
            caregiver.setPatients(caregiver.getPatients().concat(patientId + ","));
        }else{
            throw new IllegalStateException("Patient already added");
        }
        if(!patient.getCaregivers().contains(caregiverId.toString())) {
            patient.setCaregivers(patient.getCaregivers().concat(caregiverId + ","));
        }else{
            throw new IllegalStateException("Caregiver already added");
        }
    }

    @Transactional
    public void deletePatientsFromCaregiver(Long caregiverId, Long patientId) {
        Caregiver caregiver = caregiverRepository.findById(caregiverId)
                .orElseThrow(() -> new IllegalStateException("Non-existing caregiver id"));

        if(Objects.equals(caregiver.getPatients(), "")){
            throw new IllegalStateException("No patients to remove");
        }

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalStateException("Non-existing patient id"));

        String[] patients = (caregiver.getPatients()).split("[,]", 0);

        List<Long> patientsIds = new ArrayList<>();
        for(String s : patients) patientsIds.add(Long.valueOf(s));

        if(patientsIds.contains(patientId)){
            patientsIds.remove(patientId);
        }else{
            throw new IllegalStateException("Non-existing patient for this caregiver");
        }

        String newPatients = "";
        for(Long l : patientsIds) newPatients = newPatients.concat(l + ",");

        caregiver.setPatients(newPatients);

        String[] caregivers = (patient.getCaregivers()).split("[,]", 0);

        List<Long> caregiverIds = new ArrayList<>();
        for(String s : caregivers) caregiverIds.add(Long.valueOf(s));

        if(caregiverIds.contains(caregiverId)){
            caregiverIds.remove(caregiverId);
        }else{
            throw new IllegalStateException("Non-existing caregiver for this patient");
        }

        String newCaregivers = "";
        for(Long l : caregiverIds) newCaregivers = newCaregivers.concat(l + ",");

        patient.setCaregivers(newCaregivers);
    }

    //Login security

    private final static String USER_NOT_FOUND_MSG =
            "user with email %s not found";

    private final UserRepository UserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        return UserRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                String.format(USER_NOT_FOUND_MSG, email)));
    }

    public String signUpUser(User User) {
        boolean userExists = appUserRepository
                .findByEmail(User.getEmail())
                .isPresent();

        if (userExists) {
            throw new IllegalStateException("email already taken");
        }

        String encodedPassword = bCryptPasswordEncoder
                .encode(User.getPassword());

        User.setPassword(encodedPassword);

        UserRepository.save(User);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                User
        );

        confirmationTokenService.saveConfirmationToken(
                confirmationToken);
        return token;
    }
    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }


//    public boolean checkEmailExists(String email) {
//        boolean patient = patientRepository.findPatientByEmail(email).isPresent();
//        boolean caregiver = caregiverRepository.findCaregiverByEmail(email).isPresent();
//        boolean socialWorker = socialWorkerRepository.findSocialWorkerByEmail(email).isPresent();
//        boolean admin = adminRepository.findAdminByEmail(email).isPresent();
//        return (patient & caregiver & socialWorker & admin);
//    }
}
