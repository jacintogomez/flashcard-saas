'use client';
import getStripe from '@/utils/get-stripe';
import {SignedIn,SignedOut,UserButton} from '@clerk/nextjs';
import {AppBar, Box, Button, Container, Grid, Toolbar, Typography} from "@mui/material";
import Head from "next/head";
import React from "react";
import {useRouter} from "next/navigation";

export default function Home() {
    const router=useRouter();
    const handlesubmit=async ()=>{
        const checkoutsession=await fetch('/api/checkout_session',{
            method:'POST',
            headers:{
                origin:'http://localhost:3000',
            },
        });
        const checkoutsessionjson=await checkoutsession.json();
        if(checkoutsession.statusCode===500){
            console.error(checkoutsession.message);
            return;
        }
        const stripe=await getStripe();
        const {error}=await stripe.redirectToCheckout({
            sessionId:checkoutsessionjson.id,
        });
        if(error){console.warn(error.message);}
    }

    return (
    <Container maxWidth='100vw'>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text"/>
      </Head>

      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' style={{flexGrow:1}}>Flashcard SaaS</Typography>
          <SignedOut>
            <Button color='inherit' href='/sign-in'>Login</Button>
            <Button color='inherit' href='/sign-up'>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{textAlign:'center',my:4}}>
          <Typography variant='h2' gutterBottom>Welcome to Flashcard SaaS</Typography>
          <Typography variant='h5' gutterBottom>
              {' '}
              Use AI to quickly and easily generate flashcards for your topic
          </Typography>
          <SignedOut>
            <Button variant='contained' color='primary' sx={{mt:2}} onClick={()=>router.push('/sign-up')}>Get started</Button>
          </SignedOut>
          <SignedIn>
              <Button variant='contained' color='primary' sx={{mt:2,mr:1,ml:1}} onClick={()=>router.push('/flashcards')}>My Cards</Button>
              <Button variant='contained' color='primary' sx={{mt:2,mr:1,ml:1}} onClick={()=>router.push('/generate')}>Generate New</Button>
          </SignedIn>
      </Box>

    <Box sx={{my:6}} textAlign='center'>
        <Typography variant='h4' gutterBottom>
            Features
        </Typography>
        <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
                <Box sx={{p:3,border:'1px solid',borderColor:'grey.300',borderRadius:2}}>
                    <Typography variant='h6' gutterBottom>Easy text input</Typography>
                    <Typography>
                        {' '}
                        Simply input your text and let our software do the rest.
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box sx={{p:3,border:'1px solid',borderColor:'grey.300',borderRadius:2}}>
                    <Typography variant='h6' gutterBottom>Smart flashcards</Typography>
                    <Typography>
                        {' '}
                        Our AI intelligently breaks down your text into flashcard material.
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box sx={{p:3,border:'1px solid',borderColor:'grey.300',borderRadius:2}}>
                    <Typography variant='h6' gutterBottom>Accessible Anywhere</Typography>
                    <Typography>
                        {' '}
                        Access your flashcards from any device.
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    </Box>
    <Box sx={{my:6,textAlign:'center'}}>
        <Typography variant='h4' gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <Box sx={{p:3,border:'1px solid',borderColor:'grey.300',borderRadius:2}}>
                    <Typography variant='h5'>Basic</Typography>
                    <Typography variant='h4'>$5/month</Typography>
                    <Typography variant='h5'>
                        {' '}
                        Access to basic flashcard features and limited storage
                    </Typography>
                    <Button variant='contained' color='primary' sx={{mt:2}}>
                        Choose Basic
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box sx={{p:3,border:'1px solid',borderColor:'grey.300',borderRadius:2}}>
                    <Typography variant='h5'>Pro</Typography>
                    <Typography variant='h4'>$10/month</Typography>
                    <Typography variant='h5'>
                        {' '}
                        Unlimited flashcards and storage with priority support.
                    </Typography>
                    <Button variant='contained' color='primary' sx={{mt:2}} onClick={handlesubmit}>
                        Choose Pro
                    </Button>
                </Box>
            </Grid>
        </Grid>
    </Box>
    </Container>

  );
}
