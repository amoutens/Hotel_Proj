import React from 'react'
import axios from 'axios';
import { Route } from './Route';
import { Clients } from '../pages/Clients';
import { Client } from '../App';

type UpdateClientProps = {
    clientDB: Client[],
    handleEditClick: (clientId: string, event: React.MouseEvent<HTMLAnchorElement>) => void
}

export const UpdateClient = ({clientDB, handleEditClick}: UpdateClientProps) => {
  const [clientGetData, setClientGetData] = React.useState<Client>({
    _id:'',
    name:'',
    phone:'',
    passport: ''
  });



React.useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
    const clientIdd = urlParams.get('clientId');
  const fetchClientData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/getClient/${clientIdd}`);
      if (!res.ok) {
        throw new Error('Failed to fetch client data');
      }
      const clientData = await res.json();
      setClientGetData(clientData);
      console.log('clientData1', clientData)
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  fetchClientData();
}, []);
const [name, setName] = React.useState('');
const [phone, setPhone] = React.useState('');
const [passport, setPassport] = React.useState('');
    
React.useEffect(() => {
    setName(clientGetData?.name);
    setPhone(clientGetData?.phone);
    setPassport(clientGetData?.passport)
    
  }, [clientGetData]);

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
          <h2>Редагувати клієнта</h2>
          <label htmlFor="">Ім'я</label>
          <input type="text" placeholder="Введіть ім'я" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="">Номер телефону</label>
          <input type="text" placeholder="Введіть номер телефону" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <label htmlFor="">Номер паспорту</label>
          <input type="text" placeholder="Введіть номер паспорту" value={passport} onChange={(e) => setPassport(e.target.value)} />
          <button type="submit"><a href='/clients'>Додати</a></button>
          <Route path='/clients'>
            <Clients clientDB={clientDB} handleEditClick={handleEditClick}/>
          </Route>
        </form>
       
        </>
  )
}
