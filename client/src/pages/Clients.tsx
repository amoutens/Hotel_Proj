import { Client } from "../App"
import React from "react"
import { Route } from "../Components/Route"
import { CreateClient } from "../Components/CreateClient"
type ClientProps = {
  clientDB: Client[],
  handleEditClick: (clientId: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const Clients = ({ clientDB, handleEditClick  }: ClientProps) => {
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
                  <button>Видалити</button>
                  
                </td>
              </tr>
            )) : null
            }
          </tbody>
        </table>
        <a href='/createClient'>Додати нового клієнта</a>
        <Route path='/createClient'>
          <CreateClient clientDB={clientDB} handleEditClick={handleEditClick} />
        </Route>

      </div>
    </>
  );
}