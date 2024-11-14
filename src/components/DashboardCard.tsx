import { Card } from "react-bootstrap";

export default function DashboardCard({
  title,
  footer,
  children,
}: {
  title: string,
  footer?: React.ReactNode,
  children: React.ReactNode,
}) {
  return (
    <div className="DashboardCard d-flex justify-content-center">
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {children}
          </Card.Text>
          {footer &&
            <Card.Footer>
              {footer}
            </Card.Footer>
          }
        </Card.Body>
      </Card>
    </div >
  );
}
