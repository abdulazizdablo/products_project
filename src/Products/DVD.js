import { Form, Row, Col } from "react-bootstrap";
import React from "react";
import { Controller } from "react-hook-form";

function DVD({ size, control, onErrors: { ...errors } }) {

  return (
    <>
      <Form.Group controlId="size">
        <Row>
          <Col className="text-start" md={2}>
            <Form.Label>Size(MB)</Form.Label>
          </Col>
          <Col md={10}>
            <Controller
              name="size"
              defaultValue={''}
              control={control}
              rules={size}
              style={{ width: "18rem" }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="number"
                  placeholder="Size"
                  aria-label="Size"
                  min={0}
                  name="size"
                  style={{

                    width: "18rem"

                  }}
                ></Form.Control>
              )}
            />
            <small className="text-danger">
              {errors.size && errors.size.message}
            </small>
          </Col>
        </Row>

        <Row>
          <Form.Text className="text-start mb-1" aria-describedby="SizeofDVDBlock">
            Please, provide size
          </Form.Text>
        </Row>
      </Form.Group>
    </>
  );
}
export default DVD;
