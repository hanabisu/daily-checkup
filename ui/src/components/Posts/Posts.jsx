import React from 'react';
import {
  Button, Typography, Card, CardContent, CardActions,
} from '@mui/material';

function Posts({ singlePost }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
          {singlePost.creation_date.toDateString()}
        </Typography>
        <Typography variant="h5" component="div">
          {singlePost.post_text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Full post</Button>
      </CardActions>
    </Card>
  );
}

export default Posts;
