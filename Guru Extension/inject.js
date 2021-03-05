console.log(" ********************************************************* ");
var pages = 6;
var posts = new Array();
var p = 3;
var status = 0;
chrome.runtime.sendMessage({ message: "started" }, response => { });
document.getElementsByTagName('body')[0].style.overflow = 'hidden';
function getPosts() {
  var allPostInLI = document.getElementsByClassName("module_list cozy")[0].getElementsByTagName("li");
  console.log("all posts", allPostInLI.length)
  for (var i = 0; i < allPostInLI.length-1; i++) {
    var postId = allPostInLI[i].getAttribute("data-id");
    if(!postId) {continue;}
    console.log(postId);
    var jobtitle = allPostInLI[i].getElementsByClassName("jobRecord__title")[0].getElementsByTagName("a")[0].innerHTML.trim().replace(/\n/g, '');
    var jobDescription = allPostInLI[i].getElementsByClassName("jobRecord__desc")[0].innerText.trim().replace(/\n/g, '');
    var budget = allPostInLI[i].getElementsByClassName("jobRecord__budget")[0].getElementsByTagName("span")[0].innerText.trim();
    var slength = allPostInLI[i].getElementsByClassName("skillsList__skill--hasHover").length;
    var tskills = new Array();
    for(m=0; m<slength-1;m++) {
      tskills.push(allPostInLI[i].getElementsByClassName("skillsList__skill--hasHover")[m].innerHTML.trim());
    }
    console.log("skills",tskills);
    skills = tskills.join(',');
    var link = allPostInLI[i].getElementsByClassName("jobRecord__title")[0].getElementsByTagName("a")[0].getAttribute('href');
    var d = new Date();
    time = d.toLocaleString();
    console.log("Job Title: ", jobtitle);
    console.log("Job Description: ", jobDescription);
    console.log("Budget: ", budget);
    console.log("Link: ", link)
    console.log(" ********************************************************* ");
    var tposts = {
      TimeStamp: time,
      Job_Id: postId.trim(),
      Job_Title: jobtitle,
      Job_Description: jobDescription,
      Budget: budget,
      Skills: skills,
      Job_link: "https://www.guru.com"+link
    }
    posts.push(tposts);
  }
  plength = document.getElementsByClassName("pagination")[0].getElementsByTagName("li").length;
  for(i=0; i<plength-1; i++) {
     var pclass = document.getElementsByClassName("pagination")[0].getElementsByTagName("li")[i].getAttribute('class');
      console.log("class",pclass);
      if(pclass=="active") {
        console.log("class",pclass);
          document.getElementsByClassName("pagination")[0].getElementsByTagName("li")[i+1].getElementsByTagName('a')[0].click();
          break;
      }
  }
  console.log("posts", posts);
  console.log("status", status);
  if(status == Number(pages)) {
    console.log("data", posts);
    chrome.runtime.sendMessage({ data: posts, message: "done" }, function (response) {
      var pdata = {data: posts}
      var http = new XMLHttpRequest();
      var url = 'http://localhost:8080/guru';
      var data = JSON.stringify(pdata);
      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.onreadystatechange = function () {
        if (http.readyState == 1) {
          chrome.runtime.sendMessage({message: "loading" }, function (response) {})
        }
        if (http.readyState == 4 && http.status == 200) {
          document.getElementsByTagName('body')[0].style.overflow = 'auto';
          console.log("Execution Completed");
          chrome.runtime.sendMessage({message: "completed"}, response => {})
        }
      }
      http.send(data);
    });
  }
}
var k = 0;
for (j = 0; j < Number(pages); j++) {
  setTimeout((function () {
    status++;
    getPosts(); 
  }), 4000 * k)

  k++;
}

