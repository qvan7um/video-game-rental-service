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
  const [isActiveS, setIsAtiveS] = useState(false);
  const [statusValue, setStatusValue] = useState("")
  const [soft, setSoft] = useState('')
  const [isActive, setIsAtive] = useState(false);
  const [isActiveChip, setIsAtiveChip] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [gameTitles, setGameTitles] = useState({});
  const [gameBoxArt, setGameBoxArt] = useState({});

  useEffect(() => {
    populateContractData(statusValue, soft);
    fetchGameTitles();
    fetchGameBoxArt()
  }, []);

  useEffect(() => {
    fetchGameTitles();
  }, [contracts]);

  useEffect(() => {
    fetchGameBoxArt();
  }, [contracts]);

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
          fetch(`/api/contract/delete/${contractId}`, { method: 'DELETE' })
            .then(() => {
              // Remove deleted game from games state
              setContracts(contracts => contracts.filter(contract => contract.id !== contractId));
              // Reset selected game ID
              setSelectedContractId(null);
            });
        }
      });
  }

  function filterContractsByStatus(status, soft) {
    // Call API to get contracts filtered by status
    fetch(`/api/contracts?filters=status@=${status}&sorts=${soft}`)
      .then(response => response.json())
      .then(data => setContracts(data));
  }

  async function getGameTitle(gameId) {
    const response = await fetch(`/api/game/${gameId}`);
    const game = await response.json();
    return game.title;
  }
  async function fetchGameTitles() {
    const newGameTitles = {};
    for (const contract of contracts) {
      const gameTitle = await getGameTitle(contract.gameId);
      newGameTitles[contract.gameId] = gameTitle;
    }
    setGameTitles(newGameTitles);
  }

  async function getGameBoxArt(gameId) {
    const response = await fetch(`/api/game/${gameId}`);
    const game = await response.json();
    return game.boxArt;
  }
  async function fetchGameBoxArt() {
    const newGameBoxArt = {};
    for (const contract of contracts) {
      const gameBoxArt = await getGameBoxArt(contract.gameId);
      newGameBoxArt[contract.gameId] = gameBoxArt;
    }
    setGameBoxArt(newGameBoxArt);
  }
  
  function renderContractsTable(contracts) {
    return (
      <div className='wrapper'>
        <div className='tb-wrapper'>
          <table className="tb" aria-labelledby="tableLabel">
            <thead className='tb-head'>
              <tr>
                <th></th>
                <th>Game</th>
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
              const formattedStartDate = startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
              const formattedEndDate = endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
              return (
                <tbody className={selectedContractId === contract.id ? 'selected-game tb-body' : 'tb-body'}>
                  <tr key={contract.id} onClick={() => setSelectedContractId(contract.id)}>
                    <td><img className="img-games-page" src={gameBoxArt[contract.gameId]}></img></td>
                    <td className='game-title'>{gameTitles[contract.gameId]}</td>
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

  function DropdownCtr({Type, Title, content = [][100], onChange, onReset}) {    
    const showChip = (value) => {
        setIsAtive(false);
        setIsAtiveChip(true);
        setButtonText(value);
        onChange(value);
        populateContractData(value,soft);
    };
    let titleStyles = ['dropdown']
    if (Type === 'range') {
        titleStyles.push('right')}
  return (
    <div className={titleStyles.join(' ')}>
        <div className='dropdown-btn' onClick={e => setIsAtive(!isActive)}>{Title} <i className='fas fa-sort-down'/></div>
        {isActive && 
        <div className='dropdown-contents-ctr'>
            <div className='dropdown-item-ctr' onClick={e => showChip(content[0])}>
                {content[0]}
            </div>
            <div className='dropdown-item-ctr' onClick={e => showChip(content[1])}>
                {content[1]}
            </div>
            <div className='dropdown-item-ctr' onClick={e => showChip(content[2])}>
                {content[2]}
            </div>
            <div className='dropdown-item-ctr' onClick={e => showChip(content[3])}>
                {content[3]}
            </div>
            <div className='dropdown-item-ctr' onClick={e => showChip(content[4])}>
                {content[4]}
            </div> 
        </div>}
        {isActiveChip &&
        <div className='chip' onClick={e => {setIsAtiveChip(!isActiveChip); populateContractData("", soft);}}>
            <button className='chip-btn' id="chipcontract">{buttonText}<i className='fa fa-times'/></button>
        </div>}
    </div>
  )
}
  const softHandle = (value) => {
  setSoft(value);
  populateContractData(statusValue, value);
}
  function DropdownSoft({Type, Title, content = []}) {
    
    let titleStyles = ['dropdown']
    if (Type === 'range') {
        titleStyles.push('right')}
  return (
    <div className={titleStyles.join(' ')}>
        <div className='dropdown-btn' onClick={e => setIsAtiveS(!isActiveS)}>{Title} <i className='fas fa-sort-down'/></div>
        {isActiveS && 
        <div className='dropdown-contents-soft'>
            <div className='dropdown-item'onClick={e => {setIsAtiveS(!isActiveS); softHandle("id")}}>
                {content[0]}
            </div>
            <div className='dropdown-item' onClick={e => setIsAtiveS(!isActiveS)}>
                {content[1]}
                
            </div>
            <div className='dropdown-item'onClick={e => setIsAtiveS(!isActiveS)}>
                {content[2]}
            </div>
        </div>}
    </div>
  )
  }

  async function populateContractData(statusValue, soft) {
    try {
      const response = await fetch(`/api/contracts?filters=status@=${statusValue}&sorts=${soft}`);
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
        <input type='text' placeholder='Tìm kiếm' />
      </form>
      <DropdownCtr
        Type={'filter'}
        Title={'Lọc'}
        content={['Completed', 'Cancled', 'Active', 'Pending', 'Expired']}
        onChange={filterContractsByStatus}
        onReset={populateContractData}
      />
      <DropdownSoft Type={'range'} Title={'Sắp xếp'} content={['Mới nhất', 'Từ A - Z', 'Từ Z -A']} onChange={filterContractsByStatus} />
      {contents}
    </div>
  );
}

export default Contracts;
