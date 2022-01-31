/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  Typography, Divider, Grid,
} from '@mui/material';

import Posts from './Posts';

function PostsGrid({ posts }) {
  const renderPosts = () => posts.map((singlePost) => (
    <Grid item xs={2} sm={4} md={4}>
      <Posts singlePost={singlePost} />
    </Grid>
  ));
  return (
    <div>
      <input
        id="search-bar"
        type="text"
        style={{ marginLeft: 'auto' }}
        className="form-control"
        placeholder="Search keyword"
      />

      <Typography variant="h5" component="div">
        January 2022
      </Typography>
      <Divider />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {renderPosts()}
      </Grid>
    </div>
  );
}

export default PostsGrid;
