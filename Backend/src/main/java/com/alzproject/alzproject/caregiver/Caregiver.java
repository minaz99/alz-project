package com.alzproject.alzproject.caregiver;

import com.alzproject.alzproject.registration.Gender;
import com.alzproject.alzproject.registration.UserType;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Table
@NoArgsConstructor
public class Caregiver {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "caregiver_generator")
    @SequenceGenerator(name = "caregiver_generator", sequenceName = "caregiver_seq")
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
    private String needs;
    private String patients = "";
    private final UserType userType = UserType.CAREGIVER;

    public Caregiver(Long id,
                     String firstName,
                     String lastName,
                     String email,
                     String password,
                     LocalDate dateOfBirth,
                     Integer age,
                     Gender gender,
                     String phoneNumber,
                     String addressId,
                     String needs,
                     String patients) {
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
        this.needs = needs;
        this.patients = patients;
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

    public String getNeeds() {
        return needs;
    }

    public void setNeeds(String needs) {
        this.needs = needs;
    }

    public String getPatients() {
        return patients;
    }

    public void setPatients(String patients) {
        this.patients = patients;
    }

    public UserType getUserType() {
        return userType;
    }

    @Override
    public String toString() {
        return "Caregiver{" +
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
                ", needs='" + needs + '\'' +
                ", patients='" + patients + '\'' +
                ", userType=" + userType +
                '}';
    }
}
