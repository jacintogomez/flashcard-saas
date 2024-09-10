import {NextResponse} from 'next/server';
import OpenAI from 'openai';

const systemprompt=`
You are a flashcard creator. Your task is to create effective flashcards based on the given content or topic
Return in the following JSON format:
{
    "flashcards":[
        {
            "front":str,
            "back":str
        }
    ]
}
`

export async function POST(req){
    const openai=OpenAI();
    const data=await req.text();
    const completion=await openai.chat.completion.create({
        messages:[
            {roles:'system',content:systemprompt},
            {role:'user',content:data},
        ],
        model:'gpt-4o',
        response_format:{type:'json_object'},
    });
    const flashcards=JSON.parse(completion.choices[0].messages.content);
    return NextResponse.json(flashcards.flashcard);
}