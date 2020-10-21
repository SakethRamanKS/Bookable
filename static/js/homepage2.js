const fadeTime = 500; //set it to the required value

var box1Visible = false;
var box2Visible = false;
var box3Visible = false;

$(document).ready(function(){
	setTimeout(fadefx, 1000);

	$(window).scroll(function(){

		if(box1Visible)
		{

			if(!box2Visible)
			{
		        if ($('#row2').isOnScreen()) {
		            // The element is visible, do something
		            $('#row2').fadeIn(1500);
		            box2Visible = true;
		        } 
	    	}

	    	if(!box3Visible)
	    	{
		        if ($('#row3').isOnScreen()) {
		            // The element is visible, do something
		            //alert("3 in viewport!");
		            $('#row3').fadeIn(1500);
		            box3Visible = true;
		        } 
		    }

		}

    });

});

function fadefx()
{
	$("#easy").fadeIn(fadeTime, function () {
		$("#simple").fadeIn(fadeTime, function() {
			$("#effortless").fadeIn(fadeTime, function()
				{
					$("#row1").fadeIn(fadeTime);
					box1Visible = true;
				});
		});
	});
}

$.fn.isOnScreen = function(){ //function to check if an element is in the screen or not	

    var win = $(window);

    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};