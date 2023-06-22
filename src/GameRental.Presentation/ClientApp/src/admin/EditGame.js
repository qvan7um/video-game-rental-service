import React, { useState, useEffect } from 'react';
import './AddGame.css';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';

function EditGame() {
  const [gameData, setGameData] = useState(null);
  const {gameId} = useParams();
  const isAlert = () => {
    swal("Thành công", "Cập nhật game thành công", "success");
  }
  useEffect(() => {
    // Fetch game data for the specific game using the gameId prop
    fetch(`api/games/?id=${gameId}`)
      .then(response => response.json())
      .then(data => setGameData(data));
  }, [gameId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGameData(prevData => ({ ...prevData, [name]: value,
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
        } }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update game data in database
    fetch(`api/game/update/${gameId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gameData)
    });
  }

  if (!gameData) return <p>Loading...</p>;

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
                    value={gameData.title}
                    onChange={handleInputChange}
                    placeholder={gameData.title}
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
                    value={gameData.genre}
                    onChange={handleInputChange}
                    placeholder={gameData.genre}
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
                    value={gameData.platform}
                    onChange={handleInputChange}
                    placeholder={gameData.platform}
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
                    value={gameData.developer}
                    onChange={handleInputChange}
                    placeholder={gameData.developer}
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
                    value={gameData.publisher}
                    onChange={handleInputChange}
                    placeholder={gameData.publisher}
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
                    value={gameData.releaseDate}
                    onChange={handleInputChange}
                    placeholder={gameData.releaseDate}
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
                    value={gameData.explore}
                    onChange={handleInputChange}
                    placeholder={gameData.explore}
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
                    value={gameData.esrbRating}
                    onChange={handleInputChange}
                    placeholder={gameData.esrbRating}
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
                    value={gameData.description}
                    onChange={handleInputChange}
                    placeholder={gameData.description}
                    required
                    >
                    </textarea>
                </div>
                    <button type="submit" className='update-btn' value="Save" onClick={isAlert}>
                        Cập nhật
                    </button>
                <Link to="/games"><button type='cancel' className='cancel-btn'>
                Hủy
                </button></Link>
            </form>
        </div>
      </div>
  );
}

export default EditGame;