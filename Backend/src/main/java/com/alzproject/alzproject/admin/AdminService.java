package com.alzproject.alzproject.admin;

import com.alzproject.alzproject.user.User;
import com.alzproject.alzproject.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final UserRepository userRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository, UserRepository userRepository) {
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
    }

    public List<User> getAdmins() {
        return adminRepository.findAll()
                .stream()
                .filter(obj -> obj instanceof Admin)
                .map(obj -> (Admin) obj)
                .collect(Collectors.toList());
    }

    public Admin getAdmin(Long id) {
        return adminRepository.findById(id)
                .filter(obj -> obj instanceof Admin)
                .map(obj -> (Admin) obj)
                .orElseThrow(() -> new IllegalStateException("Non-existing admin id"));
    }

    public void registerAdmin(Admin admin) {
        boolean adminExists = userRepository.findUserByEmail(admin.getEmail()).isPresent();
        if(adminExists){
            throw new IllegalStateException("Existing email. Cannot register admin!");
        }
        adminRepository.save(admin);
    }

    public void deleteAdmin(Long id) {
        boolean idExists = adminRepository.findById(id)
                .filter(obj -> obj instanceof Admin)
                .map(obj -> (Admin) obj).isPresent();
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
                .filter(obj -> obj instanceof Admin)
                .map(obj -> (Admin) obj)
                .orElseThrow(() -> new IllegalStateException("Non-existing admin id"));

        if(firstName != null && !firstName.isEmpty() &&
                !Objects.equals(admin.getFirstName(), firstName)){
            admin.setFirstName(firstName);
        }

        if(lastName != null && !lastName.isEmpty() &&
                !Objects.equals(admin.getLastName(), lastName)){
            admin.setLastName(lastName);
        }

        boolean emailExists = userRepository.findUserByEmail(email).isPresent();

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
