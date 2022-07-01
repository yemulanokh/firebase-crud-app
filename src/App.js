import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Table, TableBody, TableRow, TableHead, TableCell } from '@mui/material';
import { FormControl, FormGroup, Input, Typography, Button, styled } from '@mui/material'

const styledForm = styled(FormGroup)`
  width: 50%
  margin: 50px auto 0 auto;
  `

function App() {
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) })

  }

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUsers();
  }, []);
  return (
    <div className="App">
      <div className='container'>
        <styledForm>
          <Typography>Add User</Typography>
          <FormControl>

            <Input placeholder='Enter Name' onChange={(e) => { setNewName(e.target.value) }} />
          </FormControl>
          <FormControl>

            <Input type="number" placeholder='Enter age' onChange={(e) => { setNewAge(e.target.value) }} />
          </FormControl>
          <FormControl>
            <Button onClick={createUser} variant='contained'>Create user</Button>
          </FormControl>
        </styledForm>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users.map((user) => (
                <TableRow>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell><Button onClick={() => { updateUser(user.id, user.age) }} variant='contained' style={{ margin: 10 }} color='info'>increase age</Button>
                    <Button onClick={() => { deleteUser(user.id) }} variant='contained' color='error'>Delete User</Button></TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default App;
