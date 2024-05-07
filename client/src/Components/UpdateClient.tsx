import React from 'react'
import axios from 'axios';
import { Client } from '../App';

// type UpdateClientProps = {
//     clientDB: Client[],
//     handleEditClick: (clientId: string, event: React.MouseEvent<HTMLAnchorElement>) => void
// }

export const UpdateClient = () => {
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

  const handleUpdate = (event: React.SyntheticEvent) : void => {
    event.preventDefault();
    axios.put(`http://localhost:3000/updateClient/${clientGetData._id}`, { name, phone, passport })
    .then(result => { 
    console.log(result);
    window.location.href='/clients';
  })
  .catch(err => console.log(err));
  }
  return (
    <>
    <form style={{width: '100vw', height: '100vh'}} onSubmit={(e) => handleUpdate(e)}>
          <h2>Редагувати клієнта</h2>
          <label htmlFor="">Ім'я</label>
          <input type="text" placeholder="Введіть ім'я" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="">Номер телефону</label>
          <input type="text" placeholder="Введіть номер телефону" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <label htmlFor="">Номер паспорту</label>
          <input type="text" placeholder="Введіть номер паспорту" value={passport} onChange={(e) => setPassport(e.target.value)} />
          <button type='submit'>Редагувати</button>
        </form>
       
        </>
  )
}
