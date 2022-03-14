import React , { useState , useEffect ,Fragment} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, container, Paper , Grid, ListItem } from '@mui/material';
import { Link ,useHistory } from "react-router-dom";
import Menu from '@mui/material/Menu';
import Switch from '@mui/material/Switch';
import { useSelector , useDispatch } from 'react-redux';
import { increment , decrement } from '../Slice/counterSlice';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { savelangage  } from '../Slice/userSlice'
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { CenterFocusStrong } from '@material-ui/icons';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import {savelangauge} from '../Slice/languageSlice'

const pages = ['Upcoming', 'Popular', 'TopRated' , 'Favorites'];

export default function Appbar() {
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch() ;
  const language = useSelector((state) => state.user.lang);
  const region2 = useSelector((state) => state.user.lang);

  const handleChange2 = (event) => {
    setChecked(event.target.checked);
    if(event.target.checked){
      dispatch(increment());
    }else{
      dispatch(decrement());
    }
  };

  const [region, setRegion] = useState(region2);

  const handleChange = (event) => {
    setRegion(event.target.value);
    const t = event.target.value ;
    dispatch(savelangage(t));
  };

  const handleChangeLanguage=()=>{

  }

  const handlePopular=()=>{
    history.replace("/Popular");
  }
  const handleTopRated=()=>{
    history.replace("/TopRated");
  }
  const handleFavorites=()=>{
    history.replace("/Favorites");
  }
  const handleUpcoming=()=>{
    history.replace("/");
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    debugger
  };

  const handleCloseNavMenu = (value) => {
    debugger
    const type = value.target.value ;
    if(type === "Popular"){
      handlePopular();
    }else if(type === "TopRated"){
      handleTopRated()
    }else if(type === "Favorites"){
      handleFavorites()
    }else{
      handleUpcoming()
    }
    console.log(value.target.value);
    setAnchorElNav(null);
  };

  return (  
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" owrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} >
              Movies
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" 
                onClick={handleOpenNavMenu} color="inherit" >
                <MenuIcon />
              </IconButton>
              <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left', }} 
                open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' }, }} >
                {pages.map((page) => (
                  <MenuItem key={page} >
                    <Button key={page} value={page} onClick={handleCloseNavMenu} sx={{ my: 1, color: 'blue', display: 'inline-block' , backgroundColor: '#FAF0E6'}} >
                      {page}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
              Movies
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button key={page} value={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} >
                  {page}
                </Button>
              ))}
            </Box>
            <div>Adult Movies :<Switch onChange={handleChange2} checked={checked} inputProps={{ 'aria-label': 'controlled' }} /></div>
            <div>Region 
            <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth" value={region} onChange={handleChange} autoWidth label="Age" >
              <MenuItem value={'us'}>EN</MenuItem>
              <MenuItem value={'th'}>TH</MenuItem>
              <MenuItem value={'cn'}>CN</MenuItem>
              <MenuItem value={'jp'}>JP</MenuItem>
            </Select>
          </div>
          <div>Language 
            <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth" value={language} onChange={handleChangeLanguage} autoWidth label="Age" >
              <MenuItem value={'us'}>EN</MenuItem>
              <MenuItem value={'th'}>TH</MenuItem>
              <MenuItem value={'cn'}>CN</MenuItem>
              <MenuItem value={'jp'}>JP</MenuItem>
            </Select>
          </div>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}


