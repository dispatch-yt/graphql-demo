import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import './styles.css';
import CreatePostColumn from './CreatePost';
import FetchSinglePostColumn from './FetchSinglePost';
import AllPostsColumn from './AllPosts';

const GET_POSTS = gql`
  query GetPosts($postId: Int!) {
    getPost(id: $postId) {
      userId
      id
      title
      body
    }
    getAllPosts {
      userId
      id
      title
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      userId
      id
      title
    }
  }
`;

function Posts() {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { postId: selectedPostId || 1 },
  });
  const [createPost] = useMutation(CREATE_POST);

  const handleFetchSinglePost = (postId) => {
    setSelectedPostId(postId);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <div>
        <div style={{ textAlign: 'center', marginBottom: '30px', fontSize: '20px' }}>
          <h1>Dispatch: GraphQL Demo</h1>
          <div id='subscribe'>👆 Subscribe to see more videos like this! 🌟🎥 </div>
        </div>
      </div>
      <div className="container">
        <CreatePostColumn createPost={createPost} />
        <FetchSinglePostColumn fetchSinglePost={handleFetchSinglePost} post={data.getPost} />
        <AllPostsColumn allPosts={data.getAllPosts} />
      </div>
    </>
  );
}

export default Posts;
