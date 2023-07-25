import { MongoClient } from "mongodb";

//  /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
	const method = req.method;
	if (method === "POST") {
		const data = req.body;

		const client = await MongoClient.connect(
			"mongodb+srv://patidarrambabu135:eJNOGRfc07lAQKwV@cluster0.hj8r16d.mongodb.net/meetups?retryWrites=true&w=majority"
		);

		const db = client.db();

		const meetupsCollection = db.collection("meetups");

		const result = await meetupsCollection.insertOne(data);

		console.log(result);
		client.close();

		res.status(201).json({ message: "Meetup Inserted!" });
	}
}

export default handler;
