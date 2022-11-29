package com.alzproject.alzproject.patient;

import com.alzproject.alzproject.patient.Patient;
import com.alzproject.alzproject.patient.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/patient")
public class PatientController {

    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    public List<Patient> getPatients(){
        return patientService.getPatients();
    }

    @GetMapping(path = "{id}")
    public Patient getPatient(@PathVariable("id") Long id){
        return patientService.getPatient(id);
    }

    @PostMapping
    public void registerPatient(@RequestBody Patient patient){
        patientService.registerPatient(patient);
    }

    @DeleteMapping(path = "{id}")
    public void deletePatient(@PathVariable("id") Long id){
        patientService.deletePatient(id);
    }

    @PutMapping(path = "{id}")
    public void updatePatient(@PathVariable("id") Long id,
                              @RequestParam(required = false) String firstName,
                              @RequestParam(required = false) String lastName,
                              @RequestParam(required = false) String email){
        patientService.updatePatient(id, firstName,lastName, email);
    }

    @GetMapping(path = "{patientId}/caregivers")
    public List<Long> getCaregivers(@PathVariable("patientId") Long patientId){
        return patientService.getCaregivers(patientId);
    }

    @PutMapping(path = "{patientId}/caregivers")
    public void addCaregivers(@PathVariable("patientId") Long patientId,
                              @RequestParam Long caregiverId){
        patientService.addCaregivers(patientId, caregiverId);
    }

    @PutMapping(path = "{patientId}/caregivers/{caregiverId}")
    public void deleteCaregivers(@PathVariable("patientId") Long patientId,
                                 @PathVariable("caregiverId") Long caregiverId){
        patientService.deleteCaregivers(patientId, caregiverId);
    }
}
