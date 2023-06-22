import React, { Component } from 'react'
import './AddGame.css';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const handleSubmit = async (event) => {
    event.preventDefault();
    const gameData = {      
        title: event.target.title.value,
        genre: event.target.genre.value.split(","),
        platform: event.target.platform.value,
        explore: event.target.explore.value.split(","),
        releaseDate: event.target.releaseDate.value,
        developer: event.target.developer.value.split(","),
        publisher: event.target.publisher.value,
        description: event.target.description.value,
        esrbRating: event.target.esrbRating.value,
        media: [
            {
                type: "img",
                url:
                    "<URL>",
                caption:
                    "Screenshot from The Legend of Zelda: Tears of the Kingdom"
            },
            {
                type: "video",
                url:
                    "<URL>",
                caption:
                    "Trailer for The Legend of Zelda: Tears of the Kingdom"
            }
        ],
        price: {
            threeDays: 5.99,
            sevenDays: 9.99,
            fourteenDays: 14.99,
            thirtyDays: 19.99
        }
    };
    // const gameData = {     
    //     title: "Elden Ring",
    //     genre: ["Open World", "RPG"],
    //     platform: "PS5",
    //     explore: ["Featured", "New release"],
    //     releaseDate: "2022-06-25",
    //     developer: ["From Software"],
    //     publisher: "From Software",
    //     description:
    //     "The Legend of Zelda: Tears of the Kingdom is an action-adventure game developed and published by Nintendo for the Nintendo Switch.",
    //     esrbRating: "E10+",
    //     media: [
    //         {
    //             type: "img",
    //             url:
    //                 "<URL>",
    //             caption:
    //                 "Screenshot from The Legend of Zelda: Tears of the Kingdom"
    //         },
    //         {
    //             type: "video",
    //             url:
    //                 "<URL>",
    //             caption:
    //                 "Trailer for The Legend of Zelda: Tears of the Kingdom"
    //         }
    //     ],
    //     price: {
    //         threeDays: 5.99,
    //         sevenDays: 9.99,
    //         fourteenDays: 14.99,
    //         thirtyDays: 19.99
    //     }

    // };


    const response = await fetch ("/game", {
        method: "POST",
        headers : {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
    }
    );
    if (response.ok) {
        swal("Thành công", "Thêm game thành công", "success");
    }
    else
    {
        swal("Thất bại", "Bạn cần nhập đầy đủ thông tin", "error");
    }
};
export class AddGame extends Component {
  render() {
    return (
      <div className='addgame-page'>
        <div className='addgame-form-container'>
            <form onSubmit={handleSubmit}>
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
                    name="title"
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
                    name="genre"
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
                    name="platform"
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
                    name="developer"
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
                    name="publisher"
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
                    name='releaseDate'
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
                    name="explore"
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='rating' className='form-label'>
                        Esrb Rating:
                    </label>
                    <input 
                    id="rating"
                    className='form-control'
                    type="text"
                    name="esrbRating"
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
                    name="description"
                    required
                    >
                    </textarea>
                </div>
                
                
                <button type="submit" className='update-btn' value="Create Game" >
                    Thêm
                </button>
                <Link to="/games"><button type='cancel' className='cancel-btn'>
                Hủy
                </button></Link>
            </form>
        </div>
      </div>
    )
  }
}

export default AddGame;