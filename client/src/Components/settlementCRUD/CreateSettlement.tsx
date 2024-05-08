import React from 'react'
import axios from 'axios';
import { Client, Payment, Room,Settlement, Data } from '../../App';

// type CreateSettlementProps = {
//   data: Data | undefined
// }
export const CreateSettlement = ({data}) => {
  const [client_id, setClient_id] = React.useState('');
    const [payment_id, setPayment_id] = React.useState <string>('');
    const [room_id, setRoom_id] = React.useState <string>('');
    const [check_in_date, setCheck_in_date] = React.useState('');
    const [check_out_date, setCheck_out_date] = React.useState(''); 

    const [suggestedClients, setSuggestedClients] = React.useState<Client[]>([]);
    const [inputName, setInputName] = React.useState<string>('');
    const [inputPay, setInputPay] = React.useState<string>('');
    const [inputRoom, setInputRoom] = React.useState<string>('');
    const [paymentsOpt, setPaymentsOpt] = React.useState<Payment[]>([]);
    const [roomsOpt, setRoomsOpt] = React.useState<Room[]>([]);
    React.useEffect(() => {
      if (client_id) {
        const clientPayments = data?.Payments?.filter((el: Payment) => el.client_id === client_id);
        setPaymentsOpt(clientPayments || []);
      }
    }, [client_id, data?.Payments]);
    React.useEffect(() => {
      if (check_in_date && check_out_date) {
        const tempSett = data?.Settlements?.filter((el1:Settlement) => {
          return !(check_in_date >= el1.check_out_date || check_out_date <= el1.check_in_date);
        });
    
        const availableRooms = data?.Rooms?.filter((room: Room) => {
          return !tempSett?.some((sett: Settlement) => room._id === sett.room_id);
        });
    
        setRoomsOpt(availableRooms || []);
      }
    }, [check_in_date, check_out_date, data?.Settlements, data?.Rooms]);
    
    
      const handleSubmit = (event: React.SyntheticEvent) : void => {
        event.preventDefault();
        axios.post('http://localhost:3000/createSettlement', { client_id, payment_id, room_id, check_in_date, check_out_date })
        .then(result => { 
        console.log(result); 
        setClient_id('');
        setPayment_id('');
        setRoom_id('');
        setCheck_in_date('');
        setCheck_out_date('');
         window.location.href = '/settlements';
      })
      .catch(err => console.log(err));
      }

      const handleClientInput = (input: string) => {
        const filteredClients = data?.Clients?.filter((client:Client) => client.name.toLowerCase().includes(input.toLowerCase())) ?? [];
        setSuggestedClients(filteredClients);
      };
      const handleClientSelection = (name: string) => {
        const selectedClient = data?.Clients?.find((el:Client) => el.name === name);
        if (selectedClient) {
          setClient_id(selectedClient._id);
          setInputName(name);
          setSuggestedClients([]);
        }
      };

      const payOpt = (val: string): void => {
        setInputPay(val);
        setPayment_id(data.Payments?.find((el: Payment) => el.payment_date === val)?._id)
      }
      const roomOpt = (val: string): void => {
        setInputRoom(val);
        setRoom_id(data.Rooms?.find((el: Room) => +el.room_number === +val)._id);
      }

      console.log({"client_id": client_id, 'payment_id': payment_id, "room_id": room_id, 'checkIn': check_in_date, 'checkOut': check_out_date})
      return (
          <>
            <form style={{ width: '100vw', height: '100vh' }} onSubmit={(e) => handleSubmit(e)}>
              <h2>Додати поселення</h2>
              <label htmlFor="">Ім'я клієнта</label>
              <input
                type="text"
                placeholder="Введіть ім'я клієнта"
                value={inputName}
                onChange={(e) => {
                  setClient_id(e.target.value);
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
                <option>Не оплачено</option>
                {paymentsOpt?.map(payment => (
                  <option key={payment._id} value={payment.payment_date}>{payment.payment_date}</option>
                ))}
              </select>

              <label htmlFor="">Номер кімнати</label>
              <select value={inputRoom} onChange={(e) => roomOpt(e.target.value)}>
                <option>Не визначена</option>
                {roomsOpt?.map(room => (
                  <option key={room._id} value={room.room_number}>{room.room_number}</option>
                ))}
              </select>
              <label htmlFor="">Дата в'їзду</label>
              <input type="date" placeholder="Введіть ціну кінмати за ніч" value={check_in_date} onChange={(e) => setCheck_in_date(e.target.value)} />
              <label htmlFor="">Дата виїзду</label>
              <input type="date" placeholder="Введіть ціну кінмати за ніч" value={check_out_date} onChange={(e) => setCheck_out_date(e.target.value)} />
              <button type='submit'>Додати</button>
            </form>
           
            </>
            
          )
}
