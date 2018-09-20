if (location.port == 8888) {
  console.log("Local development, skipping Fullstory");
} else {
  initFullstory();
}

function initFullstory() {
  window["_fs_debug"] = false;
  window["_fs_host"] = "www.fullstory.com";
  window["_fs_org"] = "36A30";
  window["_fs_namespace"] = "FS";
  (function(m, n, e, t, l, o, g, y) {
    if (e in m && m.console && m.console.log) {
      m.console.log(
        'FullStory namespace conflict. Please set window["_fs_namespace"].'
      );
      return;
    }
    g = m[e] = function(a, b) {
      g.q ? g.q.push([a, b]) : g._api(a, b);
    };
    g.q = [];
    o = n.createElement(t);
    o.async = 1;
    o.src = "https://" + _fs_host + "/s/fs.js";
    y = n.getElementsByTagName(t)[0];
    y.parentNode.insertBefore(o, y);
    g.identify = function(i, v) {
      g(l, { uid: i });
      if (v) g(l, v);
    };
    g.setUserVars = function(v) {
      g(l, v);
    };
    g.identifyAccount = function(i, v) {
      o = "account";
      v = v || {};
      v.acctId = i;
      g(o, v);
    };
    g.clearUserCookie = function(c, d, i) {
      if (!c || document.cookie.match("fs_uid=[`;`]*`[`;`]*`[`;`]*`")) {
        d = n.domain;
        while (1) {
          n.cookie =
            "fs_uid=;domain=" +
            d +
            ";path=/;expires=" +
            new Date(0).toUTCString();
          i = d.indexOf(".");
          if (i < 0) break;
          d = d.slice(i + 1);
        }
      }
    };
  })(window, document, window["_fs_namespace"], "script", "user");

  var userVars = {
    displayName:
      window.dynasty.user.firstName + " " + window.dynasty.user.lastName,
    email: window.dynasty.user.email,
    userType: window.dynasty.user.userType,
    commitHash: window.dynasty.commitHash
  };
  console.log("Initializing Fullstory: " + JSON.stringify(userVars));
  FS.identify(window.dynasty.user.id, userVars);
}
