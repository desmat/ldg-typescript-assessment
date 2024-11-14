import { Card } from "react-bootstrap";

function FakerApiData({ data }: { data: any[] }) {
  return (
    <div className="Chart">
      <Card style={{}}>
        <Card.Body>
          <Card.Title>FakerAPI Data</Card.Title>
          <Card.Text>
            <p>Num data: {data.length}</p>
            <p>First entry: {JSON.stringify(data[0], null, '\n')}</p>
            <p>Last entry: {JSON.stringify(data[data.length - 1], null, '\t\n')}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FakerApiData;
