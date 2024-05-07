import React from 'react'
import axios from 'axios';

// type CreateClientProps = {
//     clientDB: Client[];
//     handleEditClick: (clientId: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
// }

export const CreateClient = ()  => {
const [name, setName] = React.useState('');
const [phone, setPhone] = React.useState('');
const [passport, setPassport] = React.useState('');
    
  const handleSubmit = (event: React.SyntheticEvent) : void => {
    event.preventDefault();
    axios.post('http://localhost:3000/createClient', { name, phone, passport })
    .then(result => { 
    console.log(result);
    setName('');
    setPhone('');
    setPassport('');
     window.location.href = '/clients';
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
          <button type='submit'>Додати</button>
        </form>
       
        </>
        
      )
}
