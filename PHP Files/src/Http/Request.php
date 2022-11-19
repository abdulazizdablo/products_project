<?php


namespace App\Http;

/**
 * 
 * This class is used for capturing requests
 *
 * @author Abdulaziz Dablo
 * @package App
 * 
 */


class Request
{
    private $method;
    private $uri;
    private $body;



    function __construct()
    {
        $this->setMethod();
        $this->setBody();
        $this->setURI();
    }
    public function setBody()
    {
        $this->body = $_POST;
    }
    public function getBody()
    {

        return $this->body;
    }


    public function setMethod()
    {


        $this->method = $_SERVER['REQUEST_METHOD'];
        if (!preg_match("/(PUT|POST|GET|DELETE)/", $this->method)) {

            throw new \InvalidArgumentException(`$this->method isn't a valid method`);
        }
    }


    public function getMethod()
    {

        return $this->method;
    }
    public function setURI()
    {

        $this->uri = $_SERVER['REQUEST_URI'];
    }

    public function getURI()
    {
        return $this->uri;
    }
    public function __clone()
    {
        return $this;
    }
}

// EOF
