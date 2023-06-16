import React, { Component } from 'react';
import './Contracts.css'
import '../App.css'
import DropdownCtr from '../components/DropdownCtr';
import DropdownSoft from '../components/DropdownSoft';
import { Link } from 'react-router-dom';

export class Contracts extends Component {
  static displayName = Contracts.name;

  constructor(props) {
    super(props);
    this.state = { contracts: [], loading: true };
  }

  componentDidMount() {
    this.populateContractData();
  }

  static renderContractsTable(contracts) {
    return (
      <div className='tb-wrapper'>
      <table className="tb" aria-labelledby="tableLabel">
        <thead className='tb-head'>
          <tr>
            <th>ID</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Người thuê</th>
            <th>Số điện thoại</th>
            <th>Tình trạng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        
        <tbody className='tb-body'>
          {contracts.map(contract => {
            const startDate = new Date(contract.startDate);
            const endDate = new Date(contract.endDate);
            const formattedStartDate = startDate.toLocaleDateString('en-US',  { year: 'numeric', month: 'long', day: 'numeric' });
            const formattedEndDate = endDate.toLocaleDateString('en-US',  { year: 'numeric', month: 'long', day: 'numeric' });
            return (
              <tr key={contract.id}>

              <td>{contract.id}</td>
              <td>{formattedStartDate}</td>
              <td>{formattedEndDate}</td>
              <td>{contract.customerInfo.name}</td>
              <td>{contract.customerInfo.phoneNumber}</td>
              <td>{contract.status}</td>
              <td>{contract.totalCost}</td>
            </tr>
            );
          })}
        </tbody>
      </table>
        </div>
    );
  }

  render(contracts) {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Contracts.renderContractsTable(this.state.contracts);

    return (
      <div className='manage-container'>
        <form className='search-bar'>
          <button type='submit'><i className='fa fa-search bg-contract'></i></button>
          <input type='text' placeholder='Tìm kiếm'/>
        </form>
        <DropdownCtr Type={'filter'} Title={'Lọc'} content={['Hoành thành', 'Đã hủy', 'Có hiệu lực', 'Đang chờ', 'Quá hạn']}/>
        <DropdownSoft Type={'range'} Title={'Sắp xếp'} content={['Mới nhất', 'Từ A - Z', 'Từ Z -A']}/>
        {contents}
        <div className='btn-area'>
          <Link to="/addcontract"><button className='button btn-add'>Thêm</button></Link>
          <button className='button btn-delete'>Xóa</button>
          <button className='button btn-edit'>Sửa</button>
          <button className='button btn-detail'>Chi tiết</button>
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

export default Contracts;

