import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";


//Get a Prompt
export const GET = async (req, { params }) => {
    const query = params.query;

    try {
        await connectToDB()

        // Search prompts with tag containing the query
        const promptResults = await Prompt.find({ tag: { $regex: query, $options: 'i' } }).populate('creator');

        if (promptResults.length > 0) {
            return new Response(JSON.stringify(promptResults), { status: 200 })
        }

        const creator = await User.findOne({ username: query });

        if (creator) {
            const promptResult = await Prompt.find({ creator: creator._id }).populate('creator');
            return new Response(JSON.stringify(promptResult), { status: 200 })
        }

        return new Response(JSON.stringify({msg: "No prompts or user found"}), { status: 404 });

    } catch (error) {
        console.log(error)
        return new Response("Internal Server Error", { status: 500 });
    }
}