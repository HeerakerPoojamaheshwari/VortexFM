const gradients = [

"linear-gradient(135deg,#ff00ff,#000428)",

"linear-gradient(135deg,#00ffff,#001510)",

"linear-gradient(135deg,#ff512f,#dd2476)",

"linear-gradient(135deg,#00ff99,#003322)",

"linear-gradient(135deg,#8e2de2,#4a00e0)"

];

const aiMessages = [

"Late night coding vibes detected...",

"Entering emotional orbit...",

"Rain mode activated...",

"Heartbreak frequencies rising...",

"Dreamscape mode online...",

"Neon energy increasing..."

];

const lyricsLines = [

"Lost in the neon lights...",

"Driving through endless nights...",

"Your heartbeat echoes slowly...",

"Rain falls across the skyline...",

"Music heals the universe..."

];

const songsList = [

{
id:0,
title:"I Think They Call This Love",
artist:"Matthew Ifield",
cover:"assets/I-think-they-call-this-love.jpg",
filePath:"assets/love.mp3"
},

{
id:1,
title:"Bairan",
artist:"Banjaare",
cover:"assets/bairan.jpg",
filePath:"assets/Bairan Banjaare (pagalall.com).mp3"
},

{
id:2,
title:"Arz Kiya Hai",
artist:"Anuv Jain",
cover:"assets/arz-kiya-hai.jpg",
filePath:"assets/ssVid.net--Anuv-Jain-X-Lost-Stories-Arz-Kiya-Hai-Official.mp3"
},

{
id:3,
title:"Dooron Dooron",
artist:"Paresh Pahuja",
cover:"assets/dooron dooron.jpg",
filePath:"assets/Dooron.mp3"
},

{
id:4,
title:"Lover",
artist:"Taylor Swift",
cover:"assets/lover.jpg",
filePath:"assets/Taylor Swift - Lover (Official Music Video).mp3"
},

{
id:5,
title:"Love Me Like You Do",
artist:"Ellie Goulding",
cover:"assets/love-me-like-you-do.jpg",
filePath:"assets/SpotiDown.App - Love Me Like You Do - Ellie Goulding.mp3"
}

];

const songsContainer =
document.getElementById("songs-container");

const searchInput =
document.getElementById("search-input");

const playBtn =
document.getElementById("play-btn");

const prevBtn =
document.getElementById("prev-btn");

const nextBtn =
document.getElementById("next-btn");

const shuffleBtn =
document.getElementById("shuffle-btn");

const repeatBtn =
document.getElementById("repeat-btn");

const playerTitle =
document.getElementById("player-song-title");

const playerArtist =
document.getElementById("player-artist-name");

const playerArt =
document.getElementById("player-album-art");

const progressBar =
document.getElementById("progress-bar");

const currentTimeEl =
document.getElementById("current-time");

const durationEl =
document.getElementById("duration");

const volumeSlider =
document.getElementById("volume-slider");

const visualizer =
document.querySelector(".visualizer");

const toast =
document.getElementById("toast");

const aiDJText =
document.getElementById("ai-dj-text");

/* FULLSCREEN */

const fullscreenPlayer =
document.getElementById("fullscreen-player");

const fullscreenAlbumArt =
document.getElementById("fullscreen-album-art");

const fullscreenTitle =
document.getElementById("fullscreen-song-title");

const fullscreenArtist =
document.getElementById("fullscreen-artist-name");

const closeFullscreenBtn =
document.getElementById("close-fullscreen");

const fsPlayBtn =
document.getElementById("fs-play-btn");

const fsPrevBtn =
document.getElementById("fs-prev-btn");

const fsNextBtn =
document.getElementById("fs-next-btn");

const lyricsText =
document.getElementById("lyrics-text");

let currentSongIndex = 0;

let isPlaying = false;

let isShuffle = false;

let isRepeat = false;

const audio = new Audio();

audio.volume = 1;

/* RENDER SONGS */

function renderSongs(songs){

songsContainer.innerHTML = "";

songs.forEach(song=>{

const card =
document.createElement("div");

card.classList.add("song-card");

card.innerHTML = `

<img src="${song.cover}">

<h3>${song.title}</h3>

<p>${song.artist}</p>

`;

card.addEventListener("click",()=>{

loadSong(song.id);

playSong();

});

songsContainer.appendChild(card);

});

}

/* ACTIVE SONG */

function updateActiveSong(){

const cards =
document.querySelectorAll(".song-card");

cards.forEach(card=>{

card.classList.remove("active");

});

cards[currentSongIndex]
?.classList.add("active");

}

/* LOAD SONG */

function loadSong(index){

currentSongIndex = index;

const song = songsList[index];

audio.src = song.filePath;

playerTitle.textContent =
song.title;

playerArtist.textContent =
song.artist;

playerArt.src =
song.cover;

fullscreenAlbumArt.src =
song.cover;

fullscreenTitle.textContent =
song.title;

fullscreenArtist.textContent =
song.artist;

/* DYNAMIC BACKGROUND */

document.body.style.background =
gradients[
index % gradients.length
];

/* LYRICS */

lyricsText.textContent =
lyricsLines[
index % lyricsLines.length
];

/* AI DJ */

aiDJText.textContent =
aiMessages[
Math.floor(
Math.random() *
aiMessages.length
)
];

updateActiveSong();

}

/* PLAY */

function playSong(){

audio.play();

isPlaying = true;

playBtn.innerHTML =
'<i class="fa-solid fa-pause"></i>';

fsPlayBtn.innerHTML =
'<i class="fa-solid fa-pause"></i>';

visualizer.classList.add("playing");

playerArt.classList.add("playing");

fullscreenAlbumArt
.classList.add("playing");

showToast(
`🎵 Playing ${songsList[currentSongIndex].title}`
);

}

/* PAUSE */

function pauseSong(){

audio.pause();

isPlaying = false;

playBtn.innerHTML =
'<i class="fa-solid fa-play"></i>';

fsPlayBtn.innerHTML =
'<i class="fa-solid fa-play"></i>';

visualizer.classList.remove("playing");

playerArt.classList.remove("playing");

fullscreenAlbumArt
.classList.remove("playing");

}

/* PLAY BUTTON */

playBtn.addEventListener("click",()=>{

if(!audio.src){

loadSong(0);

playSong();

return;

}

if(audio.paused){

playSong();

}else{

pauseSong();

}

});

/* NEXT */

nextBtn.addEventListener("click",()=>{

if(isShuffle){

currentSongIndex =
Math.floor(
Math.random() *
songsList.length
);

}else{

currentSongIndex++;

if(currentSongIndex >= songsList.length){

currentSongIndex = 0;

}

}

loadSong(currentSongIndex);

playSong();

});

/* PREV */

prevBtn.addEventListener("click",()=>{

currentSongIndex--;

if(currentSongIndex < 0){

currentSongIndex =
songsList.length - 1;

}

loadSong(currentSongIndex);

playSong();

});

/* SONG END */

audio.addEventListener("ended",()=>{

if(isRepeat){

playSong();

return;

}

nextBtn.click();

});

/* PROGRESS */

audio.addEventListener("timeupdate",()=>{

const progress =
(audio.currentTime / audio.duration)
* 100;

progressBar.value =
progress || 0;

currentTimeEl.textContent =
formatTime(audio.currentTime);

durationEl.textContent =
formatTime(audio.duration);

});

/* SEEK */

progressBar.addEventListener("input",()=>{

audio.currentTime =
(progressBar.value / 100)
* audio.duration;

});

/* VOLUME */

volumeSlider.addEventListener("input",()=>{

audio.volume =
volumeSlider.value / 100;

});

/* SHUFFLE */

shuffleBtn.addEventListener("click",()=>{

isShuffle = !isShuffle;

shuffleBtn.style.color =
isShuffle ? "#00ff99" : "white";

});

/* REPEAT */

repeatBtn.addEventListener("click",()=>{

isRepeat = !isRepeat;

repeatBtn.style.color =
isRepeat ? "#00ff99" : "white";

});

/* SEARCH */

searchInput.addEventListener("input",()=>{

const value =
searchInput.value.toLowerCase();

const filteredSongs =
songsList.filter(song=>

song.title.toLowerCase()
.includes(value)

||

song.artist.toLowerCase()
.includes(value)

);

renderSongs(filteredSongs);

});

/* FORMAT */

function formatTime(time){

if(isNaN(time))
return "0:00";

const minutes =
Math.floor(time / 60);

const seconds =
Math.floor(time % 60);

return `${minutes}:${
seconds < 10 ? "0" : ""
}${seconds}`;

}

/* TOAST */

function showToast(message){

toast.textContent =
message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}

/* SAVE SONG */

window.addEventListener("beforeunload",()=>{

localStorage.setItem(
"lastSong",
currentSongIndex
);

});

/* LOAD SAVED */

window.addEventListener("load",()=>{

const savedSong =
localStorage.getItem("lastSong");

if(savedSong !== null){

loadSong(Number(savedSong));

}

});

/* KEYBOARD */

document.addEventListener("keydown",(e)=>{

if(e.code === "Space"){

e.preventDefault();

if(isPlaying){

pauseSong();

}else{

playSong();

}

}

if(e.code === "ArrowRight"){

nextBtn.click();

}

if(e.code === "ArrowLeft"){

prevBtn.click();

}

});

/* FULLSCREEN OPEN */

playerArt.addEventListener("click",()=>{

fullscreenPlayer
.classList.add("show");

});

/* FULLSCREEN CLOSE */

closeFullscreenBtn
.addEventListener("click",()=>{

fullscreenPlayer
.classList.remove("show");

});

/* FULLSCREEN PLAY */

fsPlayBtn.addEventListener("click",()=>{

if(audio.paused){

playSong();

}else{

pauseSong();

}

});

/* FULLSCREEN NEXT */

fsNextBtn.addEventListener("click",()=>{

nextBtn.click();

});

/* FULLSCREEN PREV */

fsPrevBtn.addEventListener("click",()=>{

prevBtn.click();

});

/* MOOD ENGINE */

const moodButtons =
document.querySelectorAll(".mood-btn");

moodButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

const mood =
btn.textContent;

showToast(
`🌌 Mood Activated: ${mood}`
);

if(mood.includes("Rain")){

document.body.style.background =
"linear-gradient(135deg,#00111f,#000)";

}

if(mood.includes("Dream")){

document.body.style.background =
"linear-gradient(135deg,#4a00e0,#8e2de2)";

}

if(mood.includes("Focus")){

document.body.style.background =
"linear-gradient(135deg,#001510,#000)";

}

});

});

/* INITIAL */

renderSongs(songsList);