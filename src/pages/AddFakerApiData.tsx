import { kvArrayToObject } from "@desmat/utils";
import { useState } from "react";
import { Button, FloatingLabel, Form, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import useFakerApi from "../hooks/useFakerApi";
import { FakerApiFieldDefinitions } from "../types/FakerApi";

export default function AddFakerApiData() {
  const navigate = useNavigate();
  const { randomData, add } = useFakerApi();
  const [randomRow, setRandomRow] = useState<{ [index: string]: any }>({})
  const [validationErrors, setValidationErrors] = useState<{ [index: string]: string }>({});

  const loadRandomData = async () => {
    const data = await randomData(1);
    setRandomRow(data[0]);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;

    const validationErrors = kvArrayToObject(
      Object.entries(FakerApiFieldDefinitions)
        .map(([name, def]) => {
          if (def.validateFn && form && form.elements[name]) {
            const error = def.validateFn(form.elements[name]?.value)
            if (error) {
              return [name, error];
            }
          }
        })
        .filter(Boolean)
    );

    console.log("validationErrors", { validationErrors })

    setValidationErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const record = kvArrayToObject(
      Object.entries(FakerApiFieldDefinitions)
        .map(([name, def]) => [
          name,
          def.type == "boolean"
            ? form && form.elements[name]?.checked
            : form && form.elements[name]?.value,
        ])
    );

    console.log("pages.AddFakerApiData.submit", { record, validated: form && form.checkValidity() })

    await add(record);
    navigate("/");
  }

  const Footer = () => {
    return (
      <Stack direction="horizontal" gap={2} className="d-flex justify-content-center">
        <Link to="/" >[Back]</Link>
        <Link to="#" onClick={loadRandomData} >[Load Random]</Link>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Stack>
    )
  }

  return (
    <Form onSubmit={handleSubmit} >
      <DashboardCard
        title="Add FakerAPI Entry"
        footer={<Footer />}
      >
        {Object.entries(FakerApiFieldDefinitions).map(([name, def]) => (
          <div key={name}>
            {def.type == "boolean" &&
              <Form.Group className="mb-3" controlId={name}>
                <Form.Check
                  type="checkbox"
                  label={name}
                  defaultChecked={randomRow[name]}
                />
              </Form.Group>
            }
            {def.type == "textarea" &&
              <FloatingLabel controlId={name} label={name}>
                <Form.Control
                  as="textarea"
                  placeholder={name}
                  defaultValue={randomRow[name]}
                  style={{ height: '100px' }}
                />
              </FloatingLabel>
            }
            {!["boolean", "textarea"].includes(def.type) &&
              <FloatingLabel
                controlId={name}
                label={name}
                className="mb-3"
              >
                <Form.Control
                  required={def.required}
                  type={def.type}
                  defaultValue={randomRow[name]}
                  placeholder={name}
                  isInvalid={!!validationErrors[name]}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors[name]}
                </Form.Control.Feedback>
              </FloatingLabel>
            }
          </div>
        ))}
      </DashboardCard >
    </Form>
  );
}
