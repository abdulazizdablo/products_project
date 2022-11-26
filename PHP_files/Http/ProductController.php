<?php

namespace App1\Http;

use App1\Database\Database;
use App1\Http\Request;

/**
 * ProductController Class
 * this class for handling products CRD Operations (create,read,delete)
 * with the corresponding static methods
 *
 * @author Abdulaziz Dablo
 * @package App
 * 
 */

class ProductController
{
      public function index()
    {
        $db = Database::getInstance();
        $mysqli = $db->getConnection();
        $sqlQuery = "SELECT SKU,name,price, 
        CONCAT_WS(', ',
        CONCAT('Size : ', size,'MB'),
        CONCAT('Weight : ', weight,'KG'),
        CONCAT('Dimensions : ', dimensions))
        AS attributes from products";
        $result = $mysqli->query($sqlQuery);
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    }
   
    public function store()
    {
        if (isset($_POST['product'])) {
            $product_name = $_POST['product'];
            $product_name = "\\App1\\Models\\" . $product_name;
            $product = new $product_name();
            $product->setSKU();
            $product->setName();
            $product->setPrice();
            $product->setProductProperty();
            $product->save();
        }
    }

    public function delete()
    {
        $deleted_data = $_POST['data'];
        $countof_data = count($deleted_data);
        $output = implode(",", array_fill(0, $countof_data, "?"));
        $db = Database::getInstance();
        $mysqli = $db->getConnection();
        $statment = $mysqli->prepare("DELETE FROM products WHERE SKU IN (" . $output . ")");
        $binding_params = implode('', array_fill(0, $countof_data, "s"));
        $statment->bind_param($binding_params, ...$deleted_data);
        $statment->execute();
    }
  
}
// EOF
