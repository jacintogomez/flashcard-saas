import {NextResponse} from 'next/server';
import Stripe from 'stripe';
const stripe=new Stripe(process.env.STRIPE_PRIVATE_KEY);
const formatamountforstripe=(amount)=>{
    return Math.round(amount*100);
}

export async function GET(req,{params}){
    const searchparams=req.nextUrl.searchParams;
    const sessionid=searchparams.get('session_id');
    try{
        const checkoutsession=await stripe.checkout.sessions.retrieve(sessionid);
        return NextResponse.json(checkoutsession);
    }catch(error){
        console.error('Error retrieving checkout session',error);
        return NextResponse.json({error:{message:error.message}},{status:500});
    }
}

export async function POST(req){
    const params = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:'Pro Subscription'
                    },
                    unit_amount:formatamountforstripe(10),
                    recurring:{
                        interval:'month',
                        interval_count:1
                    },
                },
                quantity: 1,
            },
        ],
        success_url: `${req.headers.get('origin',)}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('origin',)}/result?session_id={CHECKOUT_SESSION_ID}`,
    };
    const checkoutSession =await stripe.checkout.sessions.create(params);
    return NextResponse.json(checkoutSession,{
        status:200
    });
}