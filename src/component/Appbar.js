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
import { saveRegion  } from '../Slice/regionSlice'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import {savelangauge} from '../Slice/languageSlice'
import { I18nPropvider, LOCALES } from '../i18nProvider';
import translate from "../i18nProvider/translate";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';
import { savefavorite, unsavafavorite } from '../Slice/favoritesSlice';

const pages = ['Upcoming', 'Popular', 'TopRated' ];
// , 'Favorites'
export default function Appbar() {
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch() ;
  const language2 = useSelector((state) => state.language.lang == null?'us' : state.language.lang);
  const region2 = useSelector((state) => state.region.lang);
  const favorites = useSelector((state) => state.favorites.title);

  const handleChangeAdult = (event) => {
    setChecked(event.target.checked);
    if(event.target.checked){
      dispatch(increment());
    }else{
      dispatch(decrement());
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const OpenListMenuFavorite = Boolean(anchorEl);
  const handleClickOpenListMenuFavorite = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseListMenuFavorite = () => {
    setAnchorEl(null);
  };

  const [region, setRegion] = useState(region2);
  const handleChangeRegion = (event) => {
    setRegion(event.target.value);
    const t = event.target.value ;
    dispatch(saveRegion(t));
  };

  const [language, setLanguage] = useState(language2);
  const handleChangeLanguage=(event)=>{
    setLanguage(event.target.value);
    const lang = event.target.value ;
    dispatch(savelangauge(lang));
    console.log(lang);
  }

  const handlePopular=()=>{
    history.replace("/Popular");
  }
  const handleTopRated=()=>{
    history.replace("/TopRated");
  }
  const handleFavorites=()=>{
    history.replace("/Favorites");
    setAnchorEl(null);
  }
  const handleUpcoming=()=>{
    history.replace("/");
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (value) => {
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

  const [openFavorite, setOpenFavorite] = React.useState(false);
  const handleClickOpenFavorite = () => {
    setOpenFavorite(true);
  };

  const handleCloseFavorite = () => {
    setOpenFavorite(false);
  };
  const handleClearFavorite = () => {
    const r = favorites.length ;
    for(let i=0 ; i<r ; i++){
      if(favorites[i] !== null){
        dispatch(unsavafavorite(favorites[i]));
      }
    }
    setAnchorEl(null);
    setOpenFavorite(false);
  };

  const listregion = [
    {
      value: 'us',
      label: 'EN',
    },
    {
      value: 'th',
      label: 'TH',
    },
    {
      value: 'cn',
      label: 'CN',
    },
    {
      value: 'jp',
      label: 'JP',
    },
  ];
  const listlanguage = [
    {
      value: LOCALES.ENGLISH ,
      label: 'EN',
    },
    {
      value: LOCALES.THAI ,
      label: 'TH',
    },
  ];


  return (  
    <I18nPropvider locale={language2}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" owrap="true" component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} >
            {translate('Movies')}
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
                      {translate(page)}
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
                  {translate(page)}
                </Button>
              ))}
              <Button id="basic-button"  aria-controls={OpenListMenuFavorite ? 'basic-menu' : undefined}  aria-haspopup="true" 
                aria-expanded={OpenListMenuFavorite ? 'true' : undefined} sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={handleClickOpenListMenuFavorite}>{translate('Favorite Menu')}</Button>
            </Box>
            <Menu id="basic-menu" anchorEl={anchorEl} open={OpenListMenuFavorite} onClose={handleCloseListMenuFavorite} MenuListProps={{ 'aria-labelledby': 'basic-button', }} >
              <MenuItem onClick={handleFavorites}>{translate('Favorites')}</MenuItem>
              <MenuItem onClick={handleClickOpenFavorite}>{translate('Clear Favorites')}</MenuItem>
            </Menu>
            <Dialog open={openFavorite} onClose={handleCloseFavorite} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title" >
              <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
              {translate('Warn')}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                {translate('Do you want to clear your favorites list?')}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleCloseFavorite}>{translate('Cancel')}</Button>
                <Button onClick={handleClearFavorite}>{translate('Okay')}</Button>
              </DialogActions>
            </Dialog>
            <div>{translate('Adult Movies')} :<Switch onChange={handleChangeAdult} checked={checked} inputProps={{ 'aria-label': 'controlled' }} /></div>

            <TextField id="outlined-select-currency" select label={translate('Region')} value={region} onChange={handleChangeRegion}  >
              {listregion.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField id="outlined-select-currency" select label={translate('Language')} value={language} onChange={handleChangeLanguage}  style={{ width:"80px" , marginLeft:'10px'}}>
              {listlanguage.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
    </I18nPropvider>
  );
}
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
      <Paper {...props} />
    </Draggable>
  );
}


