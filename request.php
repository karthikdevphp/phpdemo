<?php

require_once('AbstractParser.php');
require_once('person.php');
require_once('people.php');

$people = new People(); 
$person = new Person(); 
$csvFileData = $people->parseFile(); // Read csv

// Tabe sory by column, by default by set by name
if (isset($_POST['sortByColumn'])) {
    $people->sortByColumn = $_POST['sortByColumn'];
} else {
    $people->sortByColumn = 'name'; 
}

//Sort order ASC/DSC , by default set by ASC
if (isset($_POST['sortOrder'])) {
    $people->sortByOrder = $_POST['sortOrder'];
} else {
    $people->sortByOrder = 'ASC'; 
}

//Assuming "Create a person for each record" is Mandatory
foreach ($csvFileData as $record) {
    $person->person = $record;
    $people->people[] = $person->getPerson();
}

$people->getPeople();

// Parse CSV
// Create a person for each record
// associate it to the higher class People
// return data back to index.php
?>