import React from "react";

const UserTable = ({
  sortedUsers,
  sortBy,
  handleSort,
  handleDelete,
  updateFormDate,
}) => {
  const handleEdit = (id) => {
    updateFormDate(id);
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <button className="btn btn-link" onClick={handleSort}>
              Name {sortBy === "asc" ? "▲" : "▼"}
            </button>
          </th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>DOB</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((entry) => {
          const { id, name, email, phoneNumber, dob } = entry;
          return (
            <tr key={id}>
              <td>{name}</td>
              <td>{email}</td>
              <td>{phoneNumber}</td>
              <td>{dob}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(id)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
