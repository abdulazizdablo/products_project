import React from "react";

import { Form, Row, Col } from "react-bootstrap";
import { Controller } from "react-hook-form";

function Furniture({
  height,
  width,
  length,
  control,
  onErrors: { ...errors },
}) {
  return (
    <>
      <Form.Group controlId="height" className="mb-3 ">
        <Row>
          <Col className="text-start" md={2}>
            <Form.Label>Height (CM)</Form.Label>
          </Col>
          <Col md={8}>
            <Controller
              name="height"
              control={control}
              rules={height}
              style={{ width: "18rem" }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  defaultValue={''}
                  placeholder="Height"
                  aria-label="Height"
                  type="number"
                  min={0}
                  name="height"
                  style={{

                    width: "18rem"

                  }}
                />
              )}
            />
            <small className="text-danger">
              {errors.height && errors.height.message}
            </small>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group controlId="width" className="mb-3">
        <Row>
          <Col className="text-start" md={2}>
            <Form.Label className="text-center  ">Width (CM)</Form.Label>
          </Col>
          <Col md={8}>
            <Controller
              name="width"
              control={control}
              rules={width}
              style={{ width: "18rem" }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  defaultValue={''}
                  type="number"
                  placeholder="Width"
                  aria-label="Width"
                  min={0}
                  name="width"
                  style={{

                    width: "18rem"

                  }}
                />
              )}
            />
            <small className="text-danger">
              {errors.width && errors.width.message}
            </small>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group controlId="length" className="mb-3">
        <Row>
          <Col className="text-start" md={2}>
            <Form.Label>Length (CM)</Form.Label>
          </Col>
          <Col md={8}>
            <Controller
              name="length"
              defaultValue={''}
              control={control}
              rules={length}
              style={{ width: "18rem" }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="number"
                  placeholder="Length"
                  min={0}
                  aria-label="Length"
                  name="length"
                  style={{

                    width: "18rem"

                  }}
                />
              )}
            />
            <small className="text-danger">
              {errors.length && errors.length.message}
            </small>
          </Col>
        </Row>
        <Row>
          <Form.Text
            aria-describedby="DimensionsofFurnitureBlock"
            className="text-start mb-1"
          >
            Please, provide dimensions
          </Form.Text>
        </Row>
      </Form.Group>
    </>
  );
}
export default Furniture;
