window.onload = function(){
	var trackList = new Array();	//size not known yet
	
	trackList[0] = "Belvedere.mp3";
	trackList[1] = "Blue Wednesday.mp3"
	trackList[2] = "Favorite Drive.mp3"
	trackList[3] = "Fly Like Birds.mp3"
	trackList[4] = "Grizzly Peak.mp3"
	trackList[5] = "kensington.mp3"
	trackList[6] = "middle school.mp3"
	trackList[7] = "Run away.mp3"
	trackList[8] = "Soulful.mp3"
	trackList[9] = "SUmmer Daze(Dukesouls Mellow Touch).mp3";
	
	var currentTrack = 0;	//@start of array
	var trackSrc = document.getElementById("trackSource");
	
	//assign a track from track list to track src
	trackSrc.src = trackList[0];
	
	//play functionality
	var nextTrack = document.getElementById("next");
	var prevTrack = document.getElementById("prev");
	var stopMusic = document.getElementById("stop");
	var loopMusic = document.getElementById("loop");
	var shuffleMusic = document.getElementById("shufl");
	
	//add event listeners
	nextTrack.addEventListener("click", next()));
	prev.addEventListener("click", previous());
	stopMusic.addEventListener("click", stop());
	loopMusic.addEventListener("click", loop());
	shuffleMusic.addEventListener("click", shuffle());
	
	//event functions
	function next(){
		//add outOfBound check later
		currentTrack++;
		trackSrc.src = trackList[currentTrack];
		
	}
	
	function previous(){
		//add outOfBound check later
		currentTrack--;
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