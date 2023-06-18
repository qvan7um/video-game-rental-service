import React, { Component } from 'react';
import './DetailContract.css'
import '../App.css'

import { Link } from 'react-router-dom';

export class DetailContract extends Component {
  static displayName = DetailContract.name;

  constructor(props) {
    super(props);
    this.state = { contracts: [], loading: true };
  }

  componentDidMount() {
    this.populateContractData();
  }

  static renderContractsTable(contracts) {
    return (
      <div className='detail-page'>
          {contracts.map(contract => {
            const startDate = new Date(contract.startDate);
            const endDate = new Date(contract.endDate);
            const formattedStartDate = startDate.toLocaleDateString('en-US',  { year: 'numeric', month: 'long', day: 'numeric' });
            const formattedEndDate = endDate.toLocaleDateString('en-US',  { year: 'numeric', month: 'long', day: 'numeric' });
            return (
            <div className='detail-container' key={contract.id}>
                <div className='detail-line'>
                    <label className='detail-label'>ID</label>
                    <label className='detail-contract-label'>{contract.id}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Ngày thuê</label>
                    <label className='detail-contract-label'>{formattedStartDate}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Ngày kết thúc</label>
                    <label className='detail-contract-label'>{formattedEndDate}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Tên người thuê</label>
                    <label className='detail-contract-label'>{contract.customerInfo.name}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Số điện thoại</label>
                    <label className='detail-contract-label'>{contract.customerInfo.phoneNumber}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Email</label>
                    <label className='detail-contract-label'>{contract.customerInfo.email}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Địa chỉ</label>
                    <label className='detail-contract-label'>{contract.customerInfo.address}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Phương thức thanh toán</label>
                    <label className='detail-contract-label'>{contract.paymentMethod}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Phương thức nhận game</label>
                    <label className='detail-contract-label'>{contract.shipmentMethod}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Phí vận chuyển</label>
                    <label className='detail-contract-label'>{contract.shippingFee}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Phí trễ</label>
                    <label className='detail-contract-label'>{contract.lateFee}</label>
                </div>
                <div className='detail-line'>
                    <label className='detail-label'>Tổng tiền</label>
                    <label className='detail-contract-label'>{contract.totalCost}</label>
                </div>            
            </div>
            );
          })}
        </div>
    );
  }

  render(contracts) {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : DetailContract.renderContractsTable(this.state.contracts);

    return (
      <div className='manage-container'>
        {contents}
        <div className='btn-area'>
          <button className='button btn-delete'>Xóa</button>
          <Link to="/contracts/edit"><button className='button btn-edit'>Sửa</button></Link>
        </div>
      </div>
    );
  } 
  
  async populateContractData() {
    try {
        const response = await fetch('/contract');
        const data = await response.json();
        this.setState({ contracts: data, loading: false });
      } catch (error) {
          console.error('An error occurred while fetching data:', error);
      }
  }
}

export default DetailContract;

