import React, { Component } from 'react';
import './AddContract.css';
import { Link } from 'react-router-dom';

export class AddContract extends Component {
  render() {
    return (
      <div className='addcontracts-page'>
        <div className='addcontracts-form-container'>
            <form>
                <div className='mb-2'>
                    <label htmlFor='namect' className='form-label'>
                        Tên hợp đồng
                    </label>
                    <input 
                    id="namect"
                    className='form-control'
                    type="text"
                    name="namect"
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='gamect' className='form-label'>
                        Game
                    </label>
                    <input 
                    id="gamect"
                    className='form-control'
                    type="text"
                    name="gamect"
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='personct' className='form-label'>
                        Người thuê
                    </label>
                    <input 
                    id="personct"
                    className='form-control'
                    type="text"
                    name="personct"
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='emailct' className='form-label'>
                        Email
                    </label>
                    <input 
                    id="emailct"
                    className='form-control'
                    type="text"
                    name="emailct"
                    />
                </div>
                 <div className='mb-2'>
                    <label htmlFor='phonect' className='form-label'>
                        Số điện thoại
                    </label>
                    <input 
                    id="phonect"
                    className='form-control'
                    type="text"
                    name="phonect"
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='rentdatect' className='form-label'>
                        Ngày thuê
                    </label>
                    <input 
                    id="rentdatect"
                    className='form-control'
                    type="date"
                    name='rentdatect'
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='exdatect' className='form-label'>
                        Ngày hết hạn
                    </label>
                    <input 
                    id="exdatect"
                    className='form-control'
                    type="date"
                    name='exdatect'
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='status' className='form-label'>
                        Trạng thái
                    </label>
                    <div className='radio-container'>
                        <label className='radio' id="hoanthanh">
                        <input type="radio" value="Hoàn thành" name='status' />Hoàn thành
                        <span></span>
                        </label>
                        <label className='radio' id="dahuy">
                        <input type="radio" value="Đã hủy" name='status' />Đã hủy
                        <span></span>
                        </label>
                        <label className='radio' id="cohieuluc">
                        <input type="radio" value="Có hiệu lực" name='status' />Có hiệu lực
                        <span></span>
                        </label>
                        <label className='radio' id ="dangcho">
                        <input type="radio" value="Đang chờ" name='status' />Đang chờ
                        <span></span>
                        </label>
                        <label className='radio' id="quahan">
                        <input type="radio" value="Quá hạn" name='status' />Quá hạn 
                        <span></span>
                        </label>
                    </div>
                </div>
                
            </form>
            <Link to="/contracts"><button type="submit" className='update-btn'>
            Thêm
            </button></Link>
            <Link to="/contracts"><button type='cancel' className='cancel-btn'>
            Hủy
            </button></Link>
        </div>
      </div>
    )
  }
}

export default AddContract;
