// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"december19.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/curtainsjs/libs/curtains.min.js":[function(require,module,exports) {
"use strict";function Curtains(t){var e;(this.planes=[],this.shaderPasses=[],this._drawStacks={opaque:{length:0,programs:[]},transparent:{length:0,programs:[]}},this._drawingEnabled=!0,this._forceRender=!1,"string"==typeof t)&&(console.warn("Since v4.0 you should use an object to pass your container and other parameters. Please refer to the docs: https://www.curtainsjs.com/documentation.html"),t={container:e=t});t.container?"string"==typeof t.container?this.container=document.getElementById(t.container):t.container instanceof Element&&(this.container=t.container):((e=document.createElement("div")).setAttribute("id","curtains-canvas"),document.body.appendChild(e),this.container=e);if(this._autoResize=t.autoResize,null!==this._autoResize&&void 0!==this._autoResize||(this._autoResize=!0),this._autoRender=t.autoRender,null!==this._autoRender&&void 0!==this._autoRender||(this._autoRender=!0),this._watchScroll=t.watchScroll,null!==this._watchScroll&&void 0!==this._watchScroll||(this._watchScroll=!0),this.pixelRatio=t.pixelRatio||window.devicePixelRatio||1,this.productionMode=t.production||!1,!this.container)return this.productionMode||console.warn("You must specify a valid container ID"),void(this._onErrorCallback&&this._onErrorCallback());this._init()}Curtains.prototype._init=function(){if(this.glCanvas=document.createElement("canvas"),this.glContext=this.glCanvas.getContext("webgl",{alpha:!0})||this.glCanvas.getContext("experimental-webgl"),!this.glContext)return this.productionMode||console.warn("WebGL context could not be created"),void(this._onErrorCallback&&this._onErrorCallback());this._drawStateManager={currentProgramID:null,programs:[],currentBuffersID:0},this._loseContextExtension=this.glContext.getExtension("WEBGL_lose_context"),this._contextLostHandler=this._contextLost.bind(this),this.glCanvas.addEventListener("webglcontextlost",this._contextLostHandler,!1),this._contextRestoredHandler=this._contextRestored.bind(this),this.glCanvas.addEventListener("webglcontextrestored",this._contextRestoredHandler,!1),this._scrollManager={handler:this._scroll.bind(this,!0),shouldWatch:this._watchScroll,xOffset:window.pageXOffset,yOffset:window.pageYOffset,lastXDelta:0,lastYDelta:0},this._watchScroll&&window.addEventListener("scroll",this._scrollManager.handler,{passive:!0}),this.setPixelRatio(this.pixelRatio,!1),this._resizeHandler=null,this._autoResize&&(this._resizeHandler=this.resize.bind(this,!0),window.addEventListener("resize",this._resizeHandler,!1)),this._readyToDraw()},Curtains.prototype.setPixelRatio=function(t,e){this.pixelRatio=parseFloat(Math.max(t,1))||1,this.resize(e)},Curtains.prototype._setSize=function(){var t=this.container.getBoundingClientRect();this._boundingRect={width:t.width*this.pixelRatio,height:t.height*this.pixelRatio,top:t.top*this.pixelRatio,left:t.left*this.pixelRatio};var e=!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/),i=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;if(e&&i){this._boundingRect.top=function(t){for(var e=0;t&&!isNaN(t.offsetTop);)e+=t.offsetTop-t.scrollTop,t=t.offsetParent;return e}(this.container)*this.pixelRatio}this.glCanvas.style.width=Math.floor(this._boundingRect.width/this.pixelRatio)+"px",this.glCanvas.style.height=Math.floor(this._boundingRect.height/this.pixelRatio)+"px",this.glCanvas.width=Math.floor(this._boundingRect.width),this.glCanvas.height=Math.floor(this._boundingRect.height),this.glContext.viewport(0,0,this.glContext.drawingBufferWidth,this.glContext.drawingBufferHeight),this._scrollManager.shouldWatch&&(this._scrollManager.xOffset=window.pageXOffset,this._scrollManager.yOffset=window.pageYOffset)},Curtains.prototype.getBoundingRect=function(){return this._boundingRect},Curtains.prototype.resize=function(t){this._setSize();for(var e=0;e<this.planes.length;e++)this.planes[e]._canDraw&&this.planes[e].planeResize();for(e=0;e<this.shaderPasses.length;e++)this.shaderPasses[e]._canDraw&&this.shaderPasses[e].planeResize();this.needRender();var i=this;setTimeout(function(){i._onAfterResizeCallback&&t&&i._onAfterResizeCallback()},0)},Curtains.prototype._scroll=function(){var t={x:window.pageXOffset,y:window.pageYOffset};if(this.updateScrollValues(t.x,t.y),this._scrollManager.shouldWatch){for(var e=0;e<this.planes.length;e++)this.planes[e].watchScroll&&this.planes[e].updateScrollPosition();this.needRender()}var i=this;setTimeout(function(){i._onScrollCallback&&i._onScrollCallback()},0)},Curtains.prototype.updateScrollValues=function(t,e){var i=this._scrollManager.xOffset;this._scrollManager.xOffset=t,this._scrollManager.lastXDelta=i-this._scrollManager.xOffset;var r=this._scrollManager.yOffset;this._scrollManager.yOffset=e,this._scrollManager.lastYDelta=r-this._scrollManager.yOffset},Curtains.prototype.getScrollDeltas=function(){return{x:this._scrollManager.lastXDelta,y:this._scrollManager.lastYDelta}},Curtains.prototype.getScrollValues=function(){return{x:this._scrollManager.xOffset,y:this._scrollManager.yOffset}},Curtains.prototype.enableDrawing=function(){this._drawingEnabled=!0},Curtains.prototype.disableDrawing=function(){this._drawingEnabled=!1},Curtains.prototype.needRender=function(){this._forceRender=!0},Curtains.prototype._contextLost=function(t){t.preventDefault(),this._drawStateManager={currentProgramID:null,programs:[]},this._animationFrameID&&window.cancelAnimationFrame(this._animationFrameID);var e=this;setTimeout(function(){e._onContextLostCallback&&e._onContextLostCallback()},0)},Curtains.prototype.restoreContext=function(){this.glContext&&this._loseContextExtension?this._loseContextExtension.restoreContext():this.productionMode||(this.glContext?this._loseContextExtension||console.warn("Could not restore context because the restore context extension is not defined"):console.warn("Could not restore context because the context is not defined"))},Curtains.prototype._contextRestored=function(){for(var t=0;t<this.planes.length;t++)this.planes[t]._restoreContext();for(t=0;t<this.shaderPasses.length;t++)this.shaderPasses[t]._restoreContext();var e=this;setTimeout(function(){e._onContextRestoredCallback&&e._onContextRestoredCallback()},0),this.needRender(),this._animate()},Curtains.prototype.dispose=function(){for(;this.planes.length>0;)this.removePlane(this.planes[0]);for(;this.shaderPasses.length>0;)this.removeShaderPass(this.shaderPasses[0]);this._shaders&&(this._shaders=null);for(var t=0;t<this._drawStateManager.programs.length;t++){var e=this._drawStateManager.programs[t];this.glContext.deleteShader(e.fragmentShader),this.glContext.deleteShader(e.vertexShader),this.glContext.deleteProgram(e.program)}this._drawStateManager={currentProgramID:null,programs:[]};var i=this,r=setInterval(function(){0===i.planes.length&&0===i.shaderPasses.length&&(clearInterval(r),i.glContext.clear(i.glContext.DEPTH_BUFFER_BIT|i.glContext.COLOR_BUFFER_BIT),i._animationFrameID&&window.cancelAnimationFrame(i._animationFrameID),this._resizeHandler&&window.removeEventListener("resize",i._resizeHandler,!1),this._watchScroll&&window.removeEventListener("scroll",this._scrollManager.handler,{passive:!0}),i.glCanvas.removeEventListener("webglcontextlost",i._contextLostHandler,!1),i.glCanvas.removeEventListener("webglcontextrestored",i._contextRestoredHandler,!1),i.glContext&&i._loseContextExtension&&i._loseContextExtension.loseContext(),i.glCanvas.width=i.glCanvas.width,i.glContext=null,i.container.removeChild(i.glCanvas),i.container=null,i.glCanvas=null)},100)},Curtains.prototype._createShader=function(t,e){var i=this.glContext.createShader(e);return this.glContext.shaderSource(i,t),this.glContext.compileShader(i),this.productionMode||this.glContext.getShaderParameter(i,this.glContext.COMPILE_STATUS)?i:(console.warn("Errors occurred while compiling the shader:\n"+this.glContext.getShaderInfoLog(i)),null)},Curtains.prototype._isEqualShader=function(t,e){var i=!1;return 0===t.localeCompare(e)&&(i=!0),i},Curtains.prototype._setupProgram=function(t,e,i){this.glContext;for(var r={},a=0;a<this._drawStateManager.programs.length;a++)this._isEqualShader(this._drawStateManager.programs[a].vsCode,t)&&this._isEqualShader(this._drawStateManager.programs[a].fsCode,e)&&(r=this._drawStateManager.programs[a]);return r.program?r:this._createProgram(t,e,i)},Curtains.prototype._createProgram=function(t,e,i){var r=this.glContext,a=!0,s=r.createProgram(),n=this._createShader(t,r.VERTEX_SHADER),o=this._createShader(e,r.FRAGMENT_SHADER);if(n&&o||(this.productionMode||console.warn("Unable to find or compile the vertex or fragment shader"),a=!1),a&&(r.attachShader(s,n),r.attachShader(s,o),r.linkProgram(s),this.productionMode||r.getProgramParameter(s,r.LINK_STATUS)||(console.warn("Unable to initialize the shader program."),a=!1)),a){var h={id:this._drawStateManager.programs.length,vsCode:t,vertexShader:n,fsCode:e,fragmentShader:o,program:s,type:i};return"Plane"===i&&(this._drawStacks.opaque.programs["program-"+h.id]=[],this._drawStacks.transparent.programs["program-"+h.id]=[]),this._drawStateManager.programs.push(h),h}return a},Curtains.prototype._useProgram=function(t){var e=this._drawStateManager;null!==e.currentProgramID&&e.currentProgramID===t.id||(this.glContext.useProgram(t.program),e.currentProgramID=t.id)},Curtains.prototype._createPlane=function(t,e){var i=new Curtains.Plane(this,t,e);return i._usedProgram?this.planes.push(i):i=!1,i},Curtains.prototype.addPlane=function(t,e){return this.glContext?t&&0!==t.length?this._createPlane(t,e):(this.productionMode||console.warn("The html element you specified does not currently exists in the DOM"),this._onErrorCallback&&this._onErrorCallback(),!1):(this.productionMode||console.warn("Unable to create a plane. The WebGl context couldn't be created"),this._onErrorCallback&&this._onErrorCallback(),null)},Curtains.prototype.removePlane=function(t){var e;t._canDraw=!1,t&&t._dispose();for(var i=0;i<this.planes.length;i++)t.index===this.planes[i].index&&(e=i);t=null,this.planes[e]=null,this.planes.splice(e,1);for(i=0;i<this._drawStateManager.programs.length;i++)this._drawStacks.opaque.programs["program-"+this._drawStateManager.programs[i].id]=[],this._drawStacks.transparent.programs["program-"+ +this._drawStateManager.programs[i].id]=[];this._drawStacks.opaque.length=0,this._drawStacks.transparent.length=0;for(i=0;i<this.planes.length;i++)this.planes[i].index=i,this._stackPlane(this.planes[i]);this.glContext&&this.glContext.clear(this.glContext.DEPTH_BUFFER_BIT|this.glContext.COLOR_BUFFER_BIT)},Curtains.prototype._stackPlane=function(t){var e=t._transparent?"transparent":"opaque";"transparent"===e?this._drawStacks[e].programs["program-"+t._usedProgram.id].unshift(t.index):this._drawStacks[e].programs["program-"+t._usedProgram.id].push(t.index),this._drawStacks[e].length++},Curtains.prototype._createShaderPass=function(t){var e=new Curtains.ShaderPass(this,t);return e._usedProgram?this.shaderPasses.push(e):e=!1,e},Curtains.prototype.addShaderPass=function(t){return this.glContext?this._createShaderPass(t):(this.productionMode||console.warn("Unable to create a plane. The WebGl context couldn't be created"),this._onErrorCallback&&this._onErrorCallback(),null)},Curtains.prototype.removeShaderPass=function(t){var e;t._canDraw=!1,t&&t._dispose();for(var i=0;i<this.shaderPasses.length;i++)t.index===this.shaderPasses[i].index&&(e=i);t=null,this.shaderPasses[e]=null,this.shaderPasses.splice(e,1),this.glContext&&this.glContext.clear(this.glContext.DEPTH_BUFFER_BIT|this.glContext.COLOR_BUFFER_BIT)},Curtains.prototype._handleDepth=function(t){this._shouldHandleDepth=t,t?this.glContext.enable(this.glContext.DEPTH_TEST):this.glContext.disable(this.glContext.DEPTH_TEST)},Curtains.prototype._multiplyMatrix=function(t,e){var i=new Float32Array(16);return i[0]=e[0]*t[0]+e[1]*t[4]+e[2]*t[8]+e[3]*t[12],i[1]=e[0]*t[1]+e[1]*t[5]+e[2]*t[9]+e[3]*t[13],i[2]=e[0]*t[2]+e[1]*t[6]+e[2]*t[10]+e[3]*t[14],i[3]=e[0]*t[3]+e[1]*t[7]+e[2]*t[11]+e[3]*t[15],i[4]=e[4]*t[0]+e[5]*t[4]+e[6]*t[8]+e[7]*t[12],i[5]=e[4]*t[1]+e[5]*t[5]+e[6]*t[9]+e[7]*t[13],i[6]=e[4]*t[2]+e[5]*t[6]+e[6]*t[10]+e[7]*t[14],i[7]=e[4]*t[3]+e[5]*t[7]+e[6]*t[11]+e[7]*t[15],i[8]=e[8]*t[0]+e[9]*t[4]+e[10]*t[8]+e[11]*t[12],i[9]=e[8]*t[1]+e[9]*t[5]+e[10]*t[9]+e[11]*t[13],i[10]=e[8]*t[2]+e[9]*t[6]+e[10]*t[10]+e[11]*t[14],i[11]=e[8]*t[3]+e[9]*t[7]+e[10]*t[11]+e[11]*t[15],i[12]=e[12]*t[0]+e[13]*t[4]+e[14]*t[8]+e[15]*t[12],i[13]=e[12]*t[1]+e[13]*t[5]+e[14]*t[9]+e[15]*t[13],i[14]=e[12]*t[2]+e[13]*t[6]+e[14]*t[10]+e[15]*t[14],i[15]=e[12]*t[3]+e[13]*t[7]+e[14]*t[11]+e[15]*t[15],i},Curtains.prototype._scaleMatrix=function(t,e,i,r){var a=new Float32Array(16);return a[0]=e*t[0],a[1]=e*t[1],a[2]=e*t[2],a[3]=e*t[3],a[4]=i*t[4],a[5]=i*t[5],a[6]=i*t[6],a[7]=i*t[7],a[8]=r*t[8],a[9]=r*t[9],a[10]=r*t[10],a[11]=r*t[11],t!==a&&(a[12]=t[12],a[13]=t[13],a[14]=t[14],a[15]=t[15]),a},Curtains.prototype._applyTransformationsMatrix=function(t,e,i){var r=new Float32Array(16),a=new Float32Array(4),s=Math.sin(.5*e[0]),n=Math.cos(.5*e[0]),o=Math.sin(.5*e[1]),h=Math.cos(.5*e[1]),l=Math.sin(.5*e[2]),u=Math.cos(.5*e[2]);a[0]=s*h*u-n*o*l,a[1]=n*o*u+s*h*l,a[2]=n*h*l-s*o*u,a[3]=n*h*u+s*o*l;var d=new Float32Array(3);d[0]=a[0]+a[0],d[1]=a[1]+a[1],d[2]=a[2]+a[2];var p=new Float32Array(9);return p[0]=a[0]*d[0],p[1]=a[0]*d[1],p[2]=a[0]*d[2],p[3]=a[1]*d[1],p[4]=a[1]*d[2],p[5]=a[2]*d[2],p[6]=a[3]*d[0],p[7]=a[3]*d[1],p[8]=a[3]*d[2],r[0]=(1-(p[3]+p[5]))*i[0],r[1]=(p[1]+p[8])*i[0],r[2]=(p[2]-p[7])*i[0],r[3]=0,r[4]=(p[1]-p[8])*i[1],r[5]=(1-(p[0]+p[5]))*i[1],r[6]=(p[4]+p[6])*i[1],r[7]=0,r[8]=(p[2]+p[7])*i[2],r[9]=(p[4]-p[6])*i[2],r[10]=(1-(p[0]+p[3]))*i[2],r[11]=0,r[12]=t[0],r[13]=t[1],r[14]=t[2],r[15]=1,r},Curtains.prototype._applyMatrixToPoint=function(t,e){var i=t[0],r=t[1],a=t[2],s=1/(e[3]*i+e[7]*r+e[11]*a+e[15]);return t[0]=(e[0]*i+e[4]*r+e[8]*a+e[12])*s,t[1]=(e[1]*i+e[5]*r+e[9]*a+e[13])*s,t[2]=(e[2]*i+e[6]*r+e[10]*a+e[14])*s,t},Curtains.prototype._readyToDraw=function(){this.container.appendChild(this.glCanvas),this.glContext.enable(this.glContext.BLEND),this.glContext.blendFunc(this.glContext.ONE,this.glContext.ONE_MINUS_SRC_ALPHA),this._handleDepth(!0),console.log("curtains.js - v4.2"),this._animationFrameID=null,this._autoRender&&this._animate()},Curtains.prototype._animate=function(){this.render(),this._animationFrameID=window.requestAnimationFrame(this._animate.bind(this))},Curtains.prototype._drawPlaneStack=function(t){for(var e in this._drawStacks[t].programs)for(var i=this._drawStacks[t].programs[e],r=0;r<i.length;r++){var a=this.planes[i[r]];a&&(a._onBeforeDrawing(),a._drawPlane())}},Curtains.prototype.render=function(){if((this._drawingEnabled||this._forceRender)&&(this._forceRender&&(this._forceRender=!1),this.__onRenderCallback&&this.__onRenderCallback(),this.shaderPasses.length>0?this.shaderPasses[0]._enableFrameBuffer():(this.glContext.clearColor(0,0,0,0),this.glContext.clearDepth(1),this.glContext.clear(this.glContext.COLOR_BUFFER_BIT|this.glContext.DEPTH_BUFFER_BIT)),this._drawPlaneStack("opaque"),this._drawStacks.transparent.length&&(this.glContext.clearDepth(1),this.glContext.clear(this.glContext.DEPTH_BUFFER_BIT),this._drawPlaneStack("transparent")),this.shaderPasses.length>0))for(var t=0;t<this.shaderPasses.length;t++){this.shaderPasses[t]._drawPlane()}},Curtains.prototype.onAfterResize=function(t){return t&&(this._onAfterResizeCallback=t),this},Curtains.prototype.onError=function(t){return t&&(this._onErrorCallback=t),this},Curtains.prototype.onContextLost=function(t){return t&&(this._onContextLostCallback=t),this},Curtains.prototype.onContextRestored=function(t){return t&&(this._onContextRestoredCallback=t),this},Curtains.prototype.onRender=function(t){return t&&(this.__onRenderCallback=t),this},Curtains.prototype.onScroll=function(t){return t&&(this._onScrollCallback=t),this},Curtains.BasePlane=function(t,e,i){this._type=this._type||"BasicPlane",this._wrapper=t,this.htmlElement=e,this._initBasePlane(i)},Curtains.BasePlane.prototype._initBasePlane=function(t){t||(t={}),this._canDraw=!1,this._updatePerspectiveMatrix=!1,this._updateMVMatrix=!1,this._definition={width:parseInt(t.widthSegments)||1,height:parseInt(t.heightSegments)||1},this._definition.buffersID=this._definition.width*this._definition.height+this._definition.width,this._loadingManager={sourcesLoaded:0};var e=this._setupShaders(t);if(this._usedProgram=this._wrapper._setupProgram(e.vertexShaderCode,e.fragmentShaderCode,this._type),this.images=[],this.videos=[],this.canvases=[],this.textures=[],this.crossOrigin=t.crossOrigin||"anonymous",t.uniforms||(t.uniforms={}),this.uniforms={},t.uniforms)for(var i in t.uniforms){var r=t.uniforms[i];this.uniforms[i]={name:r.name,type:r.type,value:r.value}}return this.userData={},!!this._usedProgram&&(this._shouldDraw=!0,this._setAttributes(),this._setDocumentSizes(),this._setUniforms(this.uniforms),this._initializeBuffers(),this._canDraw=!0,this)},Curtains.BasePlane.prototype._getDefaultVS=function(){return this._wrapper.productionMode||console.warn("No vertex shader provided, will use a default one"),"#ifdef GL_ES\nprecision mediump float;\n#endif\nattribute vec3 aVertexPosition;attribute vec2 aTextureCoord;uniform mat4 uMVMatrix;uniform mat4 uPMatrix;varying vec3 vVertexPosition;varying vec2 vTextureCoord;void main() {vTextureCoord = aTextureCoord;vVertexPosition = aVertexPosition;gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);}"},Curtains.BasePlane.prototype._getDefaultFS=function(){return"#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying vec3 vVertexPosition;varying vec2 vTextureCoord;void main( void ) {gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);}"},Curtains.BasePlane.prototype._setupShaders=function(t){var e,i,r=this._wrapper,a=t.vertexShaderID||this.htmlElement.getAttribute("data-vs-id"),s=t.fragmentShaderID||this.htmlElement.getAttribute("data-fs-id");return t.vertexShader||(e=a&&document.getElementById(a)?document.getElementById(a).innerHTML:this._getDefaultVS()),t.fragmentShader||(s&&document.getElementById(s)?i=document.getElementById(s).innerHTML:(r.productionMode||console.warn("No fragment shader provided, will use a default one"),i=this._getDefaultFS())),{vertexShaderCode:t.vertexShader||e,fragmentShaderCode:t.fragmentShader||i}},Curtains.BasePlane.prototype._handleUniformSetting=function(t,e,i){var r=this._wrapper.glContext;switch(t){case"1i":r.uniform1i(e,i);break;case"1iv":r.uniform1iv(e,i);break;case"1f":r.uniform1f(e,i);break;case"1fv":r.uniform1fv(e,i);break;case"2i":r.uniform2i(e,i[0],i[1]);break;case"2iv":r.uniform2iv(e,i);break;case"2f":r.uniform2f(e,i[0],i[1]);break;case"2fv":r.uniform2fv(e,i);break;case"3i":r.uniform3i(e,i[0],i[1],i[2]);break;case"3iv":r.uniform3iv(e,i);break;case"3f":r.uniform3f(e,i[0],i[1],i[2]);break;case"3fv":r.uniform3fv(e,i);break;case"4i":r.uniform4i(e,i[0],i[1],i[2],i[3]);break;case"4iv":r.uniform4iv(e,i);break;case"4f":r.uniform4f(e,i[0],i[1],i[2],i[3]);break;case"4fv":r.uniform4fv(e,i);break;case"mat2":r.uniformMatrix2fv(e,!1,i);break;case"mat3":r.uniformMatrix3fv(e,!1,i);break;case"mat4":r.uniformMatrix4fv(e,!1,i);break;default:this._wrapper.productionMode||console.warn("This uniform type is not handled : ",t)}},Curtains.BasePlane.prototype._setUniforms=function(t){var e=this._wrapper,i=e.glContext;if(e._useProgram(this._usedProgram),t)for(var r in t){var a=t[r];a.location=i.getUniformLocation(this._usedProgram.program,a.name),a.type||(Array.isArray(a.value)?4===a.value.length?(a.type="4f",e.productionMode||console.warn("No uniform type declared for "+a.name+", applied a 4f (array of 4 floats) uniform type")):3===a.value.length?(a.type="3f",e.productionMode||console.warn("No uniform type declared for "+a.name+", applied a 3f (array of 3 floats) uniform type")):2===a.value.length&&(a.type="2f",e.productionMode||console.warn("No uniform type declared for "+a.name+", applied a 2f (array of 2 floats) uniform type")):a.value.constructor===Float32Array?16===a.value.length?(a.type="mat4",e.productionMode||console.warn("No uniform type declared for "+a.name+", applied a mat4 (4x4 matrix array) uniform type")):9===a.value.length?(a.type="mat3",e.productionMode||console.warn("No uniform type declared for "+a.name+", applied a mat3 (3x3 matrix array) uniform type")):4===a.value.length&&(a.type="mat2",e.productionMode||console.warn("No uniform type declared for "+a.name+", applied a mat2 (2x2 matrix array) uniform type")):(a.type="1f",e.productionMode||console.warn("No uniform type declared for "+a.name+", applied a 1f (float) uniform type"))),this._handleUniformSetting(a.type,a.location,a.value)}},Curtains.BasePlane.prototype._updateUniforms=function(){if(this.uniforms)for(var t in this.uniforms){var e=this.uniforms[t];this._handleUniformSetting(e.type,e.location,e.value)}},Curtains.BasePlane.prototype._setAttributes=function(){this._attributes||(this._attributes={}),this._attributes.vertexPosition={name:"aVertexPosition",location:this._wrapper.glContext.getAttribLocation(this._usedProgram.program,"aVertexPosition")},this._attributes.textureCoord={name:"aTextureCoord",location:this._wrapper.glContext.getAttribLocation(this._usedProgram.program,"aTextureCoord")}},Curtains.BasePlane.prototype._setPlaneVertices=function(){this._geometry={vertices:[]},this._material={uvs:[]};for(var t=0;t<this._definition.height;++t)for(var e=t/this._definition.height,i=0;i<this._definition.width;++i){var r=i/this._definition.width;this._material.uvs.push(r),this._material.uvs.push(e),this._material.uvs.push(0),this._geometry.vertices.push(2*(r-.5)),this._geometry.vertices.push(2*(e-.5)),this._geometry.vertices.push(0),this._material.uvs.push(r+1/this._definition.width),this._material.uvs.push(e),this._material.uvs.push(0),this._geometry.vertices.push(2*(r+1/this._definition.width-.5)),this._geometry.vertices.push(2*(e-.5)),this._geometry.vertices.push(0),this._material.uvs.push(r),this._material.uvs.push(e+1/this._definition.height),this._material.uvs.push(0),this._geometry.vertices.push(2*(r-.5)),this._geometry.vertices.push(2*(e+1/this._definition.height-.5)),this._geometry.vertices.push(0),this._material.uvs.push(r),this._material.uvs.push(e+1/this._definition.height),this._material.uvs.push(0),this._geometry.vertices.push(2*(r-.5)),this._geometry.vertices.push(2*(e+1/this._definition.height-.5)),this._geometry.vertices.push(0),this._material.uvs.push(r+1/this._definition.width),this._material.uvs.push(e+1/this._definition.height),this._material.uvs.push(0),this._geometry.vertices.push(2*(r+1/this._definition.width-.5)),this._geometry.vertices.push(2*(e+1/this._definition.height-.5)),this._geometry.vertices.push(0),this._material.uvs.push(r+1/this._definition.width),this._material.uvs.push(e),this._material.uvs.push(0),this._geometry.vertices.push(2*(r+1/this._definition.width-.5)),this._geometry.vertices.push(2*(e-.5)),this._geometry.vertices.push(0)}},Curtains.BasePlane.prototype._initializeBuffers=function(){var t=this._wrapper.glContext;this._geometry||this._material||this._setPlaneVertices(),this._attributes&&(this._geometry.bufferInfos={id:t.createBuffer(),itemSize:3,numberOfItems:this._geometry.vertices.length/3},t.enableVertexAttribArray(this._attributes.vertexPosition.location),t.bindBuffer(t.ARRAY_BUFFER,this._geometry.bufferInfos.id),t.bufferData(t.ARRAY_BUFFER,new Float32Array(this._geometry.vertices),t.STATIC_DRAW),t.vertexAttribPointer(this._attributes.vertexPosition.location,this._geometry.bufferInfos.itemSize,t.FLOAT,!1,0,0),this._material.bufferInfos={id:t.createBuffer(),itemSize:3,numberOfItems:this._material.uvs.length/3},t.enableVertexAttribArray(this._attributes.textureCoord.location),t.bindBuffer(t.ARRAY_BUFFER,this._material.bufferInfos.id),t.bufferData(t.ARRAY_BUFFER,new Float32Array(this._material.uvs),t.STATIC_DRAW),t.vertexAttribPointer(this._attributes.textureCoord.location,this._material.bufferInfos.itemSize,t.FLOAT,!1,0,0))},Curtains.BasePlane.prototype._restoreContext=function(){if(this._canDraw=!1,this._matrices&&(this._matrices=null),this._attributes=null,this._geometry.bufferInfos=null,this._material.bufferInfos=null,"ShaderPass"===this._type&&(this._frameBuffer=null,this._depthBuffer=null),this._usedProgram=this._wrapper._setupProgram(this._usedProgram.vsCode,this._usedProgram.fsCode,this._type),this._usedProgram){this._setAttributes(),this._setUniforms(this.uniforms),this._initializeBuffers();for(var t=0;t<this.textures.length;t++){var e=this.textures[t].source;"texturePass"===this.textures[t].type?this.textures[t]._initShaderPassTexture():(this.textures[t]._init(),this.textures[t].setSource(e))}"Plane"===this._type?(this._initMatrices(),this.setPerspective(this._fov,.1,2*this._fov),this._applyCSSPositions(),this._wrapper._stackPlane(this)):this._createFrameBuffer(),this._canDraw=!0}},Curtains.BasePlane.prototype._setDocumentSizes=function(){var t=this._wrapper,e=this.htmlElement.getBoundingClientRect();0===e.width&&0===e.height&&(e=t._boundingRect),this._boundingRect||(this._boundingRect={}),this._boundingRect.document={width:e.width*t.pixelRatio,height:e.height*t.pixelRatio,top:e.top*t.pixelRatio,left:e.left*t.pixelRatio}},Curtains.BasePlane.prototype.getBoundingRect=function(){return{width:this._boundingRect.document.width,height:this._boundingRect.document.height,top:this._boundingRect.document.top,left:this._boundingRect.document.left,right:this._boundingRect.document.left+this._boundingRect.document.width,bottom:this._boundingRect.document.top+this._boundingRect.document.height}},Curtains.BasePlane.prototype.getWebGLBoundingRect=function(){var t=this._wrapper,e=this._matrices.mVPMatrix;if(e){for(var i=[t._applyMatrixToPoint([-1,1,0],e),t._applyMatrixToPoint([1,1,0],e),t._applyMatrixToPoint([1,-1,0],e),t._applyMatrixToPoint([-1,-1,0],e)],r=1e6,a=-1e6,s=1e6,n=-1e6,o=0;o<i.length;o++){var h=i[o];h[0]=(h[0]+1)/2,h[1]=1-(h[1]+1)/2,h[0]<r?r=h[0]:h[0]>a&&(a=h[0]),h[1]<s?s=h[1]:h[1]>n&&(n=h[1])}return{width:(a-r)*t._boundingRect.width,height:(n-s)*t._boundingRect.height,top:s*t._boundingRect.height+t._boundingRect.top,left:r*t._boundingRect.width+t._boundingRect.left,right:r*t._boundingRect.width+t._boundingRect.left+(a-r)*t._boundingRect.width,bottom:s*t._boundingRect.height+t._boundingRect.top+(n-s)*t._boundingRect.height}}return this._boundingRect.document},Curtains.BasePlane.prototype.planeResize=function(){this._setDocumentSizes(),"Plane"===this._type&&(this.setPerspective(this._fov,.1,2*this._fov),this._applyCSSPositions());for(var t=0;t<this.textures.length;t++)this.textures[t].resize();"ShaderPass"===this._type&&(this._wrapper.glContext.bindFramebuffer(this._wrapper.glContext.FRAMEBUFFER,this._frameBuffer),this._bindDepthBuffer());var e=this;setTimeout(function(){e._onAfterResizeCallback&&e._onAfterResizeCallback()},0)},Curtains.BasePlane.prototype.createTexture=function(t,e){var i=new Curtains.Texture(this,{index:this.textures.length,sampler:t,isTexturePass:e});return this.textures.push(i),i},Curtains.BasePlane.prototype.loadSources=function(t){for(var e=0;e<t.length;e++)this.loadSource(t[e])},Curtains.BasePlane.prototype.loadSource=function(t){"IMG"===t.tagName.toUpperCase()?this.loadImage(t):"VIDEO"===t.tagName.toUpperCase()?this.loadVideo(t):"CANVAS"===t.tagName.toUpperCase()?this.loadCanvas(t):this._wrapper.productionMode||console.warn("this HTML tag could not be converted into a texture:",t.tagName)},Curtains.BasePlane.prototype.loadImage=function(t){var e=t;e.crossOrigin=this.crossOrigin||"anonymous",e.sampler=t.getAttribute("data-sampler")||null;var i=this.createTexture(e.sampler);i._onSourceLoadedHandler=i._onSourceLoaded.bind(i,e),e.addEventListener("load",i._onSourceLoadedHandler,!1),e.complete&&i._onSourceLoaded(e),this.images.push(e)},Curtains.BasePlane.prototype.loadVideo=function(t){var e=t;e.preload=!0,e.muted=!0,e.loop=!0,e.sampler=t.getAttribute("data-sampler")||null,e.crossOrigin=this.crossOrigin||"anonymous";var i=this.createTexture(e.sampler);i._onSourceLoadedHandler=i._onVideoLoadedData.bind(i,e),e.addEventListener("canplaythrough",i._onSourceLoadedHandler,!1),e.readyState>=e.HAVE_FUTURE_DATA&&i._onSourceLoaded(e),e.load(),this.videos.push(e)},Curtains.BasePlane.prototype.loadCanvas=function(t){var e=t;e.sampler=t.getAttribute("data-sampler")||null;var i=this.createTexture(e.sampler);this.canvases.push(e),i._onSourceLoaded(e)},Curtains.BasePlane.prototype.loadImages=function(t){for(var e=0;e<t.length;e++)this.loadImage(t[e])},Curtains.BasePlane.prototype.loadVideos=function(t){for(var e=0;e<t.length;e++)this.loadVideo(t[e])},Curtains.BasePlane.prototype.loadCanvases=function(t){for(var e=0;e<t.length;e++)this.loadCanvas(t[e])},Curtains.BasePlane.prototype.playVideos=function(){for(var t=0;t<this.textures.length;t++){var e=this.textures[t];if("video"===e.type){var i=e.source.play(),r=this;void 0!==i&&i.catch(function(t){r._wrapper.productionMode||console.warn("Could not play the video : ",t)})}}},Curtains.BasePlane.prototype.mouseToPlaneCoords=function(t,e){var i=this.scale?this.scale:{x:1,y:1},r=(this._boundingRect.document.width-this._boundingRect.document.width*i.x)/2,a=(this._boundingRect.document.height-this._boundingRect.document.height*i.y)/2,s=this._boundingRect.document.width*i.x/this._wrapper.pixelRatio,n=this._boundingRect.document.height*i.y/this._wrapper.pixelRatio,o=(this._boundingRect.document.top+a)/this._wrapper.pixelRatio;return{x:(t-(this._boundingRect.document.left+r)/this._wrapper.pixelRatio)/s*2-1,y:1-(e-o)/n*2}},Curtains.BasePlane.prototype._bindPlaneBuffers=function(){var t=this._wrapper.glContext;t.enableVertexAttribArray(this._attributes.vertexPosition.location),t.bindBuffer(t.ARRAY_BUFFER,this._geometry.bufferInfos.id),t.vertexAttribPointer(this._attributes.vertexPosition.location,this._geometry.bufferInfos.itemSize,t.FLOAT,!1,0,0),t.enableVertexAttribArray(this._attributes.textureCoord.location),t.bindBuffer(t.ARRAY_BUFFER,this._material.bufferInfos.id),t.vertexAttribPointer(this._attributes.textureCoord.location,this._material.bufferInfos.itemSize,t.FLOAT,!1,0,0)},Curtains.BasePlane.prototype._bindPlaneTexture=function(t){var e=this._wrapper.glContext;e.activeTexture(e.TEXTURE0+t.index),e.bindTexture(e.TEXTURE_2D,t._sampler.texture)},Curtains.BasePlane.prototype._drawPlane=function(){var t=this._wrapper,e=t.glContext;if(this._canDraw&&(t._useProgram(this._usedProgram),this._onRenderCallback&&this._onRenderCallback(),"ShaderPass"===this._type?this.index+1<=t.shaderPasses.length-1&&t.shaderPasses[this.index+1]._enableFrameBuffer():(this._setPerspectiveMatrix(),this._setMVMatrix()),this._shouldDraw)){this._updateUniforms(),t._drawStateManager.currentBuffersID!==this._definition.buffersID&&(this._bindPlaneBuffers(),t._drawStateManager.currentBuffersID=this._definition.buffersID);for(var i=0;i<this.textures.length;i++)this.textures[i]._drawTexture();"ShaderPass"===this._type&&this.index===t.shaderPasses.length-1&&e.bindFramebuffer(e.FRAMEBUFFER,null),e.drawArrays(e.TRIANGLES,0,this._geometry.bufferInfos.numberOfItems)}},Curtains.BasePlane.prototype._dispose=function(){for(var t=this._wrapper.glContext,e=0;e<this.textures.length;e++)this.textures[e]._dispose();this.textures=null,t&&(this._geometry&&(t.bindBuffer(t.ARRAY_BUFFER,this._geometry.bufferInfos.id),t.bufferData(t.ARRAY_BUFFER,1,t.STATIC_DRAW),t.deleteBuffer(this._geometry.bufferInfos.id),this._geometry=null),this._material&&(t.bindBuffer(t.ARRAY_BUFFER,this._material.bufferInfos.id),t.bufferData(t.ARRAY_BUFFER,1,t.STATIC_DRAW),t.deleteBuffer(this._material.bufferInfos.id),this._material=null),this._frameBuffer&&(this._wrapper.glContext.deleteFramebuffer(this.framebuffer),this.framebuffer=null),this._depthBuffer&&(this._wrapper.glContext.deleteRenderbuffer(this._depthBuffer),this._depthBuffer=null))},Curtains.BasePlane.prototype.onAfterResize=function(t){return t&&(this._onAfterResizeCallback=t),this},Curtains.BasePlane.prototype.onLoading=function(t){return t&&(this._onPlaneLoadingCallback=t),this},Curtains.BasePlane.prototype.onReady=function(t){return t&&(this._onReadyCallback=t),this},Curtains.BasePlane.prototype.onRender=function(t){return t&&(this._onRenderCallback=t),this},Curtains.Plane=function(t,e,i){this._type="Plane",Curtains.BasePlane.call(this,t,e,i);var r=this._wrapper;this.index=r.planes.length,this._canDraw=!1,i||(i={}),this._setInitParams(i),this._usedProgram?(r._stackPlane(this),this._initPositions(),this._initSources()):r._onErrorCallback&&r._onErrorCallback()},Curtains.Plane.prototype=Object.create(Curtains.BasePlane.prototype),Curtains.Plane.prototype.constructor=Curtains.Plane,Curtains.Plane.prototype._setInitParams=function(t){var e=this._wrapper;this.alwaysDraw=t.alwaysDraw||!1,this._transparent=t.transparent||!1;var i={top:0,right:0,bottom:0,left:0};t.drawCheckMargins&&(i=t.drawCheckMargins),this.drawCheckMargins=i,this.rotation={x:0,y:0,z:0},this.relativeTranslation={x:0,y:0},this._translation={x:0,y:0,z:0},this.scale={x:1,y:1},this.autoloadSources=t.autoloadSources,null!==this.autoloadSources&&void 0!==this.autoloadSources||(this.autoloadSources=!0),this._fov=t.fov||75,this._nearPlane=.1,this._farPlane=2*this._fov,null===t.watchScroll||void 0===t.watchScroll?this.watchScroll=e._watchScroll:this.watchScroll=t.watchScroll||!1,this.watchScroll&&(e._scrollManager.shouldWatch=!0),this._shouldUseDepthTest=!0},Curtains.Plane.prototype._initPositions=function(){this._initMatrices(),this.setPerspective(this._fov,.1,2*this._fov),this._applyCSSPositions()},Curtains.Plane.prototype._initSources=function(){if(this.autoloadSources){for(var t=[],e=0;e<this.htmlElement.getElementsByTagName("img").length;e++)t.push(this.htmlElement.getElementsByTagName("img")[e]);t.length>0&&this.loadSources(t);var i=[];for(e=0;e<this.htmlElement.getElementsByTagName("video").length;e++)i.push(this.htmlElement.getElementsByTagName("video")[e]);i.length>0&&this.loadSources(i);var r=[];for(e=0;e<this.htmlElement.getElementsByTagName("canvas").length;e++)r.push(this.htmlElement.getElementsByTagName("canvas")[e]);r.length>0&&this.loadSources(r),this._loadingManager.initSourcesToLoad=t.length+i.length+r.length}var a;0!==this._loadingManager.initSourcesToLoad||this._wrapper.productionMode||console.warn("This plane does not contain any image, video or canvas element. You may want to add some later with the loadSource() or loadSources() method.");var s=this;a=setInterval(function(){s._loadingManager.sourcesLoaded>=s._loadingManager.initSourcesToLoad&&(clearInterval(a),s._onReadyCallback&&s._onReadyCallback())},16),this._canDraw=!0,this._wrapper.needRender(),this.alwaysDraw||this._shouldDrawCheck()},Curtains.Plane.prototype._initMatrices=function(){var t=this._wrapper.glContext;this._matrices={mvMatrix:{name:"uMVMatrix",matrix:new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),location:t.getUniformLocation(this._usedProgram.program,"uMVMatrix")},pMatrix:{name:"uPMatrix",matrix:new Float32Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),location:t.getUniformLocation(this._usedProgram.program,"uPMatrix")}}},Curtains.Plane.prototype._setComputedSizes=function(){var t=this._wrapper,e=this._boundingRect.document.width/2+this._boundingRect.document.left,i=this._boundingRect.document.height/2+this._boundingRect.document.top,r=t._boundingRect.width/2+t._boundingRect.left,a=t._boundingRect.height/2+t._boundingRect.top;this._boundingRect.computed={width:this._boundingRect.document.width/t._boundingRect.width,height:this._boundingRect.document.height/t._boundingRect.height,top:(a-i)/t._boundingRect.height,left:(e-r)/t._boundingRect.height}},Curtains.Plane.prototype._setPerspectiveMatrix=function(){if(this._updatePerspectiveMatrix){var t=this._wrapper._boundingRect.width/this._wrapper._boundingRect.height;this._matrices.pMatrix.matrix=[this._fov/t,0,0,0,0,this._fov,0,0,0,0,(this._nearPlane+this._farPlane)*(1/(this._nearPlane-this._farPlane)),-1,0,0,this._nearPlane*this._farPlane*(1/(this._nearPlane-this._farPlane))*2,0],this._updatePerspectiveMatrix=!1}this._wrapper.glContext.uniformMatrix4fv(this._matrices.pMatrix.location,!1,this._matrices.pMatrix.matrix)},Curtains.Plane.prototype.setPerspective=function(t,e,i){var r;(r=null===t||"number"!=typeof t?75:parseInt(t))<1?r=1:r>180&&(r=180),r!==this._fov&&(this._fov=r);var a=parseFloat(e)||.1;a!==this._nearPlane&&(this._nearPlane=a);var s=parseFloat(i)||2*r;s!==this._farPlane&&(this._farPlane=s),this._updatePerspectiveMatrix=!0,this._updateMVMatrix=!0},Curtains.Plane.prototype._setMVMatrix=function(){var t=this._wrapper;if(this._updateMVMatrix){var e={x:this.scale.x*(t._boundingRect.width/t._boundingRect.height*this._boundingRect.computed.width/2),y:this.scale.y*this._boundingRect.computed.height/2},i=[this._translation.x,this._translation.y,this._translation.z-this._fov/2],r=[this.rotation.x,this.rotation.y,this.rotation.z],a=[e.x,e.y,1];this._matrices.mvMatrix.matrix=t._applyTransformationsMatrix(i,r,a),this._matrices.mVPMatrix=t._multiplyMatrix(this._matrices.pMatrix.matrix,this._matrices.mvMatrix.matrix),this.alwaysDraw||this._shouldDrawCheck(),this._updateMVMatrix=!1}t.glContext.uniformMatrix4fv(this._matrices.mvMatrix.location,!1,this._matrices.mvMatrix.matrix)},Curtains.Plane.prototype.setScale=function(t,e){if(t=null===t||"number"!=typeof t?1:Math.max(parseFloat(t),.001),e=null===e||"number"!=typeof e?1:Math.max(parseFloat(e),.001),t!==this.scale.x||e!==this.scale.y){this.scale={x:t,y:e};for(var i=0;i<this.textures.length;i++)this.textures[i].resize();this._updateMVMatrix=!0}},Curtains.Plane.prototype.setRotation=function(t,e,i){t=parseFloat(t)||0,e=parseFloat(e)||0,i=parseFloat(i)||0,t===this.rotation.x&&e===this.rotation.y&&i===this.rotation.z||(this.rotation={x:t,y:e,z:i},this._updateMVMatrix=!0)},Curtains.Plane.prototype._setTranslation=function(){var t={x:0,y:0};0===this.relativeTranslation.x&&0===this.relativeTranslation.y||(t=this._documentToPlaneSpace(this.relativeTranslation.x,this.relativeTranslation.y)),this._translation.x=this._boundingRect.computed.left+t.x,this._translation.y=this._boundingRect.computed.top+t.y,this._updateMVMatrix=!0},Curtains.Plane.prototype.setRelativePosition=function(t,e){this.relativeTranslation={x:t,y:e},this._setTranslation()},Curtains.Plane.prototype._documentToPlaneSpace=function(t,e){var i=this._wrapper;return{x:t/(i._boundingRect.width/i.pixelRatio)*(i._boundingRect.width/i._boundingRect.height),y:-e/(i._boundingRect.height/i.pixelRatio)}},Curtains.Plane.prototype._shouldDrawCheck=function(){var t=this._wrapper,e=this.getWebGLBoundingRect(),i=this;e.right<t._boundingRect.left-this.drawCheckMargins.right||e.left>t._boundingRect.left+t._boundingRect.width+this.drawCheckMargins.left||e.bottom<t._boundingRect.top-this.drawCheckMargins.bottom||e.top>t._boundingRect.top+t._boundingRect.height+this.drawCheckMargins.top?this._shouldDraw&&(this._shouldDraw=!1,setTimeout(function(){i._onLeaveViewCallback&&i._onLeaveViewCallback()},0)):(this._shouldDraw||setTimeout(function(){i._onReEnterViewCallback&&i._onReEnterViewCallback()},0),this._shouldDraw=!0)},Curtains.Plane.prototype._applyCSSPositions=function(){this._setComputedSizes(),this._setTranslation()},Curtains.Plane.prototype.updatePosition=function(){this._setDocumentSizes(),this._applyCSSPositions()},Curtains.Plane.prototype.updateScrollPosition=function(){(this._wrapper._scrollManager.lastXDelta||this._wrapper._scrollManager.lastYDelta)&&(this._boundingRect.document.top+=this._wrapper._scrollManager.lastYDelta*this._wrapper.pixelRatio,this._boundingRect.document.left+=this._wrapper._scrollManager.lastXDelta*this._wrapper.pixelRatio,this._applyCSSPositions())},Curtains.Plane.prototype.enableDepthTest=function(t){this._shouldUseDepthTest=t},Curtains.Plane.prototype.moveToFront=function(){this.enableDepthTest(!1);for(var t=this._transparent?"transparent":"opaque",e=this._wrapper._drawStacks[t].programs["program-"+this._usedProgram.id],i=0;i<e.length;i++)this.index===e[i]&&e.splice(i,1);for(var r in"transparent"===t?e.unshift(this.index):e.push(this.index),this._wrapper._drawStacks[t])r==="program-"+this._usedProgram.id&&delete this._wrapper._drawStacks[t][r];this._wrapper._drawStacks[t].programs["program-"+this._usedProgram.id]=e},Curtains.Plane.prototype._onBeforeDrawing=function(){var t=this._wrapper;this._shouldUseDepthTest&&!t._shouldHandleDepth?t._handleDepth(!0):!this._shouldUseDepthTest&&t._shouldHandleDepth&&t._handleDepth(!1)},Curtains.Plane.prototype.onReEnterView=function(t){return t&&(this._onReEnterViewCallback=t),this},Curtains.Plane.prototype.onLeaveView=function(t){return t&&(this._onLeaveViewCallback=t),this},Curtains.ShaderPass=function(t,e){e||(e={}),e.widthSegments=1,e.heightSegments=1,this._type="ShaderPass",Curtains.BasePlane.call(this,t,t.container,e),this.index=this._wrapper.shaderPasses.length,this._usedProgram&&this._initShaderPassPlane()},Curtains.ShaderPass.prototype=Object.create(Curtains.BasePlane.prototype),Curtains.ShaderPass.prototype.constructor=Curtains.ShaderPass,Curtains.ShaderPass.prototype._initShaderPassPlane=function(){this.createTexture("uRenderTexture",!0),this._createFrameBuffer();var t=this;setTimeout(function(){t._onReadyCallback&&t._onReadyCallback()},0),this._canDraw=!0,this._wrapper.needRender()},Curtains.ShaderPass.prototype._getDefaultVS=function(t){return"#ifdef GL_ES\nprecision mediump float;\n#endif\nattribute vec3 aVertexPosition;attribute vec2 aTextureCoord;varying vec3 vVertexPosition;varying vec2 vTextureCoord;void main() {vTextureCoord = aTextureCoord;vVertexPosition = aVertexPosition;gl_Position = vec4(aVertexPosition, 1.0);}"},Curtains.ShaderPass.prototype._getDefaultFS=function(t){return"#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying vec3 vVertexPosition;varying vec2 vTextureCoord;uniform sampler2D uRenderTexture;void main( void ) {gl_FragColor = texture2D(uRenderTexture, vTextureCoord);}"},Curtains.ShaderPass.prototype._enableFrameBuffer=function(){var t=this._wrapper.glContext;this._frameBuffer&&(t.bindFramebuffer(t.FRAMEBUFFER,this._frameBuffer),t.clearColor(0,0,0,0),t.clearDepth(1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT)),t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight)},Curtains.ShaderPass.prototype._bindDepthBuffer=function(){var t=this._wrapper.glContext;this._depthBuffer&&(t.bindRenderbuffer(t.RENDERBUFFER,this._depthBuffer),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT16,this._boundingRect.document.width,this._boundingRect.document.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,this._depthBuffer))},Curtains.ShaderPass.prototype._createFrameBuffer=function(){var t=this._wrapper.glContext;this._frameBuffer=t.createFramebuffer(),t.bindFramebuffer(t.FRAMEBUFFER,this._frameBuffer),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,this.textures[0]._sampler.texture,0),this._depthBuffer=t.createRenderbuffer(),this._bindDepthBuffer()},Curtains.Texture=function(t,e){if(this._plane=t,this._wrapper=t._wrapper,t._usedProgram||e.isTexturePass)return this.index=t.textures.length,this._sampler={name:e.sampler||null},this._willUpdate=!1,this.shouldUpdate=!1,this._forceUpdate=!1,this.scale={x:1,y:1},e.isTexturePass?this._initShaderPassTexture():this._init(),this;this._wrapper.productionMode||console.warn("Unable to create the texture because the program is not valid")},Curtains.Texture.prototype._init=function(){var t=this._wrapper.glContext,e=this._plane;this._sampler.texture=t.createTexture(),t.bindTexture(t.TEXTURE_2D,this._sampler.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array([0,0,0,255])),this._sourceLoaded=!1,this._wrapper._useProgram(this._plane._usedProgram);var i=this._sampler.name||"uSampler"+this.index;this._sampler.location=t.getUniformLocation(e._usedProgram.program,i),t.uniform1i(this._sampler.location,this.index);var r=this._sampler.name?this._sampler.name+"Matrix":"uTextureMatrix"+this.index;this._textureMatrix={name:r,matrix:null,location:t.getUniformLocation(this._plane._usedProgram.program,r)},this._sampler.name=i},Curtains.Texture.prototype._initShaderPassTexture=function(){var t=this._wrapper.glContext;this.type="texturePass",this._size={width:this._plane._boundingRect.document.width,height:this._plane._boundingRect.document.height},this._sampler.texture=t.createTexture(),t.bindTexture(t.TEXTURE_2D,this._sampler.texture),this._wrapper._useProgram(this._plane._usedProgram),this._sampler.location=t.getUniformLocation(this._plane._usedProgram.program,this._sampler.name),t.uniform1i(this._sampler.location,this.index),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,this._size.width,this._size.height,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)},Curtains.Texture.prototype.setSource=function(t){if(this._plane._usedProgram){this.source=t,"IMG"===t.tagName.toUpperCase()?this.type="image":"VIDEO"===t.tagName.toUpperCase()?(this.type="video",this.shouldUpdate=!0):"CANVAS"===t.tagName.toUpperCase()?(this.type="canvas",this._willUpdate=!0,this.shouldUpdate=!0):this._wrapper.productionMode||console.warn("this HTML tag could not be converted into a texture:",t.tagName),this._size={width:this.source.naturalWidth||this.source.width||this.source.videoWidth,height:this.source.naturalHeight||this.source.height||this.source.videoHeight};var e=this._wrapper.glContext;e.bindTexture(e.TEXTURE_2D,this._sampler.texture),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),this.resize(),"video"!==this.type&&e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),this._wrapper.needRender()}else this._wrapper.productionMode||console.warn("Unable to set the texture source because the program is not valid")},Curtains.Texture.prototype.needUpdate=function(){this._forceUpdate=!0},Curtains.Texture.prototype._update=function(){var t=this._wrapper.glContext;"canvas"===this.type&&t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,this.source)},Curtains.Texture.prototype._getSizes=function(){var t=this._plane.scale?this._plane.scale:{x:1,y:1},e=this._plane._boundingRect.document.width*t.x,i=this._plane._boundingRect.document.height*t.y,r=this._size.width,a=this._size.height,s=r/a,n=e/i,o=0,h=0;return n>s?h=Math.min(0,i-e*(1/s)):n<s&&(o=Math.min(0,e-i*s)),{planeWidth:e,planeHeight:i,sourceWidth:r,sourceHeight:a,xOffset:o,yOffset:h}},Curtains.Texture.prototype.setScale=function(t,e){t=parseFloat(t)||1,t=Math.max(t,.001),e=parseFloat(e)||1,e=Math.max(e,.001),this.scale={x:t,y:e},this.resize()},Curtains.Texture.prototype.resize=function(){if("texturePass"===this.type){var t=this._wrapper.glContext;this._size={width:this._plane._boundingRect.document.width,height:this._plane._boundingRect.document.height},t.bindTexture(t.TEXTURE_2D,this._sampler.texture),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,this._size.width,this._size.height,0,t.RGBA,t.UNSIGNED_BYTE,null)}else if(this.source){this._size={width:this.source.naturalWidth||this.source.width||this.source.videoWidth,height:this.source.naturalHeight||this.source.height||this.source.videoHeight};var e=this._getSizes();this._updateTextureMatrix(e)}},Curtains.Texture.prototype._updateTextureMatrix=function(t){var e={x:t.planeWidth/(t.planeWidth-t.xOffset),y:t.planeHeight/(t.planeHeight-t.yOffset)};e.x/=this.scale.x,e.y/=this.scale.y;var i=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,(1-e.x)/2,(1-e.y)/2,0,1]);this._textureMatrix.matrix=this._wrapper._scaleMatrix(i,e.x,e.y,1),this._wrapper._useProgram(this._plane._usedProgram),this._wrapper.glContext.uniformMatrix4fv(this._textureMatrix.location,!1,this._textureMatrix.matrix)},Curtains.Texture.prototype._onSourceLoaded=function(t){this._plane._loadingManager.sourcesLoaded++,this.setSource(t);var e=this;this._sourceLoaded||setTimeout(function(){e._plane._onPlaneLoadingCallback&&e._plane._onPlaneLoadingCallback(e)},0),this._sourceLoaded=!0},Curtains.Texture.prototype._onVideoLoadedData=function(t){this._sourceLoaded||this._onSourceLoaded(t)},Curtains.Texture.prototype._drawTexture=function(){this._plane._bindPlaneTexture(this),"video"===this.type&&this.source&&this.source.readyState>=this.source.HAVE_CURRENT_DATA&&!this.source.paused&&this.source.currentTime>0&&!this.source.ended&&(this._willUpdate=!this._willUpdate),(this._forceUpdate||this._willUpdate&&this.shouldUpdate)&&this._update(),this._forceUpdate=!1},Curtains.Texture.prototype._dispose=function(){"video"===this.type?(this.source.removeEventListener("canplaythrough",this._onSourceLoadedHandler,!1),this.source.pause(),this.source.removeAttribute("src"),this.source.load(),this.source.updateInterval&&clearInterval(this.source.updateInterval)):"canvas"===this.type?this.source.width=this.source.width:"image"===this.type&&this.source.removeEventListener("load",this._onSourceLoadedHandler,!1),this.source=null;var t=this._wrapper.glContext;t&&(t.activeTexture(t.TEXTURE0+this.index),t.bindTexture(t.TEXTURE_2D,null),t.deleteTexture(this._sampler.texture)),this._plane._loadingManager.sourcesLoaded--};module.exports={Curtains};
},{}],"december19.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _curtainsjs = require("curtainsjs");

function init() {
  console.log('initializing..');
  var curtains = new _curtainsjs.Curtains({
    container: 'canvas',
    watchScroll: false
  });
  curtains.onError(function () {
    document.body.classList.add('no-curtains');
  });
  var planeElement = document.getElementsByClassName('plane')[0];
  var params = {
    vertexShaderID: 'plane-vs',
    fragmentShaderID: 'plane-fs',
    uniforms: {
      time: {
        name: 'uTime',
        type: "1f",
        value: 0
      },
      timeScale: {
        name: 'uTimeScale',
        type: '1f',
        value: 1
      },
      resolution: {
        name: 'uResolution',
        type: '2f',
        value: [100.0, 100.0]
      },
      scale: {
        name: 'uScale',
        type: '1f',
        value: 2.0
      },
      borderColor: {
        name: 'uBorderColor',
        type: '4f',
        value: [0.14, 0.62, 0.8, 1.0]
      }
    }
  };
  var plane = curtains.addPlane(planeElement, params);

  if (plane) {
    plane.onRender(function () {
      plane.uniforms.time.value++;
    });
  } else {
    console.log('plane is falsy!');
  }
}
},{"curtainsjs":"../node_modules/curtainsjs/libs/curtains.min.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("./december19.css");

var _curtainsjs = _interopRequireDefault(require("curtainsjs"));

var _december2 = _interopRequireDefault(require("./december19"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('hello world');
console.log(_curtainsjs.default);
console.log(_december2.default);
window.addEventListener('load', function () {
  (0, _december2.default)();
});
},{"./december19.css":"december19.css","curtainsjs":"../node_modules/curtainsjs/libs/curtains.min.js","./december19":"december19.js"}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65201" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map