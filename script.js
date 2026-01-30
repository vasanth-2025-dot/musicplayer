let songs = [];
let index = 0;
let shuffle = false;
let repeat = "all";

const audio = document.getElementById("audio");
const title = document.getElementById("name");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const playlist = document.getElementById("playlist");

fetch("songs.json")
  .then(res => res.json())
  .then(data => {
    songs = data.songs;
    buildPlaylist();
    loadSong(index);
  });

function loadSong(i) {
  audio.src = songs[i].url;
  title.textContent = songs[i].name;
  artist.textContent = songs[i].artist;
  cover.src = songs[i].cover;
  audio.play();
}

function nextSong() {
  if (shuffle) {
    index = Math.floor(Math.random() * songs.length);
  } else {
    index = (index + 1) % songs.length;
  }
  loadSong(index);
}

function prevSong() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
}

function togglePlay() {
  audio.paused ? audio.play() : audio.pause();
}

function toggleShuffle() {
  shuffle = !shuffle;
  alert("Shuffle: " + shuffle);
}

function toggleRepeat() {
  repeat = repeat === "all" ? "one" : "all";
  alert("Repeat: " + repeat);
}

audio.addEventListener("ended", () => {
  if (repeat === "one") {
    loadSong(index);
  } else {
    nextSong();
  }
});

audio.addEventListener("timeupdate", () => {
  progress.style.width =
    (audio.currentTime / audio.duration) * 100 + "%";
});

function seek(e) {
  const width = e.target.clientWidth;
  audio.currentTime =
    (e.offsetX / width) * audio.duration;
}

function buildPlaylist() {
  playlist.innerHTML = "";
  songs.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "song";
    div.textContent = s.title + " - " + s.artist;
    div.onclick = () => {
      index = i;
      loadSong(i);
    };
    playlist.appendChild(div);
  });
}
