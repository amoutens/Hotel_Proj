import React from 'react'
import axios from 'axios';
import { Route } from './Route';
import { Clients } from '../pages/Clients';
import { Client } from '../App';
import { BrowserRouter, useParams } from 'react-router-dom';

type UpdateClientProps = {
    clientDB: Client[],
    clientId: string,
    setClientIdApp: (w: string) => void
    currentClient: Client
}

export const UpdateClient = ({clientDB, clientId, setClientIdApp, currentClient}: UpdateClientProps) => {
<BrowserRouter></BrowserRouter>
const {id} = useParams();
React.useEffect( () => {
    axios.get('http://localhost:3000/getClient'+id)
    .then(result=> console.log(result))
    .catch(err => console.log(err))
})
console.log(clientDB);
console.log(currentClient);
console.log(clientId);
    
const [name, setName] = React.useState('');
const [phone, setPhone] = React.useState('');
const [passport, setPassport] = React.useState('');
    
React.useEffect(() => {
    setName(currentClient?.name);
    setPhone(currentClient?.phone);
    setPassport(currentClient?.passport)
    
  }, [currentClient]);

  const handleSubmit = (event: React.SyntheticEvent) : void => {
    event.preventDefault();
    axios.post('http://localhost:3000/updateClient', { name, phone, passport })
    .then(result => { 
    console.log(result);
    setName('');
    setPhone('');
    setPassport('');
  })
  .catch(err => console.log(err));
  }
  return (
    <>
    <form style={{width: '100vw', height: '100vh'}} onSubmit={(e) => handleSubmit(e)}>
          <h2>Додати клієнта</h2>
          <label htmlFor="">Ім'я</label>
          <input type="text" placeholder="Введіть ім'я" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="">Номер телефону</label>
          <input type="text" placeholder="Введіть номер телефону" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <label htmlFor="">Номер паспорту</label>
          <input type="text" placeholder="Введіть номер паспорту" value={passport} onChange={(e) => setPassport(e.target.value)} />
          <button type="submit"><a href='/clients'>Додати</a></button>
          <Route path='/clients'>
            <Clients clientDB={clientDB} setClientIdApp={setClientIdApp} clientIdApp={clientId}/>
          </Route>
        </form>
       
        </>
  )
}
