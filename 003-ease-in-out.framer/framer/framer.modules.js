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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3Bhc3F1YWxlL1NpdGVzL21vdGlvbnNjb3BlLWV4YW1wbGVzLzAwMy1lYXNlLWluLW91dC5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9wYXNxdWFsZS9TaXRlcy9tb3Rpb25zY29wZS1leGFtcGxlcy8wMDMtZWFzZS1pbi1vdXQuZnJhbWVyL21vZHVsZXMvTW90aW9uU2NvcGUuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiY2xhc3MgR3JhcGhcblx0X2luc3RhbmNlID0gbnVsbFxuXG5cdGNvbnN0cnVjdG9yOiAoKSAtPlxuXHRcdEB0aW1lID0gMFxuXHRcdEBwbG90cyA9IHt9XG5cblx0XHRAc2NvcGUgPSBNb3Rpb25TY29wZS5nZXQoKVxuXG5cdFx0QGNyZWF0ZSgpXG5cdFx0QHRpY2soKVxuXG5cdEBnZXQ6ID0+XG5cdFx0X2luc3RhbmNlID89IG5ldyBHcmFwaCgpXG5cblx0Y3JlYXRlOiA9PlxuXHRcdCMgeCBpcyBnbG9iYWwsIGZvciB0aW1lXG5cdFx0QHggPSBkMy5zY2FsZS5saW5lYXIoKS5yYW5nZShbMCwgQHNjb3BlLm9wdGlvbnMud2lkdGggLSAoQHNjb3BlLm9wdGlvbnMubWFyZ2luICogMildKVxuXG5cdFx0IyByb290XG5cdFx0QHN2ZyA9IGQzLnNlbGVjdChAc2NvcGUub3B0aW9ucy5wYXJlbnQuX2VsZW1lbnQpLmFwcGVuZCgnc3ZnJylcblx0XHRcdC5hdHRyKCd3aWR0aCcsIEBzY29wZS5vcHRpb25zLndpZHRoKVxuXHRcdFx0LmF0dHIoJ2hlaWdodCcsIEBzY29wZS5vcHRpb25zLmhlaWdodClcblx0XHRcdC5zdHlsZSgnYmFja2dyb3VuZCcsICdibGFjaycpXG5cdFx0XHQuYXBwZW5kKCdnJylcblxuXHRcdCMgMCVcblx0XHRAc3ZnLmFwcGVuZChcImxpbmVcIilcblx0XHRcdC5hdHRyKFwieDFcIiwgQHNjb3BlLm9wdGlvbnMubWFyZ2luKVxuXHRcdFx0LmF0dHIoXCJ5MVwiLCBAc2NvcGUub3B0aW9ucy5tYXJnaW4pXG5cdFx0XHQuYXR0cihcIngyXCIsIEBzY29wZS5vcHRpb25zLndpZHRoIC0gQHNjb3BlLm9wdGlvbnMubWFyZ2luKVxuXHRcdFx0LmF0dHIoXCJ5MlwiLCBAc2NvcGUub3B0aW9ucy5tYXJnaW4pXG5cdFx0XHQuc3R5bGUoXCJzdHJva2Utd2lkdGhcIiwgMSlcblx0XHRcdC5zdHlsZShcInN0cm9rZS1kYXNoYXJyYXlcIiwgJzgsIDUnKVxuXHRcdFx0LnN0eWxlKFwic3Ryb2tlXCIsICcjOTc5Nzk3JylcblxuXHRcdCMgMTAwJVxuXHRcdEBzdmcuYXBwZW5kKFwibGluZVwiKVxuXHRcdFx0LmF0dHIoXCJ4MVwiLCBAc2NvcGUub3B0aW9ucy5tYXJnaW4pXG5cdFx0XHQuYXR0cihcInkxXCIsIEBzY29wZS5vcHRpb25zLmhlaWdodCAtIEBzY29wZS5vcHRpb25zLm1hcmdpbilcblx0XHRcdC5hdHRyKFwieDJcIiwgQHNjb3BlLm9wdGlvbnMud2lkdGggLSBAc2NvcGUub3B0aW9ucy5tYXJnaW4pXG5cdFx0XHQuYXR0cihcInkyXCIsIEBzY29wZS5vcHRpb25zLmhlaWdodCAtIEBzY29wZS5vcHRpb25zLm1hcmdpbilcblx0XHRcdC5zdHlsZShcInN0cm9rZS13aWR0aFwiLCAxKVxuXHRcdFx0LnN0eWxlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCAnOCwgNScpXG5cdFx0XHQuc3R5bGUoXCJzdHJva2VcIiwgJyM5Nzk3OTcnKVxuXG5cdFx0IyA1MCVcblx0XHRAc3ZnLmFwcGVuZChcImxpbmVcIilcblx0XHRcdC5hdHRyKFwieDFcIiwgQHNjb3BlLm9wdGlvbnMubWFyZ2luKVxuXHRcdFx0LmF0dHIoXCJ5MVwiLCBAc2NvcGUub3B0aW9ucy5oZWlnaHQgKiAwLjUpXG5cdFx0XHQuYXR0cihcIngyXCIsIEBzY29wZS5vcHRpb25zLndpZHRoIC0gQHNjb3BlLm9wdGlvbnMubWFyZ2luKVxuXHRcdFx0LmF0dHIoXCJ5MlwiLCBAc2NvcGUub3B0aW9ucy5oZWlnaHQgKiAwLjUpXG5cdFx0XHQuc3R5bGUoXCJzdHJva2Utd2lkdGhcIiwgMSlcblx0XHRcdC5zdHlsZShcInN0cm9rZVwiLCAnIzk3OTc5NycpXG5cblx0XHQjIHBsb3QgcGF0aHMgcGFyZW50XG5cdFx0QHBhdGhzID0gQHN2Zy5hcHBlbmQoJ2cnKVxuXHRcdFx0LmF0dHIoJ3RyYW5zZm9ybScsIFwidHJhbnNsYXRlKCN7QHNjb3BlLm9wdGlvbnMubWFyZ2lufSwgI3tAc2NvcGUub3B0aW9ucy5tYXJnaW59KVwiKVxuXG5cdFx0IyBsZWdlbmRcblx0XHRAbGVnZW5kID0gZDMuc2VsZWN0KEBzY29wZS5vcHRpb25zLnBhcmVudC5fZWxlbWVudClcblx0XHRcdC5hcHBlbmQoXCJkaXZcIilcblx0XHRcdC5zdHlsZSgncG9zaXRpb24nLCAnYWJzb2x1dGUnKVxuXHRcdFx0LnN0eWxlKCd0b3AnLCAnMHB4Jylcblx0XHRcdC5zdHlsZSgnbGVmdCcsICcwcHgnKVxuXHRcdFx0LnN0eWxlKCd3aWR0aCcsIFwiI3tAc2NvcGUub3B0aW9ucy53aWR0aCAtIDEwfXB4XCIpXG5cdFx0XHQuc3R5bGUoJ2hlaWdodCcsIFwiI3tAc2NvcGUub3B0aW9ucy5oZWlnaHQgLSA0MH1weFwiKVxuXHRcdFx0LnN0eWxlKCdkaXNwbGF5JywgJ2ZsZXgnKVxuXHRcdFx0LnN0eWxlKCdqdXN0aWZ5LWNvbnRlbnQnLCAnZmxleC1lbmQnKVxuXHRcdFx0LnN0eWxlKCdhbGlnbi1pdGVtcycsICdmbGV4LWVuZCcpXG5cblx0XHQjIGxvZ29cblx0XHRAc3ZnLmFwcGVuZCgncGF0aCcpXG5cdFx0XHQuYXR0cigndHJhbnNmb3JtJywgXCJ0cmFuc2xhdGUoI3tAc2NvcGUub3B0aW9ucy53aWR0aCAtIDEwNyAtIDEwfSwgI3tAc2NvcGUub3B0aW9ucy5oZWlnaHQgLSAxMiAtIDEwfSlcIilcblx0XHRcdC5hdHRyKFwiZmlsbFwiLCAnI0Q4RDhEOCcpXG5cdFx0XHQuYXR0cignZCcsICdNMTAuNzU1IDExVi40MzFoLTEuNTNMNS42MDYgOS4xNzZINS40OUwxLjg3MS40MzFILjM0MVYxMWgxLjIzVjIuOTI5aC4wODhsMy4zMzIgNy45OThoMS4xMTNsMy4zMzMtNy45OThoLjA4OFYxMWgxLjIzek0xNy42NjIuMTgyYzEuNTA0IDAgMi42ODYuNDk4IDMuNTQ1IDEuNDk0Ljg2Ljk5NiAxLjI5IDIuMzQyIDEuMjkgNC4wMzYgMCAxLjY5LS40MyAzLjAzNS0xLjI4NiA0LjAzNi0uODU3IDEtMi4wNCAxLjUwMS0zLjU0OSAxLjUwMS0xLjUxNCAwLTIuNzAxLS41LTMuNTYzLTEuNTAxLS44NjItMS4wMDEtMS4yOTMtMi4zNDctMS4yOTMtNC4wMzYgMC0xLjcuNDM2LTMuMDQ2IDEuMzA4LTQuMDQuODcxLS45OTMgMi4wNTQtMS40OSAzLjU0OC0xLjQ5em0wIDEuMjE2Yy0xLjA3NCAwLTEuOTI2LjM4OC0yLjU1NiAxLjE2NS0uNjMuNzc2LS45NDUgMS44MjYtLjk0NSAzLjE0OSAwIDEuMzA5LjMwOSAyLjM1Ni45MjcgMy4xNDIuNjE3Ljc4NiAxLjQ3NSAxLjE4IDIuNTc0IDEuMTggMS4wODQgMCAxLjkzNS0uMzk0IDIuNTUzLTEuMTguNjE3LS43ODYuOTI2LTEuODMzLjkyNi0zLjE0MiAwLTEuMzIzLS4zMS0yLjM3My0uOTMtMy4xNS0uNjItLjc3Ni0xLjQ3LTEuMTY0LTIuNTQ5LTEuMTY0ek0yNy43OTcgMTFWMS42MThoMy40MDZWLjQzaC04LjEzdjEuMTg3aDMuNDA2VjExaDEuMzE4em02LjUyNiAwVi40MzFoLTEuMzE4VjExaDEuMzE4ek00MS4yMy4xODJjMS41MDQgMCAyLjY4Ni40OTggMy41NDUgMS40OTQuODYuOTk2IDEuMjg5IDIuMzQyIDEuMjg5IDQuMDM2IDAgMS42OS0uNDI4IDMuMDM1LTEuMjg1IDQuMDM2LS44NTcgMS0yLjA0IDEuNTAxLTMuNTQ5IDEuNTAxLTEuNTE0IDAtMi43MDEtLjUtMy41NjMtMS41MDEtLjg2Mi0xLjAwMS0xLjI5My0yLjM0Ny0xLjI5My00LjAzNiAwLTEuNy40MzYtMy4wNDYgMS4zMDctNC4wNC44NzItLjk5MyAyLjA1NS0xLjQ5IDMuNTQ5LTEuNDl6bTAgMS4yMTZjLTEuMDc0IDAtMS45MjYuMzg4LTIuNTU2IDEuMTY1LS42My43NzYtLjk0NSAxLjgyNi0uOTQ1IDMuMTQ5IDAgMS4zMDkuMzA5IDIuMzU2LjkyNyAzLjE0Mi42MTcuNzg2IDEuNDc1IDEuMTggMi41NzQgMS4xOCAxLjA4NCAwIDEuOTM1LS4zOTQgMi41NTItMS4xOC42MTgtLjc4Ni45MjctMS44MzMuOTI3LTMuMTQyIDAtMS4zMjMtLjMxLTIuMzczLS45My0zLjE1LS42Mi0uNzc2LTEuNDctMS4xNjQtMi41NDktMS4xNjR6TTQ5LjQxOCAxMVYyLjgwNGguMTE4TDU1LjI3IDExaDEuMjgxVi40MzFINTUuMjV2OC4yMjVoLS4xMThMNDkuMzk2LjQzMWgtMS4yODFWMTFoMS4zMDN6bTkuMDktMi43NjFjLjA2OC45MTMuNDYgMS42NDMgMS4xNzUgMi4xOS43MTYuNTQ3IDEuNjMyLjgyIDIuNzUuODIgMS4yMTIgMCAyLjE3Mi0uMjg3IDIuODgzLS44Ni43MS0uNTc0IDEuMDY1LTEuMzQ3IDEuMDY1LTIuMzE5IDAtLjc3Ni0uMjM4LTEuMzk0LS43MTQtMS44NTMtLjQ3Ni0uNDU5LTEuMjYtLjgyNS0yLjM1NS0xLjA5OGwtMS4xMDUtLjI5M2MtLjcyOC0uMTg2LTEuMjUtLjQwOC0xLjU2NC0uNjY3YTEuMjQ2IDEuMjQ2IDAgMCAxLS40NzMtMS4wMWMwLS41MzguMjE0LS45NjcuNjQxLTEuMjkuNDI4LS4zMjIuOTkzLS40ODMgMS42OTYtLjQ4My42NTkgMCAxLjIuMTUzIDEuNjIyLjQ1OC40MjMuMzA1LjY4LjcyOC43NzMgMS4yN2gxLjMyNmMtLjA1NC0uODU0LS40MjUtMS41NTUtMS4xMTQtMi4xMDItLjY4OC0uNTQ2LTEuNTQzLS44Mi0yLjU2My0uODItMS4xMTggMC0yLjAyLjI3Ny0yLjcwNy44MzEtLjY4Ni41NTUtMS4wMjkgMS4yOC0xLjAyOSAyLjE4IDAgLjc1MS4yMTggMS4zNTMuNjUyIDEuODA1LjQzNS40NTEgMS4xMy44IDIuMDg4IDEuMDQ0bDEuMzU1LjM1MWMuNzI3LjE4IDEuMjYyLjQyIDEuNjA0LjcxOC4zNDEuMjk4LjUxMi42NzEuNTEyIDEuMTIgMCAuNTIzLS4yMzMuOTU2LS43IDEuMy0uNDY1LjM0NS0xLjA1NS41MTctMS43NjguNTE3LS43NTIgMC0xLjM3Mi0uMTY0LTEuODYtLjQ5LS40ODktLjMyOC0uNzc0LS43NjctLjg1Ny0xLjMyaC0xLjMzM3ptMTQuMDg0IDMuMDFjMS4xMjMgMCAyLjA3Mi0uMjkgMi44NDYtLjg2OC43NzQtLjU3OSAxLjI0OS0xLjM1NCAxLjQyNC0yLjMyNWgtMS4zNGEyLjQ3NiAyLjQ3NiAwIDAgMS0xLjAzNiAxLjQ0NmMtLjUyNS4zNTQtMS4xNTYuNTMxLTEuODk0LjUzMS0xLjAxNSAwLTEuODIxLS4zODgtMi40MTctMS4xNjQtLjU5NS0uNzc3LS44OTMtMS44MjctLjg5My0zLjE1IDAtMS4zMjguMjk2LTIuMzguODktMy4xNTcuNTkzLS43NzYgMS4zOTctMS4xNjQgMi40MTMtMS4xNjQuNzI4IDAgMS4zNTUuMTk5IDEuODgyLjU5Ny41MjguMzk4Ljg4LjkzOSAxLjA1NSAxLjYyMmgxLjM0Yy0uMTU2LTEuMDItLjYzLTEuODQ4LTEuNDItMi40ODNDNzQuNjUuNSA3My42OTcuMTgyIDcyLjU4NC4xODJjLTEuNDM2IDAtMi41Ny40OTYtMy40MDYgMS40ODctLjgzNS45OTEtMS4yNTIgMi4zNDEtMS4yNTIgNC4wNSAwIDEuNzA0LjQxOCAzLjA1MiAxLjI1NiA0LjA0My44MzcuOTkxIDEuOTc0IDEuNDg3IDMuNDEgMS40ODd6TTgzLjI4Ni4xODJjMS41MDQgMCAyLjY4NS40OTggMy41NDUgMS40OTQuODU5Ljk5NiAxLjI4OSAyLjM0MiAxLjI4OSA0LjAzNiAwIDEuNjktLjQyOSAzLjAzNS0xLjI4NiA0LjAzNi0uODU3IDEtMi4wNCAxLjUwMS0zLjU0OCAxLjUwMS0xLjUxNCAwLTIuNzAyLS41LTMuNTY0LTEuNTAxLS44NjEtMS4wMDEtMS4yOTItMi4zNDctMS4yOTItNC4wMzYgMC0xLjcuNDM1LTMuMDQ2IDEuMzA3LTQuMDQuODcyLS45OTMgMi4wNTQtMS40OSAzLjU0OS0xLjQ5em0wIDEuMjE2Yy0xLjA3NSAwLTEuOTI3LjM4OC0yLjU1NyAxLjE2NS0uNjMuNzc2LS45NDQgMS44MjYtLjk0NCAzLjE0OSAwIDEuMzA5LjMwOSAyLjM1Ni45MjYgMy4xNDIuNjE4Ljc4NiAxLjQ3NiAxLjE4IDIuNTc1IDEuMTggMS4wODQgMCAxLjkzNC0uMzk0IDIuNTUyLTEuMTguNjE4LS43ODYuOTI3LTEuODMzLjkyNy0zLjE0MiAwLTEuMzIzLS4zMS0yLjM3My0uOTMtMy4xNS0uNjItLjc3Ni0xLjQ3LTEuMTY0LTIuNTUtMS4xNjR6TTkwLjE3LjQzaDMuOTkyYzEuMDAxIDAgMS44MTUuMzE5IDIuNDQzLjk1Ni42MjcuNjM3Ljk0IDEuNDU5Ljk0IDIuNDY1IDAgLjk4Ni0uMzE4IDEuNzk1LS45NTUgMi40MjgtLjYzNy42MzItMS40NTEuOTQ4LTIuNDQzLjk0OEg5MS40OVYxMUg5MC4xN1YuNDMxem0xLjMxOSAxLjE3MnY0LjQ1M2gyLjMyOWMuNzUyIDAgMS4zMzUtLjE5MyAxLjc1LS41NzguNDE1LS4zODYuNjIzLS45MjguNjIzLTEuNjI2IDAtLjcyOC0uMjA0LTEuMjg1LS42MTItMS42Ny0uNDA3LS4zODYtLjk5NS0uNTc5LTEuNzYxLS41NzloLTIuMzN6bTE0LjUyNCA4LjIxaC01LjIzVjYuMTgxaDQuOTU5VjUuMDA5aC00Ljk1OVYxLjYxOGg1LjIzVi40M2gtNi41NDhWMTFoNi41NDhWOS44MTN6JylcblxuXHRhZGRMZWdlbmQ6IChuYW1lLCBjb2xvcikgPT5cblx0XHRuYW1lICs9IFwiIHBvc2l0aW9uXCIgaWYgbmFtZSBpbiBbJ3gnLCAneSddXG5cblx0XHQjIGJ1bGxldFxuXHRcdEBsZWdlbmQuYXBwZW5kKFwiZGl2XCIpXG5cdFx0XHQuc3R5bGUoJ3ZlcnRpY2FsLWFsaWduJywgJ21pZGRsZScpXG5cdFx0XHQuc3R5bGUoXCJ3aWR0aFwiLCBcIjE1cHhcIilcblx0XHRcdC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHhcIilcblx0XHRcdC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIxMDBweFwiKVxuXHRcdFx0LnN0eWxlKCdtYXJnaW4nLCAnMCAwIDAgMjBweCcpXG5cdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIGNvbG9yKVxuXG5cdFx0IyBsYWJlbFxuXHRcdEBsZWdlbmQuYXBwZW5kKFwiZGl2XCIpXG5cdFx0XHQuc3R5bGUoXCJmb250XCIsIFwibm9ybWFsIDE1cHggTWVubG8sIG1vbm9zcGFjZVwiKVxuXHRcdFx0LnN0eWxlKCdtYXJnaW4nLCAnMCAwIDAgMTBweCcpXG5cdFx0XHQudGV4dChuYW1lKVxuXG5cdHk6ID0+XG5cdFx0ZDMuc2NhbGUubGluZWFyKCkucmFuZ2UoW0BzY29wZS5vcHRpb25zLmhlaWdodCAtIChAc2NvcGUub3B0aW9ucy5tYXJnaW4gKiAyKSwgMF0pXG5cblx0dGltZUludGVydmFsOiAoZCwgaSkgPT5cblx0XHRAeChpICsgQHRpbWUgLSBAc2NvcGUub3B0aW9ucy5saW1pdClcblxuXHRkcmF3OiA9PlxuXHRcdCMgc2hpZnQgdGltZSBheGlzXG5cdFx0QHguZG9tYWluIFtAdGltZSAtIEBzY29wZS5vcHRpb25zLmxpbWl0LCBAdGltZV1cblxuXHRcdCMgcmVkcmF3IHBsb3RzXG5cdFx0Zm9yIG5hbWUsIHBsb3Qgb2YgQHBsb3RzXG5cdFx0XHRwbG90LmRyYXcoKVxuXG5cdHRpY2s6ID0+XG5cdFx0IyBxdWV1ZSBuZXh0IHRpY2tcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoQHRpY2spXG5cblx0XHQjIHRpbWUgaXMgZ2xvYmFsIGZvciB0aGUgZ3JhcGhcblx0XHRAdGltZSsrXG5cblx0XHQjIHJlc2FtcGxlIHBsb3QgZGF0YVxuXHRcdGZvciBuYW1lLCBwbG90IG9mIEBwbG90c1xuXHRcdFx0cGxvdC5zYW1wbGUoKVxuXG5cdFx0IyByZWRyYXcgZ3JhcGhcblx0XHRAZHJhdygpXG5cblxuY2xhc3MgUGxvdExpbmVcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAb3B0aW9ucy5jb2xvciA/PSBGcmFtZXIuVXRpbHMucmFuZG9tQ29sb3IoKS50b0hleFN0cmluZygpXG5cdFx0QG9wdGlvbnMubmFtZSA/PSBAb3B0aW9ucy5wcm9wXG5cdFx0QG9wdGlvbnMua2V5ID89IFwiI3tAb3B0aW9ucy5sYXllci5uYW1lfV8je0BvcHRpb25zLnByb3B9XCJcblxuXHRcdEBvcHRpb25zLm1pbiA/PSAwXG5cdFx0QG9wdGlvbnMubWF4ID89IDFcblxuXHRcdEBzY29wZSA9IE1vdGlvblNjb3BlLmdldCgpXG5cdFx0QGdyYXBoID0gR3JhcGguZ2V0KClcblxuXHRcdCMgcmV0dXJuIGlmIGl0IGFscmVhZHkgZXhpc3RzXG5cdFx0IyBUT0RPOiByZW1hcCB0byBuZXcgaW5zdGFuY2Ugb2YgbGF5ZXIgb24gbGl2ZSByZWxvYWRcblx0XHRyZXR1cm4gaWYgQGdyYXBoLnBsb3RzW0BvcHRpb25zLmtleV1cblxuXHRcdEB5ID0gQGdyYXBoLnkoKVxuXG5cdFx0QGxpbmUgPSBkMy5zdmcubGluZSgpLngoQGdyYXBoLnRpbWVJbnRlcnZhbCkueSgoZCkgPT4gQHkoZCkpXG5cblx0XHRAZGF0YSA9IFtdXG5cblx0XHRAcGF0aCA9IEBncmFwaC5wYXRocy5hcHBlbmQoJ3BhdGgnKVxuICAgICAgLmRhdGEoW0BkYXRhXSlcbiAgICAgIC5hdHRyKCdjbGFzcycsIFwiI3tAb3B0aW9ucy5rZXl9IGxpbmVcIilcblx0XHRcdC5zdHlsZShcInN0cm9rZS1saW5lam9pblwiLCAncm91bmQnKVxuXHRcdFx0LnN0eWxlKFwic3Ryb2tlLWxpbmVjYXBcIiwgJ3JvdW5kJylcblx0XHRcdC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgNSlcblx0XHRcdC5zdHlsZSgnZmlsbCcsICd0cmFuc3BhcmVudCcpXG4gICAgICAuc3R5bGUoJ3N0cm9rZScsIEBvcHRpb25zLmNvbG9yKVxuXG5cdFx0QGdyYXBoLnBsb3RzW0BvcHRpb25zLmtleV0gPSBAXG5cblx0XHRAZ3JhcGguYWRkTGVnZW5kKEBvcHRpb25zLm5hbWUsIEBvcHRpb25zLmNvbG9yKVxuXG5cdHNhbXBsZTogKCkgPT5cblx0XHRAZGF0YS5wdXNoIEBvcHRpb25zLmxheWVyW0BvcHRpb25zLnByb3BdXG5cblx0XHRpZiBAZGF0YS5sZW5ndGggPiBAc2NvcGUub3B0aW9ucy5saW1pdFxuXHRcdFx0QGRhdGEuc2hpZnQoKVxuXG5cdFx0QHBhdGguYXR0cignZCcsIEBsaW5lKVxuXG5cdGRyYXc6ICgpID0+XG5cdFx0ZXh0ZW50ID0gZDMuZXh0ZW50KEBkYXRhKVxuXG5cdFx0IyBzdHJldGNoIG1pbi9tYXggdG8gZXh0ZW50XG5cdFx0QG9wdGlvbnMubWluID0gTWF0aC5taW4oQG9wdGlvbnMubWluLCBleHRlbnRbMF0pXG5cdFx0QG9wdGlvbnMubWF4ID0gTWF0aC5tYXgoQG9wdGlvbnMubWF4LCBleHRlbnRbMV0pXG5cblx0XHRAeS5kb21haW4gW0BvcHRpb25zLm1pbiwgQG9wdGlvbnMubWF4XVxuXG5jbGFzcyBNb3Rpb25TY29wZSBleHRlbmRzIEZyYW1lci5CYXNlQ2xhc3Ncblx0X2luc3RhbmNlID0gbnVsbFxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMud2lkdGggPz0gNjAwXG5cdFx0QG9wdGlvbnMuaGVpZ2h0ID89IDYwMFxuXHRcdEBvcHRpb25zLm1hcmdpbiA/PSA3NVxuXHRcdEBvcHRpb25zLmxpbWl0ID89IDMwMFxuXG5cdFx0IyB1c2UgcGFyZW50cyBzaXplIGlmIHNwZWNpZmllZFxuXHRcdGlmIEBvcHRpb25zLnBhcmVudFxuXHRcdFx0QG9wdGlvbnMucGFyZW50LmluZGV4ID0gLTkwMjEwXG5cdFx0XHRAb3B0aW9ucy53aWR0aCA9IEBvcHRpb25zLnBhcmVudC53aWR0aFxuXHRcdFx0QG9wdGlvbnMuaGVpZ2h0ID0gQG9wdGlvbnMucGFyZW50LmhlaWdodFxuXHRcdGVsc2Vcblx0XHRcdEBvcHRpb25zLnBhcmVudCA9IEZyYW1lci5EZXZpY2UuY29udGVudFxuXG5cdFx0aWYgQG9wdGlvbnMucmVzZXRcblx0XHRcdEBvcHRpb25zLnJlc2V0Lm9uQ2xpY2sgPT5cblx0XHRcdFx0QC5yZXNldCgpXG5cblx0QGdldDogKG9wdGlvbnM9e30pIC0+XG5cdFx0X2luc3RhbmNlID89IG5ldyBNb3Rpb25TY29wZShvcHRpb25zKVxuXG5cdEBsb2FkOiAob3B0aW9ucz17fSwgY2FsbGJhY2spIC0+XG5cdFx0VXRpbHMuZG9tTG9hZFNjcmlwdCgnaHR0cHM6Ly9kM2pzLm9yZy9kMy52My5taW4uanMnLCAtPlxuXHRcdFx0aWYgdHlwZW9mIG9wdGlvbnMgPT0gJ2Z1bmN0aW9uJ1xuXHRcdFx0XHRjYWxsYmFjayA9IG9wdGlvbnNcblx0XHRcdFx0b3B0aW9ucyA9IHt9XG5cblx0XHRcdGNhbGxiYWNrKE1vdGlvblNjb3BlLmdldChvcHRpb25zKSlcblx0XHQpXG5cblx0cmVzZXQ6IC0+XG5cdFx0Zm9yIGtleSwgcGxvdCBvZiBHcmFwaC5nZXQoKS5wbG90c1xuXHRcdFx0cGxvdC5kYXRhLnNwbGljZSgwKVxuXG5cdCMgYWRkIHBsb3QgbGluZSB0byBncmFwaCwgYWZ0ZXIgZmlyc3QgcGFpbnRcblx0cGxvdDogKGxheWVyLCBwcm9wLCBvcHRpb25zPXt9KSAtPlxuXHRcdHNldFRpbWVvdXQoPT5cblx0XHRcdG9wdGlvbnMubGF5ZXIgPz0gbGF5ZXJcblx0XHRcdG9wdGlvbnMucHJvcCA/PSBwcm9wXG5cblx0XHRcdG5ldyBQbG90TGluZShvcHRpb25zKVxuXHRcdCwgMClcblxubW9kdWxlLmV4cG9ydHMgPSBNb3Rpb25TY29wZVxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7QURBQSxJQUFBLDRCQUFBO0VBQUE7Ozs7QUFBTTtBQUNMLE1BQUE7O0VBQUEsU0FBQSxHQUFZOztFQUVDLGVBQUE7Ozs7Ozs7SUFDWixJQUFDLENBQUEsSUFBRCxHQUFRO0lBQ1IsSUFBQyxDQUFBLEtBQUQsR0FBUztJQUVULElBQUMsQ0FBQSxLQUFELEdBQVMsV0FBVyxDQUFDLEdBQVosQ0FBQTtJQUVULElBQUMsQ0FBQSxNQUFELENBQUE7SUFDQSxJQUFDLENBQUEsSUFBRCxDQUFBO0VBUFk7O0VBU2IsS0FB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
