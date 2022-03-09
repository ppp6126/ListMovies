import React , { useState , useEffect} from 'react';
import { makeStyles ,  } from '@material-ui/core';
import { Button, Container, Paper , Grid  } from '@mui/material';
import { useParams , useRouteMatch} from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { savefavorite, unsavafavorite } from './Slice/favoritesSlice';
import { useSelector, useDispatch } from 'react-redux';

const urlGenre = "https://api.themoviedb.org/3/genre/movie/list?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US" ;

export default function Moviedetails(){
    const [genre,setGenre] = useState([])
    const [movie,setMovie] = useState([])
    const [img,setimg] = useState('https://image.tmdb.org/t/p/original')
    const  {Tid , type }  = useParams();
    const favorites = useSelector((state) => state.favorites.title);

    const dispatch = useDispatch();
    const handleChangeFavorites = (event, newValue) => {
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

    useEffect(async()=>{
        if(type === "popular" || type === "top_rated"){
            const u = 'https://api.themoviedb.org/3/movie/'+type+'?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&page=';
            console.log(u);
            await getMovie(u);
        }else if(type === "movies"){
            const u = 'https://api.themoviedb.org/3/movie/550/lists?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&page=';
            console.log(u);
            await getMovie(u);
        }
       await getGenremovie();
    },[])

    const getMovie=(u)=>{
        
        for( let i = 1 ; + i<=500 ; i++){
            const url = u+i;
            fetch(url)
            .then(res=>res.json())
            .then((result)=>{
                const r = [] ;
                r.push(result.results)
                let round = r[0].length;
                for(let j=0 ; j<round ; j++){
                    if(type === "movies"){
                        const name = r[0][j].name ;
                        if(Tid === name){
                            setMovie(r[0][j]);
                            break;
                        }
                    }else{
                        const name = r[0][j].title ;
                        if(Tid === name){
                            setMovie(r[0][j]);
                            break;
                        }
                    }
                }
                
            })
        }
    } 
    const getGenremovie=()=>{
        fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US")
            .then(res=>res.json())
            .then((result)=>{
                setGenre(result.genres)
                const r = [];
                r.push(result.genres);
                setGenre(result.genres);
            })
    }
    const getReview=()=>{
        fetch("https://api.themoviedb.org/3/movie/19404/reviews?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&page=1")
        .then(res=>res.json())
        .then((result)=>{
            setGenre(result.genres)
        })
    }



    return(
        <div className='header large border first' style={{backgroundImage: 'url(${img+movie.backdrop_path})' }}>
            <Paper sx={{ p: 2, margin: 'auto', maxWidth: 'auto', flexGrow: 1 }} >
                <Card  style={{marginTop: '20px' , marginLeft:'20px' , marginRight: '20px' , marginBottom:'20px', width: 'auto' , backgroundColor:'rgba(var(--tmdbDarkBlue), 1)'
                    ,display: 'flex' ,justifycontent: 'center' ,flexwrap: 'wrap'}}>
                    <CardMedia >
                        <LazyLoadImage component="img" width={"400px"} height={"500px"}  src={img+movie.poster_path} style={{ marginBottom:'20px'}}/>
                    </CardMedia>
                    <Grid container spacing={2}  style={{ marginLeft:'5px' }}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div" style={{textAlign: 'left'}}>
                                    <CardHeader title={movie.title} style={{fontSize: '18px' }}/>
                                </Typography>
                                <Typography style={{textAlign: 'left'}}>
                                    
                                </Typography>
                                <Typography style={{textAlign: 'left'}}>
                                    <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
                                    <label style={{marginRight: '8px' }}>{movie.release_date}</label>
                                    {genre.map(g => {  
                                        const type = [];
                                        type.push(movie.genre_ids);
                                        if(type[0] !== ""){
                                            let r = type[0].length ;
                                            for(let i=0 ; i<r ; i++){
                                                if( type[0][i] === g.id){
                                                    return(
                                                            <label style={{marginRight: '8px' , marginLeft:'8px'}} key={g.name}>{g.name}</label>
                                                    )
                                                }
                                            }
                                        }   
                                    })}
                                    </Stack>
                                </Typography>
                                <Typography style={{textAlign: 'left'}}>
                                    <Rating name="text-feedback" value={movie.vote_average / 2 } readOnly precision={0.5} emptyIcon={<StarIcon 
                                          style={{ opacity: 0.55 }} fontSize="inherit" />}/>     
                                    <BottomNavigation sx={{ width: 20 }} value={movie.title} showLabels onChange={handleChangeFavorites} style={{  marginLeft: '20px' }}>
                                        <BottomNavigationAction label="Favorites" value={movie.title} icon={<FavoriteIcon />} />
                                    </BottomNavigation>
                                </Typography>
                                <Typography style={{textAlign: 'left' , fontSize: '20px'}}>
                                    Overview
                                </Typography>
                                <Typography variant="body2" gutterBottom style={{textAlign: 'left'}}>
                                    {movie.overview}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ID: 1030114
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Paper>
        </div>
    );
}

