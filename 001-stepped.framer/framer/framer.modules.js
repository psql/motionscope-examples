require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"MotionScope":[function(require,module,exports){
var Graph, MotionScope, PlotLine,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Graph = (function() {
  var _instance;

  _instance = null;

  function Graph() {
    this.tick = bind(this.tick, this);
    this.draw = bind(this.draw, this);
    this.timeInterval = bind(this.timeInterval, this);
    this.y = bind(this.y, this);
    this.addLegend = bind(this.addLegend, this);
    this.create = bind(this.create, this);
    this.time = 0;
    this.plots = {};
    this.scope = MotionScope.get();
    this.create();
    this.tick();
  }

  Graph.get = function() {
    return _instance != null ? _instance : _instance = new Graph();
  };

  Graph.prototype.create = function() {
    this.x = d3.scale.linear().range([0, this.scope.options.width - (this.scope.options.margin * 2)]);
    this.svg = d3.select(this.scope.options.parent._element).append('svg').attr('width', this.scope.options.width).attr('height', this.scope.options.height).style('background', 'black').append('g');
    this.svg.append("line").attr("x1", this.scope.options.margin).attr("y1", this.scope.options.margin).attr("x2", this.scope.options.width - this.scope.options.margin).attr("y2", this.scope.options.margin).style("stroke-width", 1).style("stroke-dasharray", '8, 5').style("stroke", '#979797');
    this.svg.append("line").attr("x1", this.scope.options.margin).attr("y1", this.scope.options.height - this.scope.options.margin).attr("x2", this.scope.options.width - this.scope.options.margin).attr("y2", this.scope.options.height - this.scope.options.margin).style("stroke-width", 1).style("stroke-dasharray", '8, 5').style("stroke", '#979797');
    this.svg.append("line").attr("x1", this.scope.options.margin).attr("y1", this.scope.options.height * 0.5).attr("x2", this.scope.options.width - this.scope.options.margin).attr("y2", this.scope.options.height * 0.5).style("stroke-width", 1).style("stroke", '#979797');
    this.paths = this.svg.append('g').attr('transform', "translate(" + this.scope.options.margin + ", " + this.scope.options.margin + ")");
    this.legend = d3.select(this.scope.options.parent._element).append("div").style('position', 'absolute').style('top', '0px').style('left', '0px').style('width', (this.scope.options.width - 10) + "px").style('height', (this.scope.options.height - 40) + "px").style('display', 'flex').style('justify-content', 'flex-end').style('align-items', 'flex-end');
    return this.svg.append('path').attr('transform', "translate(" + (this.scope.options.width - 107 - 10) + ", " + (this.scope.options.height - 12 - 10) + ")").attr("fill", '#D8D8D8').attr('d', 'M10.755 11V.431h-1.53L5.606 9.176H5.49L1.871.431H.341V11h1.23V2.929h.088l3.332 7.998h1.113l3.333-7.998h.088V11h1.23zM17.662.182c1.504 0 2.686.498 3.545 1.494.86.996 1.29 2.342 1.29 4.036 0 1.69-.43 3.035-1.286 4.036-.857 1-2.04 1.501-3.549 1.501-1.514 0-2.701-.5-3.563-1.501-.862-1.001-1.293-2.347-1.293-4.036 0-1.7.436-3.046 1.308-4.04.871-.993 2.054-1.49 3.548-1.49zm0 1.216c-1.074 0-1.926.388-2.556 1.165-.63.776-.945 1.826-.945 3.149 0 1.309.309 2.356.927 3.142.617.786 1.475 1.18 2.574 1.18 1.084 0 1.935-.394 2.553-1.18.617-.786.926-1.833.926-3.142 0-1.323-.31-2.373-.93-3.15-.62-.776-1.47-1.164-2.549-1.164zM27.797 11V1.618h3.406V.43h-8.13v1.187h3.406V11h1.318zm6.526 0V.431h-1.318V11h1.318zM41.23.182c1.504 0 2.686.498 3.545 1.494.86.996 1.289 2.342 1.289 4.036 0 1.69-.428 3.035-1.285 4.036-.857 1-2.04 1.501-3.549 1.501-1.514 0-2.701-.5-3.563-1.501-.862-1.001-1.293-2.347-1.293-4.036 0-1.7.436-3.046 1.307-4.04.872-.993 2.055-1.49 3.549-1.49zm0 1.216c-1.074 0-1.926.388-2.556 1.165-.63.776-.945 1.826-.945 3.149 0 1.309.309 2.356.927 3.142.617.786 1.475 1.18 2.574 1.18 1.084 0 1.935-.394 2.552-1.18.618-.786.927-1.833.927-3.142 0-1.323-.31-2.373-.93-3.15-.62-.776-1.47-1.164-2.549-1.164zM49.418 11V2.804h.118L55.27 11h1.281V.431H55.25v8.225h-.118L49.396.431h-1.281V11h1.303zm9.09-2.761c.068.913.46 1.643 1.175 2.19.716.547 1.632.82 2.75.82 1.212 0 2.172-.287 2.883-.86.71-.574 1.065-1.347 1.065-2.319 0-.776-.238-1.394-.714-1.853-.476-.459-1.26-.825-2.355-1.098l-1.105-.293c-.728-.186-1.25-.408-1.564-.667a1.246 1.246 0 0 1-.473-1.01c0-.538.214-.967.641-1.29.428-.322.993-.483 1.696-.483.659 0 1.2.153 1.622.458.423.305.68.728.773 1.27h1.326c-.054-.854-.425-1.555-1.114-2.102-.688-.546-1.543-.82-2.563-.82-1.118 0-2.02.277-2.707.831-.686.555-1.029 1.28-1.029 2.18 0 .751.218 1.353.652 1.805.435.451 1.13.8 2.088 1.044l1.355.351c.727.18 1.262.42 1.604.718.341.298.512.671.512 1.12 0 .523-.233.956-.7 1.3-.465.345-1.055.517-1.768.517-.752 0-1.372-.164-1.86-.49-.489-.328-.774-.767-.857-1.32h-1.333zm14.084 3.01c1.123 0 2.072-.29 2.846-.868.774-.579 1.249-1.354 1.424-2.325h-1.34a2.476 2.476 0 0 1-1.036 1.446c-.525.354-1.156.531-1.894.531-1.015 0-1.821-.388-2.417-1.164-.595-.777-.893-1.827-.893-3.15 0-1.328.296-2.38.89-3.157.593-.776 1.397-1.164 2.413-1.164.728 0 1.355.199 1.882.597.528.398.88.939 1.055 1.622h1.34c-.156-1.02-.63-1.848-1.42-2.483C74.65.5 73.697.182 72.584.182c-1.436 0-2.57.496-3.406 1.487-.835.991-1.252 2.341-1.252 4.05 0 1.704.418 3.052 1.256 4.043.837.991 1.974 1.487 3.41 1.487zM83.286.182c1.504 0 2.685.498 3.545 1.494.859.996 1.289 2.342 1.289 4.036 0 1.69-.429 3.035-1.286 4.036-.857 1-2.04 1.501-3.548 1.501-1.514 0-2.702-.5-3.564-1.501-.861-1.001-1.292-2.347-1.292-4.036 0-1.7.435-3.046 1.307-4.04.872-.993 2.054-1.49 3.549-1.49zm0 1.216c-1.075 0-1.927.388-2.557 1.165-.63.776-.944 1.826-.944 3.149 0 1.309.309 2.356.926 3.142.618.786 1.476 1.18 2.575 1.18 1.084 0 1.934-.394 2.552-1.18.618-.786.927-1.833.927-3.142 0-1.323-.31-2.373-.93-3.15-.62-.776-1.47-1.164-2.55-1.164zM90.17.43h3.992c1.001 0 1.815.319 2.443.956.627.637.94 1.459.94 2.465 0 .986-.318 1.795-.955 2.428-.637.632-1.451.948-2.443.948H91.49V11H90.17V.431zm1.319 1.172v4.453h2.329c.752 0 1.335-.193 1.75-.578.415-.386.623-.928.623-1.626 0-.728-.204-1.285-.612-1.67-.407-.386-.995-.579-1.761-.579h-2.33zm14.524 8.21h-5.23V6.181h4.959V5.009h-4.959V1.618h5.23V.43h-6.548V11h6.548V9.813z');
  };

  Graph.prototype.addLegend = function(name, color) {
    if (name === 'x' || name === 'y') {
      name += " position";
    }
    this.legend.append("div").style('vertical-align', 'middle').style("width", "15px").style("height", "15px").style("border-radius", "100px").style('margin', '0 0 0 20px').style("background-color", color);
    return this.legend.append("div").style("font", "normal 15px Menlo, monospace").style('margin', '0 0 0 10px').text(name);
  };

  Graph.prototype.y = function() {
    return d3.scale.linear().range([this.scope.options.height - (this.scope.options.margin * 2), 0]);
  };

  Graph.prototype.timeInterval = function(d, i) {
    return this.x(i + this.time - this.scope.options.limit);
  };

  Graph.prototype.draw = function() {
    var name, plot, ref, results;
    this.x.domain([this.time - this.scope.options.limit, this.time]);
    ref = this.plots;
    results = [];
    for (name in ref) {
      plot = ref[name];
      results.push(plot.draw());
    }
    return results;
  };

  Graph.prototype.tick = function() {
    var name, plot, ref;
    requestAnimationFrame(this.tick);
    this.time++;
    ref = this.plots;
    for (name in ref) {
      plot = ref[name];
      plot.sample();
    }
    return this.draw();
  };

  return Graph;

})();

PlotLine = (function() {
  function PlotLine(options1) {
    var base, base1, base2, base3, base4;
    this.options = options1 != null ? options1 : {};
    this.draw = bind(this.draw, this);
    this.sample = bind(this.sample, this);
    if ((base = this.options).color == null) {
      base.color = Framer.Utils.randomColor().toHexString();
    }
    if ((base1 = this.options).name == null) {
      base1.name = this.options.prop;
    }
    if ((base2 = this.options).key == null) {
      base2.key = this.options.layer.name + "_" + this.options.prop;
    }
    if ((base3 = this.options).min == null) {
      base3.min = 0;
    }
    if ((base4 = this.options).max == null) {
      base4.max = 1;
    }
    this.scope = MotionScope.get();
    this.graph = Graph.get();
    if (this.graph.plots[this.options.key]) {
      return;
    }
    this.y = this.graph.y();
    this.line = d3.svg.line().x(this.graph.timeInterval).y((function(_this) {
      return function(d) {
        return _this.y(d);
      };
    })(this));
    this.data = [];
    this.path = this.graph.paths.append('path').data([this.data]).attr('class', this.options.key + " line").style("stroke-linejoin", 'round').style("stroke-linecap", 'round').style('stroke-width', 5).style('fill', 'transparent').style('stroke', this.options.color);
    this.graph.plots[this.options.key] = this;
    this.graph.addLegend(this.options.name, this.options.color);
  }

  PlotLine.prototype.sample = function() {
    this.data.push(this.options.layer[this.options.prop]);
    if (this.data.length > this.scope.options.limit) {
      this.data.shift();
    }
    return this.path.attr('d', this.line);
  };

  PlotLine.prototype.draw = function() {
    var extent;
    extent = d3.extent(this.data);
    this.options.min = Math.min(this.options.min, extent[0]);
    this.options.max = Math.max(this.options.max, extent[1]);
    return this.y.domain([this.options.min, this.options.max]);
  };

  return PlotLine;

})();

MotionScope = (function(superClass) {
  var _instance;

  extend(MotionScope, superClass);

  _instance = null;

  function MotionScope(options1) {
    var base, base1, base2, base3;
    this.options = options1 != null ? options1 : {};
    if ((base = this.options).width == null) {
      base.width = 600;
    }
    if ((base1 = this.options).height == null) {
      base1.height = 600;
    }
    if ((base2 = this.options).margin == null) {
      base2.margin = 75;
    }
    if ((base3 = this.options).limit == null) {
      base3.limit = 300;
    }
    if (this.options.parent) {
      this.options.parent.index = -90210;
      this.options.width = this.options.parent.width;
      this.options.height = this.options.parent.height;
    } else {
      this.options.parent = Framer.Device.content;
    }
    if (this.options.reset) {
      this.options.reset.onClick((function(_this) {
        return function() {
          return _this.reset();
        };
      })(this));
    }
  }

  MotionScope.get = function(options) {
    if (options == null) {
      options = {};
    }
    return _instance != null ? _instance : _instance = new MotionScope(options);
  };

  MotionScope.load = function(options, callback) {
    if (options == null) {
      options = {};
    }
    return Utils.domLoadScript('https://d3js.org/d3.v3.min.js', function() {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      return callback(MotionScope.get(options));
    });
  };

  MotionScope.prototype.reset = function() {
    var key, plot, ref, results;
    ref = Graph.get().plots;
    results = [];
    for (key in ref) {
      plot = ref[key];
      results.push(plot.data.splice(0));
    }
    return results;
  };

  MotionScope.prototype.plot = function(layer, prop, options) {
    if (options == null) {
      options = {};
    }
    return setTimeout((function(_this) {
      return function() {
        if (options.layer == null) {
          options.layer = layer;
        }
        if (options.prop == null) {
          options.prop = prop;
        }
        return new PlotLine(options);
      };
    })(this), 0);
  };

  return MotionScope;

})(Framer.BaseClass);

module.exports = MotionScope;


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3Bhc3F1YWxlL1NpdGVzL21vdGlvbnNjb3BlLWV4YW1wbGVzLzAwMS1zdGVwcGVkLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3Bhc3F1YWxlL1NpdGVzL21vdGlvbnNjb3BlLWV4YW1wbGVzLzAwMS1zdGVwcGVkLmZyYW1lci9tb2R1bGVzL01vdGlvblNjb3BlLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsImNsYXNzIEdyYXBoXG5cdF9pbnN0YW5jZSA9IG51bGxcblxuXHRjb25zdHJ1Y3RvcjogKCkgLT5cblx0XHRAdGltZSA9IDBcblx0XHRAcGxvdHMgPSB7fVxuXG5cdFx0QHNjb3BlID0gTW90aW9uU2NvcGUuZ2V0KClcblxuXHRcdEBjcmVhdGUoKVxuXHRcdEB0aWNrKClcblxuXHRAZ2V0OiA9PlxuXHRcdF9pbnN0YW5jZSA/PSBuZXcgR3JhcGgoKVxuXG5cdGNyZWF0ZTogPT5cblx0XHQjIHggaXMgZ2xvYmFsLCBmb3IgdGltZVxuXHRcdEB4ID0gZDMuc2NhbGUubGluZWFyKCkucmFuZ2UoWzAsIEBzY29wZS5vcHRpb25zLndpZHRoIC0gKEBzY29wZS5vcHRpb25zLm1hcmdpbiAqIDIpXSlcblxuXHRcdCMgcm9vdFxuXHRcdEBzdmcgPSBkMy5zZWxlY3QoQHNjb3BlLm9wdGlvbnMucGFyZW50Ll9lbGVtZW50KS5hcHBlbmQoJ3N2ZycpXG5cdFx0XHQuYXR0cignd2lkdGgnLCBAc2NvcGUub3B0aW9ucy53aWR0aClcblx0XHRcdC5hdHRyKCdoZWlnaHQnLCBAc2NvcGUub3B0aW9ucy5oZWlnaHQpXG5cdFx0XHQuc3R5bGUoJ2JhY2tncm91bmQnLCAnYmxhY2snKVxuXHRcdFx0LmFwcGVuZCgnZycpXG5cblx0XHQjIDAlXG5cdFx0QHN2Zy5hcHBlbmQoXCJsaW5lXCIpXG5cdFx0XHQuYXR0cihcIngxXCIsIEBzY29wZS5vcHRpb25zLm1hcmdpbilcblx0XHRcdC5hdHRyKFwieTFcIiwgQHNjb3BlLm9wdGlvbnMubWFyZ2luKVxuXHRcdFx0LmF0dHIoXCJ4MlwiLCBAc2NvcGUub3B0aW9ucy53aWR0aCAtIEBzY29wZS5vcHRpb25zLm1hcmdpbilcblx0XHRcdC5hdHRyKFwieTJcIiwgQHNjb3BlLm9wdGlvbnMubWFyZ2luKVxuXHRcdFx0LnN0eWxlKFwic3Ryb2tlLXdpZHRoXCIsIDEpXG5cdFx0XHQuc3R5bGUoXCJzdHJva2UtZGFzaGFycmF5XCIsICc4LCA1Jylcblx0XHRcdC5zdHlsZShcInN0cm9rZVwiLCAnIzk3OTc5NycpXG5cblx0XHQjIDEwMCVcblx0XHRAc3ZnLmFwcGVuZChcImxpbmVcIilcblx0XHRcdC5hdHRyKFwieDFcIiwgQHNjb3BlLm9wdGlvbnMubWFyZ2luKVxuXHRcdFx0LmF0dHIoXCJ5MVwiLCBAc2NvcGUub3B0aW9ucy5oZWlnaHQgLSBAc2NvcGUub3B0aW9ucy5tYXJnaW4pXG5cdFx0XHQuYXR0cihcIngyXCIsIEBzY29wZS5vcHRpb25zLndpZHRoIC0gQHNjb3BlLm9wdGlvbnMubWFyZ2luKVxuXHRcdFx0LmF0dHIoXCJ5MlwiLCBAc2NvcGUub3B0aW9ucy5oZWlnaHQgLSBAc2NvcGUub3B0aW9ucy5tYXJnaW4pXG5cdFx0XHQuc3R5bGUoXCJzdHJva2Utd2lkdGhcIiwgMSlcblx0XHRcdC5zdHlsZShcInN0cm9rZS1kYXNoYXJyYXlcIiwgJzgsIDUnKVxuXHRcdFx0LnN0eWxlKFwic3Ryb2tlXCIsICcjOTc5Nzk3JylcblxuXHRcdCMgNTAlXG5cdFx0QHN2Zy5hcHBlbmQoXCJsaW5lXCIpXG5cdFx0XHQuYXR0cihcIngxXCIsIEBzY29wZS5vcHRpb25zLm1hcmdpbilcblx0XHRcdC5hdHRyKFwieTFcIiwgQHNjb3BlLm9wdGlvbnMuaGVpZ2h0ICogMC41KVxuXHRcdFx0LmF0dHIoXCJ4MlwiLCBAc2NvcGUub3B0aW9ucy53aWR0aCAtIEBzY29wZS5vcHRpb25zLm1hcmdpbilcblx0XHRcdC5hdHRyKFwieTJcIiwgQHNjb3BlLm9wdGlvbnMuaGVpZ2h0ICogMC41KVxuXHRcdFx0LnN0eWxlKFwic3Ryb2tlLXdpZHRoXCIsIDEpXG5cdFx0XHQuc3R5bGUoXCJzdHJva2VcIiwgJyM5Nzk3OTcnKVxuXG5cdFx0IyBwbG90IHBhdGhzIHBhcmVudFxuXHRcdEBwYXRocyA9IEBzdmcuYXBwZW5kKCdnJylcblx0XHRcdC5hdHRyKCd0cmFuc2Zvcm0nLCBcInRyYW5zbGF0ZSgje0BzY29wZS5vcHRpb25zLm1hcmdpbn0sICN7QHNjb3BlLm9wdGlvbnMubWFyZ2lufSlcIilcblxuXHRcdCMgbGVnZW5kXG5cdFx0QGxlZ2VuZCA9IGQzLnNlbGVjdChAc2NvcGUub3B0aW9ucy5wYXJlbnQuX2VsZW1lbnQpXG5cdFx0XHQuYXBwZW5kKFwiZGl2XCIpXG5cdFx0XHQuc3R5bGUoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJylcblx0XHRcdC5zdHlsZSgndG9wJywgJzBweCcpXG5cdFx0XHQuc3R5bGUoJ2xlZnQnLCAnMHB4Jylcblx0XHRcdC5zdHlsZSgnd2lkdGgnLCBcIiN7QHNjb3BlLm9wdGlvbnMud2lkdGggLSAxMH1weFwiKVxuXHRcdFx0LnN0eWxlKCdoZWlnaHQnLCBcIiN7QHNjb3BlLm9wdGlvbnMuaGVpZ2h0IC0gNDB9cHhcIilcblx0XHRcdC5zdHlsZSgnZGlzcGxheScsICdmbGV4Jylcblx0XHRcdC5zdHlsZSgnanVzdGlmeS1jb250ZW50JywgJ2ZsZXgtZW5kJylcblx0XHRcdC5zdHlsZSgnYWxpZ24taXRlbXMnLCAnZmxleC1lbmQnKVxuXG5cdFx0IyBsb2dvXG5cdFx0QHN2Zy5hcHBlbmQoJ3BhdGgnKVxuXHRcdFx0LmF0dHIoJ3RyYW5zZm9ybScsIFwidHJhbnNsYXRlKCN7QHNjb3BlLm9wdGlvbnMud2lkdGggLSAxMDcgLSAxMH0sICN7QHNjb3BlLm9wdGlvbnMuaGVpZ2h0IC0gMTIgLSAxMH0pXCIpXG5cdFx0XHQuYXR0cihcImZpbGxcIiwgJyNEOEQ4RDgnKVxuXHRcdFx0LmF0dHIoJ2QnLCAnTTEwLjc1NSAxMVYuNDMxaC0xLjUzTDUuNjA2IDkuMTc2SDUuNDlMMS44NzEuNDMxSC4zNDFWMTFoMS4yM1YyLjkyOWguMDg4bDMuMzMyIDcuOTk4aDEuMTEzbDMuMzMzLTcuOTk4aC4wODhWMTFoMS4yM3pNMTcuNjYyLjE4MmMxLjUwNCAwIDIuNjg2LjQ5OCAzLjU0NSAxLjQ5NC44Ni45OTYgMS4yOSAyLjM0MiAxLjI5IDQuMDM2IDAgMS42OS0uNDMgMy4wMzUtMS4yODYgNC4wMzYtLjg1NyAxLTIuMDQgMS41MDEtMy41NDkgMS41MDEtMS41MTQgMC0yLjcwMS0uNS0zLjU2My0xLjUwMS0uODYyLTEuMDAxLTEuMjkzLTIuMzQ3LTEuMjkzLTQuMDM2IDAtMS43LjQzNi0zLjA0NiAxLjMwOC00LjA0Ljg3MS0uOTkzIDIuMDU0LTEuNDkgMy41NDgtMS40OXptMCAxLjIxNmMtMS4wNzQgMC0xLjkyNi4zODgtMi41NTYgMS4xNjUtLjYzLjc3Ni0uOTQ1IDEuODI2LS45NDUgMy4xNDkgMCAxLjMwOS4zMDkgMi4zNTYuOTI3IDMuMTQyLjYxNy43ODYgMS40NzUgMS4xOCAyLjU3NCAxLjE4IDEuMDg0IDAgMS45MzUtLjM5NCAyLjU1My0xLjE4LjYxNy0uNzg2LjkyNi0xLjgzMy45MjYtMy4xNDIgMC0xLjMyMy0uMzEtMi4zNzMtLjkzLTMuMTUtLjYyLS43NzYtMS40Ny0xLjE2NC0yLjU0OS0xLjE2NHpNMjcuNzk3IDExVjEuNjE4aDMuNDA2Vi40M2gtOC4xM3YxLjE4N2gzLjQwNlYxMWgxLjMxOHptNi41MjYgMFYuNDMxaC0xLjMxOFYxMWgxLjMxOHpNNDEuMjMuMTgyYzEuNTA0IDAgMi42ODYuNDk4IDMuNTQ1IDEuNDk0Ljg2Ljk5NiAxLjI4OSAyLjM0MiAxLjI4OSA0LjAzNiAwIDEuNjktLjQyOCAzLjAzNS0xLjI4NSA0LjAzNi0uODU3IDEtMi4wNCAxLjUwMS0zLjU0OSAxLjUwMS0xLjUxNCAwLTIuNzAxLS41LTMuNTYzLTEuNTAxLS44NjItMS4wMDEtMS4yOTMtMi4zNDctMS4yOTMtNC4wMzYgMC0xLjcuNDM2LTMuMDQ2IDEuMzA3LTQuMDQuODcyLS45OTMgMi4wNTUtMS40OSAzLjU0OS0xLjQ5em0wIDEuMjE2Yy0xLjA3NCAwLTEuOTI2LjM4OC0yLjU1NiAxLjE2NS0uNjMuNzc2LS45NDUgMS44MjYtLjk0NSAzLjE0OSAwIDEuMzA5LjMwOSAyLjM1Ni45MjcgMy4xNDIuNjE3Ljc4NiAxLjQ3NSAxLjE4IDIuNTc0IDEuMTggMS4wODQgMCAxLjkzNS0uMzk0IDIuNTUyLTEuMTguNjE4LS43ODYuOTI3LTEuODMzLjkyNy0zLjE0MiAwLTEuMzIzLS4zMS0yLjM3My0uOTMtMy4xNS0uNjItLjc3Ni0xLjQ3LTEuMTY0LTIuNTQ5LTEuMTY0ek00OS40MTggMTFWMi44MDRoLjExOEw1NS4yNyAxMWgxLjI4MVYuNDMxSDU1LjI1djguMjI1aC0uMTE4TDQ5LjM5Ni40MzFoLTEuMjgxVjExaDEuMzAzem05LjA5LTIuNzYxYy4wNjguOTEzLjQ2IDEuNjQzIDEuMTc1IDIuMTkuNzE2LjU0NyAxLjYzMi44MiAyLjc1LjgyIDEuMjEyIDAgMi4xNzItLjI4NyAyLjg4My0uODYuNzEtLjU3NCAxLjA2NS0xLjM0NyAxLjA2NS0yLjMxOSAwLS43NzYtLjIzOC0xLjM5NC0uNzE0LTEuODUzLS40NzYtLjQ1OS0xLjI2LS44MjUtMi4zNTUtMS4wOThsLTEuMTA1LS4yOTNjLS43MjgtLjE4Ni0xLjI1LS40MDgtMS41NjQtLjY2N2ExLjI0NiAxLjI0NiAwIDAgMS0uNDczLTEuMDFjMC0uNTM4LjIxNC0uOTY3LjY0MS0xLjI5LjQyOC0uMzIyLjk5My0uNDgzIDEuNjk2LS40ODMuNjU5IDAgMS4yLjE1MyAxLjYyMi40NTguNDIzLjMwNS42OC43MjguNzczIDEuMjdoMS4zMjZjLS4wNTQtLjg1NC0uNDI1LTEuNTU1LTEuMTE0LTIuMTAyLS42ODgtLjU0Ni0xLjU0My0uODItMi41NjMtLjgyLTEuMTE4IDAtMi4wMi4yNzctMi43MDcuODMxLS42ODYuNTU1LTEuMDI5IDEuMjgtMS4wMjkgMi4xOCAwIC43NTEuMjE4IDEuMzUzLjY1MiAxLjgwNS40MzUuNDUxIDEuMTMuOCAyLjA4OCAxLjA0NGwxLjM1NS4zNTFjLjcyNy4xOCAxLjI2Mi40MiAxLjYwNC43MTguMzQxLjI5OC41MTIuNjcxLjUxMiAxLjEyIDAgLjUyMy0uMjMzLjk1Ni0uNyAxLjMtLjQ2NS4zNDUtMS4wNTUuNTE3LTEuNzY4LjUxNy0uNzUyIDAtMS4zNzItLjE2NC0xLjg2LS40OS0uNDg5LS4zMjgtLjc3NC0uNzY3LS44NTctMS4zMmgtMS4zMzN6bTE0LjA4NCAzLjAxYzEuMTIzIDAgMi4wNzItLjI5IDIuODQ2LS44NjguNzc0LS41NzkgMS4yNDktMS4zNTQgMS40MjQtMi4zMjVoLTEuMzRhMi40NzYgMi40NzYgMCAwIDEtMS4wMzYgMS40NDZjLS41MjUuMzU0LTEuMTU2LjUzMS0xLjg5NC41MzEtMS4wMTUgMC0xLjgyMS0uMzg4LTIuNDE3LTEuMTY0LS41OTUtLjc3Ny0uODkzLTEuODI3LS44OTMtMy4xNSAwLTEuMzI4LjI5Ni0yLjM4Ljg5LTMuMTU3LjU5My0uNzc2IDEuMzk3LTEuMTY0IDIuNDEzLTEuMTY0LjcyOCAwIDEuMzU1LjE5OSAxLjg4Mi41OTcuNTI4LjM5OC44OC45MzkgMS4wNTUgMS42MjJoMS4zNGMtLjE1Ni0xLjAyLS42My0xLjg0OC0xLjQyLTIuNDgzQzc0LjY1LjUgNzMuNjk3LjE4MiA3Mi41ODQuMTgyYy0xLjQzNiAwLTIuNTcuNDk2LTMuNDA2IDEuNDg3LS44MzUuOTkxLTEuMjUyIDIuMzQxLTEuMjUyIDQuMDUgMCAxLjcwNC40MTggMy4wNTIgMS4yNTYgNC4wNDMuODM3Ljk5MSAxLjk3NCAxLjQ4NyAzLjQxIDEuNDg3ek04My4yODYuMTgyYzEuNTA0IDAgMi42ODUuNDk4IDMuNTQ1IDEuNDk0Ljg1OS45OTYgMS4yODkgMi4zNDIgMS4yODkgNC4wMzYgMCAxLjY5LS40MjkgMy4wMzUtMS4yODYgNC4wMzYtLjg1NyAxLTIuMDQgMS41MDEtMy41NDggMS41MDEtMS41MTQgMC0yLjcwMi0uNS0zLjU2NC0xLjUwMS0uODYxLTEuMDAxLTEuMjkyLTIuMzQ3LTEuMjkyLTQuMDM2IDAtMS43LjQzNS0zLjA0NiAxLjMwNy00LjA0Ljg3Mi0uOTkzIDIuMDU0LTEuNDkgMy41NDktMS40OXptMCAxLjIxNmMtMS4wNzUgMC0xLjkyNy4zODgtMi41NTcgMS4xNjUtLjYzLjc3Ni0uOTQ0IDEuODI2LS45NDQgMy4xNDkgMCAxLjMwOS4zMDkgMi4zNTYuOTI2IDMuMTQyLjYxOC43ODYgMS40NzYgMS4xOCAyLjU3NSAxLjE4IDEuMDg0IDAgMS45MzQtLjM5NCAyLjU1Mi0xLjE4LjYxOC0uNzg2LjkyNy0xLjgzMy45MjctMy4xNDIgMC0xLjMyMy0uMzEtMi4zNzMtLjkzLTMuMTUtLjYyLS43NzYtMS40Ny0xLjE2NC0yLjU1LTEuMTY0ek05MC4xNy40M2gzLjk5MmMxLjAwMSAwIDEuODE1LjMxOSAyLjQ0My45NTYuNjI3LjYzNy45NCAxLjQ1OS45NCAyLjQ2NSAwIC45ODYtLjMxOCAxLjc5NS0uOTU1IDIuNDI4LS42MzcuNjMyLTEuNDUxLjk0OC0yLjQ0My45NDhIOTEuNDlWMTFIOTAuMTdWLjQzMXptMS4zMTkgMS4xNzJ2NC40NTNoMi4zMjljLjc1MiAwIDEuMzM1LS4xOTMgMS43NS0uNTc4LjQxNS0uMzg2LjYyMy0uOTI4LjYyMy0xLjYyNiAwLS43MjgtLjIwNC0xLjI4NS0uNjEyLTEuNjctLjQwNy0uMzg2LS45OTUtLjU3OS0xLjc2MS0uNTc5aC0yLjMzem0xNC41MjQgOC4yMWgtNS4yM1Y2LjE4MWg0Ljk1OVY1LjAwOWgtNC45NTlWMS42MThoNS4yM1YuNDNoLTYuNTQ4VjExaDYuNTQ4VjkuODEzeicpXG5cblx0YWRkTGVnZW5kOiAobmFtZSwgY29sb3IpID0+XG5cdFx0bmFtZSArPSBcIiBwb3NpdGlvblwiIGlmIG5hbWUgaW4gWyd4JywgJ3knXVxuXG5cdFx0IyBidWxsZXRcblx0XHRAbGVnZW5kLmFwcGVuZChcImRpdlwiKVxuXHRcdFx0LnN0eWxlKCd2ZXJ0aWNhbC1hbGlnbicsICdtaWRkbGUnKVxuXHRcdFx0LnN0eWxlKFwid2lkdGhcIiwgXCIxNXB4XCIpXG5cdFx0XHQuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG5cdFx0XHQuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMTAwcHhcIilcblx0XHRcdC5zdHlsZSgnbWFyZ2luJywgJzAgMCAwIDIwcHgnKVxuXHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBjb2xvcilcblxuXHRcdCMgbGFiZWxcblx0XHRAbGVnZW5kLmFwcGVuZChcImRpdlwiKVxuXHRcdFx0LnN0eWxlKFwiZm9udFwiLCBcIm5vcm1hbCAxNXB4IE1lbmxvLCBtb25vc3BhY2VcIilcblx0XHRcdC5zdHlsZSgnbWFyZ2luJywgJzAgMCAwIDEwcHgnKVxuXHRcdFx0LnRleHQobmFtZSlcblxuXHR5OiA9PlxuXHRcdGQzLnNjYWxlLmxpbmVhcigpLnJhbmdlKFtAc2NvcGUub3B0aW9ucy5oZWlnaHQgLSAoQHNjb3BlLm9wdGlvbnMubWFyZ2luICogMiksIDBdKVxuXG5cdHRpbWVJbnRlcnZhbDogKGQsIGkpID0+XG5cdFx0QHgoaSArIEB0aW1lIC0gQHNjb3BlLm9wdGlvbnMubGltaXQpXG5cblx0ZHJhdzogPT5cblx0XHQjIHNoaWZ0IHRpbWUgYXhpc1xuXHRcdEB4LmRvbWFpbiBbQHRpbWUgLSBAc2NvcGUub3B0aW9ucy5saW1pdCwgQHRpbWVdXG5cblx0XHQjIHJlZHJhdyBwbG90c1xuXHRcdGZvciBuYW1lLCBwbG90IG9mIEBwbG90c1xuXHRcdFx0cGxvdC5kcmF3KClcblxuXHR0aWNrOiA9PlxuXHRcdCMgcXVldWUgbmV4dCB0aWNrXG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKEB0aWNrKVxuXG5cdFx0IyB0aW1lIGlzIGdsb2JhbCBmb3IgdGhlIGdyYXBoXG5cdFx0QHRpbWUrK1xuXG5cdFx0IyByZXNhbXBsZSBwbG90IGRhdGFcblx0XHRmb3IgbmFtZSwgcGxvdCBvZiBAcGxvdHNcblx0XHRcdHBsb3Quc2FtcGxlKClcblxuXHRcdCMgcmVkcmF3IGdyYXBoXG5cdFx0QGRyYXcoKVxuXG5cbmNsYXNzIFBsb3RMaW5lXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMuY29sb3IgPz0gRnJhbWVyLlV0aWxzLnJhbmRvbUNvbG9yKCkudG9IZXhTdHJpbmcoKVxuXHRcdEBvcHRpb25zLm5hbWUgPz0gQG9wdGlvbnMucHJvcFxuXHRcdEBvcHRpb25zLmtleSA/PSBcIiN7QG9wdGlvbnMubGF5ZXIubmFtZX1fI3tAb3B0aW9ucy5wcm9wfVwiXG5cblx0XHRAb3B0aW9ucy5taW4gPz0gMFxuXHRcdEBvcHRpb25zLm1heCA/PSAxXG5cblx0XHRAc2NvcGUgPSBNb3Rpb25TY29wZS5nZXQoKVxuXHRcdEBncmFwaCA9IEdyYXBoLmdldCgpXG5cblx0XHQjIHJldHVybiBpZiBpdCBhbHJlYWR5IGV4aXN0c1xuXHRcdCMgVE9ETzogcmVtYXAgdG8gbmV3IGluc3RhbmNlIG9mIGxheWVyIG9uIGxpdmUgcmVsb2FkXG5cdFx0cmV0dXJuIGlmIEBncmFwaC5wbG90c1tAb3B0aW9ucy5rZXldXG5cblx0XHRAeSA9IEBncmFwaC55KClcblxuXHRcdEBsaW5lID0gZDMuc3ZnLmxpbmUoKS54KEBncmFwaC50aW1lSW50ZXJ2YWwpLnkoKGQpID0+IEB5KGQpKVxuXG5cdFx0QGRhdGEgPSBbXVxuXG5cdFx0QHBhdGggPSBAZ3JhcGgucGF0aHMuYXBwZW5kKCdwYXRoJylcbiAgICAgIC5kYXRhKFtAZGF0YV0pXG4gICAgICAuYXR0cignY2xhc3MnLCBcIiN7QG9wdGlvbnMua2V5fSBsaW5lXCIpXG5cdFx0XHQuc3R5bGUoXCJzdHJva2UtbGluZWpvaW5cIiwgJ3JvdW5kJylcblx0XHRcdC5zdHlsZShcInN0cm9rZS1saW5lY2FwXCIsICdyb3VuZCcpXG5cdFx0XHQuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIDUpXG5cdFx0XHQuc3R5bGUoJ2ZpbGwnLCAndHJhbnNwYXJlbnQnKVxuICAgICAgLnN0eWxlKCdzdHJva2UnLCBAb3B0aW9ucy5jb2xvcilcblxuXHRcdEBncmFwaC5wbG90c1tAb3B0aW9ucy5rZXldID0gQFxuXG5cdFx0QGdyYXBoLmFkZExlZ2VuZChAb3B0aW9ucy5uYW1lLCBAb3B0aW9ucy5jb2xvcilcblxuXHRzYW1wbGU6ICgpID0+XG5cdFx0QGRhdGEucHVzaCBAb3B0aW9ucy5sYXllcltAb3B0aW9ucy5wcm9wXVxuXG5cdFx0aWYgQGRhdGEubGVuZ3RoID4gQHNjb3BlLm9wdGlvbnMubGltaXRcblx0XHRcdEBkYXRhLnNoaWZ0KClcblxuXHRcdEBwYXRoLmF0dHIoJ2QnLCBAbGluZSlcblxuXHRkcmF3OiAoKSA9PlxuXHRcdGV4dGVudCA9IGQzLmV4dGVudChAZGF0YSlcblxuXHRcdCMgc3RyZXRjaCBtaW4vbWF4IHRvIGV4dGVudFxuXHRcdEBvcHRpb25zLm1pbiA9IE1hdGgubWluKEBvcHRpb25zLm1pbiwgZXh0ZW50WzBdKVxuXHRcdEBvcHRpb25zLm1heCA9IE1hdGgubWF4KEBvcHRpb25zLm1heCwgZXh0ZW50WzFdKVxuXG5cdFx0QHkuZG9tYWluIFtAb3B0aW9ucy5taW4sIEBvcHRpb25zLm1heF1cblxuY2xhc3MgTW90aW9uU2NvcGUgZXh0ZW5kcyBGcmFtZXIuQmFzZUNsYXNzXG5cdF9pbnN0YW5jZSA9IG51bGxcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zLndpZHRoID89IDYwMFxuXHRcdEBvcHRpb25zLmhlaWdodCA/PSA2MDBcblx0XHRAb3B0aW9ucy5tYXJnaW4gPz0gNzVcblx0XHRAb3B0aW9ucy5saW1pdCA/PSAzMDBcblxuXHRcdCMgdXNlIHBhcmVudHMgc2l6ZSBpZiBzcGVjaWZpZWRcblx0XHRpZiBAb3B0aW9ucy5wYXJlbnRcblx0XHRcdEBvcHRpb25zLnBhcmVudC5pbmRleCA9IC05MDIxMFxuXHRcdFx0QG9wdGlvbnMud2lkdGggPSBAb3B0aW9ucy5wYXJlbnQud2lkdGhcblx0XHRcdEBvcHRpb25zLmhlaWdodCA9IEBvcHRpb25zLnBhcmVudC5oZWlnaHRcblx0XHRlbHNlXG5cdFx0XHRAb3B0aW9ucy5wYXJlbnQgPSBGcmFtZXIuRGV2aWNlLmNvbnRlbnRcblxuXHRcdGlmIEBvcHRpb25zLnJlc2V0XG5cdFx0XHRAb3B0aW9ucy5yZXNldC5vbkNsaWNrID0+XG5cdFx0XHRcdEAucmVzZXQoKVxuXG5cdEBnZXQ6IChvcHRpb25zPXt9KSAtPlxuXHRcdF9pbnN0YW5jZSA/PSBuZXcgTW90aW9uU2NvcGUob3B0aW9ucylcblxuXHRAbG9hZDogKG9wdGlvbnM9e30sIGNhbGxiYWNrKSAtPlxuXHRcdFV0aWxzLmRvbUxvYWRTY3JpcHQoJ2h0dHBzOi8vZDNqcy5vcmcvZDMudjMubWluLmpzJywgLT5cblx0XHRcdGlmIHR5cGVvZiBvcHRpb25zID09ICdmdW5jdGlvbidcblx0XHRcdFx0Y2FsbGJhY2sgPSBvcHRpb25zXG5cdFx0XHRcdG9wdGlvbnMgPSB7fVxuXG5cdFx0XHRjYWxsYmFjayhNb3Rpb25TY29wZS5nZXQob3B0aW9ucykpXG5cdFx0KVxuXG5cdHJlc2V0OiAtPlxuXHRcdGZvciBrZXksIHBsb3Qgb2YgR3JhcGguZ2V0KCkucGxvdHNcblx0XHRcdHBsb3QuZGF0YS5zcGxpY2UoMClcblxuXHQjIGFkZCBwbG90IGxpbmUgdG8gZ3JhcGgsIGFmdGVyIGZpcnN0IHBhaW50XG5cdHBsb3Q6IChsYXllciwgcHJvcCwgb3B0aW9ucz17fSkgLT5cblx0XHRzZXRUaW1lb3V0KD0+XG5cdFx0XHRvcHRpb25zLmxheWVyID89IGxheWVyXG5cdFx0XHRvcHRpb25zLnByb3AgPz0gcHJvcFxuXG5cdFx0XHRuZXcgUGxvdExpbmUob3B0aW9ucylcblx0XHQsIDApXG5cbm1vZHVsZS5leHBvcnRzID0gTW90aW9uU2NvcGVcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBRUFBO0FEQUEsSUFBQSw0QkFBQTtFQUFBOzs7O0FBQU07QUFDTCxNQUFBOztFQUFBLFNBQUEsR0FBWTs7RUFFQyxlQUFBOzs7Ozs7O0lBQ1osSUFBQyxDQUFBLElBQUQsR0FBUTtJQUNSLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFFVCxJQUFDLENBQUEsS0FBRCxHQUFTLFdBQVcsQ0FBQyxHQUFaLENBQUE7SUFFVCxJQUFDLENBQUEsTUFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBQTtFQVBZOztFQVNiLEtBQUMsQ0FBQSxH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
