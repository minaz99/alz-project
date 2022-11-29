package com.alzproject.alzproject.registration;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Address {
    private Long addressId;
    private String street;
    private String apartmentNumber;
    private String flatNumber;
    private District district;
    private String postalCode;
    private String city;

    public Address(Long addressId,
                   String street,
                   String apartmentNumber,
                   String flatNumber,
                   District district,
                   String postalCode,
                   String city) {
        this.addressId = addressId;
        this.street = street;
        this.apartmentNumber = apartmentNumber;
        this.flatNumber = flatNumber;
        this.district = district;
        this.postalCode = postalCode;
        this.city = city;
    }

    public Address(String street,
                   String apartmentNumber,
                   String flatNumber,
                   District district,
                   String postalCode,
                   String city) {
        this.street = street;
        this.apartmentNumber = apartmentNumber;
        this.flatNumber = flatNumber;
        this.district = district;
        this.postalCode = postalCode;
        this.city = city;
    }

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getApartmentNumber() {
        return apartmentNumber;
    }

    public void setApartmentNumber(String apartmentNumber) {
        this.apartmentNumber = apartmentNumber;
    }

    public String getFlatNumber() {
        return flatNumber;
    }

    public void setFlatNumber(String flatNumber) {
        this.flatNumber = flatNumber;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Override
    public String toString() {
        return "Address{" +
                "addressId=" + addressId +
                ", street='" + street + '\'' +
                ", apartmentNumber='" + apartmentNumber + '\'' +
                ", flatNumber='" + flatNumber + '\'' +
                ", district=" + district +
                ", postalCode='" + postalCode + '\'' +
                ", city='" + city + '\'' +
                '}';
    }
}
