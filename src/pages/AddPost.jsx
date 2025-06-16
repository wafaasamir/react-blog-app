import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axiosConfig';

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  
  console.log('Current user in AddPost:', user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user || !user.name) {
        throw new Error('User data is not available. Please log in again.');
      }

      
      const postData = {
        title: formData.title,
        description: formData.description,
        image: preview || 'https://via.placeholder.com/300',
        authorId: user.id,
        authorName: user.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Creating post with data:', postData); 
      const response = await api.post('/posts', postData);
      console.log('Post created:', response.data); 

     
      setFormData({
        title: '',
        description: '',
        image: null,
      });
      setPreview('');

      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error.message || 'Error creating post');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Add New Post
          </Typography>
          {error && (
            <Typography color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              required
              
            />
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              style={{ marginTop: '16px'  ,color:'white' ,borderRadius:'5px' ,padding:'10px' ,border:'none' ,fontSize:'1.2rem' ,fontWeight:'bold' ,cursor:'pointer' }}
            />
            {preview && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              </Box>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3  ,backgroundColor:'secondary.main' ,color:'white' ,borderRadius:'5px' ,padding:'10px' ,border:'none' ,fontSize:'1.2rem' ,fontWeight:'bold' ,cursor:'pointer' }}
            >
              Add Post
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddPost; 