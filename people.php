<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of people
 *
 * @author karthikdev
 */
class People extends AbstractParser
{

    public $row;

    public $rowData;

    public $csvFileData;

    public $people;

    public $returnData;

    public $sortByColumn; // Sory by Last name / age etc...

    public $status; // OK / ERR

    public $message; // Data found or not?
    
    public $file;
   

    /**
     * @desc Read config setting from project.ini
     */
    function __construct()
    {
        parent::__construct('application.ini');
        
    }

    /**
     * 
     * @name readCSV
     * @desc Reads csv
     * @param csv data
     * @return array
     */
    public function parseFile() {
        $this->file = fopen($this->fileName, "r");
        return $this->parseCSV();
        
    }
    
    public function parseCSV()
    {   
        if ($this->file and is_readable($this->fileName)) {
            $this->getRow();            
        } else {
            $this->errorLog("could not open the csv file or csv file is not readbale ");
            $this->csvFileData = array(); // return empty array
        }
        
        fclose($this->file); // close file
        
        return $this->csvFileData;
    }
    
    public function getRow()
    {
        $this->errorLog("CSV is readble so extracting data... ");
            while (!feof($this->file)) {
                $this->row = fgets($this->file);
                $this->rowData = explode(",", trim($this->row));
                $this->csvFileData[] = $this->rowData;
            }
    }
   
    /**
     * @name getPeoplData
     * @desc send back People data in array format including status, Message
     * @return array 
     */
    public function getPeople()
    {   
        if (count($this->people) > 0) {
            $this->errorLog("csv data found");
            $this->status = 'OK';
            $this->message = 'Data found';       
            $this->sortPeople();
        } else {
            $this->errorLog("file has no data");
            $status = 'ERR';
            $message = 'Data not found';
            $this->people = array(); // send empty array , means no data found
        }
        
        $this->returnData = array(
            "status" => $this->status,
            "message" => $this->message,
            "people" => $this->people
        );
        
        echo json_encode($this->returnData);
    }
    
    /**
     * @name sortPeople
     * @desc send back sorted People data in array format
     * @return array 
     */
    public function sortPeople()
    {
        $height = array();
        $gender = array();
        $lastName = array();
        $dob = array();
        $name = array();
        
        foreach ($this->people as $key => $row) {
                $height[$key]  = $row['height'];
                $gender[$key] = $row['gender'];
                $lastName[$key] = $row['lastName'];
                $dob[$key] = $row['dob'];
                $name[$key] = $row['name'];
         }
            
        if($this->sortByOrder === 'ASC')
            $flag = SORT_ASC; 
        elseif($this->sortByOrder === 'DSC')
            $flag = SORT_DESC;
            
        switch($this->sortByColumn)
        {
            case 'height':
                array_multisort($height,$flag,$this->people);
                break;
            case 'gender':
                array_multisort($gender,$flag,$this->people);
                break;
            case 'lastName':
                array_multisort($lastName,$flag,$this->people);
                break;
            case 'dob':
                array_multisort($dob,$flag,$this->people);
                break;
            default :
                array_multisort($name,$flag,$this->people);
        }
    }

    /**
     * @name errorLog
     * @desc Log all server side meesages
     * 
     */
    function errorLog($msg)
    {
        $log = fopen($this->errorLog,"a+");
        
        if ($log) {
            
            $date = date("Y-m-d H:i:s");
            
            if (is_string($msg)) {
                fprintf($log, "%s [%s]: %s \n",$date,$_SERVER['SERVER_ADDR'],$msg);
            } else {
                fputs($log);
            }
            fclose($log);
        }
    }
    
    function __destruct()
    {
        
    }
}

?>
