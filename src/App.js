import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import {collection, getDocs, addDoc, updateDoc, doc,deleteDoc} from 'firebase/firestore';
import { async } from '@firebase/util';

function App() {
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers]= useState([]);
  const usersCollectionRef = collection(db,"users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName , age: Number(newAge)})

  } 

  const updateUser = async (id, age) => { 
    const userDoc = doc(db,"users",id);
    const newFields = {age: age + 1};
    await updateDoc(userDoc,newFields);
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }
  useEffect ( ()=> {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getUsers();
  },[]);
  return (
    <div className="App">
      <table>
        <tr>
          <td>Name :</td>
          <td>
             <input placeholder='Enter Name' onChange={(e) => {setNewName(e.target.value)}}/>
            </td>
          </tr>
        <tr>
          <td>Age :</td>
        <td>
      <input type="number" placeholder='Enter age' onChange={(e) => {setNewAge(e.target.value)}}/>
      </td>
      </tr>
      <tr>
      <td>
      <button onClick={createUser}>Create user</button>
      </td>
      </tr>
      </table>
      
      {users.map((user) =>{
        return (

        <div>
          {/* {" "} */}
          <h1>Name: {user.name}</h1>
          <h1>Age: {user.age}</h1>
          <button onClick={() => {updateUser(user.id, user.age)}}>increase age</button>
          <button onClick={() => {deleteUser(user.id)}}>Delete User</button>
        </div>);

      })}
        
    </div>
  );
}

export default App;
