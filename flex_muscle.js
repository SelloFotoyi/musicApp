window.onload = function(){ 
	
 	var trackList = new Array(10);	//size not known yet
	var listTrackNumbers = document.getElementsByClassName("listTrackNumber");
 	var listTrackNames = document.getElementsByClassName("listTrackName");
	var listArtistNames = document.getElementsByClassName("listArtistName");
	var trackMarker = document.getElementsByClassName("mark"); 

		
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
	


	
	//assign playlist items to corresponding metadata
	//track names
	for(let i = 0; i < trackList.length; i ++){
		listTrackNumbers[i].innerHTML = i+1;
		listTrackNames[i].innerHTML = trackList[i]; //update once metadta is obtained
	}



	var tracksIndex = 0;	// @start of array
	var currentTrack = tracksIndex+1; //for user
	var trackSrc = document.getElementById("currentAudio");
	
	//assign a track from track list to track src
	trackSrc.src = trackList[tracksIndex];
	
	//highlight currently playing track on playlist
	var playlistRow = document.getElementsByClassName("trackDetail");
	playlistRow[tracksIndex].style.fontWeight = "bold";
	
	
	//play functionality
	var nextTrack = document.getElementById("next");
	var prevTrack = document.getElementById("prev");
	var stopMusic = document.getElementById("stop");
	var loopMusic = document.getElementById("loop");
	var shuffleMusic = document.getElementById("shufl");
	var isLoop = true;
	var playAllSongs = document.getElementById("playAll");
	

	
	//add event listeners
	nextTrack.addEventListener("click", next);
	prev.addEventListener("click", previous);
	stopMusic.addEventListener("click", stop);
	loopMusic.addEventListener("click", loop);
	shuffleMusic.addEventListener("click", shuffle);
	trackSrc.addEventListener("ended", next);
	playAllSongs.addEventListener("click", playAll);
	
	
	//event functions
	function next(){
		if(currentTrack > listTrackNumbers.length){
			stop();
			if(!isLoop){
				return;
			}
			
		}
		//add outOfBound check later
		if(tracksIndex <listTrackNumbers.length-1){
			
			tracksIndex++;
			trackSrc.src = trackList[tracksIndex];
			
			highLight();
			
			currentTrack++;
			
		}
		else {
			tracksIndex = 0;//(listTrackNumbers.size-1);
			trackSrc.src = trackList[tracksIndex];
			highLight();
			
		}
		
		
		
		
	}
	
	function previous(){
		if(currentTrack == 1){
			stop();
			return;
		}
/* 		if(tracksIndex<1){
				prevTrack.removeEventListener();
				return;
			} */
		//add outOfBound check later
		if(tracksIndex >1){
			tracksIndex--;
			currentTrack--;
			trackSrc.src = trackList[tracksIndex];
			highLight();
			
		}
		else {
			tracksIndex = 0;
			currentTrack = tracksIndex+1;;
			trackSrc.src = trackList[tracksIndex];
			highLight();
		}
		
		
	}
	
	function stop(){
		tracksIndex = 0;
		currentTrack = tracksIndex+1;
		trackSrc.src = trackList[tracksIndex];
		trackSrc.pause();
		highLight();
		
		
	}
	
	function loop(){
		isLoop = !isLoop;
		
	}
	
	function shuffle(){
		
	}
	//event functions: end
	function highLight(){
	 	for(let row of playlistRow){
			row.style.border="0px";
			row.style.fontWeight="normal";
		}
		
		playlistRow[tracksIndex].style.border = "1px solid grey";
		playlistRow[tracksIndex].style.fontWeight = "bold";
		

	}
	
	function playAll(){
		tracksIndex = 0;
		currentTrack = tracksIndex+1;
		trackSrc.src = trackList[tracksIndex];
		highLight();
	}
	
	
	
 
	

};