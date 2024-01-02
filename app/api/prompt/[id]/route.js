import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";


//Get a Prompt
export const GET = async (req, {params}) => {

    try {
        await connectToDB()
        const prompt = await Prompt.findById(params.id).populate('creator')

        if(!prompt) return new Response('Prompt not found', { status: 404 })

        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch prompt", {status: 500})
    }
}

//Edit a prompt (PATCH)
export const PATCH = async (req, {params}) => {
    const {prompt, tag} = await req.json();
    try {
        await connectToDB()
        const existignPrompt = await Prompt.findById(params.id)

        if(!existignPrompt) return new Response('Prompt not found', { status: 404 })

        existignPrompt.prompt = prompt;
        existignPrompt.tag = tag;

        await existignPrompt.save();

        return new Response(JSON.stringify(existignPrompt), {status: 200})
    } catch (error) {
        return new Response("Failed to update the prompt", {status: 500})
    }
}

//Delete a prompt (DELETE)
export const DELETE = async (req, {params}) => {

    try {
        await connectToDB()
        await Prompt.findByIdAndDelete(params.id)

        return new Response('Prompt deleted successfully', {status: 200})
    } catch (error) {
        return new Response("Failed to delete prompt", {status: 500})
    }
}