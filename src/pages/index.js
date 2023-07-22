import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "../../helpers/api-util";
import Head from "next/head";

export default function Home(props) {
  const { events } = props;
  return (
    <div>
      <Head>
        <title>Next.js Tutorial</title>
        <meta
          name="description"
          content="this allow you to find something....."
        />
      </Head>
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 10,
  };
}
