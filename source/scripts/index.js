import { Octokit } from "@octokit/rest";
import "regenerator-runtime/runtime";
import anime from "animejs/lib/anime.es.js";
import { random } from "animejs";

const octokit = new Octokit();
let randomUser;

window.onkeyup = keyup;

let inputTextValue;

function keyup(e) {
  inputTextValue = e.target.value;

  if (e.keyCode == 13) {
    userFullfilled();
  }
}

function userObjectObtain() {
  return octokit.rest.users.getByUsername({
    username: inputTextValue,
  });
}

function listOfUsers() {
  return octokit.rest.users.list().then(function (value) {
    randomUser =
      value.data[Math.floor(Math.random() * value.data.length)].login;

    document.getElementById("api-showcase-image").src =
      "https://github-readme-stats.vercel.app/api?username=" +
      randomUser +
      "&show_icons=true";
  });
}

listOfUsers();

async function userFullfilled() {
  const userObject = await (await userObjectObtain()).data;
  let userName = userObject.login;
  let avatarURL = userObject.avatar_url;
  let bio = userObject.bio;
  let creationDatePreformatted = new Date(userObject.created_at);
  let followers = userObject.followers;
  let following = userObject.following;
  let profileURL = userObject.html_url;
  let nickName = userObject.name;
  let repoCount = userObject.public_repos;

  let userFollowers = userObject.followers_url;

  let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
    creationDatePreformatted
  );
  let month = new Intl.DateTimeFormat("en", { month: "long" }).format(
    creationDatePreformatted
  );
  let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    creationDatePreformatted
  );

  let hour = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    hour12: false,
  }).format(creationDatePreformatted);
  let minute = new Intl.DateTimeFormat("en", { minute: "2-digit" }).format(
    creationDatePreformatted
  );
  let second = new Intl.DateTimeFormat("en", { second: "2-digit" }).format(
    creationDatePreformatted
  );

  let creationDateFormatted = `${month} ${day}, ${year}, at ${hour}:${minute}:${second}`;

  console.log(
    `Username: ${userName} \"${nickName}\" \nAvatar: ${avatarURL}\nStatus: \"${bio}\"\nCreated at ${creationDateFormatted}\nHas ${followers} followers\nFollowing ${following} users\nProfile: ${profileURL}\n${repoCount} public repositories`
  );

  document.getElementById(
    "name-text"
  ).innerHTML = `<a href="${profileURL}" target="_blank" id="profile-url-linker">${userName}</a> "${nickName}"`;
  document.getElementById("description-text").textContent = `Bio: ${bio}`;
  document.getElementById(
    "creation-date-text"
  ).textContent = `Created on ${creationDateFormatted}`;
  document.getElementById("image").src = `${avatarURL}`;

  fetch(userFollowers).then(
    (data) =>
      function followerPrint() {
        data.forEach((follower) => {
          console.log(follower);
        });
      }
  );
}

document
  .getElementById("users-nav-button")
  .addEventListener("mouseover", () => {
    document.getElementById("tooltip-text-container").style.opacity = 1;
    document.getElementById("tooltip-text").textContent =
      "Search for and view information about a user";
  });

document.getElementById("users-nav-button").addEventListener("mouseout", () => {
  document.getElementById("tooltip-text-container").style.opacity = 0;
  document.getElementById("tooltip-text").textContent = "";
});

document.getElementById("code-nav-button").addEventListener("mouseover", () => {
  document.getElementById("tooltip-text-container").style.opacity = 1;
  document.getElementById("tooltip-text").textContent =
    "Look through my spaghetti code";
});

document.getElementById("code-nav-button").addEventListener("mouseout", () => {
  document.getElementById("tooltip-text-container").style.opacity = 0;
  document.getElementById("tooltip-text").textContent = "";
});

document
  .getElementById("users-nav-button")
  .addEventListener("click", function mainPageAnimation() {
    let userMainHide = anime.timeline({
      easing: "cubicBezier(0.420, 0.000, 0.580, 1.000)",
      duration: 500,
    });

    userMainHide
      .add(
        {
          targets: document.getElementById("page-header"),
          top: 0,
        },
        0
      )

      .add(
        {
          targets: document.getElementById("subtitle-container"),
          opacity: 0,
        },
        0
      )

      .add(
        {
          targets: document.getElementById("navigation-section"),
          top: 300,
          opacity: 0,
        },
        0
      )

      .add(
        {
          targets: document.getElementById("navigation-section"),
          top: -100,
        },
        500
      )
      .add(
        {
          targets: document.getElementById("api-showcase-section"),
          top: 500,
          opacity: 0,
        },
        0
      )

      .add(
        {
          targets: document.getElementById("api-showcase-section"),
          top: -100,
        },
        500
      );

    let searchBar = anime.timeline({});
    searchBar
      .add({
        targets: document.getElementById("search-section"),
        top: 200,
        duration: 1,
        delay: 200,
      })

      .add({
        targets: document.getElementById("search-section"),
        opacity: 1,
        top: 152.5,
        duration: 800,
        delay: 300,
      });

    let infoPanel = anime.timeline({});
    infoPanel
      .add({
        targets: document.getElementById("information-section"),
        top: 275,
        duration: 1,
        delay: 250,
      })

      .add({
        targets: document.getElementById("information-section"),
        opacity: 1,
        top: 250,
        duration: 800,
        delay: 350,
      });
  });

document
  .getElementById("users-nav-button")
  .addEventListener("click", function () {
    document.getElementById("search-input").placeholder =
      "Search for a specific user";
  });

octokit.rest.users.list().then(() => {
  console.log;
});
