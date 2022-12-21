package com.alzproject.alzproject.socialworker;

import com.alzproject.alzproject.registration.Gender;
import com.alzproject.alzproject.registration.UserType;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Table
@NoArgsConstructor
public class SocialWorker {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "socialWorker_generator")
    @SequenceGenerator(name = "socialWorker_generator", sequenceName = "socialWorker_seq")
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private LocalDate dateOfBirth;
    @Transient
    private Integer age;
    private Gender gender;
    private String phoneNumber;
    private String addressId;
    private boolean activated = false;
    private final UserType userType = UserType.SOCIAL_WORKER;

    public SocialWorker(Long id,
                        String firstName,
                        String lastName,
                        String email,
                        String password,
                        LocalDate dateOfBirth,
                        Integer age,
                        Gender gender,
                        String phoneNumber,
                        String addressId,
                        boolean activated) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.addressId = addressId;
        this.activated = activated;
    }

    public SocialWorker(String firstName,
                        String lastName,
                        String email,
                        String password,
                        LocalDate dateOfBirth,
                        Gender gender,
                        String phoneNumber,
                        String addressId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.addressId = addressId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Integer getAge() {
        return Period.between(this.dateOfBirth, LocalDate.now()).getYears();
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddressId() {
        return addressId;
    }

    public void setAddressId(String addressId) {
        this.addressId = addressId;
    }

    public UserType getUserType() {
        return userType;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    @Override
    public String toString() {
        return "SocialWorker{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", age=" + age +
                ", gender=" + gender +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", addressId='" + addressId + '\'' +
                ", activated=" + activated +
                ", userType=" + userType +
                '}';
    }
}
