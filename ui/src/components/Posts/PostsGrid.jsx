/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Posts from './Posts';
import PostsGridHeader from './PostsGridHeader';

function PostsGrid({ posts }) {
  const [category, setCategory] = useState({ month: 'long' });

  const renderPosts = (somePosts) => somePosts.map((singlePost) => (
    <Grid item xs={2} sm={4} md={4}>
      <Posts singlePost={singlePost} />
    </Grid>
  ));

  const mapTo = () => posts.reduce((groups, post) => {
    if (Object.keys(category).length === 0) {
      return { All: posts };
    }
    const key = post.creation_date.toLocaleString('default', category);
    if (groups[key]) {
      groups[key].push(post);
    } else {
      // eslint-disable-next-line no-param-reassign
      groups[key] = [post];
    }
    return groups;
  }, {});

  const renderGrid = () => {
    const monthMap = mapTo();
    return Object.keys(monthMap).map((key) => {
      const somePosts = monthMap[key];
      return (
        <>
          <Typography variant="h5" component="div" sx={{ p: 2 }}>
            {key}
          </Typography>
          <Divider />
          <Grid
            container
            sx={{ p: 2 }}
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {renderPosts(somePosts)}
          </Grid>
        </>
      );
    });
  };

  return (
    <div>
      <PostsGridHeader setCategory={setCategory} />
      <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
        {renderGrid()}
      </Paper>
    </div>
  );
}

export default PostsGrid;
