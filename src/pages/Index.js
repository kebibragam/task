import React, { useState, useEffect } from "react";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import { Link } from "react-router-dom";

const getLocalStorage = () => {
  const storedUsers = localStorage.getItem("users");
  return storedUsers ? JSON.parse(storedUsers) : [];
};

const Index = () => {
  const [formData, setFormData] = useState({
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

  const [users, setUsers] = useState(getLocalStorage());
  const [sortedUsers, setSortedUsers] = useState(users);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

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

  const addEntry = (newEntry) => {
    setUsers((prevUsers) => [...prevUsers, newEntry]);
    setSortedUsers((prevUsers) => [...prevUsers, newEntry]);
  };

  const handleDelete = (id) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers.splice(id, 1);
      return updatedUsers;
    });
    setSortedUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers.splice(id, 1);
      return updatedUsers;
    });
  };

  const handleUpdate = (id, updatedEntry) => {
    const updatedUsers = [...users];
    updatedUsers.splice(id, 1, updatedEntry);
    setUsers(updatedUsers);
    setSortedUsers(updatedUsers);
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

  const handleSort = () => {
    if (sortBy === "asc") {
      setSortedUsers([...users].sort((a, b) => a.name.localeCompare(b.name)));
      setSortBy("desc");
    } else {
      setSortedUsers([...users].sort((a, b) => b.name.localeCompare(a.name)));
      setSortBy("asc");
    }
  };

  const updateFormData = (index) => {
    const data = users[index];
    console.log("data", data.name);
    setFormData({
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      dob: data.dob,
      address: {
        city: data.address.city,
        district: data.address.district,
        province: data.address.province,
        country: "Nepal",
      },
    });
  };

  return (
    <div className="container p-5">
      <h3 className="text-center">Add User</h3>
      <UserForm
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleAddressChange={handleAddressChange}
        addEntry={addEntry}
        handleUpdate={handleUpdate}
      />

      <h3 className="text-center">User List</h3>
      <UserTable
        sortedUsers={sortedUsers}
        sortBy={sortBy}
        handleSort={handleSort}
        handleDelete={handleDelete}
        updateFormData={updateFormData}
      />

      <button className="btn btn-primary">
        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
          View Users
        </Link>
      </button>
    </div>
  );
};

export default Index;
