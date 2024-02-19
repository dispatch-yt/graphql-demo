import React, { useState } from 'react';

function CreatePostColumn({ createPost }) {
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  const handleCreatePost = async () => {
    try {
      const result = await createPost({
        variables: {
          input: {
            title: newPost.title,
            body: newPost.body,
          },
        },
      });

      alert("New post added successfully! " + JSON.stringify(result.data.createPost));
    } catch (mutationError) {
      console.error('Error creating post:', mutationError.message);
    }
  };

  return (
    <div className="column card">
      <h2> 📝 Create New Post</h2>
      <form className="form">
        <label>
          Title:
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="input"
          />
        </label>
        <br />
        <label>
          Body:
          <input
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            className="input"
          />
        </label>
        <br />
        <button type="button" onClick={handleCreatePost} className="button">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePostColumn;
