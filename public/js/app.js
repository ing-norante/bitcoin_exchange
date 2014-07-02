var all, bind_tabbed, bind_tabs, bind_togglables, boot, evt_on, http, main, q, toggle;

boot = function(cb) {
  return document.addEventListener("DOMContentLoaded", cb);
};

q = function(name, in_children) {
  if (in_children) {
    return in_children.querySelector(name);
  } else {
    return document.querySelector(name);
  }
};

all = function(name, in_children) {
  if (in_children) {
    return in_children.querySelectorAll(name);
  } else {
    return document.querySelectorAll(name);
  }
};

toggle = function(node, className) {
  return node.classList.toggle(className);
};

evt_on = function(node, eventName, eventHandler) {
  return node.addEventListener(eventName, eventHandler);
};

http = function(settings) {
  var req;
  req = new XMLHttpRequest();
  req.withCredentials = settings.credentials;
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      if (req.status === 200) {
        return settings.good(req);
      } else {
        return settings.error(req);
      }
    }
  };
  req.open(settings.method, settings.url, true);
  return req.send(null);
};

main = function() {
  bind_togglables();
  return bind_tabbed();
};

bind_tabs = function() {
  var elements, inside, tab, tabs, _i, _len, _results;
  tabs = all(".tab > h1 a");
  elements = [];
  inside = [];
  _results = [];
  for (_i = 0, _len = tabs.length; _i < _len; _i++) {
    tab = tabs[_i];
    tab.addEventListener("click", function(evt) {
      return console.log(evt.target.dataset);
    });
    _results.push(true);
  }
  return _results;
};

bind_togglables = function() {
  var tog, toggled, togs, _i, _len, _results;
  togs = all("[data-toggle]");
  _results = [];
  for (_i = 0, _len = togs.length; _i < _len; _i++) {
    tog = togs[_i];
    toggled = q("." + tog.dataset.toggle);
    evt_on(tog, "click", function() {
      toggle(toggled, "hidden");
      return true;
    });
    _results.push(true);
  }
  return _results;
};

bind_tabbed = function() {
  var idx, sections, tab, tabs, _i, _len, _results;
  tabs = all(".tabbed > nav a");
  sections = all(".tabbed section");
  _results = [];
  for (idx = _i = 0, _len = tabs.length; _i < _len; idx = ++_i) {
    tab = tabs[idx];
    tab.dataset.idx = idx;
    _results.push(tab.addEventListener("click", function(evt) {
      var section, tabb, target, _j, _k, _len1, _len2;
      for (_j = 0, _len1 = tabs.length; _j < _len1; _j++) {
        tabb = tabs[_j];
        tabb.classList.remove("current");
      }
      target = evt.target;
      target.classList.add("current");
      for (_k = 0, _len2 = sections.length; _k < _len2; _k++) {
        section = sections[_k];
        section.classList.add("hidden");
      }
      idx = target.dataset.idx;
      return toggle(sections[idx], "hidden");
    }));
  }
  return _results;
};

boot(main);