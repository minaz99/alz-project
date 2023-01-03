package com.alzproject.alzproject.caregiver;

import com.alzproject.alzproject.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "/caregiver")
public class CaregiverController {

    private final CaregiverService caregiverService;

    @Autowired
    public CaregiverController(CaregiverService caregiverService) {
        this.caregiverService = caregiverService;
    }

    @GetMapping
    public List<User> getCaregivers(){
        return caregiverService.getCaregivers();
    }

    @GetMapping(path = "{id}")
    public Caregiver getCaregiver(@PathVariable("id") Long id){
        return caregiverService.getCaregiver(id);
    }

    @PostMapping
    public void registerCaregiver(@RequestBody Caregiver caregiver){
        caregiverService.registerCaregiver(caregiver);
    }

    @DeleteMapping(path = "{id}")
    public void deleteCaregiver(@PathVariable("id") Long id){
        caregiverService.deleteCaregiver(id);
    }

    @PutMapping(path = "{id}")
    public void updateCaregiver(@PathVariable("id") Long id,
                                @RequestParam(required = false) String firstName,
                                @RequestParam(required = false) String lastName,
                                @RequestParam(required = false) String email,
                                @RequestParam(required = false) String password,
                                @RequestParam(required = false)
                                @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateOfBirth,
                                @RequestParam(required = false) String phoneNumber,
                                @RequestParam(required = false) String addressId,
                                @RequestParam(required = false) String coordinates,
                                @RequestParam(required = false) String needs){
        caregiverService.updateCaregiver(id, firstName,lastName, email, password, dateOfBirth,
                phoneNumber, addressId, coordinates, needs);
    }
}
