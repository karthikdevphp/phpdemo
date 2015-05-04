/**
 * @since 1.0
 * @link $URL$
 * @author $Author$
 * @version $Revision$
 * @Last Modified$
 * 
 */
//js.js
//Reads csv using Ajax call and pass data back to index.php


$(document).ready(function() {
    
        
        
	//When page loads get the data from csv ordered by name    
	sortByColumn('name','ASC');

	$('#lastName').on('click', function() {
		toggleColumn(this.value,this.id);
	}); 

	$('#height').on( 'click',function() {
		toggleColumn(this.value,this.id);
	});

	$('#gender').on('click', function() {
		toggleColumn(this.value,this.id);
	});

	$('#dob').on( 'click',function() {
		toggleColumn(this.value,this.id);
	});
        
	$(function() {
            $("#tabs").tabs();
            $(".liTabs > a").attr('href'," ");
        });
        
        $("button" ).button({
            icons: {
                primary: "ui-icon-triangle-1-s",
                secondary: "ui-icon-triangle-2-s"
            }
        })
        
        
        
        function progressAnimation() {
      
            var progressbar = $( "#progressbar" ),
            progressLabel = $( ".progress-label" );

            progressbar.progressbar({
                value: false,
                change: function() {
                    progressLabel.text( progressbar.progressbar( "value" ) + "%" );
                },
                complete: function() {
                    progressLabel.text( "Complete!" );
                    $("#progressbar").hide();
                }
            
            });
 
            function progress() {

                    var val = progressbar.progressbar( "value" ) || 0;
                    progressbar.progressbar( "value", val + 2 );

                    if ( val < 99 ) {
                        setTimeout( progress, 2 );
                    }
                }
            setTimeout( progress,10);
        };
        
	/**
	 * toggleColumn
	 * @param val , value of the coulmn
	 * @param id , id of the column
	 * @param column , column name
	 * @returns sorted Order Object
	 */

	function toggleColumn(val,id) {
		var sortOrder = '';
		if( val == 'ASC') {
			sortOrder = 'ASC';
			$('#'+id).val('DSC');
		} else {
			sortOrder = 'DSC';
			$('#'+id).val('ASC');
		}
		sortByColumn(id,sortOrder );
	}
	
	/**
	 * sortByColumn
	 * @param Column
	 * @param sortOrder 
	 * @returns sorted Object and sends back to index.php
	 */

	function sortByColumn(column,sortOrder) {

		$.ajax({
                        type: "POST",
			url: 'request.php',
			dataType: 'json',
			async: false,
			data: { 'sortByColumn' : column,'sortOrder' :sortOrder },
			beforeSend: progressAnimation,
			success: onSuccess,
			error: errorHandler,
			complete: function( xhdr, textStatus ) {
				console.log("ajax call success"+textStatus );
			}
		});
	}
        
        /**
	 * onSuccess sets the data in the innerhtml of table
	 * @param data
	 * @param textStatus
	 * @returns none
	 */
        function onSuccess(data,textStatus)
        {
            if( data.status == "OK" )
            {
                console.log( "Status OK ");
	        var personRecord='';
                //Check for data and then proceed
		
                if( data.people != null) {
                   
                    var it=1;
                    $.each( data.people, function(key,person) {
                            //console.log(key);
                            personRecord +='<div class="Row">';
                            personRecord +='<div class="Cell">'+person['name']+'</div>';
                            personRecord +='<div class="Cell">'+person['height']+'</div>';
                            personRecord +='<div class="Cell">'+person['gender']+'</div>';
                            personRecord +='<div class="Cell">'+person['dobDisplay']+'</div>';
                            personRecord +='</div>';						
                            it++;
                    });
	          } 
                  else {
                        personRecord += '<div class="Row">No Data found</div>';		
                  }
                  $('.Table').html(personRecord);
                  $('#tabs').css("display",'block');
	     } 
             else {
                    console.log( "Error occured! " + data  );
             }                 
        }
	
	/**
	 * errorHandler
	 * @param xhdr
	 * @param textStatus 
	 * @param errorThrown
	 * @returns alert user if any Ajax errors
	 */
	function errorHandler( xhdr, textStatus, errorThrown )
	{
                
		switch( errorThrown ) {
		case "timeout":
			alert( "Timeout connecting to the server. Please try again." );
                        console.log( "Error occured timeout"  );
			break;
		case "error":
			alert( "General error: "+errorThrown );
                        console.log( "Error occured! error"+errorThrown);
			break;
		case "abort":
			alert( "The action was aborted. Please try again." );
                        console.log( "Error occured! abort"  );
			break;
		case "parsererror":
			alert( "Parser error. Please try again." );
                        console.log( "Error occured! parsererror ");
			break;
		}
	}

});




