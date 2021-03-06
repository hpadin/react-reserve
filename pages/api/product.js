import Product from '../../models/Product'
import connectDb from "../../utils/connectDb"

connectDb();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        case "DELETE":
            await handleDeleteRequest(req, res);
            break;
        case "POST":
            await handlePostRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not supported`)
    }
}

async function handleGetRequest(req, res) {
    const { _id } = req.query
    const product = await Product.findOne({ _id });
    res.status(200).json(product)
}

async function handleDeleteRequest(req, res) {
    const { _id } = req.query
    const deleted = await Product.findOneAndDelete({ _id });
    res.status(204).json({});
}

async function handlePostRequest(req, res) {
    const { name, price, description, mediaUrl } = req.body
    try {
        if (!name || !price || !description || !mediaUrl) {
            return res.status(422).send("Missing fields")
        }

        const product = await new Product({
            name,
            price,
            description,
            mediaUrl
        }).save()

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error creating product");
    }
}