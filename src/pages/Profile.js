import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { validateNumber } from "../utils/validateNumber";
import getCurrentDate from "../utils/currentDate";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";

const getLocalStorage = () => {
  const storedUsers = localStorage.getItem("users");
  return storedUsers ? JSON.parse(storedUsers) : [];
};

const Profile = () => {
  const [users, setUsers] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    let localUsers = getLocalStorage();
    localUsers = localUsers.map((user) => ({
      ...user,
      isEdit: false,
    }));

    setUsers(localUsers);
  }, []);

  if (!users) {
    return <h2>No users found</h2>;
  }

  const editData = (id) => {
    if (id == null || id === "") {
      return;
    }

    setUsers((prevUsers) => {
      let updatedUsers = [...prevUsers];

      updatedUsers = updatedUsers.map((user) => ({ ...user, isEdit: false }));
      let index = updatedUsers
        .map((user) => user.id)
        .findIndex((user) => user === id);

      if (index === -1) {
        return;
      }

      updatedUsers[index].isEdit = true;

      return updatedUsers;
    });
  };

  const saveLocalStorage = (data) => {
    localStorage.setItem("users", JSON.stringify(data));
  };

  const handleEditField = (id, field, value) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );
  };

  const handleEditAddress = (id, field, value) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, address: { ...user.address, [field]: value } }
          : user
      )
    );
  };

  const handleSave = (id) => {
    const currentUser = users.find((user) => user.id === id);

    if (!currentUser) {
      return;
    }

    const { phoneNumber } = currentUser;

    if (phoneNumber.toString().length < 7) {
      alert("Phone number must be at least 7 digits");
      return;
    }

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isEdit: false } : user
      )
    );

    saveLocalStorage(users);
  };
  const handleDelete = (id) => {
    if (id == null || id === "") {
      return;
    }

    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter((user) => user.id !== id);
      saveLocalStorage(updatedUsers);
      return updatedUsers;
    });
  };
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className="container-lg ">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-4 ">
                  <h2>Profiles</h2>
                </div>
              </div>
            </div>
            <div className="text-center pb-5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name"
              />
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>DOB</th>
                  <th>City</th>
                  <th>District</th>
                  <th>Province</th>
                  <th>Country</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const { id, name, email, phoneNumber, dob, address, isEdit } =
                    user;
                  const { city, district, province, country } = address;

                  return (
                    <tr key={id}>
                      <td>
                        {isEdit ? (
                          <input
                            className="table-input"
                            value={name}
                            onChange={(e) =>
                              handleEditField(id, "name", e.target.value)
                            }
                          />
                        ) : (
                          <>{name}</>
                        )}
                      </td>

                      <td>
                        {isEdit ? (
                          <input
                            className="table-input"
                            value={email}
                            onChange={(e) =>
                              handleEditField(id, "email", e.target.value)
                            }
                          />
                        ) : (
                          <>{email}</>
                        )}
                      </td>
                      <td>
                        {isEdit ? (
                          <input
                            className="table-input"
                            value={phoneNumber}
                            onChange={(e) =>
                              handleEditField(id, "phoneNumber", e.target.value)
                            }
                            onKeyDown={validateNumber}
                          />
                        ) : (
                          <>{phoneNumber}</>
                        )}
                      </td>
                      <td>
                        {isEdit ? (
                          <input
                            className="table-input"
                            type="date"
                            value={dob}
                            max={getCurrentDate()}
                            onChange={(e) =>
                              handleEditField(id, "dob", e.target.value)
                            }
                          />
                        ) : (
                          <>{dob}</>
                        )}
                      </td>
                      <td>
                        {isEdit ? (
                          <input
                            className="table-input"
                            value={city}
                            onChange={(e) =>
                              handleEditAddress(id, "city", e.target.value)
                            }
                          />
                        ) : (
                          <>{city}</>
                        )}
                      </td>
                      <td>
                        {isEdit ? (
                          <input
                            className="table-input"
                            value={district}
                            onChange={(e) =>
                              handleEditAddress(id, "district", e.target.value)
                            }
                          />
                        ) : (
                          <>{district}</>
                        )}
                      </td>
                      <td>
                        {isEdit ? (
                          <select
                            id="province"
                            name="province"
                            value={province}
                            onChange={(e) =>
                              handleEditAddress(id, "province", e.target.value)
                            }
                            className="form-select"
                          >
                            <option value="1">Province 1</option>
                            <option value="2">Province 2</option>
                            <option value="3">Province 3</option>
                            <option value="4">Province 4</option>
                            <option value="5">Province 5</option>
                            <option value="6">Province 6</option>
                            <option value="7">Province 7</option>
                          </select>
                        ) : (
                          <>{province}</>
                        )}
                      </td>
                      <td>
                        {isEdit ? (
                          <input
                            className="table-input"
                            value={country}
                            disabled
                          />
                        ) : (
                          <>{country}</>
                        )}
                      </td>

                      <td>
                        <button
                          className="button-icon"
                          onClick={() =>
                            isEdit ? handleSave(id) : editData(id)
                          }
                        >
                          {isEdit ? (
                            <FaSave color="green" />
                          ) : (
                            <FaEdit color="blue" />
                          )}
                        </button>
                        <button
                          className="button-icon"
                          onClick={() => handleDelete(id)}
                        >
                          <FaTrash color="red" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-center pt-5">
          <button className="btn btn-primary ">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Form page
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
