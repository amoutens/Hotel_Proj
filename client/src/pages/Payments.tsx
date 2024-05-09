import React from 'react'
import axios from 'axios'
import { CreatePayment } from '../Components/paymentCRUD/CreatePayment'
import { Route } from '../Components/Route'

export const Payments = ({data, handleEditClickPayment}) => {
  const handleDeletePayment = (payId: string): void => {
    const isConfirmed: boolean = confirm(`Ви впевнені, що хочете видалити це рахунок?`)
    if (isConfirmed) {
      axios.delete(`http://localhost:3000/deletePayment/${payId}`)
      .then( res => {console.log(res)
        window.location.href = '/payments';
      })
      .catch(err => console.log(err));
    }
  }
      return (
        <>
          <div className="client-main-container">
            <table>
              <thead>
                <tr>
                  <th>Ім'я клієнта</th>
                  <th>Дата поселення</th>
                  <th>Сума</th>
                  <th>Дата оплати</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {data?.Payments ? data.Payments.map((pay) => (
                  <tr key={pay._id}>
                    <td>{data?.Clients.find(el => el._id === pay.client_id)?.name}</td>
                    <td>{data?.Settlements.find(el => el._id === pay.settlement_id)?._id?? 'Не визначено'}</td>
                    <td>{pay.amount}</td>
                    <td>{pay.payment_date}</td>
                    <td>
                    <a href={`/updatePayment?paymentId=${pay._id}`} onClick={(e) => handleEditClickPayment(pay._id, e)}> 
                      Редагувати
                    </a>
                    {/* <a onClick={(e) => handleEditClickSettlement(settl._id, e)}> 
                      Редагувати
                    </a> */}
                      <button onClick={() => handleDeletePayment(pay._id)}>Видалити</button>
                      
                    </td>
                  </tr>
                )) : null
                }
              </tbody>
            </table>
            <a href='/createPayment'>Додати новий рахунок</a>
            { <Route path='/createPayment'>
              <CreatePayment data={data} />
            </Route> }
    
          </div>
        </>
      );
}

