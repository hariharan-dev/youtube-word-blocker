let blockedWords = [
  "corona",
  "கரோனா",
  "anxiety",
  "lockdown",
  "covid",
  "covid-19",
  "virus",
  "quarantine",
];
let hiddenVideosCount = 0;
// TO-DO should update only on scroll
setInterval(() => fetchVideos(), 3000);

function fetchVideos() {
  let allVideosTitles = document.querySelectorAll("#video-title");
  console.log(`All videos count ${allVideosTitles.length}`);
  allVideosTitles.forEach((el) => {
    let videoTitle = el.innerText.toLowerCase();
    for (let word of blockedWords) {
      if (videoTitle.search(word) > -1) {
        let parentEl = el.closest("ytd-rich-item-renderer");
        if (parentEl.classList.contains("ytb-blocked")) {
          continue;
        }
        blockVideo(parentEl);
        break;
      }
    }
  });
}

function blockVideo(element) {
  element.classList.add("ytb-blocked");
  element.style.opacity = 0;
  element.style.pointerEvents = "none";
  console.log(`${++hiddenVideosCount} videos hid`);
}
