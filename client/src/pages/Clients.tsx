import { Client } from "../App"
import React from "react"
import { Route } from "../Components/Route"
import { CreateClient } from "../Components/CreateClient"
import axios from "axios";
type ClientProps = {
  clientDB: Client[],
  handleEditClick: (clientId: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const Clients = ({ clientDB, handleEditClick  }: ClientProps) => {

const handleDeleteClient = (clientId: string): void => {
  const isConfirmed: boolean = confirm(`Ви впевнені, що хочете видалити ${clientDB.
    find(el => el._id === clientId)?.name}?`)
  if (isConfirmed) {
    axios.delete(`http://localhost:3000/deleteClient/${clientId}`)
    .then( res => {console.log(res)
      window.location.href = '/clients';
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
              <th>Ім'я</th>
              <th>Номер телефону</th>
              <th>Паспортні дані</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {clientDB ? clientDB.map((client) => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.phone}</td>
                <td>{client.passport}</td>
                <td>
                <a href={`/updateClient?clientId=${client._id}`} onClick={(e) => handleEditClick(client._id, e)}> 
                  Редагувати
                </a>
                  <button onClick={() => handleDeleteClient(client._id)}>Видалити</button>
                  
                </td>
              </tr>
            )) : null
            }
          </tbody>
        </table>
        <a href='/createClient'>Додати нового клієнта</a>
        <Route path='/createClient'>
          <CreateClient />
        </Route>

      </div>
    </>
  );
}