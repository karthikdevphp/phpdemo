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

	var sortByOrder = '';
	
	//When page loads get the data from csv ordered by name    
	sortBy('lastName','ASC');

	$('#orderByName').on('click', function() {
		sortByHelper (this.value,this.id,'lastName');
	}); 

	$('#orderByHeight').on( 'click',function() {
		sortByHelper (this.value,this.id,'height');
	});

	$('#orderByGender').on('click', function() {
		sortByHelper (this.value,this.id,'gender');
	});

	$('#orderByDOB').on( 'click',function() {
		sortByHelper (this.value,this.id,'dob');
	});
        
	$(function() {
            $("#tabs").tabs();
            $("#tabs-1").css('display','block');
            $("#tabs-2").css('display','block');
            $("#tabs-3").css('display','block');
            $("#tabs-4").css('display','block');

        });
        
        $("button" ).button({
            icons: {
                primary: "ui-icon-triangle-1-s"
            }
        })
        
        
        
        $(function() {
            $("tabs").fadeOut();
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
                setTimeout( progress, 80 );
            }
            }

            setTimeout( progress, 2000 );
             $("tabs").fadeIn();
        });
        
	/**
	 * sortByHelper
	 * @param val , value of the coulmn
	 * @param id , id of the column
	 * @param column , column name
	 * @returns sorted Order Object
	 */

	function sortByHelper (val,id,column) {
                $('#tabs').css('z-index',0);
                $('#tabs').hide();
                $('#progressbar').css('z-index',100000);
 
		var sortByOrder = '';
		if( val == 'ASC') {
			sortByOrder = 'ASC';
			$('#'+id).val('DSC');
		} else {
			sortByOrder = 'DSC';
			$('#'+id).val('ASC');
		}
		$('#displayOrder').text(column + '(' + sortByOrder + ')');
		sortBy(column, sortByOrder );

	}
	
	/**
	 * sortBy
	 * @param sortByColumn
	 * @param sortByOrder 
	 * @returns sorted Object and sends back to index.php
	 */

	function sortBy (sortByColumn,sortByOrder) {

		$.ajax({
			url: 'request.php',
			dataType: 'json',
			async: false,
			data: { 'sortByColumn' : sortByColumn,'sortByOrder' :sortByOrder },
			beforeSend: function() {
                            
				//$('#datBind').html('<tr><td colspan="5" class="noData"><img src="images/ajax-loader.gif" alt="Loading..." /></td><tr>                    
                
                        }
                                /*$(function() {
                                        var progressbar = $( "#progressbar" ),
                                        progressLabel = $( ".progress-label" );
                                        $("#progressbar").css('z-index','1000000');

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
                                            setTimeout( progress, 80 );
                                        }
                                        }

                                setTimeout( progress, 2000 );
                            })*/,
			success: function( data, textStatus ) {
                                 //$('#tabs').css('z-index',2);
                                //$('#progressbar').css('z-index',0);
				if( data.status == "OK" ) {
					console.log( "Status OK ");
					var line='';

					//Check for data and then proceed
					if( data.people != null) {
						var tempData = [];
						var i=1;
						$.each( data.people, function(  key,item ) {
							//console.log(key);
                                                        line +='<div class="Row">';
							line +='<div class="Cell">'+i+'</div>';
							line +='<div class="Cell">'+item['name']+'</div>';
							line +='<div class="Cell">'+item['height']+'</div>';
							line +='<div class="Cell">'+item['gender']+'</div>';
							line +='<div class="Cell">'+item['dobDisplay']+'</div>';
							line +='</div>';						
							i++;

						});
					} else {
						line += '<tr><td colspan="5" class="noData">No Data found</td></tr>';
					}
					$('.Table').html(line);
                                        $('#tabs').css("display",'block');

				} else {
					console.log( "Error occured! " + data  );
				}

			},
			error: HandleAJAXError(),
			fail: function( xhdr, textStatus, errorThrown ) {
				console.log(textStatus + errorThrown );
			},
			complete: function( xhdr, textStatus ) {
				console.log(  textStatus );
			}
		});
	}
        
        function onSuccess()
        {
            
        }
	
	/**
	 * HandleAJAXError
	 * @param xhdr
	 * @param textStatus 
	 * @param errorThrown
	 * @returns alert user if any Ajax errors
	 */
	function HandleAJAXError( xhdr, textStatus, errorThrown )
	{
		// this gets called for any ajax event??
		switch( errorThrown ) {
		case "timeout":
			alert( "Timeout connecting to the nlyte server. Please try again." );
			break;
		case "error":
			alert( "General error: "+errorThrown );
			break;

		case "abort":
			alert( "The action was aborted. Please try again." );
			break;

		case "parsererror":
			alert( "Parser error. Please try again." );
			break;
		}
	}


});



