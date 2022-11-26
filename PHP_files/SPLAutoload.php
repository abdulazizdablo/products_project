<?php

namespace App1;

/**
 * This class is responsible for autloading classes with Autoload method
 * it takes a parameter class name as a string and checks for php files
 * with the same string and convert the path to a proper path file as a result it 
 * adds the php files when they are needed
 * 
 * PS: i use auto_prepend_file in .htaccess file to automaticly inject this file
 * to the rest ones 
 * 
 *
 * @author Abdulaziz Dablo
 * @package App
 * 
 */
class SPLAutoload
{

    public static function Autoload()
    {

        spl_autoload_register(function ($class_name) {
            $basedir = __DIR__ . '/src';

            $class_name = str_replace(__NAMESPACE__, "", $class_name);
            $file_name = $basedir . DIRECTORY_SEPARATOR . $class_name . '.php';
            $file_name = str_replace("\\", "/", $file_name);

            if (file_exists($file_name)) {
                require_once($file_name);
            } else {
                echo "file not found";
            }
        });
    }
}
SPLAutoload::Autoload();

// EOF