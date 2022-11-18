import React from "react";

import { Form, Row, Col } from "react-bootstrap";
import { Controller } from "react-hook-form";


function Book({ weight, control, onErrors: { ...errors } }) {
  return (
    <>
      <Form.Group controlId="weight" className="mb-3">
        <Row>
          <Col className="text-start" md={2}>
            <Form.Label>Weight (KG)</Form.Label>
          </Col>
          <Col md={8}>
            <Controller
              name="weight"
              defaultValue={''}
              control={control}
              rules={weight}
              style={{ width: "18rem" }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="number"
                  min={0}
                  placeholder="Weight"
                  aria-label="Weight"
                  name="weight"
                  style={{

                    width: "18rem"

                  }}
                />
              )}
            />

            <small className="text-danger">
              {errors.weight && errors.weight.message}
            </small>
          </Col>
        </Row>
        <Row>
          <Form.Text className="text-start mb-1" aria-describedby="Weight of Book">
            Please, provide weight
          </Form.Text>
        </Row>
      </Form.Group>
    </>
  );
}
export default Book;

