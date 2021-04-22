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
        username: inputTextValue,
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
    console.log(`Username ${userName} \"${nickName}\" \nAvatar: ${avatarURL}\nStatus: \"${bio}\"\nCreated at ${creationDate}\nHas ${followers} followers\nFollwing ${following} users\nProfile: ${profileURL}\n${repoCount} public repositories`)
}