import React , { useState , useEffect} from 'react';
import { makeStyles ,  } from '@material-ui/core';
import { Button, Container, Paper , Grid  } from '@mui/material';
import { useParams , useRouteMatch} from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
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
import { savefavorite, unsavafavorite } from '../Slice/favoritesSlice';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FcRating } from "react-icons/fc";
import { BsPersonSquare , BsPersonFill } from "react-icons/bs";
import translate from "../i18nProvider/translate";
import { I18nPropvider, LOCALES } from '../i18nProvider';
import person1 from '../img/person1.png';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const urlover ="https://api.themoviedb.org/3/movie/"
  const urlover2 ="/translations?api_key=307c7894a4a56f0cfac887e273a285b3"

export default function Moviedetails(){
    const [genre,setGenre] = useState([])
    const [movie,setMovie] = useState([])
    const [rev,setReview] = useState([])
    const [img,setimg] = useState('https://image.tmdb.org/t/p/original')
    const  {Tid , type , totalPage }  = useParams();
    const favorites = useSelector((state) => state.favorites.title);
    const language2 = useSelector((state) => state.language.lang);
    const [fav,setFav] = useState('')
    const [movieOverview,setMovieOverview] = useState([]);
    const [numpage,setNumPage] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [actor,setActor] = useState([]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
            const u = 'https://api.themoviedb.org/3/movie/'+type+'?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&page=';
            let num = 0 ;
            if(type === 'popular'){
                setNumPage(500);
                num = 500 ;
            }else{
                num = totalPage ;
            }
            console.log(u);
            await getMovie(u , num);
            await getGenremovie();
    },[favorites])

    const getMovie=(u , num)=>{
        for( let i = 1 ; + i<= num ; i++){
            const url = u+i;
            fetch(url)
            .then(res=>res.json())
            .then((result)=>{
                const r = [] ;
                r.push(result.results)
                let round = r[0].length;
                for(let j=0 ; j<round ; j++){
                    const name = r[0][j].title ;
                        if(Tid === name){
                            setMovie(r[0][j]);
                            getReview(r[0][j].id);
                            getOverview(r[0][j].id);
                            getActor(r[0][j].id);
                            for (let i = 0; i < favorites.length; i++) {
                                if (name === favorites[i]) {
                                    setFav(favorites[i])
                                break;
                                }else{
                                    setFav('')
                                }
                            }
                            break;
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
    const getReview=(id)=>{
        fetch("https://api.themoviedb.org/3/movie/"+id+"/reviews?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&page=1")
        .then(res=>res.json())
        .then((result)=>{
            setReview(result.results)
        })
    }
    const getOverview=(id)=>{
        fetch(urlover+id+urlover2)
        .then(res=>res.json())
        .then((result)=>{
            setMovieOverview(result.translations)

        })
    }

    const getActor=(id)=>{
        fetch("https://api.themoviedb.org/3/movie/"+id+"/credits?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US")
        .then(res=>res.json())
        .then((result)=>{
            setActor(result.cast)
        })
    }

    // img+movie.backdrop_path

    return(
        <I18nPropvider locale={language2}>
        <div className='header large border first' >
            <Paper sx={{ p: 2, margin: 'auto', maxWidth: 'auto', flexGrow: 1 }} style={{ backgroundImage: 'url(${img+movie.backdrop_path})' ,backgroundColor:'black', opacity: 1  }} >
                <Card  style={{marginTop: '20px' , marginLeft:'20px' , marginRight: '20px' , marginBottom:'20px', width: 'auto' 
                    ,display: 'flex' ,justifycontent: 'center' ,flexwrap: 'wrap' ,margin: '30px' , backgroundcolor: '#ffffff' , border: '1px' , opacity: 1}}>
                    <CardMedia >
                        <LazyLoadImage component="img" width={"400px"} height={"500px"}  src={img+movie.poster_path} style={{ marginBottom:'20px'}}/>
                    </CardMedia>
                    <Grid container spacing={2}  style={{ marginLeft:'5px' }}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div" style={{textAlign: 'left'}}>
                                    {movieOverview.map(m => {
                                        let r = movieOverview.length ;
                                        var str = language2.substring(0,2);
                                        var title = "" ;
                                            if(m.iso_639_1 === str ){
                                                if(m.data.title !== ''){
                                                    return(
                                                        <CardHeader title={m.data.title} style={{fontSize: '18px' }} kry={m.data.title}/>
                                                    );
                                                }else{
                                                    return(
                                                        <CardHeader title={movie.title} style={{fontSize: '18px' }} key={movie.title}/>
                                                    );
                                                }
                                            }
                                    })}
                                   {movie.id}
                                </Typography>
                                <Stack direction="row" divider={<Divider orientation="vertical" flexItem style={{textAlign: 'left'}} />}>
                                    <label style={{marginRight: '8px' }}>{movie.release_date}</label>
                                    {genre.map(g => {  
                                        const type = [];
                                        type.push(movie.genre_ids);
                                        if(type[0] !== ""){
                                            let r = type[0].length ;
                                            for(let i=0 ; i<r ; i++){
                                                if( type[0][i] === g.id){
                                                    return(
                                                            <label style={{marginRight: '8px' , marginLeft:'8px'}} key={g.name}>{translate(g.name)}</label>
                                                    )
                                                }
                                            }
                                        }   
                                    })}
                                </Stack>
                                <Stack style={{textAlign: 'left'}} direction="row" divider={<Divider orientation="vertical" flexItem style={{textAlign: 'left'}} />}>
                                    <Rating name="text-feedback" value={movie.vote_average / 2 } readOnly precision={0.5} 
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/>
                                    <Stack direction="row">
                                        <label style={{marginLeft: '8px', marginRight: '5px' }} >{movie.vote_average / 2}</label><FcRating style={{fontSize: "x-large"}}/>
                                    </Stack>
                                </Stack>
                                <Stack>
                                    <BottomNavigation sx={{ width: 20 }} value={fav} showLabels onChange={handleChangeFavorites} style={{  marginLeft: '20px' }}>
                                        <BottomNavigationAction label="" value={movie.title} icon={<FavoriteIcon />} />
                                    </BottomNavigation>
                                </Stack>
                                <Typography style={{textAlign: 'left' , fontSize: '20px'}}>
                                    <strong>{translate('Overview')}</strong>
                                </Typography>
                                {movieOverview.map(m => {
                                    let r = movieOverview.length ;
                                    var str = language2.substring(0,2)
                                    for(let i=0 ; i < r ; i++){
                                        if(m.iso_639_1 === str ){
                                            if(m.data.overview !== ''){
                                                return(
                                                    <Typography key={m.name} variant="body2" gutterBottom style={{textAlign: 'left'}}>{m.data.overview}</Typography>
                                                )
                                            }else{
                                                return(
                                                    <Typography key={movie.id} variant="body2" gutterBottom style={{textAlign: 'left'}}>{movie.overview}</Typography>
                                                )
                                            }
                                        }
                                    }
                                })}
                                <Grid container spacing={2}>
                                    {actor.map(a =>{
                                        var urlimg = '' ;
                                        if(a.profile_path === null){
                                            urlimg = person1 ;
                                        }else{
                                            urlimg = img + a.profile_path ;
                                        }
                                        return(
                                            <Grid item xs="auto" style={{ textAlign: 'center' }} key={a.name}>
                                                <Stack>
                                                    <LazyLoadImage src={urlimg} width={"130"} height={"150"}></LazyLoadImage>
                                                    {a.name}
                                                </Stack>
                                                
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                                </Grid>
                                <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more" >
                                    <h5>{translate('Review')}</h5>
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </Grid>
                        </Grid>
                    </Grid>

                </Card>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent >
                        {rev.map(r => {
                            var pathavater = r.author_details.avatar_path ;
                            var path = "";
                            if(pathavater != null){
                                path = pathavater.substring(1);
                                console.log(path);
                                if(path.startsWith('https://')){
                                    path = path;
                                    console.log('else ='+path);
                                }else{
                                    path = img + pathavater;
                                    console.log('true ='+path);
                                }
                            }
                            
                            return(
                                <Card className='example' style={{marginTop: '20px' , marginLeft:'20px' , marginRight: '20px' , marginBottom:'20px', width: 'auto' }} key={r.author}>
                                <CardHeader avatar={  
                                    <Avatar aria-label="recipe" >
                                        <LazyLoadImage component="img" src={path} style={{ }}/>
                                    </Avatar> }
                                    title={r.author}
                                    subheader={r.created_at}  style={{textAlign: 'left'}}/>
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        <label style={{marginRight: '8px' , marginLeft:'8px'}} key={r.content}>{r.content}</label>
                                    </Typography>
                                </CardContent>
                                </Card>
                            )
                            
                        })}
                    </CardContent>
                </Collapse>
            </Paper>
        </div>
        </I18nPropvider>
    );
}

