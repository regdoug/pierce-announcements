addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  /**
   * Respond to the request with index.html, 
   * unless the request is for a static asset
   * hosted on an external host
   * @param {Request} request
   */
  async function handleRequest(request) {
    let requestURL = new URL(request.url)
    if (requestURL.pathname.startsWith('/static/')) {
      let path = requestURL.pathname.split('/static')[1];
      let location = 'https://' + externalHostname + path;
      return Response.redirect(location, 301);
    } else if (requestURL.pathname.startsWith('/favicon')) {
      let location = 'https://' + externalHostname + requestURL.pathname;
      return Response.redirect(location, 301);
    }
    // If in map, return the original request
    const init = {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'Cache-Control': 'no-cache'
      },
    }
    var body = '';
    if (requestURL.pathname == '/robots.txt') {
      body = robotsTXT;
    } else if (requestURL.pathname == '/manifest.json') {
      body = manifestJSON;
    } else if (requestURL.pathname == '/streamtest.html') {
      body = streamTest;
    } else {
      // fallback values
      var mainCss = "main.39d63e11.chunk.css";
      var libJs = "2.288e2782.chunk.js";
      var mainJs = "main.0e2620db.chunk.js";
  
      // lookup configs from KV store
      let webConfigs = await SITECONFIGS.get('index');
      if( webConfigs != null ) {
        console.log(webConfigs);
          let currentTime = Date.now()
          let currentConfig = JSON.parse(webConfigs).sort((a, b) => a.expires - b.expires).find((val) => val.expires > currentTime);
          if( currentConfig != null ) {
              mainCss = currentConfig.mainCss;
              mainJs = currentConfig.mainJs;
              libJs = currentConfig.libJs;
          }
      } else {
        console.log('index of configs not found')
      }
  
      //create response body
      body = indexHTML(mainCss, mainJs, libJs);
    }
    init.headers['x-request-path'] = requestURL.pathname
    return new Response(body, init)
  }
  const externalHostname = 'd25y9lukv1s9l8.cloudfront.net'
  const robotsTXT = `# https://www.robotstxt.org/robotstxt.html
  User-agent: *
  Disallow:
  `
  const manifestJSON = `{
    "short_name": "React App",
    "name": "Create React App Sample",
    "icons": [
    ],
    "start_url": ".",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff"
  }
  `
  
  function indexHTML(mainCss, mainJs, libJs) {
      let reactLoaderScript = `!function(e){function t(t){for(var r,c,i=t[0],p=t[1],a=t[2],f=0,s=[];f<i.length;f++)c=i[f],Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&s.push(o[c][0]),o[c]=0;for(r in p)Object.prototype.hasOwnProperty.call(p,r)&&(e[r]=p[r]);for(l&&l(t);s.length;)s.shift()();return u.push.apply(u,a||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,i=1;i<n.length;i++){var p=n[i];0!==o[p]&&(r=!1)}r&&(u.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={1:0},u=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="https://pierceannouncements.com/";var i=this["webpackJsonppierce-announcements"]=this["webpackJsonppierce-announcements"]||[],p=i.push.bind(i);i.push=t,i=i.slice();for(var a=0;a<i.length;a++)t(i[a]);var l=p;n()}([])`;
      return `<!doctype html><html lang="en"><head><meta charset="utf-8"/>
      <link rel="icon" href="https://pierceannouncements.com/favicon.ico"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <meta name="theme-color" content="#000000"/>
      <meta name="description" content="News and announcements from the Pierce family"/>
      <link rel="apple-touch-icon" href="https://pierceannouncements.com/faviconApple180.png"/>
      <link rel="manifest" href="https://pierceannouncements.com/manifest.json"/>
      <title>Pierce Family Announcements</title>
      <link href="https://pierceannouncements.com/static/css/${mainCss}" rel="stylesheet">
      </head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div>
      <script>${reactLoaderScript}</script>
      <script src="https://pierceannouncements.com/static/js/${libJs}"></script>
      <script src="https://pierceannouncements.com/static/js/${mainJs}"></script></body></html>`
  }  
  
  
  const streamTest = `<!doctype html><html lang="en"><head><meta charset="utf-8"/><link rel="icon" href="https://pierceannouncements.com/favicon.ico"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="theme-color" content="#000000"/><meta name="description" content="Web site created using create-react-app"/><link rel="apple-touch-icon" href="https://pierceannouncements.com/logo192.png"/><link rel="manifest" href="https://pierceannouncements.com/manifest.json"/><title>React App</title><link href="https://pierceannouncements.com/static/css/main.39d63e11.chunk.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><script src= "https://player.twitch.tv/js/embed/v1.js"></script>
  <div id="live-stream"></div>
  <script type="text/javascript">
    var options = {
      width: 1280,
      height: 720,
      channel: "2pierce",
      parent: ["pierceannouncements.com"]
    };
    var player = new Twitch.Player("live-stream", options);
    player.setVolume(0.5);
  </script></body></html>`;