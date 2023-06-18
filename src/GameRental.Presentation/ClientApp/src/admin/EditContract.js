import React, { Component } from 'react';
import './EditContract.css';
import { Link } from 'react-router-dom';

export class EditContract extends Component {
  render() {
    return (
      <div className='editcontracts-page'>
        <div className='editcontracts-form-container'>
            <form>
                <div className='mb-2'>
                    <label htmlFor='game-ct' className='form-label'>
                        Game
                    </label>
                    <input placeholder='64836900b73886bd6429e16b'
                    id="game-ct"
                    className='form-control'
                    type="text"
                    name="game"
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='name-ct' className='form-label'>
                        Tên người thuê
                    </label>
                    <input 
                    id="name-ct"
                    className='form-control'
                    type="text"
                    name="name"
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='phonenumber-ct' className='form-label'>
                        Số điện thoại
                    </label>
                    <input 
                    id="phonenumber-ct"
                    className='form-control'
                    type="text"
                    name="phoneNumber"
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='email-ct' className='form-label'>
                        Email
                    </label>
                    <input 
                    id="email-ct"
                    className='form-control'
                    type="text"
                    name="email"
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='address-ct' className='form-label'>
                      Địa chỉ
                    </label>
                    <input 
                    id="address-ct"
                    className='form-control'
                    type="text"
                    name="address"
                    />
                </div>   
                <div className='mb-2'>
                    <label htmlFor='startdate-ct' className='form-label'>
                        Ngày thuê
                    </label>
                    <input 
                    id="startdate-ct"
                    className='form-control'
                    type="date"
                    name='startDate'
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='duration-ct' className='form-label'>
                            Kỳ hạn
                    </label>
                    <div className='radio-container'>
                        <label className='radio' id="threedays">
                        <input type="radio" value="threedays" name='duration' />3 ngày
                        <span></span>
                        </label>
                        <label className='radio' id="sevendays">
                        <input type="radio" value="sevendays" name='duration' />7 ngày
                        <span></span>
                        </label>
                        <label className='radio' id="fourteendays">
                        <input type="radio" value="fourteendays" name='duration' />14 ngày
                        <span></span>
                        </label>
                        <label className='radio' id="thirtydays">
                        <input type="radio" value="thirtydays" name='duration' />30 ngày
                        <span></span>
                        </label>
                    </div>
                </div> 
                <div className='mb-2'>
                    <label htmlFor='paymentmethod' className='form-label'>
                            Phương thức thanh toán
                    </label>
                    <div className='radio-container'>
                        <label className='radio' id="creditcard">
                        <input type="radio" value="credit Card" name='paymentMethod' />Credit Card
                        <span></span>
                        </label>
                        <label className='radio' id="paypal">
                        <input type="radio" value="payPal" name='paymentMethod' />PayPal
                        <span></span>
                        </label>
                    </div>
                </div>      
                <div className='mb-2'>
                    <label htmlFor='shipmentmethod' className='form-label'>
                            Phương thức nhận game
                    </label>
                    <div className='radio-container'>
                        <label className='radio' id="ups">
                        <input type="radio" value="ups" name='shipmentMethod' />UPS
                        <span></span>
                        </label>
                        <label className='radio' id="fedex">
                        <input type="radio" value="fedEx" name='shipmentMethod' />FedEx
                        <span></span>
                        </label>
                    </div>
                </div>    
                <div className='mb-2'>
                        <label htmlFor='status' className='form-label'>
                            Trạng thái
                    </label>
                    <div className='radio-container'>
                        <label className='radio' id="completed">
                        <input type="radio" value="Completed" name='status' />Hoàn thành
                        <span></span>
                        </label>
                        <label className='radio' id="canceled">
                        <input type="radio" value="Canceled" name='status' />Đã hủy
                        <span></span>
                        </label>
                        <label className='radio' id="active">
                        <input type="radio" value="Active" name='status' />Có hiệu lực
                        <span></span>
                        </label>
                        <label className='radio' id ="waiting">
                        <input type="radio" value="Waitting" name='status' />Đang chờ
                        <span></span>
                        </label>
                        <label className='radio' id="expired">
                        <input type="radio" value="Expired" name='status' />Quá hạn 
                        <span></span>
                        </label>
                    </div>
                </div>      
            </form>
            <Link to="/contracts"><button type="submit" className='submit-edit-btn'>
            Xác nhận
            </button></Link>
            <Link to="/contracts"><button type='cancel' className='cancel-edit-btn'>
            Hủy
            </button></Link>
        </div>
      </div>
    )
  }
}

export default EditContract;







// export class EditContract extends Component {
//     static displayName = EditContract.name;
  
//     constructor(props) {
//       super(props);
//       this.state = { contracts: [], loading: true };
//     }
  
//     componentDidMount() {
//       this.populateContractData();
//     }
  
//     static renderContractsTable(contracts) {
//       return (
//         <div className='tb-wrapper'>
//         <table className="tb" aria-labelledby="tableLabel">
//           <thead className='tb-head'>
//             <tr>
//               <th>ID</th>
//               <th>Ngày bắt đầu</th>
//               <th>Ngày kết thúc</th>
//               <th>Người thuê</th>
//               <th>Số điện thoại</th>
//               <th>Tình trạng</th>
//               <th>Thành tiền</th>
//             </tr>
//           </thead>
          
//           <tbody className='tb-body'>
//             {contracts.map(contract => {
//               const startDate = new Date(contract.startDate);
//               const endDate = new Date(contract.endDate);
//               const formattedStartDate = startDate.toLocaleDateString('en-US',  { year: 'numeric', month: 'long', day: 'numeric' });
//               const formattedEndDate = endDate.toLocaleDateString('en-US',  { year: 'numeric', month: 'long', day: 'numeric' });
//               return (
//                 <tr key={contract.id}>
  
//                 <td>{contract.id}</td>
//                 <td>{formattedStartDate}</td>
//                 <td>{formattedEndDate}</td>
//                 <td>{contract.customerInfo.name}</td>
//                 <td>{contract.customerInfo.phoneNumber}</td>
//                 <td>{contract.status}</td>
//                 <td>{contract.totalCost}</td>
//               </tr>
//               );
//             })}
//           </tbody>
//         </table>
//           </div>
//       );
//     }
  
//     render(contracts) {
//       let contents = this.state.loading
//         ? <p><em>Loading...</em></p>
//         : EditContract.renderContractsTable(this.state.contracts);
  
//       return (
//         <div className='editcontracts-page'>
//         <div className='editcontracts-form-container'>
//             <form>
//                 <div className='mb-2'>
//                     <label htmlFor='game-ct' className='form-label'>
//                         Game
//                     </label>
//                     <input 
//                     id="game-ct"
//                     className='form-control'
//                     type="text"
//                     name="game"
//                     />
//                 </div>
//                 <div className='mb-2'>
//                     <label htmlFor='name-ct' className='form-label'>
//                         Tên người thuê
//                     </label>
//                     <input 
//                     id="name-ct"
//                     className='form-control'
//                     type="text"
//                     name="name"
//                     />
//                 </div>
//                 <div className='mb-2'>
//                     <label htmlFor='phonenumber-ct' className='form-label'>
//                         Số điện thoại
//                     </label>
//                     <input 
//                     id="phonenumber-ct"
//                     className='form-control'
//                     type="text"
//                     name="phoneNumber"
//                     />
//                 </div>
//                 <div className='mb-2'>
//                     <label htmlFor='email-ct' className='form-label'>
//                         Email
//                     </label>
//                     <input 
//                     id="email-ct"
//                     className='form-control'
//                     type="text"
//                     name="email"
//                     />
//                 </div>
//                 <div className='mb-2'>
//                     <label htmlFor='address-ct' className='form-label'>
//                       Địa chỉ
//                     </label>
//                     <input 
//                     id="address-ct"
//                     className='form-control'
//                     type="text"
//                     name="address"
//                     />
//                 </div>   
//                 <div className='mb-2'>
//                     <label htmlFor='startdate-ct' className='form-label'>
//                         Ngày thuê
//                     </label>
//                     <input 
//                     id="startdate-ct"
//                     className='form-control'
//                     type="date"
//                     name='startDate'
//                     />
//                 </div>
//                 <div className='mb-2'>
//                     <label htmlFor='duration-ct' className='form-label'>
//                             Kỳ hạn
//                     </label>
//                     <div className='radio-container'>
//                         <label className='radio' id="threedays">
//                         <input type="radio" value="threedays" name='duration' />3 ngày
//                         <span></span>
//                         </label>
//                         <label className='radio' id="sevendays">
//                         <input type="radio" value="sevendays" name='duration' />7 ngày
//                         <span></span>
//                         </label>
//                         <label className='radio' id="fourteendays">
//                         <input type="radio" value="fourteendays" name='duration' />14 ngày
//                         <span></span>
//                         </label>
//                         <label className='radio' id="thirtydays">
//                         <input type="radio" value="thirtydays" name='duration' />30 ngày
//                         <span></span>
//                         </label>
//                     </div>
//                 </div> 
//                 <div className='mb-2'>
//                     <label htmlFor='paymentmethod' className='form-label'>
//                             Phương thức thanh toán
//                     </label>
//                     <div className='radio-container'>
//                         <label className='radio' id="creditcard">
//                         <input type="radio" value="credit Card" name='paymentMethod' />Credit Card
//                         <span></span>
//                         </label>
//                         <label className='radio' id="paypal">
//                         <input type="radio" value="payPal" name='paymentMethod' />PayPal
//                         <span></span>
//                         </label>
//                     </div>
//                 </div>      
//                 <div className='mb-2'>
//                     <label htmlFor='shipmentmethod' className='form-label'>
//                             Phương thức nhận game
//                     </label>
//                     <div className='radio-container'>
//                         <label className='radio' id="ups">
//                         <input type="radio" value="ups" name='shipmentMethod' />UPS
//                         <span></span>
//                         </label>
//                         <label className='radio' id="fedex">
//                         <input type="radio" value="fedEx" name='shipmentMethod' />FedEx
//                         <span></span>
//                         </label>
//                     </div>
//                 </div>    
//                 <div className='mb-2'>
//                         <label htmlFor='status' className='form-label'>
//                             Trạng thái
//                     </label>
//                     <div className='radio-container'>
//                         <label className='radio' id="completed">
//                         <input type="radio" value="Completed" name='status' />Hoàn thành
//                         <span></span>
//                         </label>
//                         <label className='radio' id="canceled">
//                         <input type="radio" value="Canceled" name='status' />Đã hủy
//                         <span></span>
//                         </label>
//                         <label className='radio' id="active">
//                         <input type="radio" value="Active" name='status' />Có hiệu lực
//                         <span></span>
//                         </label>
//                         <label className='radio' id ="waiting">
//                         <input type="radio" value="Waitting" name='status' />Đang chờ
//                         <span></span>
//                         </label>
//                         <label className='radio' id="expired">
//                         <input type="radio" value="Expired" name='status' />Quá hạn 
//                         <span></span>
//                         </label>
//                     </div>
//                 </div>      
//             </form>
//             <Link to="/contracts"><button type="submit" className='submit-btn'>
//             Thêm
//             </button></Link>
//             <Link to="/contracts"><button type='cancel' className='cancel-btn'>
//             Hủy
//             </button></Link>
//         </div>
//       </div>



        
//       );
//     } 
    
//     async populateContractData() {
//       try {
//           const response = await fetch('/contract/id');
//           const data = await response.json();
//           this.setState({ contracts: data, loading: false });
//         } catch (error) {
//             console.error('An error occurred while fetching data:', error);
//         }
//     }
//   }
  
//   export default EditContract;