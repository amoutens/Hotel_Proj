import React, { useEffect, useState} from 'react';
import './App.css';
import { NavButton } from './Components/NavButton';
import { Main } from './pages/Main';
import {Clients} from './pages/Clients'; // Removed .tsx extension
import {Rooms} from './pages/Rooms';
import {Payments} from './pages/Payments';
import {Settlements} from './pages/Settlements';
import NotF from './pages/ffff'; // Removed .tsx extension
import {Route} from './Components/Route'
import { CreateClient } from './Components/CreateClient';
import { UpdateClient } from './Components/UpdateClient';
import { useClientState } from './Components/UseClientState';
 export interface Client {
  _id: string,
  name: string,
  passport: string,
  phone: string
}

function App() {
  const [roomsDB, setRoomsDB] = useState([]);
  const [clientsDB, setClientsDB] = useState<Client[]>([]);
  const [paymentDB, setPaymentDB] = useState([]); 
  const [settlementDB, setSettlementDB] = useState([]);
  const[clientIdApp, setClientIdApp] = useState<string>('');
  const {selectedClient, setSelectedClient} = useClientState();
  const [currCl, setCurrCl] = useState<Client>(
    {
      _id:'',
      name:'',
      phone:'',
      passport: ''
    }
  );
  
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/');
      const data = await res.json();
      setRoomsDB(data.Rooms);
      setClientsDB(data.Clients);
      setPaymentDB(data.Payments);
      setSettlementDB(data.Settlements);
      if(selectedClient._id !== '') {
        setCurrCl(selectedClient)
      }
    };
    fetchData();
  }, []);
  console.log(clientsDB);
  console.log(clientIdApp);
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
        <Clients clientDB={clientsDB} setClientIdApp={setClientIdApp} clientIdApp={clientIdApp}/>
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
        <CreateClient clientDB={clientsDB} setClientIdApp={setClientIdApp} clientIdApp={clientIdApp}/>
      </Route>
      <Route path='/updateClient'>
        {<UpdateClient clientDB={clientsDB} currentClient={currCl} clientId={clientIdApp} setClientIdApp={setClientIdApp} clientIdApp={clientIdApp}/>}
      </Route>
      </div>
      
    </>
  );
}

export default App;
