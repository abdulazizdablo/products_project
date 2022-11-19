<?php

namespace App\Http;


use App\Database\Database;
use App\Http\Request;

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

    public  static function getProducts()
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
    public static function storeProduct()
    {
        if (isset($_POST['product'])) {
            $product_name = $_POST['product'];
            $product_name = "\\App\\Models\\" . $product_name;
            $product = new $product_name();
            $product->setSKU();
            $product->setName();
            $product->setPrice();
            $product->setProductProperty();
            $product->save();
        }
    }


    public static function deleteProducts()
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
    public static function productHandler()
    {
        $request = new Request();

        if ($request->getMethod() == "GET") {

            ProductController::getProducts();
        } else if ($request->getMethod() == "POST" && isset($request->getBody()['product'])) {

            ProductController::storeProduct();
        } else if ($request->getMethod() == "POST" && isset($request->getBody()['delete'])) {


            ProductController::deleteProducts();
        }
    }
}
ProductController::productHandler();

// EOF