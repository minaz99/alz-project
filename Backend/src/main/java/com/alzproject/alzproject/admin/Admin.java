package com.alzproject.alzproject.admin;

import com.alzproject.alzproject.registration.UserType;
import com.alzproject.alzproject.user.User;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table
@NoArgsConstructor
public class Admin extends User {
    private final UserType userType = UserType.ADMIN;

    public Admin(String firstName,
                 String lastName,
                 String email,
                 String password) {
        super(1L, firstName, lastName, email, password);
    }

    public UserType getUserType() {
        return userType;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "userType=" + userType +
                '}';
    }
}
