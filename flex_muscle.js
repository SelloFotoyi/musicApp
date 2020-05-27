window.onload = function(){ 
	
 	var trackList = new Array(10);	//size not known yet
	var listTrackNumbers = document.getElementsByClassName("listTrackNumber");
 	var listTrackNames = document.getElementsByClassName("listTrackName");
	var listArtistNames = document.getElementsByClassName("listArtistName");
	/*var listDuration = document.getElementByClassName("listDuration"); */
	
/*	listTrackNumbers[7].innerHTML = 100;*/
	

	
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
		listTrackNumbers[i].innerHTML = i+1;
		listTrackNames[i].innerHTML = trackList[i]; //update once metadta is obtained
	}

	listTrackNames[2].innerHTML = trackList[2];

	var currentTrack = 0;	// @start of array
	var trackSrc = document.getElementById("currentAudio");
	
	//assign a track from track list to track src
	trackSrc.src = trackList[currentTrack];
	
	//highlight currently playing track on playlist
	var playlistRow = document.getElementsByClassName("trackDetail");
	playlistRow[currentTrack+1].style.border= "1px solid red";
	playlistRow[currentTrack+1].style.fontWeight = "bold";
	
	
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
		if(currentTrack <listTrackNumbers.length){
			currentTrack++;
			trackSrc.src = trackList[currentTrack];
			listTrackNumbers[0].innerHTML = currentTrack+1;
			highLight();
/* 			playlistRow[currentTrack].style.border= "1px solid red";
			playlistRow[currentTrack-1].style.border= "0px solid transparent"; */
		}
		else {
			currentTrack = 0;//(listTrackNumbers.size-1);
			trackSrc.src = trackList[currentTrack];
			listTrackNumbers[0].innerHTML = currentTrack+1;
			
		}
		
		
		
		
	}
	
	function previous(){
		//add outOfBound check later
		if(currentTrack =>1){
			currentTrack--;	
			trackSrc.src = trackList[currentTrack];
			listTrackNumbers[0].innerHTML = currentTrack+1;
			highLight(currentTrack);
/* 			playlistRow[currentTrack].style.border= "1px solid red";
			playlistRow[currentTrack+1].style.border=
				"0px solid transparent"; */
		}
		else {
			
			currentTrack = 0;
			trackSrc.src = trackList[currentTrack];
			listTrackNumbers[0].innerHTML = currentTrack+1;
		}
		
		
	}
	
	function stop(){
		
	}
	
	function loop(){
		
	}
	
	function shuffle(){
		
	}
	//event functions: end
	function highLight(){
	 	for(let row of playlistRow){
			row.style.border="0px";
			row.style.fontWeight="normal"
		}
		playlistRow[currentTrack+1].style.border = "1px solid red";
		playlistRow[currentTrack+1].style.fontWeight = "bold";
		/*
		for(let i = 0; i < playlistRow.size; i++){
			if(i == current_track){
				playlistRow[current_track].style.border = "1px solid red";
				playlistRow[current_track].style.fontWeight = "bold";
			}
			else{
				playlistRow[i].style.border = "0px";
				playlistRow[i].style.fontWeight = "normal";
			}
		}*/
	}
 
	

};