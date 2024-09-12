'use client';
import {useUser} from '@clerk/nextjs';
import {useEffect,useState} from 'react';
import {collection,doc,getDoc,setDoc} from 'firebase/firestore';
import {db} from '@/firebase';
import {useRouter} from 'next/navigation';
import {Card, CardActionArea, CardContent, Container, Grid, Typography} from "@mui/material";

export default function Flashcards(){
    const {isloaded,issignedin,user}=useUser();
    const [flashcards,setflashcards]=useState([]);
    const router=useRouter();
    useEffect(()=>{
        async function getflashcards(){
            if(!user){return;}
            const docref=doc(collection(db,'users'),user.id);
            const docsnap=await getDoc(docref);
            if(docsnap.exists()){
                const collections=docsnap.data().flashcards||[];
                setflashcards(collections);
            }else{
                await setDoc(docref,{flashcards:[]});
            }
        }
        getflashcards();
    },[user]);

    if(!isloaded||!issignedin){return <></>}
    const handlecardclick=(id)=>{
        router.push(`/flashcards?id=${id}`);
    };

    return(
        <Container maxWidth='100vw'>
            <Grid container spacing={3} sx={{mt:4}}>
                {flashcards.map((flashcard,index)=>(
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea onClick={()=>{handlecardclick(id)}}>
                                <CardContent>
                                    <Typography variant='h6'>{flashcard.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}