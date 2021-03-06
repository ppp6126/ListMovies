import React , { useState , useEffect} from 'react';
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { savefavorite , unsavafavorite } from '../Slice/favoritesSlice';
import FormControl from '@mui/material/FormControl';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import translate from "../i18nProvider/translate";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { I18nPropvider, LOCALES } from '../i18nProvider';
import { createTheme, ThemeProvider,  styled, alpha } from '@mui/material/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade , Autoplay, Navigation , Thumbs , FreeMode} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "../styles.css";

import { CircularProgressbar , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const urlupcoming = "https://api.themoviedb.org/3/movie/upcoming?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&page="
const urlupcoming2 = "region="

const urlSearch = "https://api.themoviedb.org/3/search/movie?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&page=";
const urlSearch2 = "&include_adult=";
const urlSearch3 = "&query=";

const urltoprated = "https://api.themoviedb.org/3/movie/top_rated?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&region="
const urltoprated2 = "&page="

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
  const region = useSelector((state) => state.region.lang);
  const favorites = useSelector((state) => state.favorites.title);
  const language2 = useSelector((state) => state.language.lang);
  const [movie, setMovie] = useState([])
  const [genre, setGenre] = useState([])
  const [img, setimg] = useState('https://image.tmdb.org/t/p/original')
  const [page, setPage] = useState(1);
  const [totalPage, setTotalpages] = useState(0);
  const [keyword, setKeyWord] = useState('');
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const [sort , setSort] = useState('popularity.desc');
  const [urlmovie, setUrlmovie] = useState([])
  const [MoviePopular, setMoviePopular] = useState([])
  
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
    debugger
    if(favorites > 0){
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
    }else{
      x = false;
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
          setTotalpages(result.total_pages);
          setMovie(m);
        })
    }
  }

  const getlistToprated=()=>{
    fetch(urltoprated+'us'+urltoprated2+1)
    .then(res => res.json())
    .then((result) =>{
      let r = result.results.length ;
      const m = [] ;
      for(let i=0 ; i<10 ; i++){
        if(result.results[i].vote_average > 8.5){
          console.log(result.results[i].vote_average)
          m.push(result.results[i])
        }
        
      }
        setMoviePopular(m);
    })
  }

  useEffect(async () => {
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
    await getlistToprated();
  }, [region, count , language2])

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return(
      <I18nPropvider locale={language2}>
      <div style={{ marginTop: '30px', marginLeft: '60px' ,textAlign: 'center' , marginRight: '60px'}}>
        <div className='backgroundopacity'>
          <Swiper
            id="main"
            tag="section"
            wrapperTag="ul"
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false, }}
            centeredSlides={true}
            navigation={true}
            effect={"fade"}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[EffectFade ,Autoplay , Navigation , Thumbs , FreeMode]}
            style={{ marginBottom:'20px' , "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff",}}
          >
            {MoviePopular.map(mp =>{
              return(
                <SwiperSlide key={mp.title} tag="li">
                  <LazyLoadImage src={img + mp.poster_path}  width={'30%'} height={'auto'} style={{ marginTop:'2px' }}></LazyLoadImage>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={30}
            slidesPerView={MoviePopular.length}
            freeMode={true}
            watchSlidesProgress={true}
            centeredSlides={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper "
            style={{ marginBottom:'20px'}}
          >
            {MoviePopular.map(mp =>{
              return(
                <SwiperSlide key={mp.title} tag="li">
                  <LazyLoadImage src={img + mp.poster_path}  width={'60%'} height={'auto'} style={{ marginTop:'2px' }}></LazyLoadImage>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <Search style={{ display: 'block', margin: 'auto' , color: 'black' , backgroundColor:'white'}}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search???" inputProps={{ 'aria-label': 'search' }} onKeyPressCapture={searchMovie} ></StyledInputBase>
        </Search>
        <Grid style={{ display: 'block', margin: 'auto' , width: "autoWidth" , marginTop: '10px'}}>
          <Accordion style={{marginTop: '10px' , display: 'block', margin: 'auto' , width:'auto'}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                <Typography> {translate('Sort')} & {translate('Filters')} </Typography>
              </AccordionSummary>
              <AccordionDetails  style={{textAlign: 'center'}}>
                <Grid>
                  <Accordion style={{marginTop: '10px'}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                      <Typography>{translate('Sort')}</Typography>
                    </AccordionSummary>
                    <AccordionDetails  style={{textAlign: 'center'}}>
                        <FormControl style={{ width: '100%'}}>
                          <Select inputProps={{  name: 'sort', id: 'uncontrolled-native', }}  defaultValue={sort} onChange={handleChangeSort}>
                            <MenuItem value='popularity.desc'>{translate('Popularity Descending')}</MenuItem>
                            <MenuItem value='popularity.asc'>{translate('Popularity Ascending')}</MenuItem>
                            <MenuItem value='vote_average.desc'>{translate('Rating Descending')}</MenuItem>
                            <MenuItem value='vote_average.asc'>{translate('Rating Descending')}</MenuItem>
                            <MenuItem value='primary_release_date.desc'>{translate('Release Date Descending')}</MenuItem>
                            <MenuItem value='primary_release_date.asc'>{translate('Release Date Descending')}</MenuItem>
                            <MenuItem value='title.asc'>{translate('Title (A-Z)')}</MenuItem>
                            <MenuItem value='title.desc'>{translate('Title (A-Z)')}</MenuItem>
                          </Select>
                        </FormControl>
                    </AccordionDetails>
                  </Accordion>
                </Grid> 

                <div style={{ width: '100%' ,marginTop: '10px'}}>
                  <Accordion style={{marginTop: '10px'}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                      <Typography>{translate('Filters')}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div style={{textAlign: 'center'}}>
                        <Grid container spacing={0} style={{width:'auto' , height:'auto' , textAlign: 'center' }}>
                          {genre.map(g =>(
                            <Grid item xs="auto" style={{ textAlign: 'center'}} key={g.name} >
                              <Typography>
                                <label>
                                  <input className="btnlike" type="checkbox" value={g.name}  onChange={handleChangechecked}/>
                                  <span style={{marginTop:'10px'}}>{translate(g.name)}</span>
                                </label>
                              </Typography>
                            </Grid>
                          ))}
                          
                        </Grid>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <Button onClick={handleClickSearch} variant="contained" style={{marginTop: '10px' }} >{translate('Search')}</Button>  
              </AccordionDetails>
          </Accordion>
        </Grid>
        <Box sx={{ flexGrow: 1 }}>
          <Typography style={{color: 'white' , fontSize: '50px'}}>{translate('Upcoming')}</Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
              {movie.map(m => {
                const type = "upcoming";
                const Tid = m.title;
                const value = m.vote_average / 2;
                const percentage =  m.vote_average *10 ;
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
                      <Link to={"/moviedetails/" + 'Tid' + "/" + type +"/"+totalPage}>
                        <Grid>
                          <LazyLoadImage src={img + m.poster_path} width={"250"} height={"300"}></LazyLoadImage>
                          <div className='box'>{m.title}</div>
                          <Rating name="text-feedback" value={value} readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                        </Grid>
                      </Link>
                      <BottomNavigation  value={f} showLabels onChange={handleChangeFavorites} style={{ float: 'right', marginRight: '5px' }}>
                        <BottomNavigationAction value={m.title} icon={<FavoriteIcon />} />
                      </BottomNavigation>
                      <div style={{ marginLeft: '5px', width: 50, height: 50 }}>
                        <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={15}
                        styles={buildStyles({ textColor: "#010101 ", pathColor: "#FE1919 ", trailColor: "#0D1809" , textSize: "26px"})}/>
                      </div>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
          <Stack style={{ alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
            <Typography style={{color: 'white'}} >{translate('page')}: {page}</Typography>
            <Pagination sx={{backgroundColor: 'white'}}  count={totalPage} page={page} onChange={handleChange} />
          </Stack>
        </Box>
      </div>
      </I18nPropvider>
    );
}

