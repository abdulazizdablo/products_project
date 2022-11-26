<?php

namespace App1;



require_once "SPLAutoload.php";
use App1\Http\ProductController;

/**
 * this class responsible for instantiate the controller and proper method
 * using the server url
 * 
 *
 * @author Abdulaziz Dablo
 * @package App
 * 
 */



class App
{

    protected $controller = 'ProductController';

    protected $method = 'index';



    public function __construct()
    {
        $url  = $this->parseUrl();

        if (file_exists('src/Http/' . $url[3] . '.php')) {
            $this->controller = "\\App1\\Http\\".$url[3];
           
        }


        $this->controller = new $this->controller;

        if (isset($url[4])) {
            if (method_exists($this->controller, $url[4])) {
                $this->method = $url[4];
               
            }
        }

        $current_method = $this->method;
        $current_controller = $this->controller;
        $current_controller->$current_method();

    }

    public function parseUrl()
    {   
        if (isset($_SERVER['REQUEST_URI'])) {
            return $url = explode('/', filter_var(rtrim($_SERVER['REQUEST_URI'], '/'), FILTER_SANITIZE_URL));
        }
    }
}
