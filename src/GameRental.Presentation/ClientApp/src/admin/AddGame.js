import React, { Component } from 'react'
import './AddGame.css';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export class AddGame extends Component {
  render() {
    return (
      <div className='addgame-page'>
        <div className='addgame-form-container'>
            <form>
                <div className='mb-2'>
                    <label htmlFor='thumbnail' className='form-label'>
                        Thumbnail:
                    </label>
                    <label htmlFor='thumbnail-btn' className='form-label-btn'>
                        <BsFillPlusCircleFill className='thumbnail-class'/> 
                    </label>
                    <input 
                    id="thumbnail-btn"
                    className='form-control' 
                    type="file"
                    name="thumbnail"
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='media' className='form-label'>
                        Ảnh/Video:
                    </label>
                    <label htmlFor='media-btn' className='form-label-btn'>
                        <BsFillPlusCircleFill className='media-class'/> 
                    </label>
                    <input 
                    id="media-btn"
                    className='form-control' 
                    type="file"
                    name="media"
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='tieu-de' className='form-label'>
                        Tiêu đề:
                    </label>
                    <input 
                    id="tieu-de"
                    className='form-control'
                    type="text"
                    name="tieude"
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='the-loai' className='form-label'>
                        Thể loại:
                    </label>
                    <input 
                    id="the-loai"
                    className='form-control'
                    type="text"
                    name="theloai"
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='nen-tang' className='form-label'>
                        Nền tảng:
                    </label>
                    <input 
                    id="nen-tang"
                    className='form-control'
                    type="text"
                    name="nentang"
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='nha-phat-trien' className='form-label'>
                        Nhà phát triển:
                    </label>
                    <input 
                    id="nha-phat-trien"
                    className='form-control'
                    type="text"
                    name="nhaphattrien"
                    />
                </div>
                 <div className='mb-2'>
                    <label htmlFor='nha-phat-hanh' className='form-label'>
                        Nhà phát hành:
                    </label>
                    <input 
                    id="nha-phat-hanh"
                    className='form-control'
                    type="text"
                    name="nhaphathanh"
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='ngay-phat-hanh' className='form-label'>
                        Ngày phát hành:
                    </label>
                    <input 
                    id="ngay"
                    className='form-control'
                    type="date"
                    name='ngay'
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='kham-pha' className='form-label'>
                        Khám phá:
                    </label>
                    <input 
                    id="kham-pha"
                    className='form-control'
                    type="text"
                    name="khampha"
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='mo-ta' className='form-label'>
                        Mô tả:
                    </label>
                    <textarea 
                    id="mo-ta"
                    className='form-control'
                    type="text"
                    name="mota"
                    required
                    >
                    </textarea>
                </div>
                
            </form>
            <Link to="/games"><button type="submit" className='update-btn'>
            Cập nhật
            </button></Link>
            <Link to="/games"><button type='cancel' className='cancel-btn'>
            Hủy
            </button></Link>
        </div>
      </div>
    )
  }
}

export default AddGame;
