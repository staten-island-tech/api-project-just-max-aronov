import { Octokit } from "@octokit/rest";
import 'regenerator-runtime/runtime'

const octokit = new Octokit();

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
        username: inputTextValue
    });
}

async function userFullfilled() {
    const userObject = await (await userObjectObtain()).data
    let userName = userObject.login;
    let avatarURL = userObject.avatar_url;
    let bio = userObject.bio;
    let creationDate = userObject.created_at;
    let followers = userObject.followers;
    let following = userObject.following;
    let profileURL = userObject.html_url;
    let nickName = userObject.name;
    let repoCount = userObject.public_repos;
    document.getElementById("user-information").innerHTML = `Username: ${userName} \"${nickName}\" <br>Avatar: ${avatarURL}<br>Status: \"${bio}\"<br>Created at ${creationDate}<br>Has ${followers} followers<br>Follwing ${following} users<br>Profile: ${profileURL}<br>${repoCount} public repositories`;
}

document.getElementById("users-nav-button").addEventListener("mouseover", () => {
    document.getElementById("tooltip-text-container").style.opacity = 1;
    document.getElementById("tooltip-text").textContent = "Search for and view information about a user";
})

document.getElementById("users-nav-button").addEventListener("mouseout", () => {
    document.getElementById("tooltip-text-container").style.opacity = 0;
    document.getElementById("tooltip-text").textContent = "";
})

document.getElementById("repos-nav-button").addEventListener("mouseover", () => {
    document.getElementById("tooltip-text-container").style.opacity = 1;
    document.getElementById("tooltip-text").textContent = "Search for and view information about a repository";
})

document.getElementById("repos-nav-button").addEventListener("mouseout", () => {
    document.getElementById("tooltip-text-container").style.opacity = 0;
    document.getElementById("tooltip-text").textContent = "";
})

document.getElementById("code-nav-button").addEventListener("mouseover", () => {
    document.getElementById("tooltip-text-container").style.opacity = 1;
    document.getElementById("tooltip-text").textContent = "Traverse through and cringe at my spaghetti code";
})

document.getElementById("code-nav-button").addEventListener("mouseout", () => {
    document.getElementById("tooltip-text-container").style.opacity = 0;
    document.getElementById("tooltip-text").textContent = "";
})

setInterval(function() {
    console.log(window["tooltip-text"])
}, 1000);