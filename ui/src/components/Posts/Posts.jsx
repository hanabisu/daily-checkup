import React from 'react';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';

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
      {/* <CardActions>
        <Button size="small">Full post</Button>
      </CardActions> */}
    </Card>
  );
}

export default Posts;
