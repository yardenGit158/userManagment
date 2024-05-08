import React, { useState, useEffect } from "react";
import { getAllUsers, updateUser } from "../services/UserService";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [originalUsersData, setOriginalUsersData] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getAllUsers();
    setUsers(response.data);
    const originalData = response.data.reduce((acc, user) => {
      acc[user.userName] = { ...user };
      return acc;
    }, {});
    setOriginalUsersData(originalData);
  };

  const handleInputChange = (userName, field, value) => {
    const updatedUsers = users.map((user) =>
      user.userName === userName ? { ...user, [field]: value } : user
    );
    setUsers(updatedUsers);
  };

  const anyChanges = () => {
    return users.some(
      (user) =>
        JSON.stringify(originalUsersData[user.userName]) !==
        JSON.stringify(user)
    );
  };

  const handleUpdateUsers = async () => {
    if (anyChanges()) {
      const updatedUsers = users.filter(
        (user) =>
          JSON.stringify(originalUsersData[user.userName]) !==
          JSON.stringify(user)
      );
      await updateUser(updatedUsers);
      fetchUsers(); // Re-fetch users to reset the original data
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userName}>
              <td>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) =>
                    handleInputChange(user.userName, "name", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={user.gender}
                  onChange={(e) =>
                    handleInputChange(user.userName, "gender", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={user.department}
                  onChange={(e) =>
                    handleInputChange(
                      user.userName,
                      "department",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={user.age}
                  onChange={(e) =>
                    handleInputChange(user.userName, "age", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button disabled={!anyChanges()} onClick={handleUpdateUsers}>
        Update Users
      </button>
    </div>
  );
}

export default UserManagement;
