import React from 'react';
import { useState } from 'react';
import './RentGame.css';

function RentGame() 
{
  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  }
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const [showDateInput, setShowDateInput] = useState(false);

  const handleRadioChange = (event) => {
    setShowDateInput(event.target.value === 'date');
    setSelectedDate('');
  };

  return (
    <div className='page-container'>
      <h3 className='rent-title'>Thông tin thuê game</h3>
      <div className='rent-container'>
          <div className='rent-info'>
              <h4 className='info-title'>Thông tin</h4>
              <form className='name' method='post'>
                <label for='fullname'>Họ Tên:</label>
                <input type='text' name='fullname' id='fullname'/>
              </form>

              <form className='email' method='post'>
                <label for='email'>Email:</label>
                <input type='email' name='email' id='email'/>
              </form>

              <form className='tel' method='post'>
                <label for='tel'>SĐT:</label>
                <input type='tel' name='tel' id='tel'/>
              </form>

              <form className='address' method='post'>
                <label for='address'>Địa chỉ:</label>
                <input type='text' name='address' id='address'/>
              </form>

              <form className='period' method="post">
                <label for="period">Thời hạn thuê: </label>
                <select name="period" id="period">
                    <option value="3days">3 Ngày - 5$</option>
                    <option value="7days">7 Ngày - 10$</option>
                    <option value="14days">14 Ngày - 20$</option>
                    <option value="30days">30 Ngày - 40$</option>
                </select>
              </form>
          </div>
          <div className='rent-method'>
              <h4 className='deli-title'>Phương thức nhận hàng</h4>
              <form className='deli' method='post'>
                <div>
                  <label for='deli-store' className='store'>
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
                    name="date-get" id="date-get" />
                </div>
                )}
                <div>
                  <label for='deli-home' className='home'>
                  <input type='radio' name='deli-home' id='deli-home' value='home'
                    checked={!showDateInput} 
                    onChange={handleRadioChange}/>
                    Giao tận nhà
                  </label>
                </div>
              </form>

              <h4 className='deli-title'>Phương thức thanh toán</h4>
              <form className='deli' method='post'>
                <div>
                  <label for='deli-store' className='store'>
                  <input type='radio' name='deli-store' id='deli-store' value='card' 
                    checked={selectedOption === 'card'} 
                    onChange={handleOptionChange}/>
                    Thanh toán qua thẻ tín dụng/ghi nợ
                  </label>
                </div>
                
                <div>
                  <label for='deli-home' className='home'>
                  <input type='radio' name='deli-home' id='deli-home' value='cod'
                    checked={selectedOption === 'cod'} 
                    onChange={handleOptionChange}/>
                    Thanh toán sau khi nhận hàng
                  </label>
                </div>
              </form> 
          </div>

          <div className='rent-game'>
              <h4>Game</h4>
              <div className='game-info'>
                  <img className='game-img' alt="Game" src='https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7'/>
                  <h5 className='game-title'>God Of War</h5>
                  <h7 className='genre'>Thể loại: Action, Adventure</h7>
              </div>

              <div className='cost-info'>
                  <h4 className='cost'>Thuê game: 10$</h4>
                  <h4 className='cost'>Phí vận chuyển: 4$</h4>
              </div>
              
              <div className='total'>
                  <h4 className='total'>Thành tiền: 14$</h4>
              </div>

              <div className='btn-area'>
                  <button className='confirm-btn'>Xác nhận</button>
                  <button className='cancel-btn'>Hủy</button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default RentGame