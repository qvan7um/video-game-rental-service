import React, { useState, useEffect } from 'react';
import './ContractDetail.css';
import { Link, useParams } from 'react-router-dom';

function ContractDetail() {
  const [contractData, setContractData] = useState(null);
  const {contractId} = useParams();
  useEffect(() => {
    // Fetch game data for the specific game using the contractId prop
    fetch(`/contract/${contractId}`)
      .then(response => response.json())
      .then(data => setContractData(data));
  }, [contractId]);

  
  if (!contractData) return <p>Loading...</p>;

  return (
    <div className='detail-page'>
          <div className='detail-contract-container'>
                <div className='detail-line'>
                    <label className='detail-label'>ID</label>
                    <label className='detail-contract-label'>{contractData.id}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Game</label>
                    <label className='detail-contract-label'>{contractData.gameId}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Tên người thuê</label>
                    <label className='detail-contract-label'>{contractData.customerInfo.name}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Số điện thoại</label>
                    <label className='detail-contract-label'>{contractData.customerInfo.phoneNumber}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Email</label>
                    <label className='detail-contract-label'>{contractData.customerInfo.email}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Địa chỉ</label>
                    <label className='detail-contract-label'>{contractData.customerInfo.address}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Ngày thuê</label>
                    <label className='detail-contract-label'>{contractData.startDate}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Ngày kết thúc</label>
                    <label className='detail-contract-label'>{contractData.endDate}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Phương thức thanh toán</label>
                    <label className='detail-contract-label'>{contractData.paymentMethod}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Phương thức nhận game</label>
                    <label className='detail-contract-label'>{contractData.shipmentMethod}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Phí vận chuyển</label>
                    <label className='detail-contract-label'>{contractData.shippingFee}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Phí trễ</label>
                    <label className='detail-contract-label'>{contractData.lateFee}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Tổng tiền</label>
                    <label className='detail-contract-label'>{contractData.totalCost}</label>
                </div> 
                <div className='detail-line'>
                    <label className='detail-label'>Tình trạng</label>
                    <label className='detail-contract-label'>{contractData.status}</label>
                </div> 
                <div className='btn-area'>
                  <button className='button btn-delete'>Xóa</button>
                  <Link to='/contracts'><button className='button btn-edit'>Sửa</button></Link>
                </div>          
            </div>
            </div>
  );
}

export default ContractDetail;

