import { Octokit } from "@octokit/rest";
import 'regenerator-runtime/runtime'

const octokit = new Octokit();

repoFullfilled();

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

function repoObjectObtain() {
    return octokit.rest.repos.get({
        owner: "JustReq",
        repo: "JustReq"
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

async function repoFullfilled() {
    const repoObject = await (await repoObjectObtain()).data
    console.log(repoObject)
}