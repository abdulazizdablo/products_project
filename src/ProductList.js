import React from "react";

import { useState, useEffect } from "react";
import { Checkbox } from "@mui/material";
import { Card, Button, Row, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import $ from "jquery";

function ProductList() {
  const [data, setData] = useState([]);
  const [remove, setRemove] = useState([]);

  //using useEffect hook to initial render with fetched products from Database

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    let deleteButtonName = e.target.getAttribute("name");
    $.ajax({
      type: "POST",
      url: "src/Http/ProductController/delete",
      data: { data: remove, delete: deleteButtonName },

      success: function(data) {
        setRemove([]);
        getData();
      },
    });
  };

  const DeleteItems = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setRemove([...remove, e.target.value]);
    } else {
      const index = remove.indexOf(e.target.value);
      setRemove([
        ...remove.slice(0, index),
        ...remove.slice(index + 1, remove.length),
      ]);
    }
  };

  async function getData() {
    let result = await fetch("src/Http/ProductController/index");
    result = await result.json();
    setData(result);
  }

  return (
    <>
    <Container>
      <Row className="mt-4 align-items-center">
        <Col md={8}>
          <h1 className="text-md-start">Product List</h1>
        </Col>
        <Col md={4}>
          <Link to="/add-product">
            <Button variant="primary" className="me-3">
              ADD
            </Button>
          </Link>
          {""}
          <Button
            id="delete-product-button"
            variant="danger"
            name="delete"
            as="input"
            type="button"
            value="MASS DELETE"
            onClick={handleDelete}
          />
        </Col>
      </Row>
      <hr></hr>
      </Container>
      <Container fluid>
        {data.map((item) => (
          <Card key={item.SKU}>
            <Checkbox
              size="small"
              sx={{
                padding: "2px",
                marginLeft:"4px"
              }}
              inputProps={{
                "aria-label": "delete Checkbox",
                className: "delete-checkbox",
              }}
              onChange={DeleteItems}
              value={item.SKU}
              type="checkbox"
              style={{ padding: "3px", width: "1rem" }}
            />

            <p>{item.SKU}</p>
            <p>{item.name} </p>
            <p>{item.price} $</p>
            <p>{item.attributes}</p>
          </Card>
        ))}
      </Container>
    </>
  );
}
export default ProductList;
