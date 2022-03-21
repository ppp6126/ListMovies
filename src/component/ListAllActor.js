import React , { useState , useEffect , useRef } from 'react';
import { Button, container, Paper , Grid  } from '@mui/material';
import { useParams , useRouteMatch} from "react-router-dom";
import Card from '@mui/material/Card';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from 'react-redux';
import { I18nPropvider, LOCALES } from '../i18nProvider';
import person1 from '../img/person1.png';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";

export default function ListAllActor(){
    const [img,setimg] = useState('https://image.tmdb.org/t/p/original')
    const  {Tid , type , totalPage }  = useParams();
    const favorites = useSelector((state) => state.favorites.title);
    const language2 = useSelector((state) => state.language.lang);
    const [actor,setActor] = useState([]);
    const [numpage,setNumPage] = useState('');
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
                            getActor(r[0][j].id);
                            break;
                        }
                }
                
            })
        }
    }

    const getActor=(id)=>{
        fetch("https://api.themoviedb.org/3/movie/"+id+"/credits?api_key=307c7894a4a56f0cfac887e273a285b3&language=en-US")
        .then(res=>res.json())
        .then((result)=>{
            setActor(result.cast);
        })
    }

    return(
        <I18nPropvider locale={language2}>
        <div className='header large border first'  style={{ marginLeft: '5px' , marginRight: '5px'}}>
            <Paper sx={{ p: 2, margin: 'auto', maxWidth: '100%', flexGrow: 1 }} style={{backgroundColor:'black', opacity: 1  }} >
                <Grid item xs={12} container direction="column" spacing={2}>
                    <Box sx={{ flexGrow: 1 ,width: '100%', height: '100%', backgroundColor: '#E0FFFF' , opacity: 1 }}  
                        style={{ position: 'relative' , marginTop: '30px' , overflowX: 'scroll' , display: 'flex' , flexGrow: 1 , flexShrink: 0 }}>
                        <Grid container item xs={12} spacing={1} style={{ marginLeft: '25px' , marginRight: '5px' , flexDirection: 'row' , marginTop: '5px' }}>
                            {actor.map(a =>{
                                var urlimg = '' ;
                                if(a.profile_path === null){
                                    urlimg = person1 ;
                                }else{
                                    urlimg = img + a.profile_path ;
                                }
                                return(
                                    <Grid container item xs={'auto'} style={{ textAlign: 'center' }} key={a.name}>
                                        <Card  sx={{ maxWidth: 150 , opacity: 1 }} >
                                            <Stack className='click' >
                                                <LazyLoadImage src={urlimg} width={"150"} height={"150"}></LazyLoadImage>
                                                {a.name}
                                            </Stack>
                                        </Card>
                                    </Grid>
                                );
                            })}
                            <Grid container item xs={2} style={{ textAlign: 'center' }} >
                                <Link to={"/moviedetails/" + Tid + "/" + type +"/"+totalPage}>
                                    <Card sx={{ maxWidth: 150 , opacity: 1 }} >
                                        <Stack className='click' >
                                            <Button className="btn" style={{height:'170px', width: "140px" }} >See less</Button>
                                        </Stack>
                                    </Card>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Paper>
        </div>
        </I18nPropvider>
    );
}

