<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of person
 *
 * @author karthikdev
 * @name Person Class
 * @desc Prepares Person data
 */
class Person
{

    public $name;

    public $height;

    public $dob;

    public $gender;

    public $person;

    public $record;

    public function __construct()
    {}

    /**
     * @name getPersonData
     * @desc prepares Individual Person data
     * @return array
     */
    public function getPerson()
    {
        $this->name = trim($this->person['0']);
        $this->lastName = $this->getLastName();
        $this->height = $this->person['1'];
        $this->gender = $this->person['2'];
        
        $this->dob = strtotime($this->person['3']); // convert to unixtime stamp
        $this->dobDisplay = date('d-m-Y', $this->dob); // Disaply d-m-Y format date
        
        $this->record = array(
            'name' => $this->name,
            'lastName' => $this->lastName,
            'height' => $this->height,
            'gender' => $this->gender,
            'dob' => $this->dob,
            'dobDisplay' => $this->dobDisplay
        )
        ;
        
        return $this->record;
    }
    
    /**
     * @name getLastName
     * @desc extract last name if it exists
     * @return lastName
     */
    public function getLastName()
    {
        $nameSplit = explode(" ", $this->name);
        
        if (count($nameSplit) > 1) {
            $lastName = array_pop($nameSplit);
        } else {
            $lastName = '';
        }
        
        return $lastName;
    }
}
?>
