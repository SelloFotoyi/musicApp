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
		
		
			
	//	playList.style.color = "black";
		
		
	//	playList.innerHTML = "in here";
		let i = 0;
		var trackNumber = document.createElement("div");
		trackNumber.innerHTML = playListArr.length +" "+ fileList[0].name;
		var trackName = document.createElement("div");
		trackName.innerHTML = fileList[0].name;
		var artistName = document.createElement("div");
		artistName.innerHTML = defaultArtist;
		artistName.style.color = "black";
		var albumName = document.createElement("div");
		albumName.innerHTML = defaultAlbum;
		var deleter = document.createElement("div");
		deleter.innerHTML = "delete";
	
		var trackDetail = document.createElement("div");
		trackDetail.style.height = "30px";
		trackDetail.style.paddingLeft = "20px";
		trackDetail.style.paddingRight = "20px";
		trackDetail.style.display = "flex";
		trackDetail.style.justifyContent = "space-between";
		

		trackDetail.appendChild(trackNumber);
//		trackDetail.appendChild(trackName);
		trackDetail.appendChild(artistName);
		trackDetail.appendChild(albumName);
		trackDetail.appendChild(deleter);
	
		trackNumber.style.flexBasis = "50px";
	/*	var trackDetailNodes = trackDetail.childNodes;
		for(let node of trackDetailNodes){
			node.style.width = "50px";
		}*/
	
		playList.appendChild(trackDetail);
		

		
		

		
		document.getElementById("chartHeading").innerHTML = "in here";
		
		
		/*
		trackNameArr[songAddTracker] = playListArr[songAddTracker].name;
		artistName[songAddTracker] = defaultArtist;	//for now, fix when you get metadata of mp3 fileCreatedDate
		albumNameArr[songAddTracker] = defaultAlbum; //also for now
		*/

				/*
		
		let counter = 0;
		if(playListArr.length>0){
			counter = playListArr.length-1;
		}
		for(let i = counter; i <counter+additions; i++){
			if (playList.length == 1){
				listTrackNumbers[0].innerHTML = 1;
				listTrackNames[0].innerHTML = playListArr[0].name;
				listArtistNames[0].innerHTML = defaultArtist;
				listAlbums[0].innerHTML = defaultAlbum;
				songDeleters[0].innerHTML = "delete";
			}
			else{
				let trackNumber = document.createElement("div");
				trackNumber.innerHTML = (i+1);
				listTrackNumbers.appendChild(trackNumber);
		
				let trackName = document.createElement("div");
				trackName.innerHTML = playListArr[i+1].name;
				listTrackNames.appendChild(trackName);
		
				let artistName = document.createElement("div");
				artistName.innerHTML = defaultArtist;
				listArtistNames.appendChild(artistName);
		
				let albumName = document.createElement("div");
				albumName.innerHTML = defaultAlbum;
				listAlbums.appendChild(albumName);
		
				let songDeleter = document.createElement("div");
				songDeleter.innerHTML = "delete";	
				songDeleters.appendChild(songDeleter);
				
				playlistRow.appendChild(listTrackNumbers[i+1]);
				playlistRow.appendChild(listTrackNames[i+1]);
				playlistRow.appendChild(listArtistNames[i+1]);
				playlistRow.appendChild(listAlbums[i+1]);
				playlistRow.appendChild(songDeleters[i+1]);
				
				playList.appendChild(playlistRow[i+1]);
				
			}
		}	*/	
		i++;
	}

	
	var settingsForm = document.getElementById("settingsForm");
	

/*		
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
*/	


	
	//assign playlist items to corresponding metadata
	//track names
/*	for(let i = 0; i < trackList.length; i ++){
		listTrackNumbers[i].innerHTML = i+1;
		listTrackNames[i].innerHTML = trackList[i]; //update once metadta is obtained
	}*/



	 //for user
	var trackSrc = document.getElementById("currentAudio");
	
	//assign a track from track list to track src
//	trackSrc.src = trackList[tracksIndex];
	
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
	document.getElementById("settingsIcon")
		.addEventListener("click", openSettings);
	
	
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