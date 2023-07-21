import EventContent from "@/components/EventDetails/EventContent";
import EventLogistics from "@/components/EventDetails/EventLogistics";
import EventSummary from "@/components/EventDetails/EventSummary";
import { getEventsById, getFeaturedEvents } from "../../../helpers/api-util";

const EventDetailsPage = (props) => {
  const event = props.selectedEvent;

  if (!event) {
    return <p>No event found</p>;
  }
  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventsById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const event = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: event,
    fallback: "blocking"
  };
}

export default EventDetailsPage;
