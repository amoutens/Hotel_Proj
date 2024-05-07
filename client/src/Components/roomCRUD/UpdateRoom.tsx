import React from 'react'
import axios from 'axios';
import { Room } from '../../App';
export const UpdateRoom = () => {
    const [roomGetData, setRoomGetData] = React.useState<Room>({
        _id:'',
        room_number:'',
        capacity: 0,
        comfort_level: '',
        price:0
      });
    const [room_number, setRoom_number] = React.useState('');
    const [capacity, setCapacity] = React.useState(0);
    const [comfort_level, setComfort_level] = React.useState('');
    const [price, setPrice] = React.useState(0);
        
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
          const roomId = urlParams.get('roomId');
        const fetchRoomData = async () => {
          try {
            const res = await fetch(`http://localhost:3000/getRoom/${roomId}`);
            if (!res.ok) {
              throw new Error('Failed to fetch client data');
            }
            const roomData = await res.json();
            setRoomGetData(roomData);
            console.log('clientData1', roomData)
          } catch (error) {
            console.error('Error fetching client data:', error);
          }
        };
      
        fetchRoomData();
      }, []);
      React.useEffect(() => {
        setRoom_number(roomGetData?.room_number);
        setCapacity(roomGetData?.capacity);
        setComfort_level(roomGetData?.comfort_level)
        setPrice(roomGetData?.price)
        
      }, [roomGetData]);
    
      const handleUpdate = (event: React.SyntheticEvent) : void => {
        event.preventDefault();
        axios.put(`http://localhost:3000/updateRoom/${roomGetData._id}`, { room_number, capacity, comfort_level, price })
        .then(result => { 
        console.log(result);
        window.location.href='/rooms';
      })
      .catch(err => console.log(err));
      }
      return (
        <>
            <form style={{width: '100vw', height: '100vh'}} onSubmit={(e) => handleUpdate(e)}>
              <h2>Редагувати кімнату</h2>
              <label htmlFor="">Номер кімнати</label>
              <input type="text" placeholder="Введіть номер кімнати" value={room_number} onChange={(e) => setRoom_number(e.target.value)} />
              <label htmlFor="">Місткість</label>
              <input type="text" placeholder="Введіть місткість кімнати" value={capacity} onChange={(e) => setCapacity(+e.target.value)} />
              <label htmlFor="">Рівень комфорту</label>
              <input type="text" placeholder="Введіть рівень комфорту кімнати" value={comfort_level} onChange={(e) => setComfort_level(e.target.value)} />
              <label htmlFor="">Ціна</label>
              <input type="text" placeholder="Введіть ціну кінмати за ніч" value={price} onChange={(e) => setPrice(+e.target.value)} />
              <button type='submit'>Редагувати</button>
            </form>
           
            </>
            
          )
}
