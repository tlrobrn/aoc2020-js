import { useEffect, useRef, useState } from "react";
import { Router, Link } from "@reach/router";
import { DateTime, Interval } from "luxon";
import Day1 from "./Day1";
import Day2 from "./Day2";
import Day3 from "./Day3";
import Day4 from "./Day4";
import Day5 from "./Day5";
import Day6 from "./Day6";
import Day7 from "./Day7";
import Day8 from "./Day8";
import Day9 from "./Day9";
import BackgroundImage from "./BackgroundImage.jpg";

export default function App() {
  return (
    <div
      className="flex flex-col items-center justify-between h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <header className="p-2 my-2 text-2xl rounded shadow-md bg-gray-50">
        <Anchor href="https://adventofcode.com">Advent of Code 2020</Anchor>
      </header>
      <article>
        <Router>
          <Main path="/" />
          <Day1 path="/day/1" />
          <Day2 path="/day/2" />
          <Day3 path="/day/3" />
          <Day4 path="/day/4" />
          <Day5 path="/day/5" />
          <Day6 path="/day/6" />
          <Day7 path="/day/7" />
          <Day8 path="/day/8" />
          <Day9 path="/day/9" />
          <Day path="/day/:dayId" />
        </Router>
      </article>
      <footer className="p-2 my-2 text-xs text-gray-500 rounded shadow-md bg-gray-50">
        <span>
          Photo by{" "}
          <Anchor href="https://unsplash.com/@chadmadden?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Chad Madden
          </Anchor>{" "}
          on{" "}
          <Anchor href="https://unsplash.com/s/photos/christmas?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Unsplash
          </Anchor>
        </span>
      </footer>
    </div>
  );
}

const Main = () => (
  <div className="flex flex-wrap justify-center">
    <Card dayId={1}>
      <CardHeader>Day 1</CardHeader>
      <CardBody>Content</CardBody>
    </Card>
    <Card dayId={2}>
      <CardHeader>Day 2</CardHeader>
      <CardBody>Content</CardBody>
    </Card>
    <Card dayId={3}>
      <CardHeader>Day 3</CardHeader>
      <CardBody>Content 3</CardBody>
    </Card>
    <Card dayId={4}>
      <CardHeader>Day 4</CardHeader>
      <CardBody>Content 4</CardBody>
    </Card>
    <Card dayId={5}>
      <CardHeader>Day 5</CardHeader>
      <CardBody>Content 5</CardBody>
    </Card>
    <Card dayId={6}>
      <CardHeader>Day 6</CardHeader>
      <CardBody>Content 6</CardBody>
    </Card>
    <Card dayId={7}>
      <CardHeader>Day 7</CardHeader>
      <CardBody>Content 7</CardBody>
    </Card>
    <Card dayId={8}>
      <CardHeader>Day 8</CardHeader>
      <CardBody>Content 8</CardBody>
    </Card>
    <Card dayId={9}>
      <CardHeader>Day 9</CardHeader>
      <CardBody>Content 9</CardBody>
    </Card>
    <Card dayId={10}>
      <CardHeader>Day 10</CardHeader>
      <CardBody>
        <Countdown day={10} />
      </CardBody>
    </Card>
    <Card dayId={11}>
      <CardHeader>Day 11</CardHeader>
      <CardBody>
        <Countdown day={11} />
      </CardBody>
    </Card>
    <Card dayId={12}>
      <CardHeader>Day 12</CardHeader>
      <CardBody>
        <Countdown day={12} />
      </CardBody>
    </Card>
  </div>
);

const dateTimeForDay = (day) =>
  DateTime.fromObject({
    month: 12,
    day,
    zone: "America/New_York",
  });

const hoursMinutesSecondsUntil = (day) =>
  Interval.fromDateTimes(DateTime.local(), dateTimeForDay(day)).toDuration([
    "hours",
    "minutes",
    "seconds",
  ]);

function useCountdown(day) {
  const requestId = useRef();
  const [remainingTime, setRemainingTime] = useState(
    hoursMinutesSecondsUntil(day)
  );

  useEffect(() => {
    const updateRemainingTime = () => {
      setRemainingTime(hoursMinutesSecondsUntil(day));
      requestId.current = requestAnimationFrame(updateRemainingTime);
    };
    requestId.current = requestAnimationFrame(updateRemainingTime);
    return () => requestId.current && cancelAnimationFrame(requestId.current);
  }, [day]);

  return remainingTime;
}

const Countdown = ({ day }) => {
  const countdown = useCountdown(day);
  return countdown.toFormat("hh:mm:ss");
};

const Card = ({ children, dayId }) => (
  <Link to={`/day/${dayId}`}>
    <div className="p-2 m-2 rounded shadow-md bg-gray-50">{children}</div>
  </Link>
);

const CardHeader = ({ children }) => (
  <div className="border-b-2">{children}</div>
);

const CardBody = ({ children }) => <div>{children}</div>;

const Day = ({ dayId }) => <div>Day {dayId}</div>;

const Anchor = ({ children, href }) => (
  <a href={href} target="_blank" rel="noreferrer" className="text-green-800">
    {children}
  </a>
);
