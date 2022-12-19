import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyA3dp41a9c8c-3IO1ANe-0MfB46Jssi2Nc",
  authDomain: "fir-16ec4.firebaseapp.com",
  projectId: "fir-16ec4",
});


export const App = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [users,setUsers] = useState([]);

  const db = getFirestore(firebaseApp)
  const userCollectionRef = collection(db, "users")

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef)
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getUsers();
  }, [])

  async function criarUser() {
    const user = await addDoc(userCollectionRef, {
      name,email
    });
    console.log(user);
  } 

  async function deleteUser(id) {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  }

  return(
    <div>
      <input type='text' placeholder='Nome...' value={name} onChange={(e) => setName(e.target.value)}/>
      <input type='text' placeholder='email...' value={email} onChange={(e) => setEmail(e.target.value)}/>
      <button onClick={criarUser}> criar user</button>
      <ul>
        {users.map(user => {
          return (
          <div key={user.id}>
            <li>{user.name}</li>
            <li>{user.email}</li>
            <button onClick={() => deleteUser(user.id)}>DELETAR</button>
          </div>
          )
        })}
      </ul>
    </div>
  )
}