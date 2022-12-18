package com.alzproject.alzproject.socialworker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/social-worker")
public class SocialWorkerController {

    private final SocialWorkerService socialWorkerService;

    @Autowired
    public SocialWorkerController(SocialWorkerService socialWorkerService) {
        this.socialWorkerService = socialWorkerService;
    }

    @GetMapping(path = "active")
    public List<SocialWorker> getActiveSocialWorkers(){
        return socialWorkerService.getActiveSocialWorkers();
    }

    @GetMapping(path = "notActivated")
    public List<SocialWorker> getNotActivatedSocialWorkers(){
        return socialWorkerService.getNotActivatedSocialWorkers();
    }

    @GetMapping(path = "{id}")
    public SocialWorker getSocialWorker(@PathVariable("id") Long id){
        return socialWorkerService.getSocialWorker(id);
    }

    @PostMapping
    public void registerSocialWorker(@RequestBody SocialWorker socialWorker){
        socialWorkerService.registerSocialWorker(socialWorker);
    }

    @DeleteMapping(path = "{id}")
    public void deleteSocialWorker(@PathVariable("id") Long id){
        socialWorkerService.deleteSocialWorker(id);
    }

    @PutMapping(path = "/activate/{id}")
    public void updateSocialWorker(@PathVariable("id") Long id){
        socialWorkerService.activateSocialWorker(id);
    }

    @PutMapping(path = "{id}")
    public void updateSocialWorker(@PathVariable("id") Long id,
                                @RequestParam(required = false) String firstName,
                                @RequestParam(required = false) String lastName,
                                @RequestParam(required = false) String email,
                                @RequestParam(required = false) String password,
                                @RequestParam(required = false)
                                @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateOfBirth,
                                @RequestParam(required = false) String phoneNumber,
                                @RequestParam(required = false) String addressId){
        socialWorkerService.updateSocialWorker(id, firstName,lastName, email, password,
                dateOfBirth, phoneNumber, addressId);
    }

}
