import React , { useState , useEffect} from 'react';
import { Button, Container, Paper , Grid  } from '@mui/material';
import { Link }from "react-router-dom";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector , useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { savefavorite , unsavafavorite } from '../Slice/favoritesSlice';
import Divider from '@mui/material/Divider';

const urlSearch = "https://api.themoviedb.org/3/search/movie?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&query=";
const urlSearch2 = "&include_adult=";
const urlSearch3 = "&page=";

export default function Favorites(){
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value);
    const region = useSelector((state) => state.user.lang);
    const favorites = useSelector((state) => state.favorites.title);
    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalpages] = useState(0);
    const [img, setimg] = useState('https://image.tmdb.org/t/p/original')
    const [urlmovie, setUrlmovie] = useState('');

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
    
    const getlistmoive = async (urlmovie) => {
        const m = [] ;
        var adult = new Boolean(false);
        if (count === 1) {
            adult = true;
          }
          console.log("favorites"+favorites.length)
          var key = "" ;
          for(let i=0 ; i < favorites.length ; i++){
            if(favorites[i] !== null ){
                key = favorites[i] ;
                const urls = urlSearch + key + urlSearch2 + adult + urlSearch3 +page ;
                console.log("getlistmoive = "+urls);
               await fetch(urls)
                .then(res => res.json())
                .then((result) => {
                    m.push(result.results[0]);
                })
            }

        }
        console.log(m);
        setMovie(m);
    }
    const handleChange = (event, value) => {
        setPage(value);
        getlistmoive(urlmovie+value);
    }

    useEffect(async()=>{
        // await getlistmoive();
        const m = [] ;
        var adult = new Boolean(false);
        if (count === 1) {
            adult = true;
          }
          console.log("favorites"+favorites.length)
          var key = "" ;
          for(let i=0 ; i < favorites.length ; i++){
            if(favorites[i] !== null ){
                key = favorites[i] ;
                const urls = urlSearch + key + urlSearch2 + adult + urlSearch3  ;
                setUrlmovie(urls);
                console.log("getlistmoive = "+urls);
               await fetch(urls+page)
                .then(res => res.json())
                .then((result) => {
                    m.push(result.results[0]);
                })
            }

        }
        console.log(m);
        setMovie(m);
    },[favorites])

    return(
        <div  style={{textAlign: 'center'}}>
            <Box sx={{ flexGrow: 1 }}>
                <h1>Favorites</h1>
                <div  style={{ marginLeft: '50px' }}>
                    <Grid container spacing={2} >
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
                                <Link to={"/moviedetails/" + Tid + "/" + type +"/"+totalPage}>
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
                </div>
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