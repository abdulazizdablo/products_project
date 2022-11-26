import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { InputLabel, MenuItem, Select } from "@mui/material";
import $ from "jquery";


function ProductForm() {
  const {
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      SKU: "",
      name: "",
      price: "",
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- types are not aware of older browsers that don't implement `labels`
  const Product = useMemo(() =>
    React.lazy(() => import(`./Products/${product}`))
    );

  const onErrors = (errors) => console.error(errors);

  // I used here for validation regex instead of parseInt because parseint
  // could cause problems for missusing it like ommiting an octal or hex number
  // it will recognize 08 as 0



  const RegisterOptions = {
    SKU: { required: "Please, submit required data" },
    name: { required: "Please, submit required data" },
    price: {
      required: "Please, submit required data",

      pattern: {
        value: /\b(^[1-9][0-9]*$)\b/,
        message: "Please, provide the data of indicated type",
      },
      maxLength: 14,
    },
    product: { required: "Please, submit required data" },
    weight: {
      required: "Please, submit required data",

      pattern: {
        value: /\b(^[1-9][0-9]*$)\b/,
        message: "Please, provide the data of indicated type",
      },
    },
    size: {
      required: "Please, submit required data",

      pattern: {
        value: /\b(^[1-9][0-9]*$)\b/,
        message: "Please, provide the data of indicated type",
      },
      maxLength: 14,
    },

    width: {
      required: "Please, submit required data",

      pattern: {
        value: /\b(^[1-9][0-9]*$)\b/,
        message: "Please, provide the data of indicated type",
      },
      maxLength: 14,
    },

    length: {
      required: "Please, submit required data",

      pattern: {
        value: /\b(^[1-9][0-9]*$)\b/,
        message: "Please, provide the data of indicated type",
      },
      maxLength: 14,
    },

    height: {
      required: "Please, submit required data",

      pattern: {
        value: /\b(^[1-9][0-9]*$)\b/,
        message: "Please, provide the data of indicated type",
      },
      maxLength: 14,
    },
  };

  const [product, setProduct] = useState("");

  let navigate = useNavigate();

  const onFormSubmit = (data, e) => {
    e.preventDefault();
    const form = $(e.target);

    $.ajax({
      type: "POST",
      url: form.attr("action"),
      data: form.serialize(),
      success: function (data) {
        navigate("/");
      },

      error: function (data) {
        let err = JSON.parse(data.responseText);

        if (err === 1062) {
          setError(
            "SKU",
            {
              type: "focus",
              message: "there is existing product with same SKU",
            },
            { shouldFocus: true }
          );
        } 
      },
    });
  };

  return (
    <Container>
      <Form
        id="product_form"
        method="POST"
        action="src/Http/ProductController/store"
        onSubmit={handleSubmit(onFormSubmit, onErrors)}
      >
        <Row className="mt-3 align-items-center">
          <Col md={8}>
            <h1 className="text-md-start ">Add Product</h1>
          </Col>
          <Col md={4}>
            <Button
              className="me-3 align-items-center"
              as="input"
              value="Save"
              type="submit"
              onSubmit={(e) => onFormSubmit(e)}
            />
            {""}
            <Link to="/">
              <Button variant="secondary" className="">
                Cancel
              </Button>
            </Link>
          </Col>
        </Row>
        <hr></hr>

        <Form.Group controlId="sku" className="mb-3">
          <Row>
            <Col className="text-start" md={2}>
              <Form.Label>SKU</Form.Label>
            </Col>

            <Col md={10}>
              <Controller
                name="SKU"
                control={control}
                rules={RegisterOptions.SKU}
                style={{ width: "18rem" }}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    style={{ width: "18rem" }}
                    className=" ms-1 mb-2"
                  />
                )}
              />
              <small className="text-danger">
                {errors.SKU && errors.SKU.message}
              </small>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="name" className="mb-3">
          <Row>
            <Col className="text-start" md={2}>
              <Form.Label>Name</Form.Label>
            </Col>
            <Col md={10}>
              <Controller
                name="name"
                control={control}
                rules={RegisterOptions.name}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    style={{ width: "18rem" }}
                    className="ms-1 mb-2"
                  />
                )}
              />
              <small className="text-danger">
                {errors.name && errors.name.message}
              </small>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="price" className="mb-3">
          <Row>
            <Col className="text-start" md={2}>
              <Form.Label >Price ($)</Form.Label>
            </Col>
            <Col md={10}>
              <Controller
                name="price"
                control={control}
                rules={RegisterOptions.price}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    min={0}
                    type="number"
                    style={{



                      width: "18rem"


                    }}
                    className="ms-1 mb-2"
                  />
                )}
              />

              <small className="text-danger">
                {errors.price && errors.price.message}
              </small>
            </Col>
          </Row>
        </Form.Group>

        <div className=" d-flex align-items-center ">
          <InputLabel className="mb-2 ms-8" id="label">
            Type Switcher
          </InputLabel>

          <Controller
            name="product"
            control={control}
            rules={RegisterOptions.product}
            render={({ field }) => (
              <Select
                {...field}
                inputProps={{
                  name: "product",
                }}
                label="Type Switcher"
                id="productType"
                value={product}
                className="mb-3 mt-2 me-0"
                sx={{
                  marginLeft: 27,
                }}
                style={{ width: "8rem" }}
                onChange={(e) => {
                  field.onChange(e);
                  setProduct(e.target.value);
                }}
              >
                <MenuItem value="DVD" id="DVD">
                  DVD
                </MenuItem>
                <MenuItem value="Book" id="Book">
                  Book
                </MenuItem>
                <MenuItem value="Furniture" id="Furniture">
                  Furniture
                </MenuItem>
              </Select>
            )}
          />
        </div>

        <small className="text-danger">
          {errors.product && errors.product.message}
        </small>

        <Row>
          <Suspense>
            {product && (
              <Product
                {...RegisterOptions}
                control={control}
                onErrors={errors}
              ></Product>
            )}
          </Suspense>
        </Row>
      </Form>
    </Container>
  );
}

export default ProductForm;
