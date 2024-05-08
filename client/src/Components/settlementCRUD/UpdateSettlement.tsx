import React from 'react'
import { Client, Payment, Room,Settlement, Data } from '../../App';
import axios from 'axios';
import { Clients } from '../../pages/Clients';

type UpdateSettlementProps = {
  settlementDB: Settlement[],
  clientsDB:Client[],
  roomsDB: Room[],
  paymentDB: Payment[],
}
export const UpdateSettlement = ({data}) => {
  const [client_id, setClient_id] = React.useState('');
    const [payment_id, setPayment_id] = React.useState <string>('');
    const [room_id, setRoom_id] = React.useState <string>('');
    const [check_in_date, setCheck_in_date] = React.useState('');
    const [check_out_date, setCheck_out_date] = React.useState(''); 
    const [settlGetData, setSettlGetData] = React.useState<Settlement>({
      _id:'',
      client_id:'',
      payment_id: '',
      room_id: '',
      check_in_date:'',
      check_out_date: ''
    });

    const [suggestedClients, setSuggestedClients] = React.useState<Client[]>([]);
    // const [inputName, setInputName] = React.useState<string>(settlGetData?.client_id ? clientsDB.find((el: Client) => settlGetData.client_id === el._id).name : '');
    // const [inputPay, setInputPay] = React.useState<string>(settlGetData?.payment_id ? data?.Payments?.find((el: Payment) => settlGetData.payment_id === el._id).payment_date : '');
    // const [inputRoom, setInputRoom] = React.useState<string>(settlGetData?.room_id ? data?.Rooms?.find((el: Room) => settlGetData.room_id === el._id).room_number : '');
    const [inputName, setInputName] = React.useState<string>('')
    const [inputPay, setInputPay] = React.useState<string>('')
    const [inputRoom, setInputRoom] = React.useState<string>('')
    const [paymentsOpt, setPaymentsOpt] = React.useState<Payment[]>([]);
    const [roomsOpt, setRoomsOpt] = React.useState<Room[]>([]);

   
    React.useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
        const settlId = urlParams.get('settlementId');
      const fetchRoomData = async () => {
        try {
          const res = await fetch(`http://localhost:3000/getSettlement/${settlId}`);
          if (!res.ok) {
            throw new Error('Failed to fetch client data');
          }
          const settlData = await res.json();
          setSettlGetData(settlData);
          console.log('clientData1', settlData)
        } catch (error) {
          console.error('Error fetching client data:', error);
        }
      };
    
      fetchRoomData();
    }, []);

    React.useEffect(() => {
      if (settlGetData && data) {
        const client = data.Clients.find((el: Client) => el._id === settlGetData.client_id);
        const payment = data.Payments.find((el: Payment) => el._id === settlGetData.payment_id);
        const room = data.Rooms.find((el: Room) => el._id === settlGetData.room_id);
        setInputName(client ? client.name : '');
        setInputPay(payment ? payment.payment_date : '');
        setInputRoom(room ? `${room.room_number}` : '');
        setClient_id(settlGetData.client_id);
        setPayment_id(settlGetData.payment_id);
        setRoom_id(settlGetData.room_id)
        setCheck_in_date(settlGetData.check_in_date)
        setCheck_out_date(settlGetData.check_out_date)
      }
    }, [settlGetData, data]);
    
    

    const handleUpdate = (event: React.SyntheticEvent) : void => {
      event.preventDefault();
      axios.put(`http://localhost:3000/updateSettlement/${settlGetData._id}`, { client_id, payment_id, room_id, check_in_date, check_out_date })
      .then(result => { 
      console.log(result);
      window.location.href='/settlements';
    })
    .catch(err => console.log(err));
    }

    React.useEffect(() => {
      if (client_id && inputName) {
        const clientPayments = data?.Payments.filter((el: Payment) => el.client_id === client_id && el.payment_date !== inputPay);
        const uniquePaymentDates = Array.from(new Set(clientPayments.map(payment => payment.payment_date)));
        setPaymentsOpt(uniquePaymentDates.map(paymentDate => clientPayments.find(payment => payment.payment_date === paymentDate)));
      }
    }, [client_id, data, inputPay]);
    
    React.useEffect(() => {
      if (check_in_date && check_out_date && data) {
        const tempSett = data?.Settlements.filter((el1: Settlement) => {
          return (check_in_date !== el1.check_in_date && check_out_date !== el1.check_out_date);
        });
    
        const availableRooms = data?.Rooms.filter((room: Room) => {
          return `${room.room_number}` !== `${inputRoom}` && tempSett.some((sett: Settlement) => room._id === sett.room_id);
        });
    
        setRoomsOpt(availableRooms || []);
      }
    }, [check_in_date, check_out_date, data, inputRoom]);
    
    
    

      const handleClientInput = (input: string) => {
        const filteredClients = data?.Clients.filter((client:Client) => client.name.toLowerCase().includes(input.toLowerCase())) ?? [];
        setSuggestedClients(filteredClients);
      };
      const handleClientSelection = (name: string) => {
        const selectedClient = data?.Clients.find((el:Client) => el.name === name);
        if (selectedClient) {
          setClient_id(selectedClient._id);
          setInputName(name);
          setSuggestedClients([]);
        }
      };

      const payOpt = (val: string): void => {
        setInputPay(val);
        setPayment_id(data?.Payments.find((el: Payment) => el.payment_date === val)?._id || 'Не оплачено')
      }
      const roomOpt = (val: string): void => {
        setInputRoom(val);
        setRoom_id(data.Rooms?.find((el: Room) => +el.room_number === +val)._id || "Не визначено");
      }

      console.log({"client_id": client_id, 'payment_id': payment_id, "room_id": room_id, 'checkIn': check_in_date, 'checkOut': check_out_date})
      console.log({"name": inputName, 'payment': inputPay, "room": inputRoom})
      return (
          <>
            <form style={{ width: '100vw', height: '100vh' }} onSubmit={(e) => handleUpdate(e)}>
              <h2>Редагувати поселення</h2>
              <label htmlFor="">Ім'я клієнта</label>
              <input
                type="text"
                placeholder="Введіть ім'я клієнта"
                value={inputName}
                onChange={(e) => {
                  setInputName(e.target.value);
                  handleClientInput(e.target.value);
                }}
              />
              {suggestedClients.length > 0 && (
                <ul>
                  {suggestedClients.slice(0, 2).map(client => (
                    <li key={client._id} onClick={() => handleClientSelection(client.name)}>{client.name}</li>
                  ))}
                </ul>
              )}
               <label htmlFor="">Рахунок</label>
              <select value={inputPay} onChange={(e) => payOpt(e.target.value)}>
              <option value='Не оплачено'>Не оплачено</option>
              {paymentsOpt?.map(payment => (
                  <option key={payment._id} value={payment.payment_date}>{payment.payment_date}</option>
                ))}
                
                <option value={inputPay}>{inputPay}</option>
                
                
              </select>

              <label htmlFor="">Номер кімнати</label>
              <select value={inputRoom} onChange={(e) => roomOpt(e.target.value)}>
                <option value="Не визначена">Не визначена</option>
                <option value={inputRoom}>{inputRoom}</option>
                {roomsOpt?.map(room => (
                  <option key={room._id} value={room.room_number}>{room.room_number}</option>
                ))}
              </select>
              <label htmlFor="">Дата в'їзду</label>
              <input type="date" placeholder="Введіть ціну кінмати за ніч" value={check_in_date} onChange={(e) => setCheck_in_date(e.target.value)} />
              <label htmlFor="">Дата виїзду</label>
              <input type="date" placeholder="Введіть ціну кінмати за ніч" value={check_out_date} onChange={(e) => setCheck_out_date(e.target.value)} />
              <button type='submit'>Редагувати</button>
            </form>
           
            </>
            
          )
}
