<?php

namespace App1\Models;


use App1\Database\Database;
use App1\Services\ProductService;

/**
 * Product Main Class
 * This is abstrct class for product's general properties
 * it is inherited by more specific materialized classes 
 *
 * @author Abdulaziz Dablo
 * @package App
 * 
 */



abstract class Product
{
    /**
     * the SKU is a unique identifier string to each product
     * @var string
     */

    public string $SKU;

    /**
     * the model name for each product
     * @var string
     */

    public string $name;

    /**
     * the price is numirc property for each product
     * @var int
     */

    public int $price;

    public function setSKU()
    {
        $this->SKU = isset($_POST["SKU"]) && !empty($_POST["SKU"]) ?
            htmlspecialchars(stripslashes(trim($_POST["SKU"]))) :
            die();

        return $this->SKU;
    }

    public function setName()
    {
        $this->name = isset($_POST["name"]) && !empty($_POST["name"])
            ? htmlspecialchars(stripslashes(trim($_POST["name"]))) :
            die();

        return $this->name;
    }



    public function setPrice()
    {

        $this->price = isset($_POST["price"]) && !empty($_POST["price"])
            ? htmlspecialchars(stripslashes(trim($_POST["price"]))) :
            die();

        if (!preg_match("/\b(^[1-9][0-9]*$)\b/", $this->price)) {

            $errors['price'] = "Please provide indicated data";
            die(json_encode($errors));
        }

        return $this->price;
    }

    public function save()
    {

        $class = new \ReflectionClass($this);
        $propsToImplode = [];

        foreach ($class->getProperties(\ReflectionProperty::IS_PUBLIC) as $property) { // consider only public properties of the providen 
            $property_name = $property->getName();
            $props_to_implode[$property_name] = $this->{$property_name};
        }

        $props_names = implode(",", array_keys($props_to_implode));
        $props_values = array_values($props_to_implode);
        $db = Database::getInstance();
        $mysqli = $db->getConnection();
        $statment = $mysqli->prepare("INSERT INTO products 
        (" . $props_names . ")  VALUES(?,?,?,?)");

        // defining an assoicative array for dynamic binding params to include 
        // the specified product property data type for binding

        $biniding_params_map = [
            'dimensions' => 's',
            'size' => 'i',
            'weight' => 'i'
        ];

        $specific_dynamic_param = array_keys($props_to_implode)[0];
        $statment->bind_param($biniding_params_map[$specific_dynamic_param] . 'ssi', ...$props_values);

        try {
            $statment->execute();
        } catch (\mysqli_sql_exception $e) {
            if ($e->getCode() == 1062) {

                echo json_encode($errors['error'] = 1062);

                http_response_code(409);
            }
        }
    }
}

// EOF
