import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostList.scss';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const config = {
        method: 'get',
        url: 'http://localhost:9110/posts',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMGM1ZWEyZS0wZGIwLTQ0ZGItOGE5My1kMTI3ZTc0NmUwZWYiLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInVzZXJuYW1lIjoidXNlcm5hbWUiLCJpYXQiOjE3MTcwNjg4NDcsImV4cCI6MTcxODM2NDg0N30.pC03b7c1_Mb7SEVLX_mGWGJqBWE-iD88PUxyQNJzFz4'
        }
      };

      try {
        const response = await axios(config).catch((err) => {
          console.error(err);
        });
        setPosts(response.data.posts);
      } catch (err) {
        setError(err.stack);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      {error ? (
        <p>{error}</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="post-item">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;
