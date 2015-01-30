(function() {// Input 0
var e = {};
// Input 1
var h = {};
function k(a, b) {
  throw Error(l(a, b));
}
function l(a, b) {
  var d = a.replace(/\$(\d)/g, function(a, d) {
    return b[parseInt(d) - 1];
  });
  console && console.log(d);
  return d;
}
function m() {
  try {
    return JSON.parse(sessionStorage.getItem("branch_session")) || {};
  } catch (a) {
    return{};
  }
}
function n() {
  var a = {url:document.URL, user_agent:navigator.userAgent, language:navigator.language}, b = {}, d;
  for (d in b) {
    b.hasOwnProperty(d) && (a[d] = b[d]);
  }
  return a;
}
function p() {
  try {
    return location.hash.match(/r:([^&]*)/)[1];
  } catch (a) {
    return "";
  }
}
;
// Input 2
function q(a, b) {
  var d = [];
  b = b || "";
  if (a instanceof Array) {
    for (var c = 0;c < a.length;c++) {
      d.push(encodeURIComponent(b) + "[]=" + encodeURIComponent(a[c]));
    }
  } else {
    for (c in a) {
      a.hasOwnProperty(c) && (a[c] instanceof Array || "object" == typeof a[c] ? d.push(q(a[c], b ? b + "." + c : c)) : d.push(encodeURIComponent(b ? b + "." + c : c) + "=" + encodeURIComponent(a[c])));
    }
  }
  return d.join("&");
}
function r(a, b) {
  var d = a.e + a.c;
  if (a.b) {
    for (var c in a.b) {
      a.b.hasOwnProperty(c) && (a.b[c](a.c, c, b[c]), d += "/" + b[c]);
    }
  }
  var g = {};
  for (c in a.a) {
    if (a.a.hasOwnProperty(c)) {
      var f = a.a[c](a.c, c, b[c]);
      "undefined" != typeof f && "" !== f && null !== f && (g[c] = f);
    }
  }
  return{data:q(g), url:d};
}
var t = 0;
function u(a, b) {
  var d = "branch$$callback$$" + t++;
  window[d] = function(a) {
    b(null, a);
  };
  var c = document.createElement("script");
  c.type = "text/javascript";
  c.async = !0;
  c.src = a + (a.indexOf("?") ? "&" : "?") + "callback=" + encodeURIComponent(d);
  document.getElementsByTagName("head")[0].appendChild(c);
}
function v(a, b, d) {
  d = d || function() {
  };
  b = r(a, b);
  var c, g = "";
  "GET" == a.method ? c = b.url + "?" + b.data : (c = b.url, g = b.data);
  if (a.i) {
    u(c, d);
  } else {
    var f = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
    f.onreadystatechange = function() {
      if (4 === f.readyState && 200 === f.status) {
        try {
          d(null, JSON.parse(f.responseText));
        } catch (b) {
          d(b);
        }
      } else {
        4 === f.readyState && 402 === f.status ? d(Error("Not enough credits to redeem.")) : d(Error("Error in API: " + f.status));
      }
    };
    f.open(a.method, c, !0);
    f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    f.send(g);
  }
}
;
// Input 3
function w(a, b) {
  return function(d, c, g) {
    g ? 0 == b ? "object" != typeof g && k("API request $1, parameter $2 is not $3", [d, c, "an object"]) : 3 == b ? g instanceof Array || k("API request $1, parameter $2 is not $3", [d, c, "an array"]) : 1 == b ? "string" != typeof g && k("API request $1, parameter $2 is not $3", [d, c, "a string"]) : 2 == b ? "number" != typeof g && k("API request $1, parameter $2 is not $3", [d, c, "a number"]) : b && (b.test(g) || k("API request $1, parameter $2 is not $3", [d, c, "in the proper format"])) : 
    a && k("API request $1 missing parameter $2", [d, c]);
    return g;
  };
}
var x = /^[0-9]{15,20}$/, y = {e:"https://api.branch.io", c:"/v1/open", method:"POST", a:{app_id:w(!0, x), identity_id:w(!1, x), link_identifier:w(!1, 1), is_referrable:w(!0, 2), browser_fingerprint_id:w(!0, x)}}, z = {e:"https://api.branch.io", c:"/v1/profile", method:"POST", a:{app_id:w(!0, x), identity:w(!0, x)}}, A = {e:"https://api.branch.io", c:"/v1/logout", method:"POST", a:{app_id:w(!0, x), session_id:w(!0, x)}}, B = {e:"https://bnc.lt", c:"/_r", method:"GET", i:!0, a:{app_id:w(!0, x)}}, 
C = {e:"https://api.branch.io", c:"/v1/url", method:"POST", p:"obj", a:{app_id:w(!0, x), identity_id:w(!0, x), data:w(!1, 1), tags:w(!1, 3), feature:w(!1, 1), channel:w(!1, 1), stage:w(!1, 1), type:w(!1, 2)}}, D = {e:"https://api.branch.io", c:"/v1/event", method:"POST", a:{app_id:w(!0, x), session_id:w(!0, x), event:w(!0, 1), metadata:w(!0, 0)}};
// Input 4
function E() {
  this.f = !1;
}
function F(a, b, d, c) {
  (b.a && b.a.app_id || b.b && b.b.app_id) && a.h && (d.app_id = a.h);
  (b.a && b.a.session_id || b.b && b.b.session_id) && a.g && (d.session_id = a.g);
  (b.a && b.a.identity_id || b.b && b.b.identity_id) && a.d && (d.identity_id = a.d);
  v(b, d, c);
}
E.prototype.init = function(a, b) {
  if (this.f) {
    return b(l("Branch SDK already initilized"));
  }
  this.f = !0;
  b = b || function() {
  };
  this.h = a;
  var d = this, c = m();
  c && !c.session_id && (c = null);
  c && (this.g = c.session_id, this.d = c.identity_id);
  c && !p() ? b(null, c) : F(this, B, {}, function(a, c) {
    a ? b(a) : F(d, y, {link_identifier:p(), is_referrable:1, browser_fingerprint_id:c}, function(a, c) {
      a ? b(a) : (d.g = c.session_id, d.d = c.identity_id, sessionStorage.setItem("branch_session", JSON.stringify(c)), b(null, c));
    });
  });
};
E.prototype.logout = function(a) {
  if (!this.f) {
    return a(l("Branch SDK not initialized"));
  }
  a = a || function() {
  };
  v(A, {}, function(b) {
    var d = m();
    d.g = b.g;
    d.d = b.d;
    d.link = b.link;
    sessionStorage.setItem("branch_session", JSON.stringify(session));
    a(b);
  });
};
E.prototype.track = function(a, b, d) {
  if (!this.f) {
    return d(l("Branch SDK not initialized"));
  }
  "function" == typeof b && (d = b, b = {});
  d = d || function() {
  };
  F(this, D, {event:a, metadata:n()}, d);
};
E.prototype.identify = function(a, b) {
  if (!this.f) {
    return b(l("Branch SDK not initialized"));
  }
  b = b || function() {
  };
  F(this, z, {m:a}, function(a) {
    var c = h.o();
    c.d = a.d;
    c.link = a.link;
    c.j = a.j;
    c.k = a.k;
    sessionStorage.setItem("branch_session", JSON.stringify(c));
    b(a);
  });
};
E.prototype.createLink = function(a, b) {
  if (!this.f) {
    return h.console(e.l.n);
  }
  a.source = "web-sdk";
  void 0 !== a.data.$desktop_url && (a.data.$desktop_url = a.data.$desktop_url.replace(/#r:[a-z0-9-_]+$/i, ""));
  a.data = JSON.stringify(a.data);
  F(this, C, a, function(a, c) {
    "function" == typeof b && (a ? b(a) : b(null, c.url));
  });
};
// Input 5
var G = new E;
if (window.branch && window.branch._q) {
  for (var H = window.branch._q, I = 0;I < H.length;I++) {
    var J = H[I];
    G[J[0]].apply(G, J[1]);
  }
}
;
// Input 6
"function" === typeof define && define.amd ? define("branch", function() {
  return G;
}) : "object" === typeof exports && (module.exports = G);
window && (window.branch = G);
})();
