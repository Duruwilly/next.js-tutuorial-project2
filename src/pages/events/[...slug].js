import EventList from "@/components/events/event-list";
import ResultTitle from "@/components/events/result-title";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../../helpers/api-util";

const FilteredEventsPage = (props) => {
  const router = useRouter();

  // const filterData = router.query.slug;

  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // // convert to number
  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  if (props.hasError) {
    return <p>Invalid filter. please adjust your values!</p>;
  }

  const filteredEvent = props.events;

  if (!filteredEvent || filteredEvent.length === 0) {
    return <p>No Event Found!</p>;
  }

  const date = new Date(props.year, props.month - 1);
  return (
    <>
      <ResultTitle date={date} />
      <EventList items={filteredEvent} />
    </>
  );
};

export default FilteredEventsPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // convert to number
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
      // notFound: true,
    };
  }

  const filteredEvent = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvent,
      year: numYear,
      month: numMonth,
    },
  };
}
