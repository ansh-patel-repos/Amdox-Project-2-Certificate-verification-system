import { Webhook } from "svix"

export const clerkWebhooks = async (req, res) => {
    try {   
        
        console.log("Webhook received!");
        // create a webhook svix instance
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await webhook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const {data, type} = req.body;
        if(data) {
            console.log("Data: ", data);
            console.log("type: ", type);
        }

        return res.send(data, type)
    } catch (error) {
        console.log(error.message);
    }
}