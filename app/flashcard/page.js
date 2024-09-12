'use client';
import {useUser} from '@clerk/nextjs';
import {useEffect,useState} from 'react';
import {collection, doc, getDoc, getDocs, setDoc} from 'firebase/firestore';
import {db} from '@/firebase';
import {useSearchParams} from 'next/navigation';
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Grid,
    Paper,
    TextField,
    Typography
} from "@mui/material";

export default function Flashcard(){
    const {isLoaded,isSignedIn,user}=useUser();
    const [flashcards,setflashcards]=useState([]);
    const [flipped,setflipped]=useState([]);
    const searchparams=useSearchParams();
    const search=searchparams.get('id');

    useEffect(()=>{
        async function getflashcard(){
            if(!search||!user){return;}
            const colref=collection(doc(collection(db,'users'),user.id),search);
            const docs=await getDocs(colref);
            const flashcards=[];
            docs.forEach((doc)=>{
                flashcards.push({id:doc.id,...doc.data()});
            });
            setflashcards(flashcards);
        }
        getflashcard();
    },[user]);

    const handlecardclick=(id)=>{
        setflipped((prev)=>({
            ...prev,
            [id]:!prev[id],
        }))
    }
    if(!isLoaded||!isSignedIn){return <Typography variant='h6'>Nothing to see here</Typography>}
    return (
        <Container maxWidth='100vw'>
            <Grid container spacing={3} sx={{mt:4}}>
                {flashcards.length>0&&(
                    <Box sx={{mt:4}}>
                        <Typography variant='h5'>Flashcards Preview</Typography>
                        <Grid container spacing={3}>
                            {flashcards.map((flashcard,index)=>(
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card>
                                        <CardActionArea onClick={()=>{handlecardclick(index)}}>
                                            <CardContent>
                                                <Box sx={{
                                                    perspective:'1000px',
                                                    '& > div':{
                                                        transition:'transform 0.6s',
                                                        transformStyle:'preserve-3d',
                                                        position:'relative',
                                                        width:'100%',
                                                        height:'200px',
                                                        boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)',
                                                        transform:flipped[index]?'rotateY(180deg)':'rotateY(0deg)',
                                                    },
                                                    '& > div > div':{
                                                        position:'absolute',
                                                        width:'100%',
                                                        height:'200px',
                                                        backfaceVisibility:'hidden',
                                                        display:'flex',
                                                        justifyContent:'center',
                                                        alignItems:'center',
                                                        padding:2,
                                                        boxSizing:'border-box',
                                                    },
                                                    '& > div > div:nth-of-type(2)':{
                                                        transform:'rotateY(180deg)',
                                                    },
                                                }}>
                                                    <div>
                                                        <div>
                                                            <Typography variant='h5' component='div'>{flashcard.front}</Typography>
                                                        </div>
                                                        <div>
                                                            <Typography variant='h5' component='div'>{flashcard.back}</Typography>
                                                        </div>
                                                    </div>
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Grid>
        </Container>
    )
}
