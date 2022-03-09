import React, { useState, useEffect } from 'react';
import { Button, Container, Paper, Grid } from '@mui/material';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector, useDispatch } from 'react-redux';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha , useTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { savefavorite, unsavafavorite } from './Slice/favoritesSlice';
import { color } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { connect } from 'react-redux';


const url = "https://api.themoviedb.org/3/movie/popular?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&page="
const url2 = "&region="
const urlSearch = "https://api.themoviedb.org/3/search/movie?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&page=";
const urlSearch2 = "&include_adult=";
const urlSearch3 = "&query=";

const urlgenre = "https://api.themoviedb.org/3/genre/movie/list?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US";

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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '100%',
      },
    },
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '40%',
  },
}));

export default function Popular() {
  const count = useSelector((state) => state.counter.value);
  const [movie, setMovie] = useState([])
  const [genre, setGenre] = useState([])
  const [img, setimg] = useState('https://image.tmdb.org/t/p/original')
  const [page, setPage] = useState(1);
  const [totalPage, setTotalpages] = useState(0);
  const [keyword, setKeyWord] = useState('');
  const region = useSelector((state) => state.user.lang);
  const favorites = useSelector((state) => state.favorites.title);

  const dispatch = useDispatch();

  const handleClickSearch=()=>{

  }

  const handleChangeFavorites = (event, newValue) => {
    console.log(favorites);
    var x = new Boolean(false);
    let i = 0;
    for (i = 0; i < favorites.length; i++) {
      if (favorites[i] === newValue) {
        console.log(favorites[i] + " === " + newValue)
        x = true;
        break;
      } else {
        console.log(favorites[i] + " !== " + newValue)
        x = false;
      }
    }
    if (x) {
      dispatch(unsavafavorite(newValue));
    } else {
      dispatch(savefavorite(newValue));
    }
  };

  const searchMovie = (event) => {
    console.log("value = " + event.target.value);
    setKeyWord(event.target.value);
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        console.log('enter press here! ')
        const key = event.target.value;
        var adult = new Boolean(false);
        debugger
        if (count === 1) {
          adult = true;
        }
        const url = urlSearch + page + urlSearch3 + key + urlSearch2 + adult;
        console.log(url);
        fetch(url)
          .then(res => res.json())
          .then((result) => {
            setMovie(result.results);
            setTotalpages(result.total_pages);
            console.log(result.total_pages);
          })
        setPage(1);
      } else {
        setPage(1);
        getlistmoive(1);
        console.log('error0');
      }

    }
  }

  const handleChange = (event, value) => {
    setPage(value);
    if (keyword !== '') {
      searchlistmoive(value, keyword);
    } else {
      getlistmoive(value);
    }

    window.scrollTo(0, 1);
  };

  const searchlistmoive = (value, keyword) => {
    const url = urlSearch + keyword + urlSearch2 + value;
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        setMovie(result.results);
        setTotalpages(result.total_pages);
        console.log(result.total_pages);
      })
  }

  const getlistmoive = (value) => {
    const m = [];
    const u = url + value + url2 + region;
    console.log("Status = " + u);
    if (count === 1) {
      fetch(u)
        .then(res => res.json())
        .then((result) => {
          setMovie(result.results);
          setTotalpages(result.total_pages);
        })
    } else {
      fetch(u)
        .then(res => res.json())
        .then((result) => {
          const r = [];
          r.push(result.results);
          let round = r[0].length;
          for (let i = 0; i < round; i++) {
            if (!result.results[i].adult) {
              m.push(result.results[i]);
            }
          }
          setTotalpages(result.total_pages);
          setMovie(m);
        })
    }
  }

  useEffect(() => {
    const m = [];
    const u = url + page + url2 + region;
    console.log("Status = " + u);
    fetch(urlgenre)
    .then(res => res.json())
    .then((result) =>{
        setGenre(result.genres);
    })
    if (count === 1) {
      fetch(u)
        .then(res => res.json())
        .then((result) => {
          setMovie(result.results);
          setTotalpages(result.total_pages);
        })
    } else {
      fetch(u)
        .then(res => res.json())
        .then((result) => {
          const r = [];
          r.push(result.results);
          let round = r[0].length;
          for (let i = 0; i < round; i++) {
            if (!result.results[i].adult) {
              m.push(result.results[i]);
            }
          }
          setTotalpages(result.total_pages);
          setMovie(m);
        })
    }
  }, [region, count])

  return (
    <div style={{ marginTop: '30px', marginLeft: '50px' ,textAlign: 'center' }}>
      <Search style={{ display: 'block', margin: 'auto' }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onKeyPressCapture={searchMovie} ></StyledInputBase>
      </Search>
        <div style={{ width: '70%'}}>
          <Accordion style={{marginTop: '10px', marginLeft: '440px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
              <Typography>Sort</Typography>
            </AccordionSummary>
            <AccordionDetails  style={{textAlign: 'center'}}>
              <Typography>
                <FormControl style={{ width: '100%'}}>
                  <NativeSelect inputProps={{  name: 'sort', id: 'uncontrolled-native', }} >
                    <option value="popularity.desc">Popularity Descending</option>
                    <option value="popularity.asc">Popularity Ascending</option>
                    <option value="vote_average.desc">Rating Descending</option>
                    <option value="vote_average.asc">Rating Ascending</option>
                    <option value="primary_release_date.desc">Release Date Descending</option>
                    <option value="primary_release_date.asc">Release Date Ascending</option>
                    <option value="title.asc">Title (A-Z)</option>
                    <option value="title.desc">Title (Z-A)</option>
                  </NativeSelect>
                </FormControl>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div style={{ width: '70%' ,marginTop: '10px'}}>
          <Accordion style={{marginTop: '10px', marginLeft: '440px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
              <Typography>Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              <div style={{textAlign: 'center'}}>
                <Grid container spacing={0} style={{width:'auto' , height:'auto' , textAlign: 'center' }}>
                  {genre.map(g =>(
                    <Grid item xs="auto" style={{ textAlign: 'center'}} key={g.name}>
                      <label><input className="btnlike" type="checkbox" value={g.name} /><span style={{marginTop:'10px'}}>{g.name}</span></label>
                    </Grid>
                    
                  ))}
                </Grid>
                <Button onClick={handleClickSearch} variant="contained">Search</Button>  
              </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

      <Box sx={{ flexGrow: 1 }}>
        <h1>Popular</h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {movie.map(m => {
              const type = "popular";
              const Tid = m.title;
              const value = m.vote_average / 2;
              var f = "";
              for (let i = 0; i < favorites.length; i++) {
                if (m.title === favorites[i]) {
                  f = favorites[i];
                  break;
                }
              }

              return (
                <Grid item xs="auto" style={{ textAlign: 'center' }} key={m.title}>
                  <Card sx={{ maxWidth: 345 }}>
                    <Link to={"/moviedetails/" + Tid + "/" + type}>
                      <Grid>
                        <LazyLoadImage src={img + m.poster_path} width={"250"} height={"300"}></LazyLoadImage>
                        <div className='box'>{m.title}</div>
                        <Rating name="text-feedback" value={value} readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                      </Grid>
                    </Link>
                    <Grid>
                      <BottomNavigation sx={{ width: 20 }} value={f} showLabels onChange={handleChangeFavorites} style={{ float: 'right', marginRight: '20px' }}>
                        <BottomNavigationAction label="Favorites" value={m.title} icon={<FavoriteIcon />} />
                      </BottomNavigation>
                    </Grid>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Box>
        <div style={{ alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <Stack style={{ alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
            <Typography>Page: {page}</Typography>
            <Pagination count={totalPage} page={page} onChange={handleChange} />
          </Stack>
        </div>
      </Box>
    </div>

  );
}

