import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import api from '../utils/axiosConfig';

const EditPostForm = ({ open, onClose, post, onPostUpdated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        description: post.description || '',
        image: null,
      });
      setPreview(post.image || '');
    }
  }, [post]);

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
      
      const updateData = {
        ...post, 
        title: formData.title,
        description: formData.description,
        image: preview || post.image,
        updatedAt: new Date().toISOString()
      };

      console.log('Updating post with data:', updateData); 
      const response = await api.put(`/posts/${post.id}`, updateData);
      console.log('Post updated:', response.data); 

      onPostUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating post:', error);
      setError(error.message || 'Error updating post');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
            style={{ marginTop: '16px' }}
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Update Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostForm; 