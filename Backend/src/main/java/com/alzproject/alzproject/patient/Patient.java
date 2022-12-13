package com.alzproject.alzproject.patient;

import com.alzproject.alzproject.registration.Gender;
import com.alzproject.alzproject.registration.UserType;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Table
@NoArgsConstructor
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private LocalDate dateOfBirth;
    @Transient
    private Integer age;
    private Gender gender;
    private String addressId;
    private String illnessType;
    private String conditionDescription;
    private String caregivers;
    private String registeredBy;
    private UserType userType;

    public Patient(Long id,
                   String firstName,
                   String lastName,
                   String email,
                   String password,
                   LocalDate dateOfBirth,
                   Integer age,
                   Gender gender,
                   String addressId,
                   String illnessType,
                   String conditionDescription,
                   String caregivers,
                   String registeredBy,
                   UserType userType) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.gender = gender;
        this.addressId = addressId;
        this.illnessType = illnessType;
        this.conditionDescription = conditionDescription;
        this.caregivers = caregivers;
        this.registeredBy = registeredBy;
        this.userType = userType;
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

    public void setAge(Integer age) {
        this.age = age;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getAddressId() {
        return addressId;
    }

    public void setAddressId(String addressId) {
        this.addressId = addressId;
    }

    public String getIllnessType() {
        return illnessType;
    }

    public void setIllnessType(String illnessType) {
        this.illnessType = illnessType;
    }

    public String getConditionDescription() {
        return conditionDescription;
    }

    public void setConditionDescription(String conditionDescription) {
        this.conditionDescription = conditionDescription;
    }

    public String getCaregivers() {
        return caregivers;
    }

    public void setCaregivers(String caregivers) {
        this.caregivers = caregivers;
    }

    public String getRegisteredBy() {
        return registeredBy;
    }

    public void setRegisteredBy(String registeredBy) {
        this.registeredBy = registeredBy;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", age=" + age +
                ", gender=" + gender +
                ", addressId='" + addressId + '\'' +
                ", illnessType='" + illnessType + '\'' +
                ", conditionDescription='" + conditionDescription + '\'' +
                ", caregivers='" + caregivers + '\'' +
                ", registeredBy='" + registeredBy + '\'' +
                ", userType='" + userType + '\'' +
                '}';
    }
}
