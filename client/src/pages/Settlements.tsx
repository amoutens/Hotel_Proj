import React from 'react'
import { Client, Payment, Room, Settlement } from '../App';
import { CreateSettlement } from '../Components/settlementCRUD/CreateSettlement';
import { Route } from '../Components/Route';
import axios from 'axios';
type SettlementsProps = {
  settlementDB: Settlement[],
  clientsDB:Client[],
  roomsDB: Room[],
  paymentDB: Payment[]
}

export const Settlements = ({settlementDB, clientsDB, roomsDB, paymentDB}:SettlementsProps) => {
  const handleDeleteSettlement = (settlId: string): void => {
  const isConfirmed: boolean = confirm(`Ви впевнені, що хочете видалити це поселення?`)
  if (isConfirmed) {
    axios.delete(`http://localhost:3000/deleteClient/${settlId}`)
    .then( res => {console.log(res)
      window.location.href = '/settlements';
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
                <th>Ім'я клієнта</th>
                <th>Дата оплати</th>
                <th>Номер кімнати</th>
                <th>Дата в'їзду</th>
                <th>Дата виїзду</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {settlementDB ? settlementDB.map((settl) => (
                <tr key={settl._id}>
                  <td>{clientsDB.find(el => el._id === settl.client_id)?.name}</td>
                  <td>{paymentDB.find(el => el._id === settl.payment_id)?.payment_date ?? 'Не оплачено'}</td>
                  <td>{roomsDB.find(el => el._id === settl.room_id)?.room_number}</td>
                  <td>{settl.check_in_date}</td>
                  <td>{settl.check_out_date}</td>
                  <td>
                  <a href={`/updateClient?settlId=${settl._id}`} onClick={(e) => handleEditClick(settl._id, e)}> 
                    Редагувати
                  </a>
                    <button onClick={() => handleDeleteSettlement(settl._id)}>Видалити</button>
                    
                  </td>
                </tr>
              )) : null
              }
            </tbody>
          </table>
          <a href='/createSettlement'>Додати нове поселення</a>
          { <Route path='/createSettlement'>
            <CreateSettlement />
          </Route> }
  
        </div>
      </>
    );
}
