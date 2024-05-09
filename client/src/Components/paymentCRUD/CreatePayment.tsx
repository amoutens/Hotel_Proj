import React from 'react'
import { Client,Settlement } from '../../App';
import axios from 'axios';




export const CreatePayment = ({data}) => {
  const [client_id, setClient_id] = React.useState('');
  const [settlement_id, setSettlement_id] = React.useState <string>('');
  const [amount, setAmount] = React.useState <number>(0);
  const [payment_date, setPayment_date] = React.useState<string>(''); 

  const [suggestedClients, setSuggestedClients] = React.useState<Client[]>([]);
  const [inputName, setInputName] = React.useState<string>('');
  const [inputSettls, setInputSettls] = React.useState<string>('');
  const [settlementOpt, setSettlementOpt] = React.useState<Settlement[]>([]);
  React.useEffect(() => {
    if (client_id) {
      const clientPayments = data?.Settlements?.filter((el: Settlement) => el.client_id === client_id);
      setSettlementOpt(clientPayments || []);
    }
  }, [client_id, data?.Payments]);
  
  
    const handleSubmit = (event: React.SyntheticEvent) : void => {
      event.preventDefault();
      axios.post('http://localhost:3000/createPayment', { client_id, settlement_id, amount, payment_date })
      .then(result => { 
      console.log(result); 
      setClient_id('');
      setSettlement_id('');
      setAmount(0);
      setPayment_date('');
       window.location.href = '/payments';
    })
    .catch(err => console.log(err));
    }

    const handleClientInput = (input: string) => {
      if(input.length > 2) {
        const filteredClients = data?.Clients?.filter((client:Client) => client.name.toLowerCase().includes(input.toLowerCase())) ?? [];
        setSuggestedClients(filteredClients);
      }
      if(input.length === 0) setSuggestedClients([])
      
    };
    const handleClientSelection = (name: string) => {
      const selectedClient = data?.Clients?.find((el:Client) => el.name === name);
      if (selectedClient) {
        setClient_id(selectedClient._id);
        setInputName(name);
        setSuggestedClients([]);
      }
    };

    const settlOpt = (val: string): void => {
      setInputSettls(val);
      setSettlement_id(data.Settlements?.find((el: Settlement) => el._id === val)?._id || 'Не вибрано')
    }

    console.log({"client_id": client_id, 'settl_id': settlement_id, "amount": amount, 'payment_date': payment_date})
    return (
        <>
          <form style={{ width: '100vw', height: '100vh' }} onSubmit={(e) => handleSubmit(e)}>
            <h2>Додати рахунок</h2>
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
             <label htmlFor="">Поселення</label>
            <select value={inputSettls} onChange={(e) => settlOpt(e.target.value)}>
              <option value="Не вибрано">Не вибрано</option>
              {settlementOpt?.map(settl => (
                <option key={settl._id} value={settl._id}>{settl.check_in_date}</option>
              ))}
            </select>

            <label htmlFor="">Сума</label>
            <input type="text" placeholder="Введіть суму" value={amount} onChange={(e) => setAmount(+e.target.value)} />
            <label htmlFor="">Дата оплати</label>
            <input type="date" placeholder="Введіть дату оплати" value={payment_date} onChange={(e) => setPayment_date(e.target.value)} />
            <button type="submit">Додати</button>
          </form>
         
          </>
          
        )
}
