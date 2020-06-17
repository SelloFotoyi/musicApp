window.onload = function(){ 

	//logic playlist
	var playListArr = new Array(); 
	
	//create and setup visual playlist
	var playList = document.createElement("div");
	playList.style.backgroundColor = "white";
	playList.style.color = "black";
	playList.style.height = "250px";
	playList.style.overflow = "auto";
	playList.style.overflowX = "hidden";
	playList.style.overflowY = "visible";
	playList.style.border = "5px solid white";
	playList.style.display = "flex"; //it's a flex container
	playList.style.flexDirection = "column";
	document.getElementById("charterTracks").appendChild(playList);
	
	
	//some variables
	var nextTrack = document.getElementById("next");
	var prevTrack = document.getElementById("prev");
	var stopMusic = document.getElementById("stop");
	var loopMusic = document.getElementById("loop");
	var shuffleMusic = document.getElementById("shufl");
	var isLoop = true;
	var isShuffle = false;
	var playAllSongs = document.getElementById("playAll");
	var trackSrc = document.getElementById("currentAudio");  //variable for audio element
	var songAddTracker = 0; //keeps track of number of songs in visual playlist
	var tracksIndex = 0; 
	var defaultArtist = "Unknown Artist";
	var defaultAlbum = "Uknown Album";
	var settingsForm = document.getElementById("settingsForm");
	
	
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
	
	
	
	//Default image add
	const defaultImage = document.getElementById("faceImageInput");
	defaultImage.addEventListener("change", 
	function(){
		const chosen_img = this.files; //file chosen by user
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
				image_fr.readAsDataURL(chosen_img[0]);	//read file chosen by user
		}
	});
	

		
	
	//song add 
	const inputElem = document.getElementById("songAddInput");
	inputElem.addEventListener("change",
	function(){
		const fileList = this.files;
		
		//capture initial playlist length before adding new song(s)
		let initLength = playListArr.length; 
		
		//ensures that logic playlist isn't replaced by new song(s) added
		for(let i = 0; i < fileList.length; i++){
			playListArr[songAddTracker+i] = fileList[i];
			
		}
		
		//append songs to visual playlist, one at a time
		for (let i = songAddTracker; i < (initLength+fileList.length); i++){
			appendSong(i);
		}
		
		songAddTracker+=fileList.length;		
	});

	
	
	
	//*******************display playList *********************
	//appends a track to visual playlist
	function appendSong(i){

		var trackNumber = generateTrackNumber(i);
		var trackName = generateTrackName(i);
		var artistName = generateArtistName();
		var albumName = document.createElement("div");
		albumName.innerHTML = defaultAlbum;
		albumName.style.textAlign = "center";
		var deleter = generateDeleter();
		var trackDetail = generateTrackDetail();
		
		trackDetail.appendChild(trackNumber);
		trackDetail.appendChild(trackName);
		trackDetail.appendChild(artistName);
		trackDetail.appendChild(albumName);
		trackDetail.appendChild(deleter);

		styleDetails(trackDetail);
		
		highLightEvents(trackDetail);
		
		playList.appendChild(trackDetail);
		themeSettings();
		
		songDeleteEvents();
		songPlayEvents();
	
	}
	
	function generateTrackNumber(i){
		let trackNumber = document.createElement("div");
		trackNumber.innerHTML = (i+1);
		return trackNumber;
	}
	
	function generateTrackName(i){
		let trackName = document.createElement("div");
		let trkNm = playListArr[i].name;
		if(trkNm.length > 45)
			trackName.innerHTML = trkNm.substring(0,45)+"...";
		else
			trackName.innerHTML = trkNm.substring(0,trkNm.length-4);

		return trackName;
	}
	
	function generateArtistName(){
		let artistName = document.createElement("div");
		artistName.style.textAlign = "center";
		artistName.innerHTML = defaultArtist;
		return artistName;
	}
	
	
	function generateDeleter(){
		let deleter = document.createElement("div");
		let deleteImg = document.createElement("img");
		deleteImg.src = "icons/delete2.png";
		deleteImg.style.width = "20px";
		deleteImg.style.height = "20px";
		deleter.appendChild(deleteImg);
		deleter.style.textAlign = "right";
		
		return deleter;
	}
	
	function generateTrackDetail(){
		let trackDetail = document.createElement("div");
		trackDetail.style.height = "40px";
		trackDetail.style.paddingLeft = "20px";
		trackDetail.style.paddingRight = "20px";
		trackDetail.style.border = "2px solid transparent";
		trackDetail.style.display = "flex";
		trackDetail.style.justifyContent = "space-between";
		return trackDetail;
		
	}
	
	
	function styleDetails(trackDetail){
		
		var trackDetailNodes = trackDetail.childNodes;
		for(let node of trackDetailNodes){
			node.style.flexBasis = "300px";
			node.style.alignSelf = "center";
			node.style.padding = "3.5px";
		}
		trackDetailNodes[0].style.flexBasis = "20px";	
		
	}
	

	
	function highLightEvents(trackDetail){
		let trackDetails = trackDetail.childNodes;
		let trckNum = trackDetail.firstChild;
		let trckName = trckNum.nextSibling;
		
		trckName.addEventListener("mouseover", 
		function(){
			trckName.style.cursor = "pointer";
			trackDetail.style.color = "green";
		});
		trckName.addEventListener("mouseout", 
		function(){
			trackDetail.style.color = "black";
		});


		let deleteTrack = trackDetail.lastChild; 
		deleteTrack.addEventListener("mouseover",function(){
			deleteTrack.style.cursor = "pointer";
			trackDetail.style.color = "red";
		});
		deleteTrack.addEventListener("mouseout",function(){
			trackDetail.style.color = "black";
		});
	}
	
	function songPlayEvents(){
		let player = playList.childNodes;
		for(let i = 0; i < player.length; i++){
			let trackDetails = player[i]; 
			let tNum = trackDetails.firstChild;
			let tName = tNum.nextSibling
			tName.addEventListener("click", function(){
				trackSrc.src = "";
				tracksIndex = i;
				uploadSong();
				highLight();
				
			});
		}
		
		
	}
	
	function songDeleteEvents(){

		let detail = playList.lastChild;
		let delDetail = detail.lastChild
		
		delDetail.addEventListener("click", function(){
			let pos = (detail.firstChild).innerHTML;
			detail.remove();
			adjustIndex();
			themeSettings();
			splicePlayList(pos);
		});
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
			next();
		}
		
	}
	

	
	
	function next(){
		
		if (isShuffle){
			tracksIndex = Math.floor(Math.random()*playListArr.length);
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
			
		}
		scrollToPlaying();
		
		
	}
	
	function previous(){
		
		if (isShuffle){
			tracksIndex = Math.floor(Math.random()*playListArr.length);
			uploadSong();
			highLight();
		}
		
		if((tracksIndex == 0)&& !(isShuffle)){
			stop();
			return;
		}

		//add outOfBound check later
		if((tracksIndex >0)&& !(isShuffle)){
			tracksIndex--;
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
		if(tracksIndex < 7){
			playList.scrollTo(0,0);
		}
		else{
			let playRect = playList.childNodes;
			let playPos = playRect[tracksIndex].getBoundingClientRect();

			
		playList.scrollTo(0,tracksIndex*playPos.height);			
		}
		
	}
	
	function updateCurrent(){
		let currentTrackName = playListArr[tracksIndex].name;
		document.getElementById("upperArtistName").innerHTML = defaultArtist;
		document.getElementById("lowerArtistName").innerHTML = defaultArtist;
		document.getElementById("upperTrackTitle").innerHTML
			= currentTrackName.substring(0,(currentTrackName.length-4));
		
		if(currentTrackName.length > 43){
			document.getElementById("lowerTrackTitle").innerHTML
				= currentTrackName.substring(0,25) + "...";
		}
		else {
			document.getElementById("lowerTrackTitle").innerHTML 
				= currentTrackName.substring(0,(currentTrackName.length-4));
		}
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
			let rowColor = "grey";
		
		let playLister = playList.childNodes;
		playLister[0].style.backgroundColor = "white";
 		for(let i = 1; i <playLister.length ; i++){
			let prev = playLister[i-1];
			if(prev.style.backgroundColor == "white")
				playLister[i].style.backgroundColor = rowColor;
			else if (prev.style.backgroundColor == rowColor)
				playLister[i].style.backgroundColor = "white"; 
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
	
	function fontLoad(fontFile){
		
		var f = new FontFace("Disney", "url('"+fontFile+"')",{});
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