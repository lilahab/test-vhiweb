import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const history = useHistory();
  
    useEffect(() => {
      axios.get(`https://reqres.in/api/users/${id}`).then((response) => {
        setUser(response.data.data);
      });
    }, [id]);
  
    if (!user) {
      return <div>Loading...</div>;
    }
    const handleBack = () => {
        history.push('/users');
    };


  return (
    <div className="container">
      <div>
        <img src={user.avatar} alt="User Avatar" />
        <h1>User Details</h1>
        <p>ID: {user.id}</p>
        <p>Email: {user.email}</p>
        <p>First Name: {user.first_name}</p>
        <p>Last Name: {user.last_name}</p>
        <Button onClick={handleBack}>Back to Users</Button>
      </div>
    </div>
  );
};

export default UserDetail;