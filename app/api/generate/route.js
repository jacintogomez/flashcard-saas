import {NextResponse} from 'next/server';
import OpenAI from 'openai';

const systemprompt=`
You are a flashcard creator. Your task is to create effective flashcards based on the given content or topic. 

The user's input will provide the topic or content that you must base your flashcards on. Follow these guidelines:

0. The flashcards **must be based on the user's input** content or topic: "{{topic}}".
1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language on the flashcard for a wide range of learners.
5. Include a variety of question types, like definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in questions and answers.
7. Aim to create a balanced set of flashcards that covers the given topic comprehensively.
8. Only generate 10 flashcards.

Return the flashcards in the following JSON format:
{
    "flashcards": [
        {
            "front": "string",
            "back": "string"
        }
    ]
}

`

export async function POST(req){
    const openai=new OpenAI();
    const data=await req.text();
    console.log('data is '+data);
    const completion=await openai.chat.completions.create({
        messages:[
            {role:'system',content:systemprompt},
            {role:'user',content:data},
        ],
        model:'gpt-3.5-turbo',
        response_format:{type:'json_object'},
    });
    const flashcards=JSON.parse(completion.choices[0].message.content);
    console.log(flashcards);
    return NextResponse.json(flashcards.flashcards);
}