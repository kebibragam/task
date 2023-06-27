import React from "react";
import { validateNumber } from "../utils/validateNumber";
import getCurrentDate from "../utils/currentDate";

const UserForm = ({ formData, setFormData, addEntry }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newEntry = { id: new Date().getTime(), ...formData };
      addEntry(newEntry);
      clearForm();
    }
  };

  const validateForm = () => {
    const { name, email, phoneNumber } = formData;
    if (!name || !email || !phoneNumber) {
      alert("Name, email, and phone number are required.");
      return false;
    }
    if (!validateEmail(email)) {
      alert("Invalid email format.");
      return false;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      alert("Phone number must be a number with at least 7 digits.");
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{7,}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      dob: "",
      address: {
        city: "",
        district: "",
        province: "",
        country: "Nepal",
      },
    });
  };

  return (
    <div className="container p-2">
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              // pattern="[0-9]{7,}"
              min={7}
              className="form-control"
              onKeyDown={validateNumber}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="dob" className="form-label">
              DOB:
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              max={getCurrentDate()}
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3">
          <h5>Address:</h5>
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="city" className="form-label">
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="district" className="form-label">
                District:
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.address.district}
                onChange={handleAddressChange}
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="province" className="form-label">
                Province:
              </label>
              <select
                id="province"
                name="province"
                value={formData.address.province}
                onChange={handleAddressChange}
                className="form-select"
              >
                <option value="">Select Province</option>
                <option value="1">Province 1</option>
                <option value="2">Province 2</option>
                <option value="3">Province 3</option>
                <option value="4">Province 4</option>
                <option value="5">Province 5</option>
                <option value="6">Province 6</option>
                <option value="7">Province 7</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country:
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.address.country}
              onChange={handleAddressChange}
              className="form-control"
              disabled
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
