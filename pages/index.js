import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta
					name="description"
					content="Browse a huge list of highly active React meetups!"
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
}

// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;

// fetch data from an API here.

// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		}
// 	}
// }

// This function is the first function which will run from this file and once the data is
// available in this function we will send the data as props to the component which will now use
// that data and pre-render the whole page with data.
// and this function code will executed while build process. never on client browser or server.

// Hence doing this is not good if the data changes on our site.
// so to stay updated after the static build page we can add a property revalidate that will fetch
// data on server and  then send the prerendered page from server after the specified time in second.
export async function getStaticProps() {
	const client = await MongoClient.connect(
		"mongodb+srv://patidarrambabu135:eJNOGRfc07lAQKwV@cluster0.hj8r16d.mongodb.net/meetups?retryWrites=true&w=majority"
	);

	const db = client.db();

	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find().toArray();
	client.close();
	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				image: meetup.image,
				address: meetup.address,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 1,
	};
}
export default HomePage;
