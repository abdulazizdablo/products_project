<?php


namespace App1\Models;

require_once "SPLAutoload.php";

use App1\Models\Product;


/**
 * this class reperesents Book product
 * 
 *
 * @author Abdulaziz Dablo
 * @package App
 * 
 */

class Book extends Product
{
 /**
     * Specific Property for Book weight
     * The weight of Book in KiloGrams
     *
     * @var int
     */


   public int $weight;

   public  function setProductProperty()
   {

      $weight = isset($_POST['weight']) && !empty($_POST['weight']) ? htmlspecialchars(stripslashes(trim(($_POST['weight'])))) : die();

      $this->weight = trim(htmlspecialchars(stripslashes($weight)));
      if (!preg_match("/\b(^[1-9][0-9]*$)\b/", $weight)) {

         $errors['weight'] = "Please provide indicated data";

         die(json_encode($errors));
      }
      return $this->weight;
   }
}

// EOF
