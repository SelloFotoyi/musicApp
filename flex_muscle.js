window.onload = function(){ 
	

 	
	var additions = 0;
	
	//playlist variables
	var playListArr = new Array();
	var playList = document.getElementById("playList");
	
	

	
	var listTrackNumbers = document.getElementsByClassName("listTrackNumber");
 	var listTrackNames = document.getElementsByClassName("listTrackName");
	var listArtistNames = document.getElementsByClassName("listArtistName");
	var listAlbums = document.getElementsByClassName("listAlbum"); 
	var songDeleters = document.getElementsByClassName("listTrackDelete");
	var songAddTracker = 0;
	var playlistRow = document.getElementsByClassName("trackDetail");
	
	
	var tracksIndex = 0;	// @start of array
	var currentTrack = tracksIndex+1;
	var defaultArtist = "Unknown Artist";
	var defaultAlbum = "Uknown Album";
	
	//******************song add ***********************
	const inputElem = document.getElementById("songAddInput");
	inputElem.addEventListener("change",handleFiles,false);
	
	
	
	
	function handleFiles(){
	
				
		const fileList = this.files;
		additions = fileList.length;
		
		playListArr[songAddTracker] = fileList[0];
		songAddTracker++;
/*
		for(let i = 0; i < fileList.length; i++){
			playListArr[songAddTracker+i] = fileList[i];
			
		}
		songAddTracker+=fileList.length;*/
		
		appendSong(fileList);
		
			
	}
	//*******************end of song add***********************
	
	
	//*******************display playList *********************
	
	function appendSong(fileList){
		
		document.getElementById("chartHeading").innerHTML = "in here";

		var trackNumber = document.createElement("div");
		trackNumber.innerHTML = playListArr.length;
		var trackName = document.createElement("div");
		trackName.innerHTML = fileList[0].name;
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
		var playListNodes = playList.childNodes;
		document.getElementById("chartHeading").innerHTML = playList.length;
		
	
	}
	


	
	var settingsForm = document.getElementById("settingsForm");
	
	 //for user
	var trackSrc = document.getElementById("currentAudio");
	
	//highlight currently playing track on playlist
	
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
	
	document.getElementById("saveButton")
		.addEventListener("click",settings);
	document.getElementById("cancelButton")
		.addEventListener("click",closeSettings);
/* 	document.getElementById("settingsIcon")
		.addEventListener("click", checker);
	
	function checker(){
		document.getElementById("chartHeading").innerHTML = "in here";
	} */
	
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
		//	trackSrc.src = trackList[tracksIndex];
			uploadSong();
			
			highLight();
			
			currentTrack++;
			
		}
		else {
			tracksIndex = 0;//(listTrackNumbers.size-1);
		//	trackSrc.src = trackList[tracksIndex];
			uploadSong();
			highLight();
			
		}
		
		
		
		
	}
	
	function previous(){
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
			highLight();
			
		}
		else {
			tracksIndex = 0;
			currentTrack = tracksIndex+1;;
	//		trackSrc.src = trackList[tracksIndex];
			uploadSong();
			highLight();
		}
		
		
	}
	
	function stop(){
		tracksIndex = 0;
		currentTrack = tracksIndex+1;
	//	trackSrc.src = trackList[tracksIndex];
		uploadSong();
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
		uploadSong();
		highLight();
	}
	
	
	function openSettings(){
		document.getElementById("chartHeading").innerHTML = "in here";
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
		
		
		for(let i = 0; i < playlistRow.length; i++){
			if (i %2 == 0){
				playlistRow[i].style.backgroundColor =
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