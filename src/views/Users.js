import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import ReactDataTables from "../components/ReactDataTables";
import "datatables.net-dt/css/jquery.dataTables.css";


const Users = () => {
    const history = useHistory();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Check if the 'token' exists in localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            // If the 'token' doesn't exist, redirect to the login page
            history.replace('/');
        } else {
            // If the 'token' exists, fetch user data
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(`https://reqres.in/api/users`);
            setUsers(res.data.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const columns = [
        {
            title: "ID",
            data: "id"
        },
        {
            title: "Email",
            data: "email"
        },
        {
            title: "Full Name",
            data: "first_name",
            render: (val, i, row) => {
                return val + " " + row.last_name
            }
        },
        {
            title: "Actions",
            data: "id",
            render: (val) => {
                return `
            <div>
                <a 
                    href="/users/${val}" 
                    data-id="${val}" 
                    class="click-detail" 
                    data-action="detail"
                    style="color: #9E9E9E; margin-right: 10px;"
                >
                    Detail
                </a>
            </div>
        `;
            }
        }
    ];

    const handleLogout = () => {
        history.replace('/')
        localStorage.removeItem("token")
        console.log('User logged out');
    };


    return (
        <div className="container">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div style={{ marginBottom: 50 }}>
              <Button variant="danger" onClick={handleLogout} className="logout-button">
                <FaSignOutAlt /> Logout
              </Button>
            </div>
          </div>
          <ReactDataTables data={users} columns={columns} />
        </div>
        </div>
      );
};

export default Users;