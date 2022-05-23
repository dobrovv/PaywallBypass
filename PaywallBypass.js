
function onSearchClick() {
  var articleUrlInput = window.document.getElementById("articleUrlInput");
  var navbarToggleButton = window.document.getElementById("navbarToggleButton");


  articleIframe.src = articleUrlInput.value;
  //articleIframe.style.minHeight  = "85vh";
  //articleIframe.style = "position: relative; top: 0; left: 0; width: 100%; height: 100vh;"
}

function onIFrameUrlSrcChange(oldValue, newValue) {
  new bootstrap.Collapse(window.document.getElementById("navbarToggleExternalContent"))
  var navbarToggleButton = window.document.getElementById("navbarToggleButton");
  navbarToggleButton.classList.add("show");

  // set the query string to contain the url of the loaded article
  setUrlQueryString(newValue);
}

// watch for iframe src change events
new MutationObserver(function(mutations) {
  mutations.some(function(mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
      //console.log(mutation);
      //console.log('Old src: ', mutation.oldValue);
      //console.log('New src: ', mutation.target.src);
      onIFrameUrlSrcChange(mutation.oldValue, mutation.target.src);
      return true;
    }

    return false;
  });
}).observe(document.body, {
  attributes: true,
  attributeFilter: ['src'],
  attributeOldValue: true,
  characterData: false,
  characterDataOldValue: false,
  childList: false,
  subtree: true
});

// load the article from the url query string if the article is set in the query ?q=<arcitle>
url = new URL(window.location.href);

if (url.searchParams.get('q')) {
  var articleUrlInput = window.document.getElementById("articleUrlInput");
  var navbarToggleButton = window.document.getElementById("navbarToggleButton");

  articleUrlInput.value = url.searchParams.get('q');
  console.log(url.searchParams.get('q'));
  articleIframe.src = articleUrlInput.value;
}


function setUrlQueryString(address) {
    var searchParams = new URLSearchParams(window.location.search)
    searchParams.set("q", address);
    var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    history.pushState(null, '', newRelativePathQuery);
}