import React, { useEffect, useState } from 'react';
import './App.css';
import { NavButton } from './Components/NavButton';
import { Main } from './pages/Main';
import {Clients} from './pages/Clients'; // Removed .tsx extension
import {Rooms} from './pages/Rooms';
import {Payments} from './pages/Payments';
import {Settlements} from './pages/Settlements';
import NotF from './pages/ffff'; // Removed .tsx extension
import {Route} from './Components/Route'



function App() {
  const [roomsDB, setRoomsDB] = useState([]);
  const [clientsDB, setClientsDB] = useState([]);
  const [paymentDB, setPaymentDB] = useState([]); // Changed variable name to camelCase
  const [settlementDB, setSettlementDB] = useState([]); // Changed variable name to camelCase

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

  const routes = [
    {
      path: '/',
      element: <Main />
    },
    {
      path: '/clients',
      element: <Clients />
    },
    {
      path: '/rooms',
      element: <Rooms />
    },
    {
      path: '/payments',
      element: <Payments />
    },
    {
      path: '/settlements',
      element: <Settlements />
    },
    {
      path: '*',
      element: <NotF />
    }
  ];
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
        <Clients />
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
      </div>
      
    </>
  );
}

export default App;
