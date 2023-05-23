let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');


let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [{
			
	// Hindi Songs
		name: "Dil Dhadakne Do",
		path: "Songs/Dil Dhadakne Do.mp3",
		img: "Songs/Song1.jpg",
		singer: "Shankar Mahadevan"
	},
	{
		name: "Khairiyat",
		path: "Songs/Khairiyat.mp3",
		img: "Songs/Khairiyat.jpg",
		singer: "Pritam, Arijit Singh"
	},
	{
		name: "Shayad",
		path: "Songs/Shayad.mp3",
		img: "Songs/Shayad.jpg",
		singer: "Arijit Singh"
	},
    {
		name: "Kabira",
		path: "Songs/kabira.mp3",
		img: "Songs/kabira.jpg",
		singer: "Pritam"
	},
	{
		name: "Subhanallah",
		path: "Songs/subhanallah.mp3",
		img: "Songs/subhanallah.jpg",
		singer: "Pritam"
	},
	{
		name: "Chand Baaliyan",
		path: "Chand Baaliyan.mp3",
		img: "Chand Baaliyan.jpg",
		singer: "Aditya A"
	},
		// English Songs
		{
			name: "Shapeofyou",
			path: "Songs/English/Shapeofyou.mp3",
			img: "Songs/English/Shapeofyou.jpg",
			singer: "Pritam, Arijit Singh"
		},
		{
			name: "Khairiyat",
			path: "Songs/Khairiyat.mp3",
			img: "Songs/Khairiyat.jpg",
			singer: "Pritam, Arijit Singh"
		},
		{
			name: "Khairiyat",
			path: "Songs/Khairiyat.mp3",
			img: "Songs/Khairiyat.jpg",
			singer: "Pritam, Arijit Singh"
		},
		{
			name: "Khairiyat",
			path: "Songs/Khairiyat.mp3",
			img: "Songs/Khairiyat.jpg",
			singer: "Pritam, Arijit Singh"
		},
		{
			name: "Khairiyat",
			path: "Songs/Khairiyat.mp3",
			img: "Songs/Khairiyat.jpg",
			singer: "Pritam, Arijit Singh"
		},

	
		// Punjabi Songs
	{
		name: "295",
		path: "Songs/Punjabi/295.mp3",
		img: "Songs/Punjabi/295.jpg",
		singer: "Sidhu Mosse Wala"
	},
	{
		name: "Spain",
		path: "Songs/Punjabi/Spain.mp3",
		img: "Songs/Punjabi/Spain.jpg",
		singer: "Jassa Dhillon"
	},
	{
		name: "Notorious",
		path: "Songs/Punjabi/Notorious.mp3",
		img: "Songs/Punjabi/Notorious.jpg",
		singer: "Jassa Dhillon"
	},
	{
		name: "Levels",
		path: "Songs/Punjabi/levels.mp3",
		img: "Songs/Punjabi/levels.jpg",
		singer: "Sidhu Mosse Wala"
	},
	{
		name: "Thaa",
		path: "Songs/Punjabi/Thaa.mp3",
		img: "Songs/Punjabi/Thaa.jpg",
		singer: "Varinder Brar"
	},
];


// All functions


// function load the track
function load_track(index_no) {
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;
	track_image.src = All_song[index_no].img;
	artist.innerHTML = All_song[index_no].singer;
	track.load();

	timer = setInterval(range_slider, 1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound() {
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
function justplay() {
	if (Playing_song == false) {
		playsong();

	} else {
		pausesong();
	}
}


// reset song slider
function reset_slider() {
	slider.value = 0;
}

// play song
function playsong() {
	track.play();
	Playing_song = true;
	play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong() {
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song() {
	if (index_no < All_song.length - 1) {
		index_no += 1;
		load_track(index_no);
		playsong();
	} else {
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song() {
	if (index_no > 0) {
		index_no -= 1;
		load_track(index_no);
		playsong();

	} else {
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change() {
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration() {
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch() {
	if (autoplay == 1) {
		autoplay = 0;
		auto_play.style.background = "rgba(255,255,255,0.2)";
	} else {
		autoplay = 1;
		auto_play.style.background = "#FF8A65";
	}
}


function range_slider() {
	let position = 0;

	// update slider position
	if (!isNaN(track.duration)) {
		position = track.currentTime * (100 / track.duration);
		slider.value = position;
	}


	// function will run when the song is over
	if (track.ended) {
		play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
		if (autoplay == 1) {
			index_no += 1;
			load_track(index_no);
			playsong();
		}
	}
}
