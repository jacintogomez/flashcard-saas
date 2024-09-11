'use client'

import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
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
import {useState} from "react";

export default function Generate(){
    const {isloaded,issignedin,user}=useUser();
    const [flashcards,setflashcards]=useState([]);
    const [flipped,setflipped]=useState([]);
    const [text,settext]=useState('');
    const [name,setname]=useState('');
    const [open,setopen]=useState(false);
    const router=useRouter();

    const handlesubmit=async ()=>{
        fetch('api/generate',{
            method:'POST',
            body:text,
        })
            .then((res)=>res.json())
            .then((data)=>setflashcards(data));
    }
    const handlecardclick=(id)=>{
        setflipped((prev)=>({
            ...prev,
            [id]:!prev[id],
        }))
    }
    const handleopen=()=>{setopen(true)}
    const handleclose=()=>{setopen(false)}
    const saveflashcards=async ()=>{
        if(!name){
            alert('Please enter a name');
            return;
        }
        const batch=writeBatch(db);
        const userdocref=doc(collection(db,'users'),user.id);
        const docsnap=await getDoc(userdocref);
        if(docsnap.exists()){
            const collections=docsnap.data().flashcards||[];
            if(collections.find((f)=>f.name===name)){
                alert('Flashcard collection with the same name already exists!');
                return;
            }else{
                collections.push({name});
                batch.set(userdocref,{flashcards:collections},{merge:true});
            }
        }else{
            batch.set(userdocref,{flashcards:[{name}]});
        }
        const colref=collection(userdocref,name);
        flashcards.forEach((flashcard)=>{
            const carddocref=doc(colref);
            batch.set(carddocref,flahcard);
        });
        await batch.commit();
        handleclose();
        router.push('/flashcards');
    }

    return <Container maxWidth='md'>
        <Box sx={{mt:4,mb:6,display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Typography variant='h4'>Generate Flashcards</Typography>
            <Paper sx={{p:4,width:'100%'}}>
                <TextField valie={text} onchange={(e)=>setText(e.target.value)} label='Enter text' fullWidth multiline rows={4} variant='outlined' sx={{mb:2}}></TextField>
                <Button variant='contained' color='primary' onClick={handlesubmit} fullWidth>
                    {' '}
                    Submit
                </Button>
            </Paper>
        </Box>
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
                <Box sx={{mt:4,dislpay:'flex',justifyContent:'center'}}>
                    <Button variant='contained' color='secondary' onClick={handleopen}>
                        Save
                    </Button>
                </Box>
            </Box>
        )}
        <Dialog open={open} onClose={handleclose}>
            <DialogTitle>Save Flashcards</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter a name for your flashcards collection
                </DialogContentText>
                <TextField autoFocus margin='dense' label='Collection Name' type='text' fullWidth value={name} onChange={(e)=>setname(e.target.value)} variant='outlined'/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleclose}>Cancel</Button>
                <Button onClick={saveflashcards}>Save</Button>
            </DialogActions>
        </Dialog>
    </Container>
}