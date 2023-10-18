import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { RingSpinnerOverlay } from "react-spinner-overlay"

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
      return (
          <RingSpinnerOverlay
            color="#e96826"
            message={
              <p style={{ marginTop: "12px" }}>
                Loading...
              </p>
            }
          />
      )
    }
    const handleBack = () => {
        history.push('/users');
    };


  return (
    <div className="container">
      {user && (
      <div>
        <h1>User Details</h1>
        <div className="row">
          <div className="col-xs col-md-3">
            <img src={user.avatar} alt="User Avatar" className="image-profile" />
          </div>
          <div className="col-xs col-md-3">
            <h3>{user.first_name} {user.last_name}</h3>
            <h3>{user.id}</h3>
            <h3>{user.email}</h3>
          </div>
        </div>
        <div className="mt-4">  
          <Button onClick={handleBack}>Back to Users</Button>
        </div>
      </div>
      )}
    </div>
  );
};

export default UserDetail;