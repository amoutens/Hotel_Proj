  import { Client } from "../App"
  import React from "react"
  import { Route } from "../Components/Route"
  import { CreateClient } from "../Components/CreateClient"
  type ClientProps = {
    clientDB: Client[]
  }

  export const Clients = ({clientDB}: ClientProps) => {
    return (<>
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
              { clientDB ? clientDB.map((client, index) => (
                  <tr key={index}>
                    <td>{client.name}</td>
                    <td>{client.phone}</td>
                    <td>{client.passport}</td>
                    <td><button>Видалити</button>
                    <button>Редагувати</button></td>
                  </tr>
              )) : null
              }
            </tbody>
          </table>
            <a className="add-btn" href="/createClient">Додати нового клієнта</a>
            <Route path="/createClient">
              <CreateClient />
            </Route>
            
          
        </div>
      </>
    );
  }
