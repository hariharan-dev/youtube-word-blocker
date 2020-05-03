let blockedWordsMap = {
  corona: {
    key: "corona",
    count: 0,
  },
  கரோனா: {
    key: "கரோனா",
    count: 0,
  },
  கொரோனா: {
    key: "கொரோனா",
    count: 0,
  },
  anxiety: {
    key: "anxiety",
    count: 0,
  },
  lockdown: {
    key: "lockdown",
    count: 0,
  },
  covid: {
    key: "covid",
    count: 0,
  },
  "covid-19": {
    key: "covid",
    count: 0,
  },
  virus: {
    key: "virus",
    count: 0,
  },
  quarantine: {
    key: "quarantine",
    count: 0,
  },
};
let scrollDebouncer;
let allVideosTitles;

document.onscroll = function () {
  clearTimeout(scrollDebouncer);
  scrollDebouncer = setTimeout(() => fetchVideos(), 1000);
};

fetchVideos();

function fetchVideos() {
  allVideosTitles = document.querySelectorAll("#video-title");
  allVideosTitles.forEach((el) => {
    let videoTitle = el.innerText.toLowerCase();
    for (let word in blockedWordsMap) {
      if (videoTitle.search(word) === -1) {
        continue;
      }
      let parentEl = el.closest("ytd-rich-item-renderer");
      if (!parentEl) {
        break;
      }
      if (parentEl.classList.contains("ytb-blocked")) {
        continue;
      }
      blockVideo(parentEl, word);
      break;
    }
  });
  logStats();
}

function blockVideo(element, word) {
  element.classList.add("ytb-blocked");
  element.style.opacity = 0; // hids the video without affecting layout
  element.style.pointerEvents = "none"; // restricts all kind of mouse events
  blockedWordsMap[word].count++;
}

function logStats() {
  console.log(`Videos checked: ${allVideosTitles.length}`);
  for (let word in blockedWordsMap) {
    if (blockedWordsMap[word].count === 0) {
      continue;
    }
    console.log(`${word}: ${blockedWordsMap[word].count}`);
  }
}
