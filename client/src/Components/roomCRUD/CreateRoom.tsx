import React from 'react'
import axios from 'axios';

export const CreateRoom = () => {
    const [room_number, setRoom_number] = React.useState('');
    const [capacity, setCapacity] = React.useState('');
    const [comfort_level, setComfort_level] = React.useState('');
    const [price, setPrice] = React.useState('');
        
      const handleSubmit = (event: React.SyntheticEvent) : void => {
        event.preventDefault();
        axios.post('http://localhost:3000/createRoom', { room_number, capacity, comfort_level, price })
        .then(result => { 
        console.log(result);
        setRoom_number('');
        setCapacity('');
        setComfort_level('');
        setPrice('');
         window.location.href = '/rooms';
      })
      .catch(err => console.log(err));
      }
      return (
        <>
            <form style={{width: '100vw', height: '100vh'}} onSubmit={(e) => handleSubmit(e)}>
              <h2>Додати кімнату</h2>
              <label htmlFor="">Номер кімнати</label>
              <input type="text" placeholder="Введіть номер кімнати" value={room_number} onChange={(e) => setRoom_number(e.target.value)} />
              <label htmlFor="">Місткість</label>
              <input type="text" placeholder="Введіть місткість кімнати" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
              <label htmlFor="">Рівень комфорту</label>
              <input type="text" placeholder="Введіть рівень комфорту кімнати" value={comfort_level} onChange={(e) => setComfort_level(e.target.value)} />
              <label htmlFor="">Ціна</label>
              <input type="text" placeholder="Введіть ціну кінмати за ніч" value={price} onChange={(e) => setPrice(e.target.value)} />
              <button type='submit'>Додати</button>
            </form>
           
            </>
            
          )
}
