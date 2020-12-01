import { Router, Link } from "@reach/router";
import Day1 from "./Day1";

export default function App() {
  return (
    <Router>
      <Main path="/" />
      <Day path="/day/:dayId" />
    </Router>
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
    <div className="p-2 m-2 rounded shadow-md">{children}</div>
  </Link>
);

const CardHeader = ({ children }) => (
  <div className="border-b-2">{children}</div>
);

const CardBody = ({ children }) => <div>{children}</div>;

const Day = ({ dayId }) => (dayId === "1" ? <Day1 /> : <div>Day {dayId}</div>);
