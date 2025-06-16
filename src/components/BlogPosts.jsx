import React, { useState } from 'react';
import { Button } from '@mui/material';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);

  const handleEdit = (post) => {
 
  };

  const handleDelete = (id) => {

  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
         
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(post)}
            sx={{ 
              mr: 1,
              bgcolor: '#2f5061',
              '&:hover': {
                bgcolor: '#1e3a4a'
              }
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(post.id)}
            sx={{ 
              bgcolor: '#e57f84',
              '&:hover': {
                bgcolor: '#d15a60'
              }
            }}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts; 