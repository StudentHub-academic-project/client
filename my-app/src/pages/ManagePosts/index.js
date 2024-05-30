import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';
import { useNavigate } from 'react-router-dom';

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const config = {
      method: 'get',
      url: 'http://localhost:9110/posts',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMGM1ZWEyZS0wZGIwLTQ0ZGItOGE5My1kMTI3ZTc0NmUwZWYiLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInVzZXJuYW1lIjoidXNlcm5hbWUiLCJpYXQiOjE3MTcwNjg4NDcsImV4cCI6MTcxODM2NDg0N30.pC03b7c1_Mb7SEVLX_mGWGJqBWE-iD88PUxyQNJzFz4'
      }
    };

    try {
      const response = await axios(config);
      setPosts(response.data.posts);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateOrUpdatePost = async () => {
    const data = JSON.stringify({ title, content });

    try {
      const config = {
        method: editingPostId ? 'patch' : 'post',
        url: editingPostId ? `http://localhost:9110/posts/${editingPostId}` : 'http://localhost:9110/posts',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMGM1ZWEyZS0wZGIwLTQ0ZGItOGE5My1kMTI3ZTc0NmUwZWYiLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInVzZXJuYW1lIjoidXNlcm5hbWUiLCJpYXQiOjE3MTcwNjg4NDcsImV4cCI6MTcxODM2NDg0N30.pC03b7c1_Mb7SEVLX_mGWGJqBWE-iD88PUxyQNJzFz4',
          'Content-Type': 'application/json'
        },
        data
      };

      await axios(config);
      fetchPosts();
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditPost = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditingPostId(post.uuid);
  };

  const handleDeletePost = async (postId) => {
    const config = {
      method: 'delete',
      url: `http://localhost:9110/posts/${postId}`,
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMGM1ZWEyZS0wZGIwLTQ0ZGItOGE5My1kMTI3ZTc0NmUwZWYiLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInVzZXJuYW1lIjoidXNlcm5hbWUiLCJpYXQiOjE3MTcwNjg4NDcsImV4cCI6MTcxODM2NDg0N30.pC03b7c1_Mb7SEVLX_mGWGJqBWE-iD88PUxyQNJzFz4'
      }
    };

    try {
      await axios(config);
      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditingPostId(null);
  };

  return (
    <div className="manage-posts">
      <header className="header">
        <div className="logo" onClick={() => navigate('/')}></div>
        <h1 className="project-title">StudentHub</h1>
      </header>
      <h1>Manage Posts</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="button" onClick={handleCreateOrUpdatePost}>
          {editingPostId ? 'Update Post' : 'Create Post'}
        </button>
        {editingPostId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>
      <div className="post-list">
        {posts.map(post => (
          <div key={post.uuid} className="post-item">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => handleEditPost(post)}>Edit</button>
            <button onClick={() => handleDeletePost(post.uuid)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePosts;
