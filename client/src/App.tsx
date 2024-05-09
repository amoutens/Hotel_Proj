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
import { CreateRoom } from './Components/roomCRUD/CreateRoom';
import { UpdateRoom } from './Components/roomCRUD/UpdateRoom';
import { CreateSettlement } from './Components/settlementCRUD/CreateSettlement';
import { UpdateSettlement } from './Components/settlementCRUD/UpdateSettlement';
import { CreatePayment } from './Components/paymentCRUD/CreatePayment';
import { UpdatePayment } from './Components/paymentCRUD/UpdatePayment';

 export interface Client {
  _id: string,
  name: string,
  passport: string,
  phone: string
}
export interface Room {
  _id: string,
  room_number: string,
  capacity: number,
  comfort_level: string,
  price: number
}
export interface Settlement {
  _id:string,
  client_id: string,
  payment_id: string,
  room_id: string,
  check_in_date: string,
  check_out_date: string
}
export interface Payment {
  _id:string,
  client_id: string,
  settlement_id: string,
  amount: number,
  payment_date:string
}
export interface Data {
  Rooms: Room[],
  Clients: Client[],
  Payments: Payment[],
  Settlements: Settlement[]
}
function App() {
  const [roomsDB, setRoomsDB] = React.useState<Room[]>([]);
  const [clientsDB, setClientsDB] = React.useState<Client[]>([]);
  const [paymentDB, setPaymentDB] = React.useState<Payment[]>([]); 
  const [settlementDB, setSettlementDB] = React.useState<Settlement[]>([]);
  const [data, setData] = React.useState<Data | undefined>();

const handleEditClick = async (clientId: string, event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
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
const handleEditClickRoom = async (roomId: string, event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  try {
    const res = await fetch(`http://localhost:3000/getRoom/${roomId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch client data');
    }
    window.location.href = `/updateRoom?roomId=${roomId}`;
  } catch (error) {
    console.error('Error fetching client data:', error);
  }
};
const handleEditClickSettlement = async (settlId: string, event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  try {
    const res = await fetch(`http://localhost:3000/getSettlement/${settlId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch settlement data');
    }
    window.location.href = `/updateSettlement?settlementId=${settlId}`;
  } catch (error) {
    console.error('Error fetching settlement data:', error);
  }
};
const handleEditClickPayment = async (payId: string, event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  try {
    const res = await fetch(`http://localhost:3000/getPayment/${payId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch settlement data');
    }
    window.location.href = `/updatePayment?paymentId=${payId}`;
  } catch (error) {
    console.error('Error fetching settlement data:', error);
  }
};
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/');
      const data = await res.json();
      setData(data);
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
      <Route path='/createClient'>
        <CreateClient/>
      </Route>
      <Route path={`/updateClient`}>
      <UpdateClient/>
      </Route>

      <Route path="/rooms">
        <Rooms roomsDB={roomsDB} handleEditClickRoom={handleEditClickRoom} />
      </Route>
      <Route path='/createRoom'>
        <CreateRoom/>
      </Route>
      <Route path='/updateRoom'>
        <UpdateRoom/>
      </Route>


      <Route path="/settlements">
        <Settlements settlementDB={settlementDB} clientsDB={clientsDB} roomsDB={roomsDB} paymentDB={paymentDB}
         handleEditClickSettlement={handleEditClickSettlement}/>
      </Route>
      <Route path='/createSettlement'>
        <CreateSettlement data={data}/>
      </Route>
      <Route path='/updateSettlement'>
        <UpdateSettlement data={data}/>
      </Route>

      <Route path="/payments">
        <Payments  data={data} handleEditClickPayment={handleEditClickPayment}/>
      </Route>
      <Route path='/createPayment'>
        <CreatePayment data={data}/>
      </Route>
      <Route path='/updatePayment'>
        <UpdatePayment data={data}/>
      </Route>
      </div>
      
    </>
  );
}

export default App;
