const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const currentSongEl = document.getElementById("currentSong");

let songs = []; // loaded from songs.json
let index = 0;

function loadSong(i) {
  index = i;
  audio.src = songs[i].url;
  currentSongEl.innerText = songs[i].name;
  audio.play();
  highlightSong();
}

function togglePlay() {
  audio.paused ? audio.play() : audio.pause();
}

function nextSong() {
  index = (index + 1) % songs.length;
  loadSong(index);
}

function prevSong() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
}

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.innerText = format(audio.currentTime);
  durationEl.innerText = format(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.addEventListener("ended", nextSong);

function format(sec) {
  if (!sec) return "0:00";
  let m = Math.floor(sec / 60);
  let s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function highlightSong() {
  document.querySelectorAll(".song").forEach((s, i) => {
    s.classList.toggle("active", i === index);
  });
}

songs.forEach((song, i) => {
  const div = document.createElement("div");
  div.className = "song";
  div.innerText = song.name;
  div.onclick = () => loadSong(i);
  document.getElementById("songList").appendChild(div);
});
