import {loadStripe} from '@stripe/stripe-js';
let stripepromise;

const getStripe=()=>{
    if(!stripepromise){
        stripepromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    }
    return stripepromise;
}

export default getStripe;