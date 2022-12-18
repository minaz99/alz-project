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
import java.util.Arrays;
import java.util.List;

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

        List<String> caregivers = Arrays.asList((patient.getCaregivers()).split("[,]", 0));

        if(caregivers.size() == 0){
            throw new IllegalStateException("No caregivers assigned");
        }

        List<Caregiver> caregiverIds = new ArrayList<>();
        for(String s : caregivers) caregiverIds.add(caregiverService.getCaregiver(Long.valueOf(s)));

        return caregiverIds;
    }

    @Transactional
    public void addCaregiversToPatient(Long patientId, Long caregiverId) {

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

        //addPatientsToCaregiver(caregiverId, patientId);
        patient.setCaregivers(newCaregivers);
    }

    @Transactional
    public void deleteCaregiversFromPatient(Long patientId, Long caregiverId) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalStateException("Non-existing patient id"));

        List<String> caregivers = Arrays.asList((patient.getCaregivers()).split("[,]", 0));

        if(caregivers.size() == 0){
            throw new IllegalStateException("No caregivers");
        }

        List<Long> caregiverIds = new ArrayList<>();
        for(String s : caregivers) caregiverIds.add(Long.valueOf(s));

        if(caregiverIds.contains(caregiverId)){
            caregiverIds.remove(caregiverId);
        }else{
            throw new IllegalStateException("Non-existing caregiver for this patient");
        }

        String newCaregivers = "";
        for(Long l : caregiverIds) newCaregivers = newCaregivers.concat(l + ",");

        //deletePatientsFromCaregiver(caregiverId, patientId);
        patient.setCaregivers(newCaregivers);
    }

    public List<Patient> getPatientsOfCaregiver(Long caregiverId) {

        Caregiver caregiver = caregiverRepository.findById(caregiverId)
                .orElseThrow(() -> new IllegalStateException("Non-existing caregiver id"));

        List<String> patients = Arrays.asList((caregiver.getPatients()).split("[,]", 0));

        if(patients.size() == 0){
            throw new IllegalStateException("No patients assigned");
        }

        List<Patient> patientsIds = new ArrayList<>();
        for(String s : patients) patientsIds.add(patientService.getPatient(Long.valueOf(s)));

        return patientsIds;
    }

    @Transactional
    public void addPatientsToCaregiver(Long caregiverId, Long patientId) {

        Caregiver caregiver = caregiverRepository.findById(caregiverId)
                .orElseThrow(() -> new IllegalStateException("Non-existing caregiver id"));

        String[] patients = caregiver.getPatients().split(",", 0);

        List<Long> patientsIds = new ArrayList<>();
        for(String s : patients) patientsIds.add(Long.valueOf(s));

        if(!patientsIds.contains(patientId)){
            patientsIds.add(patientId);
        }else{
            throw new IllegalStateException("Patient is already added for this caregiver");
        }

        String newPatients = "";
        for(Long l : patientsIds) newPatients = newPatients.concat(l + ",");

        //addCaregiversToPatient(patientId, caregiverId);
        caregiver.setPatients(newPatients);
    }

    @Transactional
    public void deletePatientsFromCaregiver(Long caregiverId, Long patientId) {
        Caregiver caregiver = caregiverRepository.findById(caregiverId)
                .orElseThrow(() -> new IllegalStateException("Non-existing caregiver id"));

        List<String> patients = Arrays.asList((caregiver.getPatients()).split("[,]", 0));

        if(patients.size() == 0){
            throw new IllegalStateException("No patients assigned");
        }

        List<Long> patientsIds = new ArrayList<>();
        for(String s : patients) patientsIds.add(Long.valueOf(s));

        if(patientsIds.contains(patientId)){
            patientsIds.remove(patientId);
        }else{
            throw new IllegalStateException("Non-existing patient for this caregiver");
        }

        String newPatients = "";
        for(Long l : patientsIds) newPatients = newPatients.concat(l + ",");

        //deleteCaregiversFromPatient(patientId, caregiverId);
        caregiver.setPatients(newPatients);
    }

//    public boolean checkEmailExists(String email) {
//        boolean patient = patientRepository.findPatientByEmail(email).isPresent();
//        boolean caregiver = caregiverRepository.findCaregiverByEmail(email).isPresent();
//        boolean socialWorker = socialWorkerRepository.findSocialWorkerByEmail(email).isPresent();
//        boolean admin = adminRepository.findAdminByEmail(email).isPresent();
//        return (patient & caregiver & socialWorker & admin);
//    }
}
