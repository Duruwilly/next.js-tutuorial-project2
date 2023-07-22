import Image from "next/image";
import React from "react";
import LogisticsItem from "./LogisticsItem";

const EventLogistics = (props) => {
  const { date, address, image, imageAlt } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const addressText = address?.replace(", ", "\n");

  return (
    <section>
      <div>
        <Image src={`/${image}`} alt={imageAlt} width={260} height={260} />
      </div>
      <ul>
        <LogisticsItem>
          <div>{humanReadableDate}</div>
        </LogisticsItem>
        <LogisticsItem>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
};

export default EventLogistics;
