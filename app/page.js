import Image from "next/image";
import getstripe from '@/utils/get-stripe.js';
import {SignedIn,SignedOut,UserButton} from '@clerk/nextjs';
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import Head from "next/head";

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
          <Typography variant='h2'>Welcome to Flashcard SaaS</Typography>
          <Typography variant='h5'>
              {' '}
              Easiest way to make flashcards from text
          </Typography>
          <Button variant='contained' color='primary' sx={{mt:2}}>Get started</Button>
      </Box>
    </Container>

  );
}
