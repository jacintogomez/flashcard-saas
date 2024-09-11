import Image from "next/image";
import getstripe from '@/utils/get-stripe.js';
import {SignedIn,SignedOut,UserButton} from '@clerk/nextjs';
import {AppBar, Box, Button, Container, Grid, Toolbar, Typography} from "@mui/material";
import Head from "next/head";
import React from "react";

export default function Home() {
  return (
    <Container maxWidth='100vw'>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text"/>
      </Head>

      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' style={{flexGrow:1}}>Flashcard Saas</Typography>
          <SignedOut>
            <Button color='inherit'>Login</Button>
            <Button color='inherit'>Sign Up</Button>
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
              Easiest way to make flashcards from text
          </Typography>
          <Button variant='contained' color='primary' sx={{mt:2}}>Get started</Button>
      </Box>

    <Box sx={{my:6}}>
        <Typography variant='h4' gutterBottom>
            Features
        </Typography>
        <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
                <Typography variant='h6' gutterBottom>Easy text input</Typography>
                <Typography>
                    {' '}
                    Simply input your text and let our software do the rest.
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography variant='h6' gutterBottom>Smart flashcards</Typography>
                <Typography>
                    {' '}
                    Our AI intelligently breaks down your text into flashcard material.
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography variant='h6' gutterBottom>Accessible Anywhere</Typography>
                <Typography>
                    {' '}
                    Access your flashcards from any device.
                </Typography>
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
                        Choose basic
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
                    <Button variant='contained' color='primary' sx={{mt:2}}>
                        Choose basic
                    </Button>
                </Box>
            </Grid>
        </Grid>
    </Box>
    </Container>

  );
}
