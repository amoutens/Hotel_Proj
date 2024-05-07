import React from 'react'
import { Room } from '../App';
import { CreateRoom } from '../Components/roomCRUD/CreateRoom';
import { Route } from '../Components/Route';
import axios from 'axios';
type RoomsProps = {
  roomsDB: Room[],
  handleEditClickRoom: (roomId: string, event: React.MouseEvent<HTMLAnchorElement>) => void
}


export const Rooms = ({roomsDB, handleEditClickRoom}: RoomsProps) => {

  const handleDeleteRoom = (roomId: string): void => {
    const isConfirmed: boolean = confirm(`Ви впевнені, що хочете видалити ${roomsDB.
      find(el => el._id === roomId)?.room_number}?`)
    if (isConfirmed) {
      axios.delete(`http://localhost:3000/deleteRoom/${roomId}`)
      .then( res => {console.log(res)
        window.location.href = '/rooms';
      })
      .catch(err => console.log(err));
    }
  }

  return (
    <>
      <div className="client-main-container">
        <table>
          <thead>
            <tr>
              <th>Номер кімнати</th>
              <th>Місткість</th>
              <th>Рівень комфорту</th>
              <th>Ціна</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {roomsDB ? roomsDB.map((room) => (
              <tr key={room._id}>
                <td>{room.room_number}</td>
                <td>{room.capacity}</td>
                <td>{room.comfort_level}</td>
                <td>{room.price}</td>
                <td>
                <a href={`/updateRoom?roomId=${room._id}`} onClick={(e) => handleEditClickRoom(room._id, e)}> 
                  Редагувати
                </a>
                  <button onClick={() => handleDeleteRoom(room._id)}>Видалити</button>
                  
                </td>
              </tr>
            )) : null
            }
          </tbody>
        </table>
        <a href='/createRoom'>Додати нового клієнта</a>
        <Route path='/createRoom'>
          <CreateRoom />
        </Route>

      </div>
    </>
  );
}
