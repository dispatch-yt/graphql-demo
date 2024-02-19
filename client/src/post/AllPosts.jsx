import React from 'react';

function AllPostsColumn({ allPosts }) {
  return (
    <div className="column card">
      <h2>📋 All Posts</h2>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {allPosts.map((post) => (
          <li key={post.id} className="list-item">
            <p className="list-item-title">Title: {post.title}</p>
            <p className="list-item-details">ID: {post.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllPostsColumn;
