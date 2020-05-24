window.onload = function(){ 
	
 	var trackList = new Array();	//size not known yet
	var listTrackNumbers = document.getElementsByClassName("listTrackNumber");
 	var listTrackNames = document.getElementsByClassName("listTrackName");
	var listArtistNames = document.getElementsByClassName("listArtistName");
	/*var listDuration = document.getElementByClassName("listDuration"); */
	
	listTrackNumbers[7].innerHTML = 100;
	listTrackNames[5].innerHTML = "ZILEON";
	
	trackList[0] = "Belvedere.mp3";
	trackList[1] = "Blue Wednesday.mp3";
	trackList[2] = "Favorite Drive.mp3";
	trackList[3] = "Fly Like Birds.mp3";
	trackList[4] = "Grizzly Peak.mp3";
	trackList[5] = "kensington.mp3";
	trackList[6] = "middle school.mp3";
	trackList[7] = "Run away.mp3";
	trackList[8] = "Soulful.mp3";
	trackList[9] = "Summer Daze (Dukesouls Mellow Touch).mp3";

	//mp3 file metadata...
	/*var meta_tracktitle = "-";
	var meta_artistName = "Unknown Artist";
	var meta_duration = 0;*/ //must be a Date Object
	
	//assign playlist items to corresponding metadata
	//track names
	for(let i = 0; i < trackList.length; i ++){
		listTrackNames[i].innerHTML = trackList[i]; //update once metadta is obtained
	}

	listTrackNames[2].innerHTML = trackList[2];

	var currentTrack = 0;	// @start of array
	var trackSrc = document.getElementById("currentAudio");
	
	//assign a track from track list to track src
	trackSrc.src = trackList[currentTrack];
	
	//play functionality
	var nextTrack = document.getElementById("next");
	var prevTrack = document.getElementById("prev");
	var stopMusic = document.getElementById("stop");
	var loopMusic = document.getElementById("loop");
	var shuffleMusic = document.getElementById("shufl");
	/*var isLoop = true; *///loop if true
	

	
	//add event listeners
	nextTrack.addEventListener("click", next);
	prev.addEventListener("click", previous);
	stopMusic.addEventListener("click", stop);
	loopMusic.addEventListener("click", loop);
	shuffleMusic.addEventListener("click", shuffle);
	
	//event functions
	function next(){
		//add outOfBound check later
		if(currentTrack <= (trackList.length+1)){
			currentTrack++;
		}
		trackSrc.src = trackList[currentTrack];
		
	}
	
	function previous(){
		//add outOfBound check later
		if(currentTrack >0){
			currentTrack--;
		}
		
		trackSrc.src = trackList[currentTrack];
		
	}
	
	function stop(){
		
	}
	
	function loop(){
		
	}
	
	function shuffle(){
		
	}
	//event functions: end
 
	

};