import React, { useState, useEffect } from 'react';
import './Contracts.css'
import '../App.css'
import DropdownCtr from '../components/DropdownCtr';
import DropdownSoft from '../components/DropdownSoft';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedContractId, setSelectedContractId] = useState(null);

  useEffect(() => {
    populateContractData();
  }, []);

  const handleEdit = (contractId) => {
    navigate(`/contracts/edit/${contractId}`);
  }

  const handleDetail = (contractId) => {
    navigate(`/contracts/detail/${contractId}`);
  }


  const handleDelete = (contractId) => {
    swal({
      title: "Bạn có chắc muốn xóa hợp đồng này?",
      text: "Khi xóa dữ liệu sẽ không được khôi phục!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        fetch(`/contract/${contractId}`, { method: 'DELETE' })
          .then(() => {
            // Remove deleted game from games state
            setContracts(contracts => contracts.filter(contract => contract.id !== contractId));
            // Reset selected game ID
            setSelectedContractId(null);
          });
      }
    });
  }

  function renderContractsTable(contracts) {
    return (
      <div className='wrapper'>
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
    
           {contracts.map(contract => {
            const startDate = new Date(contract.startDate);
            const endDate = new Date(contract.endDate);
            const formattedStartDate = startDate.toLocaleDateString('en-US',  { year: 'numeric', month: 'long', day: 'numeric' });
            const formattedEndDate = endDate.toLocaleDateString('en-US',  { year: 'numeric', month: 'long', day: 'numeric' });
            return (
              <tbody className={selectedContractId === contract.id ? 'selected tb-body' : 'tb-body'}>
              <tr key={contract.id} onClick={() => setSelectedContractId(contract.id)}>
                <td>{contract.id}</td>
                <td>{formattedStartDate}</td>
                <td>{formattedEndDate}</td>
                <td>{contract.customerInfo.name}</td>
                <td>{contract.customerInfo.phoneNumber}</td>
                <td>{contract.status}</td>
                <td>{contract.totalCost}</td>
            </tr>
            </tbody>
            );
          })}
      </table>
      </div>
      <div className='btn-area'>
           <Link to="/addcontract"><button className='button btn-add'>Thêm</button></Link>
           <div className='hide-btn'>
           {selectedContractId && (
         <>
           <button className='button btn-edit' onClick={() => handleEdit(selectedContractId)}>Sửa</button>
           <button className='button btn-detail' onClick={() => handleDetail(selectedContractId)}>Chi tiết</button>
           <button className='button btn-delete' onClick={() => handleDelete(selectedContractId)}>Xóa</button>
         </>
       )}
           </div>
      </div>
      </div>
      
    );
  }




  async function populateContractData() {
    try {
      const response = await fetch('/contract');
      const data = await response.json();
      setContracts(data);
      setLoading(false);
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }

  let contents = loading
    ? <p><em>Loading...</em></p>
    : renderContractsTable(contracts);

  return (
    <div className='manage-contracts-container'>
        <form className='search-bar'>
          <button type='submit'><i className='fa fa-search bg-contract'></i></button>
          <input type='text' placeholder='Tìm kiếm'/>
        </form>
        <DropdownCtr Type={'filter'} Title={'Lọc'} content={['Hoành thành', 'Đã hủy', 'Có hiệu lực', 'Đang chờ', 'Quá hạn']}/>
        <DropdownSoft Type={'range'} Title={'Sắp xếp'} content={['Mới nhất', 'Từ A - Z', 'Từ Z -A']}/>
      {contents}
    </div>
  );
}

export default Contracts;


