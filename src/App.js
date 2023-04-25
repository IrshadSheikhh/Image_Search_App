import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
function App() {
  const [photo, setPhoto] = useState('');
  const [result, setResult] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changePhoto = () => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&query=${photo}&client_id=MnYtbTf5IgyqBQVoVPCyqpynlXyTDoKooB0QIprISU0`
      )
      .then((response) => {
        setResult(response.data.results);
      });
  };

  const addBookmark = (photo) => {
    setBookmarks([...bookmarks, photo]);
  };

  const openBookmarksModal = () => {
    setIsModalOpen(true);
  };

  const closeBookmarksModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='container my-5'>
        <h1 className='text-center mb-4'>REACT PHOTO SEARCH</h1>
        <div className='d-flex justify-content-center align-items-center'>
          <input
            type='text'
            className='form-control me-2'
            placeholder='Search for photos'
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
          <button type='submit' onClick={changePhoto} className='btn btn-primary'>
            Search
          </button>
          <button type='button' onClick={openBookmarksModal} className='btn btn-link ms-3'>
            Bookmarks
          </button>
        </div>
      </div>

      <div className='container'>
        {result.length > 0 && (
          <div className='row row-cols-1 row-cols-md-3 g-4'>
          {result.map((value, index) => (
  <div className='col' key={index}>
    <div className='card h-100 card-bookmark'>
      <img src={value.urls.small} className='card-img-top' alt='' />
      <div className='card-body '>
        {bookmarks.some((bookmark) => bookmark.id === value.id) ? (
          <button type='button' className=' btn btn-success' disabled>
            Bookmarked
          </button>
        ) : (
          <button
            type='button'
            className='bookmark btn btn-outline-primary'
            onClick={() => addBookmark(value)}
          >
            Bookmark
          </button>
        )}
      </div>
    </div>
  </div>
))}

          </div>
        )}

        {result.length === 0 && (
          <div className='text-center'>
            <p>No photos found. Please enter a search term.</p>
          </div>
        )}
      </div>

      <div
        className={`modal fade ${isModalOpen ? 'show' : ''}`}
        id='bookmarksModal'
        tabIndex='-1'
        aria-labelledby='bookmarksModalLabel'
        aria-hidden={!isModalOpen}
        style={{ display: isModalOpen ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='bookmarksModalLabel'>
                Bookmarks
              </h5>
              <button type='button' className='btn-close' onClick={closeBookmarksModal} aria-label='Close' />
            </div>
            <div className='modal-body'>
              {bookmarks.length === 0 ? (
                <p>No bookmarks yet.</p>
              ) : (
                <ul className='list group'>
{bookmarks.map((value, index) => (
<li key={index} className='list-group-item'>
<img src={value.urls.small} alt='' className='me-2' />
<a href={value.links.html} target='_blank' rel='noopener noreferrer'>
{value.alt_description || 'Untitled'}
</a>
<button className='btn btn-danger btn-sm float-end' onClick={() => {
const filteredBookmarks = bookmarks.filter((bookmark) => bookmark !== value);
setBookmarks(filteredBookmarks);
}}>Remove</button>
</li>
))}
</ul>
)}
</div>

</div>
</div>
</div>
</>
);
}

export default App;
