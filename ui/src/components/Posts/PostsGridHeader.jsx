import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import {
  MenuItem,
} from '@material-ui/core';

function PostsGridHeader({ setCategory }) {
  const [groupBy, setGroupBy] = useState('month');

  const handleGroupBySelect = (event) => {
    setGroupBy(event.target.value);
    switch (event.target.value) {
      case 'month':
        setCategory({ month: 'long' });
        break;
      case 'year':
        setCategory({ year: 'numeric' });
        break;
      default:
        setCategory({});
    }
  };

  const StyledSelect = styled(Select)(`
  & .MuiSelect-outlined {
    colour: white;
    border-color: red;
  }
  &:hover .MuiSelect-outlined {
    colour: white;
    border-color: blue;
  }

  .MuiSelect-icon {
    color: white;
  }

  label {
    color:white;
  }
`);

  // const Search = styled('div')(({ theme }) => ({
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   '&:hover': {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  //   marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(1),
  //     width: 'auto',
  //   },
  // }));

  // const SearchIconWrapper = styled('div')(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }));

  // const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   color: 'inherit',
  //   '& .MuiInputBase-input': {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     // vertical padding + font size from searchIcon
  //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     transition: theme.transitions.create('width'),
  //     width: '100%',
  //     [theme.breakpoints.up('sm')]: {
  //       width: '12ch',
  //       '&:focus': {
  //         width: '20ch',
  //       },
  //     },
  //   },
  // }));
  return (
    <Box sx={{ pt: 2, flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            My Positives
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Box sx={{ pl: 1, minWidth: 150 }}>
            <FormControl fullWidth style={{ color: 'white' }}>
              <InputLabel id="demo-simple-select-label">Group By</InputLabel>
              <StyledSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={groupBy}
                label="Group By"
                onChange={handleGroupBySelect}
                autoWidth
                variant="outlined"
              >
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="year">Year</MenuItem>
                <MenuItem value="all">All</MenuItem>
              </StyledSelect>
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default PostsGridHeader;
