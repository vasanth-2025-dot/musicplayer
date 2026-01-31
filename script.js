let songs = [];
let currentIndex = 0;

const audio = document.getElementById("audio");
const songTitle = document.getElementById("song-title");
const playlist = document.getElementById("playlist");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

fetch("songs.json")
  .then(res => res.json())
  .then(data => {
    songs = data;
    loadSong(0);
    renderPlaylist();
  });

function loadSong(index) {
  currentIndex = index;
  audio.src = songs[index].url;
  songTitle.textContent = songs[index].name;
  audio.play();
  updateActive();
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
}

function togglePlay() {
  audio.paused ? audio.play() : audio.pause();
}

audio.addEventListener("ended", nextSong);

/* Playlist */
function renderPlaylist() {
  playlist.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.name;
    li.onclick = () => loadSong(index);
    playlist.appendChild(li);
  });
}

function updateActive() {
  document.querySelectorAll("#playlist li").forEach((li, i) => {
    li.classList.toggle("active", i === currentIndex);
  });
}

/* Time Update */
audio.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}
