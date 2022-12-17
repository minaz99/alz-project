package com.alzproject.alzproject.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public List<Admin> getAdmins(){
        return adminService.getAdmins();
    }

    @GetMapping(path = "{id}")
    public Admin getAdmin(@PathVariable("id") Long id){
        return adminService.getAdmin(id);
    }

    @PostMapping
    public void registerAdmin(@RequestBody Admin admin){
        adminService.registerAdmin(admin);
    }

    @DeleteMapping(path = "{id}")
    public void deleteAdmin(@PathVariable("id") Long id){
        adminService.deleteAdmin(id);
    }

    @PutMapping(path = "{id}")
    public void updateAdmin(@PathVariable("id") Long id,
                              @RequestParam(required = false) String firstName,
                              @RequestParam(required = false) String lastName,
                              @RequestParam(required = false) String email,
                              @RequestParam(required = false) String password){
        adminService.updateAdmin(id, firstName,lastName, email, password);
    }

}
