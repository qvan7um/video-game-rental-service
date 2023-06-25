import React, { useState, useEffect } from 'react';
import './AddGame.css';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';

function EditGame() {
  const [gameData, setGameData] = useState(null);
  const {gameId} = useParams();
  const [showMediaForm, setShowMediaForm] = useState(false);

  function handleDeleteMedia(index) {
    // Remove media item from media array
    setGameData(prevData => ({
        ...prevData,
        media: prevData.media.filter((_, i) => i !== index)
      }));
  }

  function handleMediaSubmit(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Create media data object
    const mediaData = {
      type: event.target.type.value,
      url: event.target.url.value,
      caption: event.target.caption.value
    };

    // Validate media data
    if (!mediaData.type || !mediaData.url || !mediaData.caption) {
      // Display error message
      alert("Please fill in all media fields");
    } else {
      // Add media data to gameData.media array
      setGameData(prevData => ({
        ...prevData,
        media: [...prevData.media, mediaData]
      }));
      setShowMediaForm(false);
    }
  }
  const isAlert = () => {
    swal("Thành công", "Cập nhật game thành công", "success");
  }
  useEffect(() => {
    // Fetch game data for the specific game using the gameId prop
    fetch(`api/game/${gameId}`)
      .then(response => response.json())
      .then(data => setGameData(data));
  }, [gameId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGameData(prevData => ({ ...prevData, [name]: value,
        price: {
            threeDays: 5.99,
            sevenDays: 9.99,
            fourteenDays: 14.99,
            thirtyDays: 19.99
        } }));
  }

  const handleSubmit = (event) => {
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
                <form onSubmit={handleMediaSubmit}>

        {showMediaForm && (
            <div className='media-form'>
                        <h5 className='media-title'>Thêm Media</h5>
                        
                        
                            <div className='media-type'>
                            <label>Type:</label>
                            <select
                                name='type'>
                                <option value="img">Image</option>
                                <option value="video">Video</option>
                            </select>
                            </div>
                            <div className='media-url'>
                            <label>URL:</label>
                            <input
                                type="text"
                                name='url'
                            />
                            </div>
                            <div className='media-caption'>
                            <label>Caption:</label>
                            <input
                                type="text"
                                name='caption'
                                />
                            </div>
                        
                        
                        <button type="button" className='cancel-btn' onClick={() => setShowMediaForm(false)}>
                            Hủy
                        </button>
                        <button type="submit" className='update-btn'>
                            Thêm
                        </button>
                        </div>
                    )}
            </form>
            {/* <form onSubmit={handleSubmit}> */}
                <div className='mb-2'>
                    <label htmlFor='thumbnail' className='form-label'>
                        Thumbnail:
                    </label>
                    <label htmlFor='thumbnail-btn' className='form-label-btn'>
                    <BsFillPlusCircleFill className="thumbnail-class" onClick={() => setShowMediaForm(!showMediaForm)}>
                        {showMediaForm ? "Hide Media Form" : "Show Media Form"}
                    </BsFillPlusCircleFill>
                    </label>
                    <div className='media-content'>

                        {gameData.media.map((mediaItem, index) => (
                            <div key={index}>

                        {mediaItem.type === "img" ? (
                            <div className='media-item-wrapper'>
                            <img className="media-item" src={mediaItem.url} alt={mediaItem.caption} />
                            <button className='delete-media-btn' onClick={() => handleDeleteMedia(index)}>x</button>
                            </div>
                        ) : (
                            <div className='media-item-wrapper'>
                            <video className='media-item' src={mediaItem.url} controls />
                            <button className='delete-media-btn' onClick={() => handleDeleteMedia(index)}>x</button>
                            </div>
                        )}
                            </div>
                        ))}   
                    </div>
                    <input 
                    id="thumbnail-btn"
                    className='form-control' 
                    type="button"
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
                    <button type="submit" className='update-btn' value="Save" onClick={() => 
                        {isAlert();
                        handleSubmit();}}>
                        Cập nhật
                    </button>
                <Link to="/games"><button type='cancel' className='cancel-btn'>
                Hủy
                </button></Link>
            {/* </form> */}
        </div>
      </div>
  );
}

export default EditGame;