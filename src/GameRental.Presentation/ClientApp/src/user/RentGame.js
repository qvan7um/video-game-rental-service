// import React from 'react';
// import { useState } from 'react';
// import './RentGame.css';

// function RentGame() 
// {
//   const [selectedOption, setSelectedOption] = useState('');
//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   }
//   const [selectedDate, setSelectedDate] = useState('');

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   const [showDateInput, setShowDateInput] = useState(false);

//   const handleRadioChange = (event) => {
//     setShowDateInput(event.target.value === 'date');
//     setSelectedDate('');
//   };

//   return (
//     <div className='page-container'>
//       <h3 className='rent-title'>Thông tin thuê game</h3>
//       <div className='rent-container'>
//           <form className='rent-info'>
//               <h4 className='info-title'>Thông tin</h4>
//               <div className='line' method='post'>
//                 <label for='fullname'>Họ Tên:</label>
//                 <input type='text' name='fullname' id='fullname'/>
//               </div>

//               <div className='line' method='post'>
//                 <label for='email'>Email:</label>
//                 <input type='email' name='email' id='email'/>
//               </div>

//               <div className='line' method='post'>
//                 <label for='tel'>SĐT:</label>
//                 <input type='tel' name='tel' id='tel'/>
//               </div>

//               <div className='line' method='post'>
//                 <label for='address'>Địa chỉ:</label>
//                 <input type='text' name='address' id='address'/>
//               </div>

//               <div className='line' method="post">
//                 <label for="period">Thời hạn thuê: </label>
//                 <select name="period" id="period">
//                     <option value="3days">3 Ngày - 5$</option>
//                     <option value="7days">7 Ngày - 10$</option>
//                     <option value="14days">14 Ngày - 20$</option>
//                     <option value="30days">30 Ngày - 40$</option>
//                 </select>
//               </div>
//           </form>
//           <div className='rent-method'>
//               <h4 className='deli-title'>Phương thức nhận hàng</h4>
//               <form className='deli' method='post'>
//                 <div>
//                   <label for='deli-store' className='store'>
//                   <input type='radio' name='deli-store' id='deli-store' value='date' 
//                     checked={showDateInput} 
//                     onChange={handleRadioChange}/>
//                     Nhận tại cửa hàng
//                   </label>
//                 </div>
//                 {showDateInput && (
//                 <div className='date'>
//                   <label className='date-get'>Ngày đến nhận</label>
//                   <input type="date"
//                     value={selectedDate}
//                     onChange={handleDateChange} 
//                     name="date-get" id="date-get" />
//                 </div>
//                 )}
//                 <div>
//                   <label for='deli-home' className='home'>
//                   <input type='radio' name='deli-home' id='deli-home' value='home'
//                     checked={!showDateInput} 
//                     onChange={handleRadioChange}/>
//                     Giao tận nhà
//                   </label>
//                 </div>
//               </form>

//               <h4 className='deli-title'>Phương thức thanh toán</h4>
//               <form className='deli' method='post'>
//                 <div>
//                   <label for='deli-store' className='store'>
//                   <input type='radio' name='deli-store' id='deli-store' value='card' 
//                     checked={selectedOption === 'card'} 
//                     onChange={handleOptionChange}/>
//                     Thanh toán qua thẻ tín dụng/ghi nợ
//                   </label>
//                 </div>
                
//                 <div>
//                   <label for='deli-home' className='home'>
//                   <input type='radio' name='deli-home' id='deli-home' value='cod'
//                     checked={selectedOption === 'cod'} 
//                     onChange={handleOptionChange}/>
//                     Thanh toán sau khi nhận hàng
//                   </label>
//                 </div>
//               </form> 
//           </div>

//           <div className='rent-game'>
//               <h4>Game</h4>
//               <div className='game-info'>
//                   <img className='game-img' alt="Game" src='https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7'/>
//                   <h5 className='game-title'>God Of War</h5>
//                   <h7 className='genre'>Thể loại: Action, Adventure</h7>
//               </div>

//               <div className='cost-info'>
//                   <h4 className='cost'>Thuê game: 10$</h4>
//                   <h4 className='cost'>Phí vận chuyển: 4$</h4>
//               </div>
              
//               <div className='total'>
//                   <h4 className='total'>Thành tiền: 14$</h4>
//               </div>

//               <div className='button-area'>
//                   <button className='confirm-btn'>Xác nhận</button>
//                   <button className='cancel-btn'>Hủy</button>
//               </div>
//           </div>
//       </div>
//     </div>
//   )
// }

// export default RentGame

import React, { useState, useEffect } from 'react';
import './RentGame.css';
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';


function RentGame() {
  const [gameData, setGameData] = useState(null);
  const {gameId} = useParams();
  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  }
  const [selectedDate, setSelectedDate] = useState('');
  //get today 
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    console.log('Selected date:', event.target.value);
  };

  const [showDateInput, setShowDateInput] = useState(false);

  const handleRadioChange = (event) => {
    setShowDateInput(event.target.value === 'date');
    setShowDeliInput(event.target.value === 'home');
    setDeliveryCost(event.target.value === 'date' ? 0 : 4);
    setSelectedDate('');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const rentalDurationInDays = rentalDurations[selectedPeriod];;
    const contractData = {
    gameId: gameId,
    status: "Pending",
    customerInfo: {
      name: event.target.name.value,
      phoneNumber: event.target.phoneNumber.value,
      email: event.target.email.value,
      address: event.target.address.value,
    },
    startDate: selectedDate ? selectedDate : today,
    rentalDuration: rentalDurationInDays,
    paymentMethod: "PayPal",
    shipmentMethod: showDeliInput ? "FedEx" : "Pickup",
    shippingFee: deliveryCost,
    lateFee: 0,
    // totalCost: rentalPrices[selectedPeriod] + deliveryCost,
  };
  console.log('Contract data:', contractData);
    const response = await fetch ("api/contract/create", {
        method: "POST",
        headers : {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contractData),
    }
    );
    console.log('Response:', response);
    if (response.ok) {
        swal("Thành công", "Chúc mừng bạn thuê game thành công", "success");
    }
    else
    {
        swal("Thất bại", "Bạn cần nhập đầy đủ thông tin", "error");
    }
};

  const [showDeliInput, setShowDeliInput] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('threeDays');
  const [deliveryCost, setDeliveryCost] = useState(4);


  useEffect(() => {
    // Fetch game data for the specific game using the gameId prop
    fetch(`/api/game/${gameId}`)
      .then(response => response.json())
      .then(data => setGameData(data));
  }, [gameId]);

  
  if (!gameData) return <p>Loading...</p>;
  const rentalPrices = {
    threeDays: gameData.price.threeDays,
    sevenDays: gameData.price.sevenDays,
    fourteenDays: gameData.price.fourteenDays,
    thirtyDays: gameData.price.thirtyDays,
  };
  const rentalDurations = {
    threeDays: 3,
    sevenDays: 7,
    fourteenDays: 14,
    thirtyDays: 30,
  };
  return (
    <form className='page-container' onSubmit={handleSubmit}>
      <h3 className='rent-title'>Thông tin thuê game</h3>
      <div className='rent-container'>
          <div className='rent-info'>
              <h4 className='info-title'>Thông tin</h4>
              <div className='line' method='post'>
                <label htmlFor='fullname'>Họ Tên:</label>
                <input type='text' name='name' id='fullname'/>
              </div>

              <div className='line' method='post'>
                <label htmlFor='email'>Email:</label>
                <input type='email' name='email' id='email' required/>
              </div>

              <div className='line' method='post'>
                <label htmlFor='tel'>SĐT:</label>
                <input type='tel' name='phoneNumber' id='tel'/>
              </div>
              <div className='line' method='post'>
                <label htmlFor='address'>Địa chỉ:</label>
                <input type='text' name='address' id='address'/>
              </div>

              <div className='line' method="post">
                <label htmlFor="period">Thời hạn thuê: </label>
                <select name="period" id="period" onChange={(event) => setSelectedPeriod(event.target.value)}>
                  <option value="threeDays">3 Ngày </option>
                  <option value="sevenDays">7 Ngày </option>
                  <option value="fourteenDays">14 Ngày </option>
                  <option value="thirtyDays">30 Ngày </option>
                </select>
              </div>

          </div>
          <div className='rent-method'>
              <h4 className='deli-title'>Phương thức nhận hàng</h4>
              <div className='deli' method='post'>
                <div>
                  <label htmlFor='deli-store' className='store'>
                  <input type='radio' name='deli-store' id='deli-store' value='date' 
                    checked={showDateInput} 
                    onChange={handleRadioChange}/>
                    Nhận tại cửa hàng
                  </label>
                </div>
                {showDateInput && (
                <div className='date'>
                  <label className='date-get'>Ngày đến nhận</label>
                  <input type="date"
                    value={selectedDate}
                    onChange={handleDateChange} 
                    name="startDate" id="date-get" />
                </div>
                )}
                <div>
                  <label htmlFor='deli-home' className='home'>
                  <input type='radio' name='deli-home' id='deli-home' value='home'
                    checked={showDeliInput} 
                    onChange={handleRadioChange}/>
                    Giao tận nhà
                  </label>
                </div>
              {showDeliInput && (
              <div  className='deli-container'>
              <h4 className='deli-title'>Phương thức thanh toán</h4>
                <div>
                  <label htmlFor='payment-card' className='payment'>
                  <input type='radio' name='payment-scard' id='payment-card' value='card' 
                    checked={selectedOption === 'card'} 
                    onChange={handleOptionChange}/>
                    Thanh toán qua thẻ tín dụng/ghi nợ
                  </label>
                </div>
                <div>
                  <label htmlFor='payment-cod' className='payment'>
                  <input type='radio' name='payment-cod' id='payment-cod' value='cod'
                    checked={selectedOption === 'cod'} 
                    onChange={handleOptionChange}/>
                    Thanh toán sau khi nhận hàng
                  </label>
                </div>
              </div>
              )}
              </div> 
          </div>

          <div className='rent-game'>
              <h4>Game</h4>
              <div className='game-info'>
                  <img className='game-img' alt="Game" src='https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7'/>
                  <h5 className='game-title'>{gameData.title}</h5>
                  <h5 className='genre'>Thể loại: {gameData.genre ? gameData.genre.join(', ') : ''}</h5>
              </div>

              <div className='cost-info'>
                  <h4 className='cost'>Thuê game: {rentalPrices[selectedPeriod]}</h4>
                  <h4 className='cost'>Phí vận chuyển: {deliveryCost}$</h4>
              </div>
              
              <div className='total'>
                  <h4 className='total'>Thành tiền: {rentalPrices[selectedPeriod] + deliveryCost}$</h4>
              </div>

              <div className='button-area'>
                  <button type='submit' className='confirm-rent-btn' value="Create Contract">Xác nhận</button>
                  <Link to='/explore'><button type='cancel'className='cancel-rent-btn' >Hủy</button></Link>
              </div>
          </div>
      </div>
    </form>
  );
}

export default RentGame;

