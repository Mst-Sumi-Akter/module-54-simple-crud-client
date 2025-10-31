import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {
    const user = useLoaderData();
    console.log(user);

    const handleUpdate =(e)=>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        console.log(name, email);

    }

    return (
        <div>
            <h1>Edit a user</h1>
            <form onSubmit={handleUpdate}>
            <input type="text" name="name" placeholder="name" required defaultValue={user.name}/>
            <br />
            <input type="email" name="email" placeholder="email" required defaultValue={user.email} />
            <br />
            <input type="submit" value="Update User" />
            </form>
        </div>
    );
};

export default UpdateUser;