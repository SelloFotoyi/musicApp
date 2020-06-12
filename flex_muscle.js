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
	
	
	//***************** uplading font ******************
	
//	let userFont = document.getElementById("fontInput");
//	userFont.addEventListener("change",chooseFont);
	
/*	function chooseFont(){
		const chosen_font = this.files;
		let userFontName = "userFont";
		if(FileReader && chosen_font &&chosen_font.length){
			let font_fr = new FileReader();
			font_fr.onload = function(){
				let newFont = document.createElement("style");
				newFont.appendChild(document.createTextNode("\
					@font-face{\
						font-family: " + userFontName + ";\
						src:url('" + font_fr.result + "') format('ttf');\
					}\
				));
				document.head.replaceChild(newFont,head.lastChild);
			}
			
			font_fr.readAsDataURL(chosen_font[0]);
		}
	}*/
	
	
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
		trackNumber.innerHTML = i+1;
		
		var trackName = document.createElement("div");
		let trkNm = playListArr[i].name;
		if(trkNm.length > 60)
			trackName.innerHTML = (i+1)+") "+ trkNm.substring(0,60)+"...";
		else
			trackName.innerHTML = (i+1)+")  "+ trkNm.substring(0,trkNm.length-4);
		
		var artistName = document.createElement("div");
		artistName.innerHTML = defaultArtist;
		artistName.style.color = "black";
		
		var albumName = document.createElement("div");
		albumName.innerHTML = defaultAlbum;

	
		var trackDetail = document.createElement("div");
		trackDetail.style.height = "40px";
		trackDetail.style.paddingLeft = "20px";
		trackDetail.style.paddingRight = "20px";
		trackDetail.style.border = "2px solid transparent";
		trackDetail.style.display = "flex";
		trackDetail.style.justifyContent = "space-between";
		

	//	trackDetail.appendChild(trackNumber);
		trackDetail.appendChild(trackName);
		trackDetail.appendChild(artistName);
		trackDetail.appendChild(albumName);

	
		
		var trackDetailNodes = trackDetail.childNodes;
		
		for(let node of trackDetailNodes){
			node.style.flexBasis = "300px";
			node.style.alignSelf = "center";
		}
		trackDetailNodes[0].style.flexBasis = "500px";
			
/*		if(playListArr.length%2 == 0){
			trackDetail.style.backgroundColor = 
				settingsForm.elements["theme2"].value;
		}*/
		
	//	else if (playListArr.length %2 != 0){
	//		trackDetail.style.backgroundColor = "white";
	//	}
	
		playList.appendChild(trackDetail);
		themeSettings();
		
		var player = playList.childNodes;
		
	
		
	//	player[3].style.backgroundColor = "red";
	
		for(let i = 3; i < player.length; i++){
			
			player[i].style.flexBasis = "300px";
			player[i].style.padding = "3.5px"
			
			player[i].addEventListener("mouseover",function(){
				player[i].style.cursor = "pointer";
				player[i].style.fontWeight = "bold";
				
			});
			player[i].addEventListener("mouseout", function(){
				highLight();
			});
			
			player[i].addEventListener("click", function(){
				stop();
				tracksIndex = i-3;
				currentTrack = tracksIndex+1;
				uploadSong();
				highLight();
			});
		
			
		}
	
	}
	
	
	
	
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
		
	 	for(let i = 3; i < rows.length; i++){
			rows[i].style.border="0px";
			rows[i].style.fontWeight="normal";
			rows[i].style.fontStyle = "normal";
			
		}
		
		rows[tracksIndex+3].style.border = "3.5px dashed grey";
		rows[tracksIndex+3].style.fontWeight = "bold";
		rows[tracksIndex+3].style.fontStyle = "italic";
		
		updateCurrent();

	}
	
	function scrollToPlaying(){
		if(tracksIndex < 3){
			playList.scrollTo(0,0);
		}
		let playRect = playList.childNodes;
		let playPos = playRect[tracksIndex].getBoundingClientRect();

			
		playList.scrollTo(0,tracksIndex*playPos.height);
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
		
		let playLister = playList.childNodes;
 		for(let i = 3; i <playLister.length ; i++){
			if (i %2 == 0){
				playLister[i].style.backgroundColor =
				settingsForm.elements["theme2"].value;
			}
				
		} 
			
	}
	
	function uploadFont(){
		//let font = settingsForm.elements["fontInput"].value;
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