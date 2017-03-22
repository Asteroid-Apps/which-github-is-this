import ext from "./utils/ext";

var extractTags = () => {
  var url = document.location.href;
  if(!url || !url.match(/^http/)) return;

  var data = {
    title: "",
    description: "",
    url: document.location.href
  }

  var ogTitle = document.querySelector("meta[property='og:title']");
  if(ogTitle) {
    data.title = ogTitle.getAttribute("content")
  } else {
    data.title = document.title
  }

  var descriptionTag = document.querySelector("meta[property='og:description']") || document.querySelector("meta[name='description']")
  if(descriptionTag) {
    data.description = descriptionTag.getAttribute("content")
  }

  console.log("Hiiiii");

  return data;
}

function onRequest(request, sender, sendResponse) {
  if (request.action === 'process-page') {
    console.log(request);
    if(document.getElementsByClassName("header")[0]) {
      document.getElementsByClassName("header")[0].style.background = request.background;
      document.getElementsByClassName("header")[0].style.color = request.foreground;
    }
    if(document.getElementsByClassName("header-search-wrapper")[0]) {
      document.getElementsByClassName("header-search-wrapper")[0].style.background = "rgba(255,255,255,0.125)";
      document.getElementsByClassName("header-search-wrapper")[0].style.color = request.foreground;
      document.getElementsByClassName("header-search-wrapper")[0].style.border = "none";
    }
    if(document.getElementsByClassName("mail-status")[0]) {
      document.getElementsByClassName("mail-status")[0].style.borderColor = request.background;
      document.getElementsByClassName("mail-status")[0].style.background = request.foreground;
      document.getElementsByClassName("mail-status")[0].style.backgroundImage = "none";
    }
    if(document.getElementsByClassName("header-logo-invertocat")[0]) {
      document.getElementsByClassName("header-logo-invertocat")[0].style.color = request.foreground;
    }

    var el = document.getElementsByClassName("header-nav-link");

    if(el) {
      for(var i=0;i<el.length;i++){
        el[i].style.color = request.foreground;
      }
    }


    sendResponse(extractTags())
  }
}




ext.runtime.onMessage.addListener(onRequest);
