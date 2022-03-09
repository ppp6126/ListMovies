import React , { useState , useEffect ,Fragment} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Container, Paper , Grid, ListItem  } from '@mui/material';
import { Link ,useHistory } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { useSelector , useDispatch } from 'react-redux';
import { increment , decrement } from './Slice/counterSlice';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { savelangage  } from './Slice/userSlice'
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { CenterFocusStrong } from '@material-ui/icons';

export default function Appbar() {
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch() ;

  const handleChange2 = (event) => {
    setChecked(event.target.checked);
    if(event.target.checked){
      dispatch(increment());
    }else{
      dispatch(decrement());
    }
  };

  const [age, setAge] = useState('us');

  const handleChange = (event) => {
    setAge(event.target.value);
    const t = event.target.value ;
    dispatch(savelangage(t));
  };

  const handlePopular=()=>{
    history.replace("/Popular");
  }
  const handleTopRated=()=>{
    history.replace("/TopRated");
  }
  const handleUpcoming=()=>{
    history.replace("/");
  }
    
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }} role="presentation"
      onClick={toggleDrawer(anchor, false)}  onKeyDown={toggleDrawer(anchor, false)} >
      <List>
      <Divider />
        <ListItem >
          <Grid container spacing={2} width={'100%'}>
            <Grid  item style={{marginLeft: 'auto' , marginRight: 'auto' }}>
              <Button  variant="contained"  onClick={handleUpcoming}>Upcoming</Button>
            </Grid>
            <Grid  item style={{marginLeft: 'auto' , marginRight: 'auto' }}>
              <Button variant="contained"  onClick={handlePopular}>Popular</Button>
            </Grid>
            <Grid  item style={{marginLeft: 'auto' , marginRight: 'auto' }}>
              <Button variant="contained"  onClick={handleTopRated}>Top Rated</Button>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
      </List>
    </Box>
  );
  return (  
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} >
              {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <MenuIcon onClick={toggleDrawer(anchor, true)}></MenuIcon>
                  
                  <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} style={{marginLeft: 'auto' , marginRight: 'auto' }}>
                    <Grid Container style={{textAlign:'center'}}>
                        {list(anchor)}
                    </Grid>
                  </Drawer>
                </React.Fragment>
              ))}
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{display: 'block' , margin: 'auto' , marginLeft:'270px'}}  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Movies 
          </Typography>
          <div>Adult Movies :<Switch onChange={handleChange2} checked={checked} inputProps={{ 'aria-label': 'controlled' }} /></div>
          <div>Region 
            <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth" value={age} onChange={handleChange} autoWidth label="Age" >
              <MenuItem value={'us'}>EN</MenuItem>
              <MenuItem value={'th'}>TH</MenuItem>
              <MenuItem value={'cn'}>CN</MenuItem>
              <MenuItem value={'jp'}>JP</MenuItem>
            </Select>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


