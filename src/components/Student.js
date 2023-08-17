import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';
import axios from 'axios';

export default function Student() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudent] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);
    fetch('http://localhost:8080/student/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    }).then(() => {
      alert('New student added');
    });
  };

  useEffect(() => {
    function getStudent() {
      axios
        .get('http://localhost:8080/student/getAll')
        .then((res) => {
          setStudent(res.data);
          //console.log(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getStudent();
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: 'blue' }}>
          <u>Add student</u>
        </h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
            margin: '20px',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Student Name"
            variant="standard"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Student Address"
            variant="standard"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Box>
        <Button
          variant="contained"
          href="#contained-buttons"
          onClick={handleClick}
        >
          Submit
        </Button>
        <div>
          {students.map((student) => (
            <Paper
              elevation={6}
              style={{ margin: '10px', padding: '15px', textAlign: 'left' }}
              key={student.id}
            >
              Id:{student.id}
              <br />
              Name:{student.name}
              <br />
              Address:{student.address}
            </Paper>
          ))}
        </div>
      </Paper>
    </Container>
  );
}
