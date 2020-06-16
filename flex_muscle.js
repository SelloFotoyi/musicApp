window.onload = function(){ 
	

 	
	
	var additions = 0;
	var deletions = 0;
	
	//playlist variables
	var playListArr = new Array(); //logic playlist
	
	//create and setup visual playlist
	var playList = document.createElement("div");
	playList.style.backgroundColor = "white";
	playList.style.color = "black";
	playList.style.height = "250px";
	playList.style.overflow = "auto";
	playList.style.overflowX = "hidden";
	playList.style.overflowY = "visible";
	playList.style.border = "5px solid white";
	playList.style.display = "flex";
	playList.style.flexDirection = "column";
	document.getElementById("charterTracks").appendChild(playList);
	
	var trackSrc = document.getElementById("currentAudio");
	
	var songAddTracker = 0;
	var tracksIndex = 0;	// @start of array
	var currentTrack = tracksIndex+1;
	var defaultArtist = "Unknown Artist";
	var defaultAlbum = "Uknown Album";
	
	
	
	
	//****************** Default image add **************
	const defaultImage = document.getElementById("faceImageInput");
	defaultImage.addEventListener("change", chooseImage,false);
	
	function chooseImage(){
		const chosen_img = this.files;
		if(FileReader && chosen_img && chosen_img.length){
				
			var image_fr = new FileReader();
				
			image_fr.onload = function(){
				document.getElementById("face_img").src = image_fr.result;
				document.getElementById("face_img").style.height = "250px";
				document.getElementById("face_img").style.width = "350px";
				document.getElementById("footerImage").src = image_fr.result;
				document.getElementById("footerImage").style.height = "50px";
				document.getElementById("footerImage").style.width = "50px";
			}
			
				image_fr.readAsDataURL(chosen_img[0]);
			
			
		}
	}
	
	//****************** song add ***********************
	const inputElem = document.getElementById("songAddInput");
	inputElem.addEventListener("change",handleFiles,false);
	

	
	var settingsForm = document.getElementById("settingsForm");
	
	
	function handleFiles(){
	
		let songCount = 0;
		const fileList = this.files;
		additions = fileList.length;
		
		let initLength = playListArr.length;
		
		for(let i = 0; i < fileList.length; i++){
			playListArr[songAddTracker+i] = fileList[i];
			
		}
		
		
		for (let i = songAddTracker; i < (initLength+fileList.length); i++){
			appendSong(i);
		}
		
		songAddTracker+=fileList.length;	
			
	}
	//*******************end of song add***********************
	
	
	//*******************display playList *********************
	
	function appendSong(i){
		
	//	document.getElementById("chartHeading").innerHTML = "in here";

		var trackNumber = document.createElement("div");
		trackNumber.innerHTML = (i+1);
		
		var trackName = document.createElement("div");
		let trkNm = playListArr[i].name;
		if(trkNm.length > 45)
			trackName.innerHTML = trkNm.substring(0,45)+"...";
		else
			trackName.innerHTML = trkNm.substring(0,trkNm.length-4);
		
		var artistName = document.createElement("div");
		artistName.innerHTML = defaultArtist;
		artistName.style.color = "black";
		
		var albumName = document.createElement("div");
		albumName.innerHTML = defaultAlbum;
		
		var deleter = document.createElement("div");
		let deleteImg = document.createElement("img");
		deleteImg.src = "icons/delete2.png";
		deleteImg.style.width = "20px";
		deleteImg.style.height = "20px";
		deleter.appendChild(deleteImg);

	
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
	
		highLightEvents(trackDetail);
		var trackDetailNodes = trackDetail.childNodes;
		
		
		
		for(let node of trackDetailNodes){
			node.style.flexBasis = "300px";
			node.style.alignSelf = "center";
		}
		trackDetailNodes[0].style.flexBasis = "20px";
	
		playList.appendChild(trackDetail);
		themeSettings();
		
		var player = playList.childNodes;
		songPlayEvents();
		songDeleteEvents();
	
		for(let i = 0; i < player.length; i++){
			player[i].style.flexBasis = "300px";
			player[i].style.padding = "3.5px"			
		}
	
	}
	
	function highLightEvents(trackDetail){
		let trackDetails = trackDetail.childNodes;
		for(let i = 0; i < (trackDetails.length-1); i++){
			trackDetails[i].addEventListener("mouseover",function(){
			trackDetails[i].target = "play track";
			trackDetails[i].style.cursor = "pointer";
		/*	trackDetail.style.fontWeight = "bold";*/
			trackDetail.style.border = "3.5px dotted green";
			});
			trackDetails[i].addEventListener("mouseout",function(){
			highLight();
			});
		}

		let deleteTrack = trackDetail.lastChild; 
		deleteTrack.addEventListener("mouseover",function(){
			deleteTrack.target = "delete track";
			deleteTrack.style.cursor = "pointer";
		/*	trackDetail.style.fontWeight = "bold";
			trackDetail.style.border = "3.5px dotted red";*/
		});
		deleteTrack.addEventListener("mouseout",function(){
			highLight();
		});
	}
	
	function songPlayEvents(){
		let player = playList.childNodes;
		
		for(let i = 0; i < player.length; i++){
			let trackDetails = player[i].childNodes;
			
			for(let j = 0; j < (trackDetails.length-1); j++){
				trackDetails[j].addEventListener("click",function(){
				trackSrc.src = "";
				tracksIndex = i;
				currentTrack = tracksIndex+1;
				uploadSong();
				highLight();					
				});
			}
		}
		document.getElementById("chartHeading").innerHTML = tracksIndex;
	}
	
	function songDeleteEvents(){
		
	//	let player = playList.childNodes;
		let detail = playList.lastChild;
		let delDetail = detail.lastChild
		
		delDetail.addEventListener("click", function(){
			let pos = (detail.firstChild).innerHTML;
			detail.remove();
			adjustIndex();
			themeSettings();
			splicePlayList(pos);
		});
		
	//	coloring();
	deletions++;
	}
	
	function adjustIndex(){
		
		let playing = playList.childNodes;
		
		for(let i = 0; i < playing.length; i++){
			
			let tNumber = playing[i].firstChild;
		
			tNumber.innerHTML = (i+1);
	
		}
		
	}
	
	function splicePlayList(pos){
		
		let deletedIndex = parseInt(pos)-1;
		playListArr.splice(deletedIndex,1);
		let temp = songAddTracker;
		songAddTracker--;
		if (songAddTracker == temp)
			songAddTracker = 0;
		if((tracksIndex == deletedIndex) && (songAddTracker>=1)){
			tracksIndex--;
			currentTrack = tracksIndex+1;
		//	next();
		}
		document.getElementById("chartHeading").innerHTML = tracksIndex;
		
		
		
	}
	
	
	
	
	 //for user
	
	
	
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
			currentTrack = tracksIndex+1;
			uploadSong();
			highLight();
		}
		
		if((tracksIndex >= playListArr.length-1) && !(isShuffle)){
			stop();
			if(!isLoop){
				stop();
				return;
			}
			uploadSong();
			scrollToPlaying();
			return;
		}
		//add outOfBound check later
		if((tracksIndex < playListArr.length-1)&& !(isShuffle)){

			tracksIndex++;
			uploadSong();
			
			highLight();
			
			currentTrack++;
			
		}
		scrollToPlaying();
		document.getElementById("chartHeading").innerHTML = tracksIndex;
		
	}
	
	function previous(){
		
		if (isShuffle){
			tracksIndex = Math.floor(Math.random()*playListArr.length);
			currentTrack = tracksIndex+1;
			uploadSong();
			highLight();
		}
		
		if((currentTrack == 1)&& !(isShuffle)){
			stop();
			return;
		}

		//add outOfBound check later
		if((tracksIndex =>1)&& !(isShuffle)){
			tracksIndex--;
			currentTrack--;
			uploadSong();
			highLight();
			
		}

		scrollToPlaying();
		
	}
	
	function stop(){
		tracksIndex = 0;
		currentTrack = tracksIndex+1;
		highLight();
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
	function highLight(){
		
		
		let rows = playList.childNodes;
		
	 	for(let i = 0; i < rows.length; i++){
			rows[i].style.border="0px";
			rows[i].style.fontWeight="normal";
			rows[i].style.fontStyle = "normal";
			
		}
		
		rows[tracksIndex].style.border = "3.5px dashed black";
		rows[tracksIndex].style.fontWeight = "bold";
		rows[tracksIndex].style.fontStyle = "italic";
		
		updateCurrent();

	}
	
	function scrollToPlaying(){
	/*	if(tracksIndex < 3){
			playList.scrollTo(0,0);
		}*/
		let playRect = playList.childNodes;
		let playPos = playRect[tracksIndex].getBoundingClientRect();

			
		playList.scrollTo(0,playPos.height);
	}
	
	function updateCurrent(){
		let currentTrackName = playListArr[tracksIndex].name;
		document.getElementById("upperArtistName").innerHTML = defaultArtist;
		document.getElementById("lowerArtistName").innerHTML = defaultArtist;
		document.getElementById("upperTrackTitle").innerHTML = currentTrackName.substring(0,(currentTrackName.length-4));
		
		if(currentTrackName.length > 43)
			document.getElementById("lowerTrackTitle").innerHTML = currentTrackName.substring(0,25) + "...";
		else 
			document.getElementById("lowerTrackTitle").innerHTML = currentTrackName.substring(0,(currentTrackName.length-4));
	}
	
	function playAll(){
		tracksIndex = 0;
		currentTrack = tracksIndex+1;
		uploadSong();
		highLight();
		scrollToPlaying();
		document.getElementById("chartHeading").innerHTML = tracksIndex;
	}
	
	
	function openSettings(){
		document.getElementById("mainSettings")
		 .style.visibility = "visible";
	}
	
	function settings(){
		
		document.getElementById("chartHeading").innerHTML = 
			settingsForm.elements["chartName"].value;
		themeSettings();
		uploadFont();
		closeSettings();
		
		
			
	}
	
	function themeSettings(){
		document.getElementById("charterTracks").style.backgroundColor
			= settingsForm.elements["theme1"].value;
		document.getElementById("currentlyPlaying").style.backgroundColor
			= settingsForm.elements["theme1"].value;
			let rowColor = "grey";
		
		let playLister = playList.childNodes;
		playLister[0].style.backgroundColor = "white";
 		for(let i = 1; i <playLister.length ; i++){
			let prev = playLister[i-1];
			if(prev.style.backgroundColor == "white")
				playLister[i].style.backgroundColor = rowColor;
			else if (prev.style.backgroundColor == rowColor)
				playLister[i].style.backgroundColor = "white";
			
			
	/*		if (i %2 == 0){
				playLister[i].style.backgroundColor =
				settingsForm.elements["theme2"].value;
			}*/
				
		} 
			
	}
	
	function uploadFont(){
	
		const fontFile = settingsForm.elements["fontInput"].files;

		if (FileReader && fontFile && fontFile.length){
			var fr = new FileReader();
			fr.onload = function(){

				var fontURL = fr.result;
				fontLoad(fontURL);
	
			}
			fr.readAsDataURL(fontFile[0]);
			
		}
		else{
			document.innerHTML = "not supported";
		}		
		
	}
	
	function fontLoad(font){
		
		var f = new FontFace("Disney", "url('"+font+"')",{});
		f.load().then(function(loadedFace){
			document.fonts.add(loadedFace);
			document.body.style.fontFamily = "Disney, serif";
		});
		
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