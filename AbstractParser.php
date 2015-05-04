<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Abstract class AbstractParser{
    
    public $fileName;

    public $configs;

    public $logFileName;
    
    public $sortByOrder; // Sory by ASC /DSC
    
    
    public function __construct($iniFileName)
    {
        $this->configs = parse_ini_file($iniFileName,false);
        $this->fileName = $this->configs['fileName'];
        $this->logFileName = $this->configs['logFile'];
        $this->sortByOrder = $this->configs['sortBy'];  
    }
        
    protected function parseFile(){
        
    }
    
    abstract protected function getRow();
    
          
    
    
}
?>
