<?php

namespace App1\src\Models;

require_once "SPLAutoload.php";

use App1\Models\Product;

/**
 * this class reperesents Furniture product
 * 
 *
 * @author Abdulaziz Dablo
 * @package App
 * 
 */

class Furniture extends Product
{


  /**
   * Specific Compound Property for Furniture 
   * The dimensions of Furniture in CentiMeter
   * consist of Length, Height and Width
   * spereated with "X" in string
   *
   * @var string
   */



  public string  $dimensions;

  public function  setProductProperty()
  {
    $length = isset($_POST['length']) && !empty($_POST['length'])  ?
      htmlspecialchars(stripslashes(trim(($_POST['length'])))) :
      die();

    $height = isset($_POST['height']) && !empty($_POST['height'])  ?
      htmlspecialchars(stripslashes(trim(($_POST['height'])))) :
      die();

    $width = isset($_POST['width']) && !empty($_POST['width'])  ?
      htmlspecialchars(stripslashes(trim(($_POST['width'])))) :
      die();

    $this->dimensions = implode('x', array(0 => $height, 1 => $width, 2 => $length));

    if (!preg_match("/\b(^[1-9][0-9]*(x)[0-9]+(x)[0-9]+$)\b/", $this->dimensions)) {

      $errors['dimensions'] = "Please provide indicated data";
      die(json_encode($errors));
    }

    return $this->dimensions;
  }
}

// EOF
