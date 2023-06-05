import { Container, TextField, Paper, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './student.css';

function useStudent() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [contacts, setContacts] = useState([""]);
  const Paperstyle = { padding: '50px 20px', width: 600, margin: '20px auto' };

  console.warn("testing the github")

  const Handleclick = (e) => {
    e.preventDefault();
    const contact = { name, phone, address };
    console.log(contact);
    fetch('http://localhost:8080/contact/', {
      method: "POST",
      headers: { "Content-Type":"application/json"},
      body: JSON.stringify(contact)
    }).then(() => {
      console.log("Successfully posted data to the database");
    });
  }

  useEffect(() => {
    fetch('http://localhost:8080/contact/')
      .then(res => res.json())
      .then((result) => {
        setContacts(result);
      });
  }, []);

  return (
    <div
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Container className="form">
        <Paper elevation={3} style={Paperstyle}>
          <strong>Fill the contacts</strong>
          <form>
            <TextField id="Name" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} /><br></br>
            <br></br>
            <TextField id="Phone" label="Phone" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} /><br></br>
            <br></br>
            <TextField id="Address" label="Address" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} />
            <br></br>
            <Button variant="outlined" onClick={Handleclick}>submit</Button>
          </form>
          
        </Paper>

        <Paper elevation={3} style={Paperstyle}>
          {contacts.map(contact=>(

            <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:'left'}} key={contact.id}>
              Id:{contact.id}<br></br>
              <br></br>
              Name:{contact.name}<br></br><br></br>
              Phone:{contact.phone}
              <br></br><br></br>
              Address:{contact.address}
            </Paper>
          )
            
            
            
            )}
        </Paper>
      </Container>
    </div>
  );
}

export default useStudent;
