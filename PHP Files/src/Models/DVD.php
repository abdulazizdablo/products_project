<?php

namespace App\Models;


use App\Models\Product;


/**
 * this class reperesents DVD-Disc product
 * 
 *
 * @author Abdulaziz Dablo
 * @package App
 * 
 */

class DVD extends Product
{
    /**
     * Specific Property for DVD 
     * The size of DVD-Disc in MegaBytes
     *
     * @var int
     */
   public int $size;

   public function setProductProperty()
   {
      $this->size = isset($_POST['size']) && !empty($_POST['size']) ?
         htmlspecialchars((stripslashes(trim($_POST['size'])))) :
         die();

      if (!preg_match("/\b(^[1-9][0-9]*$)\b/", $this->size)) {

         $errors['size'] = "Please provide indicated data";
         die(json_encode($errors));
      }
      return $this->size;
   }
}

// EOF
