window.onload = function(){ 

	//logic playlist
	var playListArr = new Array(); 
	
	//create and setup visual playlist
	var playList = document.createElement("div");
	playList.style.backgroundColor = "white";
	playList.style.color = "black";
	playList.style.height = "250px";
	playList.style.width = "97%";
	playList.style.position = "relative";
	playList.style.overflow = "scroll";
	playList.style.overflowX = "hidden";
	playList.style.overflowY = "visible";
	playList.style.border = "5px solid white";
	playList.style.display = "flex"; //it's a flex container
	playList.style.flexDirection = "column";
//	document.getElementById("upperSection").appendChild(playList);

	
	
	//some variables
	var nextTrack = document.getElementById("next");
	var prevTrack = document.getElementById("prev");
	var stopMusic = document.getElementById("stop");
	var loopMusic = document.getElementById("loop");
	var shuffleMusic = document.getElementById("shufl");
	var twitterIcon = document.getElementById("twitterIcon");
	var linkedInIcon = document.getElementById("linkedInIcon");
	var githubIcon = document.getElementById("githubIcon");
	var isLoop = true;
	var isShuffle = false;
	var playAllSongs = document.getElementById("playAll");
	var trackSrc = document.getElementById("currentAudio");  //variable for audio element
	var songAddTracker = 0; //keeps track of number of songs in visual playlist
	var tracksIndex = 0; 
	var defaultArtist = "Unknown Artist";
	var defaultAlbum = "Uknown Album";
	var settingsForm = document.getElementById("settingsForm");
	var playingOrder = "Descending";
	const screen_600px = window.matchMedia("(max-width:600px)");
	var infoC = 0;
	//add event listeners
	nextTrack.addEventListener("click", next);
	prevTrack.addEventListener("click", previous);
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
	
	// mouseover/mouseout events for footer icons 

	twitterIcon.addEventListener("mouseover", function(){//hover:twitter
		twitterIcon.src = "src/icons/twitter_blue.png";
	});
	twitterIcon.addEventListener("mouseout", function(){
		twitterIcon.src = "src/icons/twitter_black.png";
	});
	

	githubIcon.addEventListener("mouseover", function(){//hover:github
		githubIcon.src = "src/icons/github_blue.svg";
	});
	githubIcon.addEventListener("mouseout", function(){
		githubIcon.src = "src/icons/github_black.png";
	});
	

	linkedInIcon.addEventListener("mouseover", function(){//hover:linkedIn
		linkedInIcon.src = "src/icons/linkedIn_blue.png";
	});
	linkedInIcon.addEventListener("mouseout", function(){
		linkedInIcon.src = "src/icons/linkedIn_black.png";
	});	
	
	//Default image add
	const defaultImage = document.getElementById("faceImageInput");
	defaultImage.addEventListener("change", 
	function(){
		const chosen_img = this.files; //file chosen by user
		if(FileReader && chosen_img && chosen_img.length){
				
			var image_fr = new FileReader();
				
			image_fr.onload = function(){
				document.getElementById("face_img").src = image_fr.result;
				document.getElementById("face_img").style.height = "95%";
				document.getElementById("face_img").style.width = "100%";
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
		if(infoC == 0){
			document.getElementById("upperSection").replaceChild(
				playList,document.getElementById("playListInfo")
			);
			document.getElementById("chartHeading").innerHTML = "My Music Playlist";
			document.getElementById("chartHeadingSmall").innerHTML = "My Music Playlist";
			infoC++;
		}
		responsiveness();
		themeSettings();
		
		songDeleteEvents();
		songPlayEvents();
	
	}//end:appendSong(i)
	


	function responsiveness(){
		if(matchMedia){
			screen_600px.addListener(reduceTo600px);
			reduceTo600px(screen_600px);
		}
	}

	function reduceTo600px(screen_600px){
		if(screen_600px.matches){
			reducePlayList();
			adjustIcons();
			adjustFaceImage();
		}
		else{
			restorePlaylist();
		}

	}

	function reducePlayList(){
		playList.style.width = "98%";
		let smallerPlaylist = playList.childNodes;
		for(let smallerTrackDetail of smallerPlaylist){
			let track_detail = smallerTrackDetail.childNodes;

			for(let i = 0; i <track_detail.length; i++){
				if (i == 2){
					let artist_name = track_detail[i];
					artist_name.style.display = "none";
				}
				if (i == 3){
					let album_name = track_detail[i];
					album_name.style.display = "none";
				}
			}

		}
		
	}

	function restorePlaylist(){
		playList.style.width = "99%";
		let smallerPlaylist = playList.childNodes;	
		for(let smallerTrackDetail of smallerPlaylist){
			let track_detail = smallerTrackDetail.childNodes;
			for(let i = 0; i <track_detail.length; i++){
				if (i == 2){
					let artist_name = track_detail[i];
					artist_name.style.display = "inline";
				}
				if (i == 3){
					let album_name = track_detail[i];
					album_name.style.display = "inline";
				}
			}	
		}
	}

	function adjustIcons(){
		if(screen_600px.matches){
			nextTrack.style.width = "50px";
			nextTrack.style.height = "50px";
			prevTrack.style.width = "50px";
			prevTrack.style.height = "50px";
			loopMusic.style.width = "50px";
			loopMusic.style.height = "50px";
			shuffleMusic.style.width = "50px";
			shuffleMusic.style.height = "50px";
		}
		else{
			nextTrack.style.width = "30px";
			nextTrack.style.height = "30px";
			prevTrack.style.width = "30px";
			prevTrack.style.height = "30px";
			loopMusic.style.width = "30px";
			loopMusic.style.height = "30px";
			shuffleMusic.style.width = "30px";
			shuffleMusic.style.height = "30px";
		}
	}

	function adjustFaceImage(){
		if(screen_600px.matches){
			document.getElementById("face_img").style.width = "150px";
			document.getElementById("face_img").style.height = "150px";
		}
		else{
			document.getElementById("face_img").style.width = "350px";
			document.getElementById("face_img").style.height = "250px";			
		}
	}

	function generateTrackNumber(i){
		let trackNumber = document.createElement("div");
		trackNumber.innerHTML = (i+1);
		return trackNumber;
	}
	
	function generateTrackName(i){
		let trackName = document.createElement("div");
		let trkNm = playListArr[i].name;
		if(trkNm.length > 30)//truncates track name
			trackName.innerHTML = trkNm.substring(0,30)+"...";
		else{
			trackName.innerHTML = trkNm.substring(0,trkNm.length-4);
		}
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
		deleteImg.src = "src/icons/delete2.png";
		deleteImg.style.width = "20px";
		deleteImg.style.height = "20px";
		deleter.style.border = "2px solid red";
		deleter.appendChild(deleteImg);	
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
		trackDetailNodes[0].style.flexBasis = "10px";	
		trackDetail.lastChild.style.flexBasis = "20px";
		
	}
	

	
	function highLightEvents(trackDetail){
		let trackDetails = trackDetail.childNodes;
		let trckNum = trackDetail.firstChild;
		let trckName = trckNum.nextSibling;
		
		//event for hovering over track name
		trckName.addEventListener("mouseover", 
		function(){
			trckName.style.cursor = "pointer";
			trackDetail.style.color = "green";
		});
		trckName.addEventListener("mouseout", 
		function(){
			trackDetail.style.color = "black";
		});

		//event for hovering aroung delete icon
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
				//stop currently playing song
				trackSrc.src = "";
				//assign tracksIndex to the clicked song
				tracksIndex = i;	
				//then play this clicked song
				uploadSong();
				highLight();
				
			});
		}
		
		
	}
	
	function songDeleteEvents(){

		let detail = playList.lastChild;
		let delDetail = detail.lastChild;
		
		delDetail.addEventListener("click", function(){
			//obtain track number of song to be deleted
			let pos = (detail.firstChild).innerHTML;
			//delete song from visual playlist
			detail.remove();
			//readjust numbering of visual playlist
			adjustIndex();
			//ensure row coloring is maintained
			//delete track from logic playlist
			splicePlayList(pos);
			themer(playList);
		});
	}
	
	//renumberes the track numbers after a song is deleted
	function adjustIndex(){
		
		let playing = playList.childNodes;
		
		for(let i = 0; i < playing.length; i++){
			
			let tNumber = playing[i].firstChild;
		
			tNumber.innerHTML = (i+1);
	
		}
		
	}
	
	//removes deleted track from logic playlist
	function splicePlayList(pos){
		//convert track number to index number
		let deletedIndex = parseInt(pos)-1;
		//delete track from playlist
		playListArr.splice(deletedIndex,1);
		songAddTracker--;
		//play next track if current track 
		//is deleted
		if((tracksIndex == deletedIndex) && (songAddTracker>=1)){
			tracksIndex--;
			next();
		}
		
	}//end:splicePlayList(pos)
	
	
	//chooses the next track in playlist
	function next(){
				
		if (isShuffle){
			shuffleSong();
		}
		
		//upon reaching last track in playlist...
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
		
		if((tracksIndex < playListArr.length-1)&& !(isShuffle)){

			tracksIndex++;
			uploadSong();
			
			highLight();
			
		}
		scrollToPlaying();
		
		
	}//end:next()
	
	
	//chooses previous track in playlist
	function previous(){
		
		//same as in next() above
		if (isShuffle){
			shuffleSong();
		}
		
		//upon reaching first track in playlist...
		if((tracksIndex == 0)&& !(isShuffle)){
			stop();
			return;
		}

		
		if((tracksIndex >0)&& !(isShuffle)){
			tracksIndex--;
			uploadSong();
			highLight();
			
		}

		scrollToPlaying();
		
	}//end:previous()
	
	function shuffleSong(){
		//generate random number within playList bounds 
			//and assign it to tracksIndex
			tracksIndex = Math.floor(Math.random()*playListArr.length);
			uploadSong();
			highLight();		
	}
	
	function stop(){
		tracksIndex = 0;
		currentTrack = tracksIndex+1;
		highLight();
		trackSrc.src = "";
	}
	
	//enables&disables playlist loop feature
	function loop(){
		//toggle loop variable
		isLoop = !isLoop;
		
		if(isLoop == true)
		{//choose the loop enable icon
			var loopOn = document.createElement("img");
			loopOn.src = "src/icons/loop_on_2.png";
			if(screen_600px.matches){
				loopOn.style.width = "50px"; 
				loopOn.style.height = "50px";
			}
			else{
				loopOn.style.width = "30px"; 
				loopOn.style.height = "30px";				
			}

			loopMusic.replaceChild(loopOn,loopMusic.firstChild);
		}
		else if (isLoop == false){//choose the loop disbled icon
			var loopOff = document.createElement("img");
			loopOff.src = "src/icons/loop_off_2.png";
			if(screen_600px.matches){
				loopOff.style.width = "50px"; 
				loopOff.style.height = "50px";
			}
			else{
				loopOff.style.width = "30px"; 
				loopOff.style.height = "30px";				
			}
			loopMusic.replaceChild(loopOff,loopMusic.firstChild);			
		}
			
		
	}//end:loop()
	
	function shuffle(){
		isShuffle = !isShuffle;
		
		if (isShuffle == true){
			var shuffleOn = document.createElement("img");
			shuffleOn.src = "src/icons/shuffle_on_2.png";
			if(screen_600px.matches){
				shuffleOn.style.width = "50px"; 
				shuffleOn.style.height = "50px";
			}
			else{
				shuffleOn.style.width = "30px"; 
				shuffleOn.style.height = "30px";				
			}

			shuffleMusic.replaceChild(shuffleOn,shuffleMusic.firstChild);			
		}
		else if (isShuffle == false){
			var shuffleOff = document.createElement("img");
			shuffleOff.src = "src/icons/shuffle_off_2.png";
			if(screen_600px.matches){
				shuffleOff.style.width = "50px"; 
				shuffleOff.style.height = "50px";
			}
			else{
				shuffleOff.style.width = "30px"; 
				shuffleOff.style.height = "30px";				
			}

			shuffleMusic.replaceChild(shuffleOff,shuffleMusic.firstChild);			
		}
	}
	
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

		let playRect = playList.childNodes;
		let trackPos = playRect[tracksIndex].offsetTop;
		playList.scrollTop = trackPos;
	}
	
	function updateCurrent(){//rename track details to cuurently playing
		let currentTrackName = playListArr[tracksIndex].name;
		document.getElementById("upperArtistName").innerHTML = defaultArtist;
		document.getElementById("lowerArtistName").innerHTML = defaultArtist;
		document.getElementById("upperTrackTitle").innerHTML
			= currentTrackName.substring(0,(currentTrackName.length-4));
		
		if(currentTrackName.length > 43){//truncates track name
			document.getElementById("lowerTrackTitle").innerHTML
				= currentTrackName.substring(0,25) + "...";
		}
		else {
			document.getElementById("lowerTrackTitle").innerHTML 
				= currentTrackName.substring(0,(currentTrackName.length-4));//remove filename extension
		}
	}//end:updateCurrent()
	
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
			document.getElementById("chartHeadingSmall").innerHTML = 
			settingsForm.elements["chartName"].value;
	
			document.getElementById("chartHeading").innerHTML = 
			settingsForm.elements["chartName"].value;			

		themeSettings();
		uploadFont();
		closeSettings();	
	}
	
	//handles coloring
	function themeSettings(){
		//color the face and footer 
		//using chosen color
		document.getElementById("upperSection").style.backgroundColor
			= settingsForm.elements["theme1"].value;
		document.getElementById("currentlyPlaying").style.backgroundColor
			= settingsForm.elements["theme1"].value;
			let rowColor = "gainsboro";
		
		//color even and odd rows of playlist 
		// with light grey and white
		let playLister = playList.childNodes;
		playLister[0].style.backgroundColor = "white";
 		for(let i = 1; i <playLister.length ; i++){
			let prev = playLister[i-1];
			if(prev.style.backgroundColor == "white")
				playLister[i].style.backgroundColor = rowColor;
			else if (prev.style.backgroundColor == rowColor)
				playLister[i].style.backgroundColor = "white"; 
		} 

	}//end:themeSettings()
	

	
	//uploads user font file 
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
		
	}//end:uploadFont()
	
	//implements @font-face everytime user uploads font
	function fontLoad(font){
		
		var f = new FontFace("Disney", "url('"+font+"')",{});
		//change font of document after font file is loaded
		f.load().then(function(loadedFace){
			document.fonts.add(loadedFace);
			document.body.style.fontFamily = "Disney, serif";
		});
		
	}//end:fontLoad()
	
	
	//hides settings form
	function closeSettings(){
		document.getElementById("mainSettings")
			.style.visibility = "hidden";
	}//end:closeSettings()
 
	//uploads mp3 file to audio element
	function uploadSong(){
		if(FileReader && playListArr && playListArr.length){
				
			var fr = new FileReader();
				
			fr.onload = function(){
				//load song file to audio element
				trackSrc.src = fr.result;
			}
				//read the file in audio element
				fr.readAsDataURL(playListArr[tracksIndex]); 
		}		
	}//end:uploadSong()
	




};