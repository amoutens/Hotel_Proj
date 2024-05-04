import { Client } from "../App"
import React from "react"
import { Route } from "../Components/Route"
import { CreateClient } from "../Components/CreateClient"
import { UpdateClient } from "../Components/UpdateClient"
import { useClientState } from "../Components/UseClientState"
type ClientProps = {
  clientDB: Client[],
  setClientIdApp: (w: string) => void,
  clientIdApp: string
}

export const Clients = ({ clientDB, setClientIdApp, clientIdApp }: ClientProps) => {
  const { selectedClient, setSelectedClient } = useClientState();
  // const [currentClient, setCurrentClient] = React.useState <Client>({
  //   _id:'',
  //   name:'',
  //   phone:'',
  //   passport: ''
  // })
  let currentClient: Client = {
    _id: '',
    name: '',
    phone: '',
    passport: ''
  };
  
  const handleEditClick = (clientId: string) => {
    currentClient = clientDB.find(el => el._id === clientId) || {_id:'', name: '', phone: '', passport: '' };
    setSelectedClient(currentClient);
    setClientIdApp(clientId);
  };

  React.useEffect(() => {
    if(clientIdApp !== '') {
      currentClient = clientDB.find(el => el._id === clientIdApp) || {_id:'', name: '', phone: '', passport: '' };
      setSelectedClient(currentClient);
    }
  }, [clientIdApp, clientDB]);
  console.log("selectedClient:", selectedClient);
  console.log('clientIdApp', clientIdApp);
  console.log(currentClient)
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
                  <button onClick={() => handleEditClick(client._id)}> 
                  <a href="/updateClient">Редагувати</a></button>
                  <button onClick={() => handleEditClick(client._id)}>Редагувати</button>
                  <button>Видалити</button>
                </td>
              </tr>
            )) : null
            }
          </tbody>
        </table>
        <a href='/createClient'>Додати нового клієнта</a>
        <Route path='/createClient'>
          <CreateClient clientDB={clientDB} setClientIdApp={setClientIdApp} clientIdApp={clientIdApp} />
        </Route>
        <Route path='/updateClient'>
          <UpdateClient clientDB={clientDB} currentClient={currentClient} clientId={clientIdApp} setClientIdApp={setClientIdApp} />
        </Route>

      </div>
    </>
  );
}