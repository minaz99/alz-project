package com.alzproject.alzproject.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
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
                              @RequestParam(required = false) String email,
                              @RequestParam(required = false) String password,
                              @RequestParam(required = false)
                                  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateOfBirth,
                              @RequestParam(required = false) String phoneNumber,
                              @RequestParam(required = false) String addressId,
                              @RequestParam(required = false) String illnessType,
                              @RequestParam(required = false) String conditionDescription,
                              @RequestParam(required = false) String needs){
        patientService.updatePatient(id, firstName,lastName, email, password, dateOfBirth,
                phoneNumber, addressId, illnessType, conditionDescription, needs);
    }
}
