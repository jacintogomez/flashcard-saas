'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import getStripe from '@/utils/get-stripe';
import { Box, CircularProgress, Container, Typography } from "@mui/material";

const ResultPage = () => {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);
    const [sessionId, setSessionId] = useState(null); // State for session ID

    useEffect(() => {
        // Ensure hooks are called only on the client side
        const router = useRouter();
        const searchParams = useSearchParams();
        const sessionId = searchParams?.get('session_id');
        setSessionId(sessionId);

        const fetchCheckoutSession = async () => {
            if (!sessionId) return;

            try {
                const res = await fetch(`/api/checkout_session?session_id=${sessionId}`);
                const sessionData = await res.json();
                if (res.ok) {
                    setSession(sessionData);
                } else {
                    setError(sessionData.error);
                }
            } catch (err) {
                setError('An error occurred');
            } finally {
                setLoading(false);
            }
        };

        if (sessionId) {
            fetchCheckoutSession();
        }
    }, []);

    if (loading) {
        return (
            <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
                <Typography variant="h6">Loading...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
            {session?.payment_status === 'paid' ? (
                <>
                    <Typography variant="h4">Thank you for purchasing!</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">
                            Session ID: {sessionId}
                        </Typography>
                        <Typography variant="body1">
                            We have received your payment. You will receive a confirmation email shortly.
                        </Typography>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant="h4">Thank you for purchasing!</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">
                            Session ID: {sessionId}
                        </Typography>
                        <Typography variant="body1">
                            Payment was not successful. Please try again.
                        </Typography>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default ResultPage;
