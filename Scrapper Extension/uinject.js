var frating = 'false';
chrome.runtime.sendMessage({ message: "ustarted" }, async response => {
    response = await response;
    if(response == 'true') {
      frating = 'true';
    }
});
document.getElementsByTagName('body')[0].style.overflow = 'hidden';
console.log(" ********************************************************* ");
var k = 0;
var i = 0;
var status = 0;
var pages = 10;
for (j = 0; j < Number(pages); j++) {
    setTimeout((function () {
        document.getElementsByClassName('load-more-button')[0].click();
        console.log(k);
        status++;
        console.log("Status", status);
        if (status == Number(pages)) {
            console.log("Started");
            getPosts();
        }
    }), 2000 * k)
    k++;
    console.log("Helllo", status)
};

var posts = new Array();
var p = 3;
var status = 0;
function getPosts() {
    var allPosts = document.getElementsByClassName("job-tile");
    console.log("all posts", allPosts.length)
    if (allPosts.length !== 100) {
        var n = allPosts.length / 100;
        n = n - 1
        i = 100 * n
    }
    for (i; i < allPosts.length; i++) {
        if(frating == 'true') {
            var rating = allPosts[i].getElementsByClassName('popover')[0].innerHTML;
            //rating = rating[0];
            alert(rating);
            break;
        }
        console.log(i);
        console.log(allPosts[i])
        var jobtitle = allPosts[i].getElementsByClassName("job-title-link")[0].innerHTML.trim().replace(/\n/g, '');
        var jobDescription = allPosts[i].getElementsByClassName("description")[0].getElementsByClassName("ng-binding")[0].innerText.trim().replace(/\n/g, '');
        var budget = allPosts[i].getElementsByClassName("row")[0].getElementsByClassName("js-type")[0].innerText.trim();
        if (allPosts[i].getElementsByClassName("js-skills")[0]) {
            var slength = allPosts[i].getElementsByClassName("js-skills")[0].getElementsByClassName('ng-binding').length;
            var tskills = new Array();
            for (m = 0; m < slength; m++) {
                tskills.push(allPosts[i].getElementsByClassName("js-skills")[0].getElementsByClassName('ng-binding')[m].innerHTML.trim());
            }
        }

        console.log("skills", tskills);
        skills = tskills.join(',');
        var link = allPosts[i].getElementsByClassName("job-title-link")[0].getAttribute('href');
        var d = new Date();
        time = d.toLocaleString();
        console.log("Job Title: ", jobtitle);
        console.log("Job Description: ", jobDescription);
        console.log("Budget: ", budget);
        console.log("Link: ", link)
        console.log(" ********************************************************* ");
        var tposts = {
            TimeStamp: time,
            Job_Title: jobtitle,
            Job_Description: jobDescription,
            Budget: budget,
            Skills: skills,
            Job_link: "https://www.upwork.com" + link
        }
        posts.push(tposts);
        if (i == allPosts.length-1) {
            console.log("data", posts);
            chrome.runtime.sendMessage({ data: posts, message: "udone" }, function (response) {
              var pdata = {data: posts}
              var http = new XMLHttpRequest();
              var url = 'http://localhost:8080/upwork';
              var data = JSON.stringify(pdata);
              http.open('POST', url, true);
              http.setRequestHeader('Content-type', 'application/json');
              http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                  document.getElementsByTagName('body')[0].style.overflow = 'auto';
                  console.log("Execution Completed");
                  chrome.runtime.sendMessage({message: "ucompleted"}, response => {})
                }
              }
              http.send(data);
            });
        }
    }
    console.log("posts", posts);
    console.log("status", status);

}

