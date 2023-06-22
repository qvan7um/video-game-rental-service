import React, { useState, useEffect } from 'react';
import './EditContract.css';
import { Link, useParams } from 'react-router-dom';

function EditContract() {
  const [contractData, setContractData] = useState(null);
  const {contractId} = useParams();
  useEffect(() => {
    // Fetch contract data for the specific game using the contractId prop
    fetch(`/api/contract/${contractId}`)
      .then(response => response.json())
      .then(data => setContractData(data));
  }, [contractId]);

  
  if (!contractData) return <p>Loading...</p>;

  return (
    <div className='editcontracts-page'>
        <div className='editcontracts-form-container'>
            <form>
                <div className='mb-2'>
                    <label htmlFor='game-ct' className='form-label'>
                        Game
                    </label>
                    <input 
                    id="game-ct"
                    className='form-control'
                    type="text"
                    name="game"
                    value={contractData.gameId}
                    placeholder={contractData.gameId}
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
                    value={contractData.customerInfo.name}
                    placeholder={contractData.customerInfo.name}
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
                    value={contractData.customerInfo.phoneNumber}
                    placeholder={contractData.customerInfo.phoneNumber}
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
                    value={contractData.customerInfo.email}
                    placeholder={contractData.customerInfo.email}
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
                    value={contractData.customerInfo.address}
                    placeholder={contractData.customerInfo.address}
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
                    value={contractData.startDate}
                    placeholder={contractData.startDate}
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
  );
}

export default EditContract;