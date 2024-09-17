'use client';
import {useEffect,useState} from 'react';
import {useRouter,useSearchParams} from 'next/navigation';
import getStripe from '@/utils/get-stripe';
import {Box, CircularProgress, Container, Typography} from "@mui/material";

const ResultPage=()=>{
    const router=useRouter();
    const searchparams=useSearchParams();
    const sessionid=searchparams.get('session_id');

    const [loading,setloading]=useState(true);
    const [session,setsession]=useState(null);
    const [error,seterror]=useState(null);

    useEffect(()=>{
        const fetchcheckoutsession=async ()=>{
            if(!sessionid){return;}
            try{
                const res=await fetch(`/api/checkout_session?session_id=${sessionid}`);
                const sessiondata=await res.json();
                if(res.ok){
                    setsession(sessiondata);
                }else{
                    seterror(sessiondata.error);
                }
            }catch(err){
                seterror('An error occurred');
            }finally{
                setloading(false);
            }
        }
        fetchcheckoutsession();
    },[sessionid]);
    if(loading){
        return (
            <Container maxWidth='100vw' sx={{textAlign:'center',mt:4}}>
                <CircularProgress/>
                <Typography variant='h6'>Loading...</Typography>
            </Container>
        )
    }
    if(error){
        return (
            <Container maxWidth='100vw' sx={{textAlign:'center',mt:4}}>
                <CircularProgress/>
                <Typography variant='h6'>{error}</Typography>
            </Container>
        )
    }
    return (
        <Container maxWidth='100vw' sx={{textAlign:'center',mt:4}}>
            {session.payment_status==='paid'?(
                <>
                    <Typography variant='h4'>Thank you for purchasing!</Typography>
                    <Box sx={{mt:2}}>
                        <Typography variant='h6'>
                            Session ID: {sessionid}
                        </Typography>
                        <Typography variant='body1'>
                            We have received your payment. You will receive a confirmation email shortly.
                        </Typography>
                    </Box>
                </>
            ):(
                <>
                    <Typography variant='h4'>Thank you for purchasing!</Typography>
                    <Box sx={{mt:22}}>
                        <Typography variant='h6'>
                            Session ID: {sessionid}
                        </Typography>
                        <Typography variant='body1'>
                            Payment was not successful. Please try again.
                        </Typography>
                    </Box>
                </>
            )
            }
        </Container>
    )
}

export default ResultPage;