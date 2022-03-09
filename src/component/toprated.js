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
import { savefavorite , unsavafavorite } from './Slice/favoritesSlice';


const url = "https://api.themoviedb.org/3/movie/top_rated?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&page="
const url2 = "&region="
const urlSearch = "https://api.themoviedb.org/3/search/movie?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US&page=";
const urlSearch2 = "&include_adult=";
const urlSearch3 = "&query=";

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
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
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

export default function TopRated(){
  const count = useSelector((state)  => state.counter.value);
    const [movie,setMovie] = useState([])
    const [img,setimg] = useState('https://image.tmdb.org/t/p/original')
    const [page, setPage] = useState(1);
    const [totalPage , setTotalpages] = useState(0);
    const [keyword , setKeyWord] = useState('');
    const region = useSelector((state)  => state.user.lang);
    const favorites = useSelector((state)  => state.favorites.title);
    const dispatch = useDispatch() ;
    
    const handleChangeFavorites = (event, newValue) => {
      console.log(favorites);
      var x = new Boolean(false);
      let i = 0 ;
      for(i=0 ; i<favorites.length ; i++){
        if(favorites[i] === newValue){
          console.log(favorites[i] +" === "+ newValue)
          x = true ;
          break;
        }else{
          console.log(favorites[i] +" !== "+ newValue)
          x = false ;
        }
      }
      if(x){
        dispatch(unsavafavorite(newValue));
      }else{
        dispatch(savefavorite(newValue));
      }
    };

    const searchMovie = (event) => {
        console.log("value = "+event.target.value);
        setKeyWord(event.target.value);
        if(event.key === 'Enter'){
            if(event.target.value !==''){
                console.log('enter press here! ')
                const key = event.target.value ;
                var adult = new Boolean(false);
                if(count === 1){
                  adult = true ;
                }
                const url = urlSearch+page+urlSearch2+adult+urlSearch3+key ;
                console.log(url);
                fetch(url)
                .then(res=>res.json())
                .then((result)=>{
                    setMovie(result.results);
                    setTotalpages(result.total_pages);
                    console.log(result.total_pages);
                })
                setPage('1');
            }else{
                setPage('1');
                getlistmoive(1);
                
                console.log('error0');
            }

        }
    }


    const handleChange = (event, value) => {
      setPage(value);
      
      if(keyword !== ''){
        searchlistmoive(value,keyword);
      }else{
        getlistmoive(value);
      }

      window.scrollTo(0, 1);
    };

    const searchlistmoive=(value,keyword)=>{
        const url = urlSearch +keyword+urlSearch2+value ;
        console.log(url);
        fetch(url)
        .then(res=>res.json())
        .then((result)=>{
            setMovie(result.results);
            setTotalpages(result.total_pages);
            console.log(result.total_pages);
        })

    }

    const getlistmoive=(value)=>{
        const m = [];
        const u = url+value+url2+region ;
        console.log("Status = "+u);
        if(count === 1){
            fetch(u)
            .then(res=>res.json())
            .then((result)=>{
                setMovie(result.results);
                setTotalpages(result.total_pages);
            })
          }else{
            fetch(u)
            .then(res=>res.json())
            .then((result)=>{
                const r = [];
                r.push(result.results);
                let round = r[0].length;
                for(let i=0 ; i<round ; i++){
                    if(!result.results[i].adult){
                        m.push(result.results[i]);
                    }
                }
                setTotalpages(result.total_pages);
                setMovie(m);
            })
          }
    }

    useEffect(()=>{
      const m = [];
      const u = url+page+url2+region ;
      console.log("Status = "+u);
      if(count === 1){
        fetch(u)
        .then(res=>res.json())
        .then((result)=>{
            setMovie(result.results);
            setTotalpages(result.total_pages);
        })
      }else{
        fetch(u)
        .then(res=>res.json())
        .then((result)=>{
            const r = [];
            r.push(result.results);
            let round = r[0].length;
            for(let i=0 ; i<round ; i++){
                if(!result.results[i].adult){
                    m.push(result.results[i]);
                }
            }
            setTotalpages(result.total_pages);
            setMovie(m);
        })
      }
  },[region,count])

    return(
        <div style={{marginTop:'30px' , marginLeft:'50px'}}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onKeyPressCapture={searchMovie} ></StyledInputBase>
          </Search>
          <Box sx={{ flexGrow: 1 }}>
            <h1>TopRated</h1>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  {movie.map(m => {   
                    const type = "top_rated";
                    const Tid = m.title ;
                    const value = m.vote_average / 2 ;
                    const adult = m.adult ;
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
              <div style={{alignItems: 'center' , marginTop: '20px' , marginBottom:'20px'}}>
                <Stack style={{alignItems: 'center' , marginTop: '20px' , marginBottom:'20px'}}>
                  <Typography>Page: {page}</Typography>
                  <Pagination count={totalPage} page={page} onChange={handleChange} />
                </Stack>
             </div>
          </Box>
        </div>
    );
}

