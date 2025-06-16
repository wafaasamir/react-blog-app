import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Avatar,
  Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, AccessTime as TimeIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const BlogCard = ({ post, onEdit, onDelete }) => {
  const { user } = useAuth();
  const isOwner = user?.id === post.authorId;

 
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };


  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        mb: 2, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',cursor:'pointer',
          boxShadow: 3
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={post.image || 'https://via.placeholder.com/300'}
        alt={post.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        <Typography 
          gutterBottom 
          variant="h5" 
          component="div"
          sx={{ 
            fontWeight: 'bold',
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {post.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            flexGrow: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {post.description}
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mt: 'auto',
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: 'secondary.main',
                fontSize: '0.875rem'
              }}
            >
              {getInitials(post.authorName)}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
                {post.authorName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {formatDate(post.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {isOwner && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton 
                onClick={() => onEdit(post)} 
                size="small"
                sx={{ 
                  bgcolor: 'action.hover',
                  '&:hover': { bgcolor: 'action.selected' }
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => onDelete(post)} 
                size="small"
                sx={{ 
                  bgcolor: 'error.light',
                  color: 'error.contrastText',
                  '&:hover': { bgcolor: 'error.main' }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard; 