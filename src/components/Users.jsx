import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the server
  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleAddUser = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          newUser._id = data.insertedId;
          setUsers([...users, newUser]);
          alert('User added successfully');
          e.target.reset();
        }
      })
      .catch(err => console.error('Error adding user:', err));
  };

  const handleDeleteUser = (id) =>{
  console.log('delete a user',id)
  fetch(`http://localhost:3000/users/${id}`,{
    method:'DELETE'
  })
  .then(res=>res.json())
  .then(data=>{
    console.log('after delete', data);
    if(data.deletedCount){
        alert('deleted successfully')
    }
     setUsers(users.filter(user => user._id !== id));
  })
  }

  return (
    <div>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name" required />
        <br />
        <input type="email" name="email" placeholder="Email" required />
        <br />
        <input type="submit" value="Add User" />
      </form>

      <hr />

      <h2>Users List: {users.length}</h2>
      <div>
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map(user => 
          <p key={user._id || user.email}>{user.name} : {user.email}
          <Link to = {`/users/${user._id}`}>Details</Link>
          <button onClick={()=>handleDeleteUser (user._id) }>X</button>
          </p>)
        )}
      </div>
    </div>
  );
};

export default Users;


