import React, { useState, useEffect } from "react";
import usersData from "./data.ts"; // Import the users data from the data.ts file

// Helper function to generate a random ID
const generateRandomID = () => {
  const characters = "ABCDEF123456";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [removedUsers, setRemovedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Filter users where age >= 18
    const filteredUsers = usersData.filter((user) => user.age >= 18);

    // Map the filtered data to include only the desired fields
    const mappedUsers = filteredUsers.map((user) => ({
      id: generateRandomID(),
      username: user.username,
      address: user.address,
      age: user.age,
      companyName: user.company.name,
    }));

    // Sort the mapped array by age, then by company name
    const sortedUsers = mappedUsers.sort((a, b) => {
      if (a.age !== b.age) {
        return a.age - b.age; // Sort by age
      }
      return a.companyName.localeCompare(b.companyName); // Sort by companyName if ages are the same
    });

    // Set the users state
    setUsers(sortedUsers);
  }, []);

  // Remove a user from the current users array and add to removedUsers
  const removeUser = (userId: string) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    const removedUser = users.find((user) => user.id === userId);
    if (removedUser) {
      setRemovedUsers([...removedUsers, removedUser]);
      setUsers(updatedUsers);
    }
  };

  // Restore a user back to the users array
  const restoreUser = (userId: string) => {
    const restoredUser = removedUsers.find((user) => user.id === userId);
    if (restoredUser) {
      setUsers([...users, restoredUser]);
      setRemovedUsers(removedUsers.filter((user) => user.id !== userId));
    }
  };

  // Search functionality for filtering users by username (including removed users)
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter users based on the search query
  const filteredUsers = [...users, ...removedUsers].filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by username"
        style={{ margin: "10px", padding: "8px", width: "300px" }}
      />
      <div>
        {filteredUsers.map((user) => (
          <div key={user.id} style={cardStyle}>
            <h3>{user.username}</h3>
            <p>Age: {user.age}</p>
            <p>
              Address: {user.address.street}, {user.address.city},{" "}
              {user.address.zipcode}
            </p>
            <p>Company: {user.companyName}</p>
            <button onClick={() => removeUser(user.id)} style={buttonStyle}>
              Remove
            </button>
            {removedUsers.some((removedUser) => removedUser.id === user.id) && (
              <button onClick={() => restoreUser(user.id)} style={buttonStyle}>
                Restore
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "20px",
  margin: "10px 0",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "300px",
};

const buttonStyle = {
  backgroundColor: "#FF6347",
  color: "#fff",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginLeft: "10px",
};

export default UsersComponent;
