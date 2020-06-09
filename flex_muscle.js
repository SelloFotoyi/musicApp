window.onload = function(){ 
	

 	
	
	var additions = 0;
	
	//playlist variables
	var playListArr = new Array();
	var playList = document.getElementById("playList");
	
	

/*	
	var listTrackNumbers = document.getElementsByClassName("listTrackNumber");
 	var listTrackNames = document.getElementsByClassName("listTrackName");
	var listArtistNames = document.getElementsByClassName("listArtistName");
	var listAlbums = document.getElementsByClassName("listAlbum"); 
	var songDeleters = document.getElementsByClassName("listTrackDelete");
	
	var playlistRow = document.getElementsByClassName("trackDetail");
	*/
	
	var songAddTracker = 0;
	var tracksIndex = 0;	// @start of array
	var currentTrack = tracksIndex+1;
	var defaultArtist = "Unknown Artist";
	var defaultAlbum = "Uknown Album";
	
	//******************song add ***********************
	const inputElem = document.getElementById("songAddInput");
	inputElem.addEventListener("change",handleFiles,false);
	
	
	
	
	function handleFiles(){
	
		let songCount = 0;
		const fileList = this.files;
		additions = fileList.length;
		
//		playListArr[songAddTracker] = fileList[0];
//		songAddTracker++;

		for(let i = 0; i < fileList.length; i++){
			playListArr[songAddTracker+i] = fileList[i];
			
		}
		songAddTracker+=fileList.length;
		
		while(songCount < fileList.length){
			appendSong(fileList, songCount);
			songCount++;
		}
		
		
		
		
			
	}
	//*******************end of song add***********************
	
	
	//*******************display playList *********************
	
	function appendSong(fileList, songCount){
		
	//	document.getElementById("chartHeading").innerHTML = "in here";

		var trackNumber = document.createElement("div");
		trackNumber.innerHTML = songCount+1;
		var trackName = document.createElement("div");
		trackName.innerHTML = fileList[songCount].name;
		var artistName = document.createElement("div");
		artistName.style.textAlign = "center";
		artistName.innerHTML = defaultArtist;
		artistName.style.color = "black";
		var albumName = document.createElement("div");
		albumName.innerHTML = defaultAlbum;
		var deleter = document.createElement("div");
		deleter.innerHTML = "delete";
	
		var trackDetail = document.createElement("div");
		trackDetail.style.height = "40px";
		trackDetail.style.paddingLeft = "20px";
		trackDetail.style.paddingRight = "20px";
		trackDetail.style.border = "2px solid transparent";
		trackDetail.style.display = "flex";
		trackDetail.style.justifyContent = "space-between";
		

		trackDetail.appendChild(trackNumber);
		trackDetail.appendChild(trackName);
		trackDetail.appendChild(artistName);
		trackDetail.appendChild(albumName);
		trackDetail.appendChild(deleter);
	
		
		var trackDetailNodes = trackDetail.childNodes;
		
		for(let node of trackDetailNodes){
			node.style.flexBasis = "300px";
			node.style.alignSelf = "center";
			node.style.textAlign = "center";
		}
		trackDetailNodes[0].style.flexBasis = "25px";
			
		if(playListArr.length%2 == 0){
			trackDetail.style.backgroundColor = "LightGrey";
		}
		else if (playListArr.length %2 != 0){
			trackDetail.style.backgroundColor = "white";
		}
	
		playList.appendChild(trackDetail);
		
		var player = playList.childNodes;
		
	
		
	//	player[3].style.backgroundColor = "red";
	
/*		for(let i = 3; i < player.length; i++){
			if (i%2 == 0){
				player[i].style.backgroundColor = "red";
			}
			else if (i%2 != 0){
				player[i].style.backgroundColor = "cyan";
			}
			
		} */
	
		
	
	}
	
	

	
	var settingsForm = document.getElementById("settingsForm");
	
	 //for user
	var trackSrc = document.getElementById("currentAudio");
	
	//highlight currently playing track on playlist
	
	//playlistRow[tracksIndex].style.fontWeight = "bold";
	
	
	//play functionality
	var nextTrack = document.getElementById("next");
	var prevTrack = document.getElementById("prev");
	var stopMusic = document.getElementById("stop");
	var loopMusic = document.getElementById("loop");
	var shuffleMusic = document.getElementById("shufl");
	var isLoop = true;
	var isShuffle = false;
	var playAllSongs = document.getElementById("playAll");
	

	
	//add event listeners
	nextTrack.addEventListener("click", next);
	prev.addEventListener("click", previous);
	stopMusic.addEventListener("click", stop);
	loopMusic.addEventListener("click", loop);
	shuffleMusic.addEventListener("click", shuffle);
	trackSrc.addEventListener("ended", next);
	playAllSongs.addEventListener("click", playAll);
	
	document.getElementById("saveButton")
		.addEventListener("click",settings);
	document.getElementById("cancelButton")
		.addEventListener("click",closeSettings);
 	document.getElementById("settingsIcon")
		.addEventListener("click", openSettings);
	

	
	//event functions
	function next(){
		
		if (isShuffle){
			tracksIndex = Math.floor(Math.random()*playListArr.length);
			uploadSong();
			return;
		}
		
		if(tracksIndex >= playListArr.length-1){
			stop();
			if(!isLoop){
				stop();
				return;
			}
			uploadSong();
			return;
		}
		//add outOfBound check later
		if(tracksIndex < playListArr.length-1){

			tracksIndex++;
		//	trackSrc.src = trackList[tracksIndex];
			uploadSong();
			
		//	highLight();
			
			currentTrack++;
			
		}
/* 		else {
			tracksIndex = 0;//(listTrackNumbers.size-1);
		//	trackSrc.src = trackList[tracksIndex];
			uploadSong();
		//	highLight();
			
		} */
		
		
		document.getElementById("currentTitle").innerHTML = tracksIndex;
		
	}
	
	function previous(){
		
		if (isShuffle){
			tracksIndex = Math.floor(Math.random()*playListArr.length);
			uploadSong();
			return;
		}
		
		if(currentTrack == 1){
			stop();
			return;
		}

		//add outOfBound check later
		if(tracksIndex >1){
			tracksIndex--;
			currentTrack--;
	//		trackSrc.src = trackList[tracksIndex];
			uploadSong();
	//		highLight();
			
		}
		else {
			tracksIndex = 0;
			currentTrack = tracksIndex+1;;
	//		trackSrc.src = trackList[tracksIndex];
			uploadSong();
	//		highLight();
		}
		
		
	}
	
	function stop(){
		tracksIndex = 0;
		currentTrack = tracksIndex+1;
	
	//	uploadSong();
	//	trackSrc.pause();
	//	trackSrc.currentTime = 0.0;
	//	highLight();
		trackSrc.src = "";
		
		
	}
	
	function loop(){
		isLoop = !isLoop;
		
		if(isLoop == true)
		{
			var loopOn = document.createElement("img");
			loopOn.src = "icons/loop_on_2.png";
			loopOn.style.width = "30px"; 
			loopOn.style.height = "30px";
			loopMusic.replaceChild(loopOn,loopMusic.firstChild);
		}
		else if (isLoop == false){
			var loopOff = document.createElement("img");
			loopOff.src = "icons/loop_off_2.png";
			loopOff.style.width = "30px"; 
			loopOff.style.height = "30px";
			loopMusic.replaceChild(loopOff,loopMusic.firstChild);			
		}
			
		
	}
	
	function shuffle(){
		isShuffle = !isShuffle;
		
		if (isShuffle == true){
			var shuffleOn = document.createElement("img");
			shuffleOn.src = "icons/shuffle_on_2.png";
			shuffleOn.style.width = "30px"; 
			shuffleOn.style.height = "30px";
			shuffleMusic.replaceChild(shuffleOn,shuffleMusic.firstChild);			
		}
		else if (isShuffle == false){
			var shuffleOff = document.createElement("img");
			shuffleOff.src = "icons/shuffle_off_2.png";
			shuffleOff.style.width = "30px"; 
			shuffleOff.style.height = "30px";
			shuffleMusic.replaceChild(shuffleOff,shuffleMusic.firstChild);			
		}
	
		
	}
	//event functions: end
/*	function highLight(){
	 	for(let row of playlistRow){
			row.style.border="0px";
			row.style.fontWeight="normal";
		}
		
		playlistRow[tracksIndex].style.border = "1px solid grey";
		playlistRow[tracksIndex].style.fontWeight = "bold";
		

	}
*/	
	function playAll(){
		tracksIndex = 0;
		currentTrack = tracksIndex+1;
		uploadSong();
	//	highLight();
	document.getElementById("currentTitle").innerHTML = tracksIndex;
	}
	
	
	function openSettings(){
		document.getElementById("mainSettings")
		 .style.visibility = "visible";
	}
	
	function settings(){
		
		document.getElementById("chartHeading").innerHTML = 
			settingsForm.elements["chartName"].value;
		themeSettings();
		closeSettings();
		
		
			
	}
	
	function themeSettings(){
		document.getElementById("charterTracks").style.backgroundColor
			= settingsForm.elements["theme1"].value;
		document.getElementById("currentlyPlaying").style.backgroundColor
			= settingsForm.elements["theme1"].value;
		
		let playLister = playList.childNodes;
 		for(let i = 3; i <playLister.length ; i++){
			if (i %2 == 0){
				playLister[i].style.backgroundColor =
				settingsForm.elements["theme2"].value;
			}
				
		} 
			
	}
	
	function closeSettings(){
		document.getElementById("mainSettings")
			.style.visibility = "hidden";
	}
 
	function uploadSong(){
		if(FileReader && playListArr && playListArr.length){
				
			var fr = new FileReader();
				
			fr.onload = function(){
				trackSrc.src = fr.result;
			}
			
				fr.readAsDataURL(playListArr[tracksIndex]);
			
			
		}		
	}

};