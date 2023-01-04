package com.alzproject.alzproject.patient;

import com.alzproject.alzproject.enums.Gender;
import com.alzproject.alzproject.enums.RegisteredBy;
import com.alzproject.alzproject.enums.UserType;
import com.alzproject.alzproject.user.User;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Table
@NoArgsConstructor
public class Patient extends User {
    private LocalDate dateOfBirth;
    @Transient
    private Integer age;
    private Gender gender;
    private String phoneNumber;
    private String addressId;
    private String coordinates;
    private String illnessType;
    private String conditionDescription;
    private String needs;
    private String caregivers = "";
    private RegisteredBy registeredBy;
    private final UserType userType = UserType.PATIENT;

    public Patient(Long id,
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
                   String illnessType,
                   String conditionDescription,
                   String needs,
                   String caregivers,
                   RegisteredBy registeredBy) {
        super(id, firstName, lastName, email, password, UserType.PATIENT);
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.addressId = addressId;
        this.coordinates = coordinates;
        this.illnessType = illnessType;
        this.conditionDescription = conditionDescription;
        this.needs = needs;
        this.caregivers = caregivers;
        this.registeredBy = registeredBy;
    }

    public Patient(String firstName,
                   String lastName,
                   String email,
                   String password,
                   LocalDate dateOfBirth,
                   Gender gender,
                   String phoneNumber,
                   String addressId,
                   String coordinates,
                   String illnessType,
                   String conditionDescription,
                   String needs,
                   RegisteredBy registeredBy) {
        super(1L, firstName, lastName, email, password, UserType.PATIENT);
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.addressId = addressId;
        this.coordinates = coordinates;
        this.illnessType = illnessType;
        this.conditionDescription = conditionDescription;
        this.needs = needs;
        this.registeredBy = registeredBy;
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

    public String getNeeds() {
        return needs;
    }

    public void setNeeds(String needs) {
        this.needs = needs;
    }

    public String getCaregivers() {
        return caregivers;
    }

    public void setCaregivers(String caregivers) {
        this.caregivers = caregivers;
    }

    public RegisteredBy getRegisteredBy() {
        return registeredBy;
    }

    public void setRegisteredBy(RegisteredBy registeredBy) {
        this.registeredBy = registeredBy;
    }

    public UserType getUserType() {
        return userType;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "dateOfBirth=" + dateOfBirth +
                ", age=" + age +
                ", gender=" + gender +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", addressId='" + addressId + '\'' +
                ", coordinates='" + coordinates + '\'' +
                ", illnessType='" + illnessType + '\'' +
                ", conditionDescription='" + conditionDescription + '\'' +
                ", needs='" + needs + '\'' +
                ", caregivers='" + caregivers + '\'' +
                ", registeredBy=" + registeredBy +
                ", userType=" + userType +
                '}';
    }
}
