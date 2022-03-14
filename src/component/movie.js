import React , { useState , useEffect} from 'react';
import { makeStyles ,  } from '@material-ui/core';
import { Button, Container, Paper , Grid  } from '@mui/material';
import { Link }from "react-router-dom";
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Card from '@mui/material/Card';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector , useDispatch } from 'react-redux';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { savefavorite , unsavafavorite } from '../Slice/favoritesSlice';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { width } from '@mui/system';

const urlupcoming = "https://api.themoviedb.org/3/movie/upcoming?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&page="
const urlupcoming2 = "region="

const urlSearch = "https://api.themoviedb.org/3/search/movie?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&page=";
const urlSearch2 = "&include_adult=";
const urlSearch3 = "&query=";

const urlgenre = "https://api.themoviedb.org/3/genre/movie/list?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US";

const urlSort = "https://api.themoviedb.org/3/discover/movie?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&sort_by=popularity.desc";
const urlSort2 = "&include_adult="
const urlSort3 = "&with_genres="
const urlSort4 = "&watch_region="
const urlSort5 ="&page="

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '20px',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '50%',
    marginRight: '20px',
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
  marginRight: '20px',
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

export default function Movies(){
  const count = useSelector((state) => state.counter.value);
  const region = useSelector((state) => state.user.lang);
  const favorites = useSelector((state) => state.favorites.title);
  const [movie, setMovie] = useState([])
  const [genre, setGenre] = useState([])
  const [img, setimg] = useState('https://image.tmdb.org/t/p/original')
  const [page, setPage] = useState(1);
  const [totalPage, setTotalpages] = useState(0);
  const [keyword, setKeyWord] = useState('');
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const [sort , setSort] = useState('');
  const [urlmovie, setUrlmovie] = useState([])

  const handleChangechecked = (event ) => {
    checked.push(event.target.value);
    console.log(checked);
    
  };

  const handleChangeSort = (event ) => {
    setSort(event.target.value);
    console.log(event.target.value);
   };

  const handleClickSearch=()=>{
    console.log(checked);
    var adult = new Boolean(false);
    if (count === 1) {
      adult = true;
    }
    let c = checked.length;
    var ck = new Boolean(false);
    const gid = [];
    if(c > 0){
      for(let j=0 ; j<genre.length ; j++){
        for(let i=0 ; i < c ; i++){
          if(checked[i] === genre[j].name){
            console.log(checked[i] +" === "+ genre[j].name);
            ck = true ;
            break;
          }else{
            ck = false ;
          }
        }
        if(ck){
          gid.push(genre[j].id);
        }  
      }
    }
    const url = urlSort+sort+urlSort2+adult+urlSort3+gid+urlSort4+region+urlSort5;
    console.log(url);
    setUrlmovie(url);
    searchlistmoive(url);
    debugger
  }

  const handleChangeFavorites = (event, newValue) => {
    console.log(favorites);
    console.log(newValue);
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
        if (count === 1) {
          adult = true;
        }
        const urls = urlSearch + key + urlSearch2 + adult + urlSearch3 +page ;
        console.log(urls);
        searchlistmoive(urls);
        setPage(1);
        setUrlmovie(urlSearch + key + urlSearch2 + adult + urlSearch3);
      } else {
        setPage(1);
        const u = urlupcoming+region+urlupcoming2 ;
        getlistmoive(u);
        setUrlmovie(u);
      }
      
    }
  }

  const handleChange = (event, value) => {
    setPage(value);
    if (keyword !== '' || checked.length > 0) {
      searchlistmoive(urlmovie+value);
    } else {
      const url = urlupcoming+region+urlupcoming2+value ;
      debugger
      getlistmoive(url);
    }

    window.scrollTo(0, 1);
  };

  const searchlistmoive = (url) => {
    console.log("searchlistmoive = "+url);
    debugger
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        setMovie(result.results);
        setTotalpages(result.total_pages);
        debugger
        console.log(result.total_pages);
      })
  }

  const getlistmoive = (url) => {
    const m = [];
    console.log("getlistmoive = "+url);
    if (count === 1) {
      fetch(url)
        .then(res => res.json())
        .then((result) => {
          setMovie(result.results);
          setTotalpages(result.total_pages);
        })
    } else {
      fetch(url)
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
          debugger
          setTotalpages(result.total_pages);
          setMovie(m);
        })
    }
  }

  useEffect(() => {
    const m = [];
    const u = urlupcoming + region + urlupcoming2 + page;
    setUrlmovie(u);
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
  }, [region, count ])



    return(
      <div style={{ marginTop: '30px', marginLeft: '50px' ,textAlign: 'center' , backgroundColor: ''}}>
        <Search style={{ display: 'block', margin: 'auto' , color: 'black' , backgroundColor:'white'}}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onKeyPressCapture={searchMovie} ></StyledInputBase>
        </Search>
        <Grid style={{ display: 'block', margin: 'auto' , width: "autoWidth" , marginTop: '10px'}}>
          <Accordion style={{marginTop: '10px' , display: 'block', margin: 'auto' , width:'auto'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
              <Typography>Sort & Filters</Typography>
            </AccordionSummary>
            <AccordionDetails  style={{textAlign: 'center'}}>

              <Grid>
                <Accordion style={{marginTop: '10px'}}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                    <Typography>Sort</Typography>
                  </AccordionSummary>
                  <AccordionDetails  style={{textAlign: 'center'}}>
                      <FormControl style={{ width: '100%'}}>
                        <NativeSelect inputProps={{  name: 'sort', id: 'uncontrolled-native', }} onChange={handleChangeSort}>
                          <option value="popularity.desc" >Popularity Descending</option>
                          <option value="popularity.asc">Popularity Ascending</option>
                          <option value="vote_average.desc">Rating Descending</option>
                          <option value="vote_average.asc">Rating Ascending</option>
                          <option value="primary_release_date.desc">Release Date Descending</option>
                          <option value="primary_release_date.asc">Release Date Ascending</option>
                          <option value="title.asc">Title (A-Z)</option>
                          <option value="title.desc">Title (Z-A)</option>
                        </NativeSelect>
                      </FormControl>
                  </AccordionDetails>
                </Accordion>
              </Grid> 

              <div style={{ width: '100%' ,marginTop: '10px' , marginRight: '30px'}}>
                <Accordion style={{marginTop: '10px' , marginRight: '30px'}}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                    <Typography>Filters</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={{textAlign: 'center'}}>
                      <Grid container spacing={0} style={{width:'auto' , height:'auto' , textAlign: 'center' }}>
                        {genre.map(g =>(
                          <Grid item xs="auto" style={{ textAlign: 'center'}} key={g.name} >
                            <label><input className="btnlike" type="checkbox" value={g.name}   onChange={handleChangechecked}/><span style={{marginTop:'10px'}}>{g.name}</span></label>
                          </Grid>
                          
                        ))}
                      </Grid>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
              <Button onClick={handleClickSearch} variant="contained" style={{marginTop: '10px' }} >Search</Button>  
            </AccordionDetails>
          </Accordion>
          </Grid>

          <Box sx={{ flexGrow: 1 }}>
              <h1 style={{ color: 'white'}}>Upcoming</h1>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  {movie.map((m) => {
                    // 100% Wolf
                    const type = "movies";
                    const Tid = "/moviedetails/"+''+"/"+type ;
                    const value = m.vote_average / 2 ;   
                    var f = "" ;
                    for(let i=0 ; i < favorites.length ; i++){
                      if(m.title === favorites[i]){
                        f = favorites[i] ;
                        break;
                                    
                      }
                    }
                                
                    return(
                      <Grid item xs="auto"  style={{textAlign:'center'}} key={m.title}>
                      <Card sx={{ maxWidth: 345 }}>
                        <Link to={"/moviedetails/"+Tid+"/"+type}>
                          <Grid>
                            <LazyLoadImage src={img+m.poster_path} width={"250"} height={"300"}></LazyLoadImage>
                            <div className='box'>{m.title}</div>
                            <Rating name="text-feedback" value={value} readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/>
                          </Grid>
                        </Link>
                        <Grid>
                          <BottomNavigation sx={{ width: 20 }} value={f}  showLabels onChange={handleChangeFavorites} style={{float: 'right' , marginRight: '20px'}}>
                            <BottomNavigationAction label="Favorites" value={m.title } icon={<FavoriteIcon />}/>
                          </BottomNavigation>
                        </Grid>
                      </Card>
                    </Grid>
                    )
                  }
                  )}
                </Grid>
              </Box>
              <Stack style={{alignItems: 'center' , marginTop: '20px' , color: 'white'}}>
                  <Typography>Page: {page}</Typography>
                  <Pagination sx={{backgroundColor: 'white'}} count={totalPage} page={page} onChange={handleChange}/>
              </Stack>
        </Box>
      </div>
        
    );
}

