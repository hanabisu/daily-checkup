import React, { useState } from 'react';
import {
  TextField, Button, Snackbar, Stack,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useRealmApp } from '../../Realm';

function CreatePost({ getData }) {
  const [postText, setPostText] = useState('');
  const [open, setOpen] = useState(false);

  const app = useRealmApp();
  const handleChange = (e) => {
    setPostText(e.target.value);
  };
  const postEvent = async () => {
    await app.currentUser.functions.createPost(postText);
    setPostText('');
    setOpen(true);
    await getData();
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  return (
    <Stack sx={{ pt: 2 }} spacing={2}>
      <TextField
        sx={{ width: '50%' }}
        id="post-text"
        label="What's something good that happened today?"
        multiline
        rows={4}
        variant="outlined"
        onChange={handleChange}
        value={postText}
      />

      <Button sx={{ width: '25%' }} variant="contained" color="primary" onClick={postEvent}>
        Save
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Post saved!"
        action={action}
      />
    </Stack>
  );
}

export default CreatePost;
