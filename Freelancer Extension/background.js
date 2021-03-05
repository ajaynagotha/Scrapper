
document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    if (url == "https://www.guru.com/work/") {
      document.getElementById('grunit').style.display = 'block'
    }
    if (url == "https://www.freelancer.com/search/projects/?ngsw-bypass=&w=f") {
      document.getElementById('runit').style.display = 'block'
    }
    if (url == "https://www.upwork.com/ab/find-work/") {
      document.getElementById('urunit').style.display = 'block'
    }
  });
})
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == 'started') {
    document.getElementsByTagName('body')[0].innerHTML += "<div id='loader' style='z-index:1000;position:absolute;left:0;top:0;height:100vh;width:100%;background:rgb(0,0,0,0.5);display:flex;flex-direction:column;justify-content:center'><h1 style='color:white;width:100%;text-align:center'>Loading...<br/>Please Wait</h1></div>";
    document.getElementById('result').style.display = 'none';
  }
  else if (request.message == 'gstarted') {
    document.getElementsByTagName('body')[0].innerHTML += "<div id='loader' style='z-index:1000;position:absolute;left:0;top:0;height:100vh;width:100%;background:rgb(0,0,0,0.5);display:flex;flex-direction:column;justify-content:center'><h1 style='color:white;width:100%;text-align:center'>Loading...<br/>Please Wait</h1></div>";
    document.getElementById('result').style.display = 'none';
  }
  else if (request.message == 'ustarted') {
    document.getElementsByTagName('body')[0].innerHTML += "<div id='loader' style='z-index:1000;position:absolute;left:0;top:0;height:100vh;width:100%;background:rgb(0,0,0,0.5);display:flex;flex-direction:column;justify-content:center'><h1 style='color:white;width:100%;text-align:center'>Loading...<br/>Please Wait</h1></div>";
    document.getElementById('result').style.display = 'none';
  }
  else if (request.message == 'completed') {
    document.getElementById('loader').remove();
    document.getElementById('result').style.display = 'block';
  }
  else if (request.message == 'gcompleted') {
    document.getElementById('loader').remove();
    document.getElementById('result').style.display = 'block';
  }
  else if (request.message == 'ucompleted') {
    document.getElementById('loader').remove();
    document.getElementById('result').style.display = 'block';
  }
  else if (request.message == "run script") {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let url = tabs[0].url;
      if (url == "https://www.freelancer.com/search/projects/?ngsw-bypass=&w=f") {
        chrome.tabs.executeScript({
          file: 'inject.js'
        })
      }
    });
  }
  else if (request.message == "grun script") {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let url = tabs[0].url;
      if (url != "https://www.guru.com/work/") {
        url = url.split('?');
        url = url[0]
        console.log(url);
      }
      if (url == "https://www.guru.com/work/") {
        chrome.tabs.executeScript({
          file: 'ginject.js'
        })
      }
    });
  }
  else if (request.message == "urun script") {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let url = tabs[0].url;
      if (url == "https://www.upwork.com/ab/find-work/") {
        chrome.tabs.executeScript({
          file: 'uinject.js'
        })
      }
    });
  }
  else if (request.message == "done") {
    sendResponse("ok")
  }
  else if (request.message == "gdone") {
    sendResponse("ok")
  }
  else if (request.message == "udone") {
    sendResponse("ok")
  }
  else {
    chrome.tabs.create({
      url: chrome.extension.getURL('./index.html'),
      active: false
    }, function (tab) {
      // After the tab has been created, open a window to inject the tab
      chrome.windows.create({
        tabId: tab.id,
        type: 'popup',
        focused: true
      });
    });
  }
  return true;
});