package com.alzproject.alzproject.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public List<Admin> getAdmins() {
        return adminRepository.findAll();
    }

    public Admin getAdmin(Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Non-existing admin id"));
    }

    public void registerAdmin(Admin admin) {
        boolean adminExists = adminRepository.findAdminByEmail(admin.getEmail()).isPresent();
        if(adminExists){
            throw new IllegalStateException("Existing admin");
        }
        adminRepository.save(admin);
    }

    public void deleteAdmin(Long id) {
        boolean idExists = adminRepository.findById(id).isPresent();
        if(!idExists){
            throw new IllegalStateException("Non-existing admin id");
        }
        adminRepository.deleteById(id);
    }

    @Transactional
    public void updateAdmin(Long id,
                            String firstName,
                            String lastName,
                            String email,
                            String password) {

        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Non-existing admin id"));

        if(firstName != null && !firstName.isEmpty() &&
                !Objects.equals(admin.getFirstName(), firstName)){
            admin.setFirstName(firstName);
        }

        if(lastName != null && !lastName.isEmpty() &&
                !Objects.equals(admin.getLastName(), lastName)){
            admin.setLastName(lastName);
        }

        boolean emailExists = adminRepository.findAdminByEmail(email).isPresent();

        if(email != null && !email.isEmpty() &&
                !Objects.equals(admin.getEmail(), email) && !emailExists){
            admin.setEmail(email);
        }

        if(password != null && !password.isEmpty() &&
                !Objects.equals(admin.getPassword(), password)){
            admin.setPassword(password);
        }
    }
}
