import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axiosConfig';

const AddPostForm = ({ open, onClose, onPostAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [preview, setPreview] = useState('');
  const { user } = useAuth();

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
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('authorId', user.id);
      formDataToSend.append('authorName', user.name);

      await api.post('/posts', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onPostAdded();
      onClose();
      setFormData({ title: '', description: '', image: null });
      setPreview('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Post</DialogTitle>
      <DialogContent>
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
          Add Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostForm; 