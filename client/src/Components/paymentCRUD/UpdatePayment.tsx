import React from 'react'
import { Client,Payment,Settlement } from '../../App';
import axios from 'axios';


export const UpdatePayment = ({data}) => {
  const [client_id, setClient_id] = React.useState('');
  const [settlement_id, setSettlement_id] = React.useState <string>('');
  const [amount, setAmount] = React.useState <number>(0);
  const [payment_date, setPayment_date] = React.useState<string>(''); 
    const [payGetData, setPayGetData] = React.useState<Payment>({
      _id:'',
      client_id:'',
      settlement_id: '',
      amount: 0,
      payment_date:'',
    });

    const [suggestedClients, setSuggestedClients] = React.useState<Client[]>([]);
    const [inputName, setInputName] = React.useState<string>('')
    const [inputSettls, setInputSettls] = React.useState<string>('');
    const [settlementOpt, setSettlementOpt] = React.useState<Settlement[]>([]);


   
    React.useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
        const payId = urlParams.get('paymentId');
      const fetchRoomData = async () => {
        try {
          const res = await fetch(`http://localhost:3000/getPayment/${payId}`);
          if (!res.ok) {
            throw new Error('Failed to fetch client data');
          }
          const payData = await res.json();
          setPayGetData(payData);
          console.log('clientData1', payData)
        } catch (error) {
          console.error('Error fetching client data:', error);
        }
      };
    
      fetchRoomData();
    }, []);

    React.useEffect(() => {
      if (payGetData && data) {
        const client = data.Clients.find((el: Client) => el._id === payGetData.client_id);
        const settlement = data.Settlements.find((el: Settlement) => el._id === payGetData.settlement_id);
        setInputName(client ? client.name : '');
        setInputSettls(settlement ? settlement.check_in_date : '');
        setClient_id(payGetData.client_id);
        setSettlement_id(payGetData.settlement_id);
        setAmount(payGetData.amount)
        setPayment_date(payGetData.payment_date)
      }
    }, [payGetData, data]);
    
    

    const handleUpdate = (event: React.SyntheticEvent) : void => {
      event.preventDefault();
      axios.put(`http://localhost:3000/updatePayment/${payGetData._id}`, { client_id, settlement_id, amount, payment_date })
      .then(result => { 
      console.log(result);
      window.location.href='/payments';
    })
    .catch(err => console.log(err));
    }

    React.useEffect(() => {
      if (client_id && inputName) {
        const clientSettls = data?.Settlements.filter((el: Settlement) => el.client_id === client_id && el.check_in_date !== inputSettls);
        const uniqueSettlesDates = Array.from(new Set(clientSettls.map(settl => settl.check_in_date)));
        setSettlementOpt(uniqueSettlesDates.map(checkDate => clientSettls.find(settl => settl.check_in_date === checkDate)));
      }
    }, [client_id, data, inputSettls]);
    
    
    

    const handleClientInput = (input: string) => {
      if(input.length > 2) {
        const filteredClients = data?.Clients?.filter((client:Client) => client.name.toLowerCase().includes(input.toLowerCase())) ?? [];
        setSuggestedClients(filteredClients);
      }
      if(input.length === 0) setSuggestedClients([])
      
    };
      const handleClientSelection = (name: string) => {
        const selectedClient = data?.Clients.find((el:Client) => el.name === name);
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
            <form style={{ width: '100vw', height: '100vh' }} onSubmit={(e) => handleUpdate(e)}>
              <h2>Редагувати рахунок</h2>
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
               <label htmlFor="">Поселення</label>
                <select value={inputSettls} onChange={(e) => settlOpt(e.target.value)}>
                  <option value='Не визначено'>Не визначено</option>
                  {settlementOpt?.map(settl => (
                    <option key={settl._id} value={settl._id}>{settl.check_in_date}</option>
                  ))}
                </select>
              <label htmlFor="">Сума</label>
              <input type="text" placeholder="Введіть суму" value={amount} onChange={(e) => setAmount(+e.target.value)} />
              <label htmlFor="">Дата оплати</label>
              <input type="date" placeholder="Введіть ціну кінмати за ніч" value={payment_date} onChange={(e) => setPayment_date(e.target.value)} />
              <button type='submit'>Редагувати</button>
            </form>
           
            </>
            
          )
}
