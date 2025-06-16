import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import BlogCard from '../components/BlogCard';
import AddPostForm from '../components/AddPostForm';
import EditPostForm from '../components/EditPostForm';
import DeleteConfirmation from '../components/DeleteConfirmation';
import api from '../utils/axiosConfig';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/posts');
      console.log('Fetched posts:', response.data); 
      
    
      const sortedPosts = response.data.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
      
      setPosts(sortedPosts);
      setError('');
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setSelectedPost(post);
    setIsEditFormOpen(true);
  };

  const handleDelete = (post) => {
    setSelectedPost(post);
    setIsDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Loading posts...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      {posts.length === 0 ? (
        <Typography align="center">No posts yet. Be the first to create one!</Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <BlogCard
                post={post}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <AddPostForm
        open={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onPostAdded={fetchPosts}
      />

      <EditPostForm
        open={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        post={selectedPost}
        onPostUpdated={fetchPosts}
      />

      <DeleteConfirmation
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        post={selectedPost}
        onPostDeleted={fetchPosts}
      />
    </Container>
  );
};

export default Home; 