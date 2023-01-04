package com.alzproject.alzproject.socialworker;

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
public class SocialWorker extends User {
    private LocalDate dateOfBirth;
    @Transient
    private Integer age;
    private Gender gender;
    private String phoneNumber;
    private String addressId;
    private String coordinates;
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
                        String coordinates,
                        boolean activated) {
        super(id, firstName, lastName, email, password, UserType.SOCIAL_WORKER);
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.addressId = addressId;
        this.coordinates = coordinates;
        this.activated = activated;
    }

    public SocialWorker(String firstName,
                        String lastName,
                        String email,
                        String password,
                        LocalDate dateOfBirth,
                        Gender gender,
                        String phoneNumber,
                        String addressId,
                        String coordinates) {
        super(1L, firstName, lastName, email, password, UserType.SOCIAL_WORKER);
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.addressId = addressId;
        this.coordinates = coordinates;
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
                "dateOfBirth=" + dateOfBirth +
                ", age=" + age +
                ", gender=" + gender +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", addressId='" + addressId + '\'' +
                ", coordinates='" + coordinates + '\'' +
                ", activated=" + activated +
                ", userType=" + userType +
                '}';
    }
}
