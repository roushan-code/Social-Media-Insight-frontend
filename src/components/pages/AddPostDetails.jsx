import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAddPostDetailsMutation } from '../../redux/api/api';
import AdminLayout from './AdminLayout';

const AddPostDetails = () => {
    const navigate = useNavigate();
    const [addPostDetails] = useAddPostDetailsMutation();
    const [formData, setFormData] = useState({
        postType: [],
        likes: '',
        comments: '',
        shares: '',
      });
    
      // Handle input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      // Handle form submission
      const handleSubmit = async(e) => {
        e.preventDefault();
        const toastId = toast.loading("New Post adding...")
        try {

        // const data = new FormData();
        // Object.entries(formData).forEach(([key, value]) => {
        //   // console.log(key);
        //   // console.log(value);
        //   // if (key === 'postType') {
        //   //   value.forEach((post) => data.append(key, post));
        //   // } else {w
        //     data.append(key, value);
        //   // }
        // });

        // data.forEach((value, key) => {
        //   console.log(key, value);
        // });
         await addPostDetails(formData).then((data) => {
            toast.success(data?.message, {id: toastId});
            setFormData({ postType: [], likes: '', comments: '', shares: '', });
            navigate('/postDetails');
        });
        

        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
        
      };
  return (
    <AdminLayout>
        <Box sx={{ bgcolor: "#465489", maxWidth: 600, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Post Submission Form
      </Typography>
      <form onSubmit={handleSubmit}>
          {/* Designation Dropdown */}
          <Grid item xs={12} my={2}>
            <FormControl fullWidth>
              <InputLabel>Post Type*</InputLabel>
              <Select
                name="postType"
                value={formData.postType}
                onChange={handleChange}
                required
              >
                <MenuItem value="carousel">Carousel</MenuItem>
                <MenuItem value="reel">Reel</MenuItem>
                <MenuItem value="static">Static</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Email Field */}
          <Grid item xs={12} my={2} >
            <TextField
              fullWidth
              label="Total Likes"
              type='number'
              name="likes"
              value={formData.likes}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Mobile Number Field */}
          <Grid item xs={12} my={2}>
            <TextField
              fullWidth
              label="Total Comments"
              type='number'
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              required
              
            />
          </Grid>

        <Grid container spacing={2} my={2} >
          {/* Name Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label=" Total Shares"
              type='number'
              name="shares"
              value={formData.shares}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} >
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
    </AdminLayout>
  )
}

export default AddPostDetails