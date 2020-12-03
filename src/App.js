import { Router, Link } from "@reach/router";
import Day1 from "./Day1";
import Day2 from "./Day2";
import Day3 from "./Day3";
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
  </div>
);

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
