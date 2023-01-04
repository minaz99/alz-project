package com.alzproject.alzproject.caregiver;

import com.alzproject.alzproject.enums.Gender;
import com.alzproject.alzproject.enums.UserType;
import com.alzproject.alzproject.user.User;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Table
@NoArgsConstructor
public class Caregiver extends User {
    private LocalDate dateOfBirth;
    @Transient
    private Integer age;
    private Gender gender;
    private String phoneNumber;
    private String addressId;
    private String coordinates;
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
                     String coordinates,
                     String needs,
                     String patients) {
        super(id, firstName, lastName, email, password, UserType.CAREGIVER);
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.addressId = addressId;
        this.coordinates = coordinates;
        this.needs = needs;
        this.patients = patients;
    }

    public Caregiver(String firstName,
                     String lastName,
                     String email,
                     String password,
                     LocalDate dateOfBirth,
                     Gender gender,
                     String phoneNumber,
                     String addressId,
                     String coordinates,
                     String needs) {
        super(1L, firstName, lastName, email, password, UserType.CAREGIVER);
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.addressId = addressId;
        this.coordinates = coordinates;
        this.needs = needs;
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

    public String getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
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
                "dateOfBirth=" + dateOfBirth +
                ", age=" + age +
                ", gender=" + gender +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", addressId='" + addressId + '\'' +
                ", coordinates='" + coordinates + '\'' +
                ", needs='" + needs + '\'' +
                ", patients='" + patients + '\'' +
                ", userType=" + userType +
                '}';
    }
}
