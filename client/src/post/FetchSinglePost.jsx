import React, { useState } from 'react';

function FetchSinglePostColumn({ fetchSinglePost, post }) {
  const [postIdInput, setPostIdInput] = useState('');

  const handleFetchSinglePost = () => {
    if (postIdInput.trim() === '') {
      alert('Please enter a valid post ID.');
      return;
    }
    fetchSinglePost(parseInt(postIdInput));
  };

  return (
    <div className="column card">
      <h2>🔍 Fetch Single Post</h2>
      <form className="form">
        <label>
          Post ID:
          <input
            value={postIdInput}
            onChange={(e) => setPostIdInput(e.target.value)}
            className="input"
          />
        </label>
        <br />
        <button type="button" onClick={handleFetchSinglePost} className="button" style={{ marginTop: '70px' }}>
          Fetch Post
        </button>
      </form>

      <p>Title: {post?.title}</p>
      <p>Body: {post?.body}</p>
    </div>
  );
}

export default FetchSinglePostColumn;
