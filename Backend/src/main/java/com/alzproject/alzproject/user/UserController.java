package com.alzproject.alzproject.user;

import com.alzproject.alzproject.caregiver.Caregiver;
import com.alzproject.alzproject.patient.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping(path = "patients-caregivers")
    public List<User> getPatientsAndCaregivers(){
        return userService.getPatientsAndCaregivers();
    }

    @GetMapping(path = "patients-social_workers")
    public List<User> getPatientsAndSocialWorkers(){
        return userService.getPatientsAndSocialWorkers();
    }

    @GetMapping(path = "caregivers-social_workers")
    public List<User> getCaregiversAndSocialWorkers(){
        return userService.getCaregiversAndSocialWorkers();
    }

    @GetMapping(path = "patient/{patientId}/caregivers")
    public List<Caregiver> getCaregivers(@PathVariable("patientId") Long patientId){
        return userService.getCaregiversOfPatient(patientId);
    }

    @PutMapping(path = "patient/{patientId}/caregivers")
    public void addCaregivers(@PathVariable("patientId") Long patientId,
                              @RequestParam Long caregiverId){
        userService.addCaregiversToPatient(patientId, caregiverId);
    }

    @PutMapping(path = "patient/{patientId}/caregivers/{caregiverId}")
    public void deleteCaregivers(@PathVariable("patientId") Long patientId,
                                 @PathVariable("caregiverId") Long caregiverId){
        userService.deleteCaregiversFromPatient(patientId, caregiverId);
    }

    @GetMapping(path = "caregiver/{caregiverId}/patients")
    public List<Patient> getPatients(@PathVariable("caregiverId") Long caregiverId){
        return userService.getPatientsOfCaregiver(caregiverId);
    }

    @PutMapping(path = "caregiver/{caregiverId}/patients")
    public void addPatients(@PathVariable("caregiverId") Long caregiverId,
                            @RequestParam Long patientId){
        userService.addPatientsToCaregiver(caregiverId, patientId);
    }

    @PutMapping(path = "caregiver/{caregiverId}/patients/{patientId}")
    public void deletePatients(@PathVariable("caregiverId") Long caregiverId,
                               @PathVariable("patientId") Long patientId){
        userService.deletePatientsFromCaregiver(caregiverId, patientId);
    }
}
