function setDeviceSelection(element, devicename){
	DEVICE.MechanicalTurk_DeviceSelected = devicename 
	var device_option_elements = document.querySelectorAll(".DeviceButton")
	for(var i = 0; i<device_option_elements.length; i++){
		device_option_elements[i].style['opacity'] = 0.5
		device_option_elements[i].style['border-color'] = '#ddd'
	}
	element.style['border-color'] = 'green'
	element.style['opacity'] = 1

	var continue_button = document.getElementById('CloseDeviceSelectionButton')
	continue_button.innerHTML = 'Continue'
	continue_button.disabled = false

}

function updateSessionTextbox(SubjectID, ExperimentName){
	  var sess_textbox = document.getElementById("SessionTextBox")

	  var line1_prefix = "<b>Subject:</b> "
	  var linebreak = "<br>"
	  var line2_prefix = "<b>Experiment:</b> "

	  sess_textbox.innerHTML = line1_prefix + SubjectID + linebreak + line2_prefix + ExperimentName
}

function writeToTrialCounterDisplay(s){
	var elem = document.getElementById('TrialCounter')
	elem.innerHTML = s; // text
}



function toggleElement(on_or_off, element_id){
		var elem = document.getElementById(element_id)
	if(on_or_off == 0){
		elem.style.visibility = 'hidden'
	}
	else if(on_or_off == 1){
		elem.style.visibility = 'visible'
	}
}

function updateProgressbar(pct, bar_id, text_prefix) {
	var max_bar_width = 30
    var elem = document.getElementById(bar_id); 

	elem.style.width = max_bar_width*pct/100+"%" // pct + '%'; 
	elem.innerHTML = text_prefix + ' ' + Math.round(pct) + '%'; // text
}

function toggleProgressbar(on_or_off, bar_id){
	var elem = document.getElementById(bar_id); 

	if(on_or_off == 0){
		elem.style.visibility = 'hidden'
	}
	else if(on_or_off == 1){
		elem.style.visibility = 'visible'
	}
}


function updateCashInButtonText(trials, bonus_earned, cash_in_option){
	var elem = document.querySelector("button[name=WorkerCashInButton]")

	if(cash_in_option == false){
		var button_string = 'Bonus: $'+bonus_earned.toFixed(3)
	}
	else if(cash_in_option == true){
		var button_string = 'Bonus: $'+bonus_earned.toFixed(3)+'<br>Turn in early'
	}
	elem.innerHTML = button_string

}	
function toggleCashInButtonClickability(on_or_off){
	var elem = document.querySelector("button[name=WorkerCashInButton]")
	if(on_or_off == 0){
		elem.disabled = true
		elem.style["background-color"] = "#DBDDDF"
		elem.style["color"] = "#767373"
	}
	else{
		elem.disabled = false
		elem.style["background-color"] = "#00cc66"
		elem.style["color"] = "#f7fcf8"


	}
	return
}

function displayTerminalScreen(){
	var terminal_text = 'Thank you for completing this HIT. Please wait while it is submitted...'
	document.getElementById('terminal_splash_screen').style.zIndex = 100
	document.getElementById('terminal_splash_screen').style.innerHTML = terminal_text

}


//================== LOAD STATUS DISPLAY ==================//



//================== CANVAS SETUP ==================//

function setupMouseTracker(){
	console.log('setupmousetracker')
	// https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
	document.onmousemove = handleMouseMove;
	function handleMouseMove(event){
		t = Math.round(performance.now())
		var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        // Use event.pageX / event.pageY her

        MOUSESTRING+=Math.round(event.pageX)
        MOUSESTRING+=','+Math.round(event.pageY)
        MOUSESTRING+=','+t+'\n'
        MOUSESTRING_UPDATE_COUNTER+=1

	}
}

function setupDragTracker(){

	window.addEventListener('touchmove', function(event){
		// the user touched the screen
		pageX = event.targetTouches[0].pageX
		pageY = event.targetTouches[0].pageY

		clientXdelta_from_pageX = event.targetTouches[0].clientX - pageX
		clientYdelta_from_pageY = event.targetTouches[0].clientY - pageY
		
		screenXdelta_from_pageX = Math.round(event.targetTouches[0].screenX - pageX)
		screenYdelta_from_pageY = Math.round(event.targetTouches[0].screenY - pageY)

		radiusX = Math.round(event.targetTouches[0].radiusX)
		radiusY = Math.round(event.targetTouches[0].radiusY)
		t = Math.round(performance.now())


		TOUCHSTRING+= Math.round(pageX)
		TOUCHSTRING+=','+Math.round(pageY)
		
		TOUCHSTRING+=','+clientXdelta_from_pageX
		TOUCHSTRING+=','+clientYdelta_from_pageY

		TOUCHSTRING+=','+screenXdelta_from_pageX
		TOUCHSTRING+=','+screenYdelta_from_pageX
		
		TOUCHSTRING+=','+radiusX
		TOUCHSTRING+=','+radiusY

		TOUCHSTRING+=','+TOUCHSTRING_UDPATECOUNTER
		TOUCHSTRING+=','+t
		TOUCHSTRING+=',d\n'

		TOUCHSTRING_UDPATECOUNTER+=1

		//console.log(TOUCHSTRING_UDPATECOUNTER)
		//console.log('drag', x, y, t)
	},  {passive: true})
}
//passive event handlers: 
//https://stackoverflow.com/questions/39152877/consider-marking-event-handler-as-passive-to-make-the-page-more-responsive
function setupTapTracker(){
	window.addEventListener('touchstart', function(event){

		pageX = event.targetTouches[0].pageX
		pageY = event.targetTouches[0].pageY

		clientXdelta_from_pageX = event.targetTouches[0].clientX - pageX
		clientYdelta_from_pageY = event.targetTouches[0].clientY - pageY
		
		screenXdelta_from_pageX = Math.round(event.targetTouches[0].screenX - pageX)
		screenYdelta_from_pageX = Math.round(event.targetTouches[0].screenY - pageY)

		radiusX = Math.round(event.targetTouches[0].radiusX)
		radiusY = Math.round(event.targetTouches[0].radiusY)
		t = Math.round(performance.now())


		TOUCHSTRING+= Math.round(pageX)
		TOUCHSTRING+=','+Math.round(pageY)
		
		TOUCHSTRING+=','+clientXdelta_from_pageX
		TOUCHSTRING+=','+clientYdelta_from_pageY

		TOUCHSTRING+=','+screenXdelta_from_pageX
		TOUCHSTRING+=','+screenYdelta_from_pageX
		
		TOUCHSTRING+=','+radiusX
		TOUCHSTRING+=','+radiusY

		TOUCHSTRING+=','+TOUCHSTRING_UDPATECOUNTER
		TOUCHSTRING+=','+t
		TOUCHSTRING+=',t\n'

		TOUCHSTRING_UDPATECOUNTER+=1
	},  {passive: true})
}









