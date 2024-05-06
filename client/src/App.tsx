import React, { useEffect } from 'react';
import './App.css';
import { NavButton } from './Components/NavButton';
import { Main } from './pages/Main';
import {Clients} from './pages/Clients'; // Removed .tsx extension
import {Rooms} from './pages/Rooms';
import {Payments} from './pages/Payments';
import {Settlements} from './pages/Settlements';
import {Route} from './Components/Route'
import { CreateClient } from './Components/CreateClient';
import { UpdateClient } from './Components/UpdateClient';
 export interface Client {
  _id: string,
  name: string,
  passport: string,
  phone: string
}

function App() {
  const [roomsDB, setRoomsDB] = React.useState([]);
  const [clientsDB, setClientsDB] = React.useState<Client[]>([]);
  const [paymentDB, setPaymentDB] = React.useState([]); 
  const [settlementDB, setSettlementDB] = React.useState([]);
  const [clientIdApp, setClientIdApp] = React.useState<string>('');
  const [currIdClient, setCurrIdClient] = React.useState<string>('');
  const [isClientBtnUpdate, setIsClientBtnUpdate] = React.useState<boolean>(false);
  const idArr: string[] = [];
  const [currCl, setCurrCl] = React.useState<Client>(
    {
      _id:'',
      name:'',
      phone:'',
      passport: ''
    }
  );
  

const handleEditClick = async (clientId: string, event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  setIsClientBtnUpdate(true);
  try {
    const res = await fetch(`http://localhost:3000/getClient/${clientId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch client data');
    }
    window.location.href = `/updateClient?clientId=${clientId}`;
  } catch (error) {
    console.error('Error fetching client data:', error);
  }
};

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/');
      const data = await res.json();
      setRoomsDB(data.Rooms);
      setClientsDB(data.Clients);
      setPaymentDB(data.Payments);
      setSettlementDB(data.Settlements);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='navbar-container'>
        <NavButton href='/' label={"Головна"} />
        <NavButton href='/clients' label={"Клієнти"} />
        <NavButton href='/rooms' label={"Кімнати"} />
        <NavButton href='/settlements' label={"Поселення"} />
        <NavButton href='/payments' label={"Рахунки"} />
      </div>
      <div className='main-container'>
      <Route path="/">
        <Main/>
      </Route>
      <Route path="/clients">
        <Clients clientDB={clientsDB} handleEditClick={handleEditClick}/>
      </Route>
      <Route path="/rooms">
        <Rooms />
      </Route>
      <Route path="/settlements">
        <Settlements />
      </Route>
      <Route path="/payments">
        <Payments />
      </Route>
      <Route path='/createClient'>
        <CreateClient clientDB={clientsDB} handleEditClick={handleEditClick}/>
      </Route>

      <Route path={`/updateClient`}>
      <UpdateClient
          clientDB={clientsDB}
          handleEditClick={handleEditClick}
      />
      </Route>
      </div>
      
    </>
  );
}

export default App;
