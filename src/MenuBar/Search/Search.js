import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import SearchIcon from '@mui/icons-material/Search';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const [APIData, setAPIData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: "SELECT * FROM LearningModules"} }).then((response) => {
      setAPIData(Object.values(response.data));     
    }).catch(error => console.error(`Error ${error}`));
  }, [])

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const searchItems = (event) => {
    setSearchTerm(event);
    if (event !== "") {
      setAPIData(
        APIData.filter((item) => {
          return Object.values(item).join("").toLowerCase().includes(event.toLowerCase());
        })
      );
    } else {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/getQuery`, { params: { the_query: "SELECT * FROM LearningModules"} }).then((response) => {
        setAPIData(Object.values(response.data));
       
      }).catch(error => console.error(`Error ${error}`));
    }      
  }

  const navigateToModule = (id) => {
    window.location.href = `/learning-module/${id}`;
  }


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
      role="presentation">
      <List>
          <ListItem  disablePadding>
          <Box sx={{ flexGrow: 1 }}>
        <div>
          <Toolbar>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(event) => {
                  searchItems(event.target.value);
                }}
              />
            </Search>
          </Toolbar>
        </div>
      </Box>
          </ListItem>
    
      </List>
      <Divider />
      <List>
         {APIData.map((item, index) => {
                return (
                        <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => navigateToModule(item.ID)}>
                          <ListItemIcon>
                            {<img src={item.Img_url} alt="Logo" width="35" height="35" style={{
                              borderRadius: "50%",}}
                              
                              />}
                          </ListItemIcon>
                        <ListItemText primary={item.Title}/>
                        </ListItemButton>
                         <ArrowRightIcon/>
                     
                      </ListItem>
            )
         })}
      </List>
    </Box>
  );

  return (
    <div>
      {
        <React.Fragment key={"right"}>
          <Button onClick={toggleDrawer("right", true)} sx={{
            color: "white",
            borderColor: "white"
          }} variant="outlined" size='small' endIcon={<SearchIcon />}>Search</Button>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderColor: '#2c3e50',
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  
