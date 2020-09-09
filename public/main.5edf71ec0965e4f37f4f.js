/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "5edf71ec0965e4f37f4f";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./sass/index.sass":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ref--5-2!./node_modules/sass-loader/dist/cjs.js??ref--5-3!./sass/index.sass ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);\n___CSS_LOADER_EXPORT___.push([module.i, \"@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,700);\"]);\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \"/* http://meyerweb.com/eric/tools/css/reset/ \\n   v2.0 | 20110126\\n   License: none (public domain)\\n*/\\nhtml, body, div, span, applet, object, iframe,\\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\\na, abbr, acronym, address, big, cite, code,\\ndel, dfn, em, img, ins, kbd, q, s, samp,\\nsmall, strike, strong, sub, sup, tt, var,\\nb, u, i, center,\\ndl, dt, dd, ol, ul, li,\\nfieldset, form, label, legend,\\ntable, caption, tbody, tfoot, thead, tr, th, td,\\narticle, aside, canvas, details, embed,\\nfigure, figcaption, footer, header, hgroup,\\nmenu, nav, output, ruby, section, summary,\\ntime, mark, audio, video {\\n  margin: 0;\\n  padding: 0;\\n  border: 0;\\n  font-size: 100%;\\n  font: inherit;\\n  vertical-align: baseline;\\n}\\n\\n/* HTML5 display-role reset for older browsers */\\narticle, aside, details, figcaption, figure,\\nfooter, header, hgroup, menu, nav, section {\\n  display: block;\\n}\\n\\nbody {\\n  line-height: 1;\\n}\\n\\nol, ul {\\n  list-style: none;\\n}\\n\\nblockquote, q {\\n  quotes: none;\\n}\\n\\nblockquote:before, blockquote:after,\\nq:before, q:after {\\n  content: \\\"\\\";\\n  content: none;\\n}\\n\\ntable {\\n  border-collapse: collapse;\\n  border-spacing: 0;\\n}\\n\\nhtml,\\nbody,\\n#root,\\n#movie-app {\\n  width: 100%;\\n  height: 100%;\\n  font-family: Roboto, sans-serif;\\n  color: #565d62;\\n  line-height: 1.618;\\n  overflow-x: hidden;\\n}\\nhtml::-webkit-scrollbar,\\nbody::-webkit-scrollbar,\\n#root::-webkit-scrollbar,\\n#movie-app::-webkit-scrollbar {\\n  display: none;\\n}\\n\\nh1, h2, h3, h4, h5, h6 {\\n  font-weight: bold;\\n  line-height: 1.2;\\n}\\n\\nh1 {\\n  font-size: 2.5rem;\\n  font-weight: lighter;\\n}\\n\\nh2 {\\n  font-size: 1.5rem;\\n}\\n\\np {\\n  color: #757e85;\\n}\\n\\nstrong {\\n  font-weight: bold;\\n}\\n\\nsmall {\\n  font-size: 0.875rem;\\n}\\n\\na {\\n  color: inherit;\\n  text-decoration: none;\\n}\\n\\n@font-face {\\n  font-family: \\\"swiper-icons\\\";\\n  src: url(\\\"data:application/font-woff;charset=utf-8;base64, d09GRgABAAAAAAZgABAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAGRAAAABoAAAAci6qHkUdERUYAAAWgAAAAIwAAACQAYABXR1BPUwAABhQAAAAuAAAANuAY7+xHU1VCAAAFxAAAAFAAAABm2fPczU9TLzIAAAHcAAAASgAAAGBP9V5RY21hcAAAAkQAAACIAAABYt6F0cBjdnQgAAACzAAAAAQAAAAEABEBRGdhc3AAAAWYAAAACAAAAAj//wADZ2x5ZgAAAywAAADMAAAD2MHtryVoZWFkAAABbAAAADAAAAA2E2+eoWhoZWEAAAGcAAAAHwAAACQC9gDzaG10eAAAAigAAAAZAAAArgJkABFsb2NhAAAC0AAAAFoAAABaFQAUGG1heHAAAAG8AAAAHwAAACAAcABAbmFtZQAAA/gAAAE5AAACXvFdBwlwb3N0AAAFNAAAAGIAAACE5s74hXjaY2BkYGAAYpf5Hu/j+W2+MnAzMYDAzaX6QjD6/4//Bxj5GA8AuRwMYGkAPywL13jaY2BkYGA88P8Agx4j+/8fQDYfA1AEBWgDAIB2BOoAeNpjYGRgYNBh4GdgYgABEMnIABJzYNADCQAACWgAsQB42mNgYfzCOIGBlYGB0YcxjYGBwR1Kf2WQZGhhYGBiYGVmgAFGBiQQkOaawtDAoMBQxXjg/wEGPcYDDA4wNUA2CCgwsAAAO4EL6gAAeNpj2M0gyAACqxgGNWBkZ2D4/wMA+xkDdgAAAHjaY2BgYGaAYBkGRgYQiAHyGMF8FgYHIM3DwMHABGQrMOgyWDLEM1T9/w8UBfEMgLzE////P/5//f/V/xv+r4eaAAeMbAxwIUYmIMHEgKYAYjUcsDAwsLKxc3BycfPw8jEQA/gZBASFhEVExcQlJKWkZWTl5BUUlZRVVNXUNTQZBgMAAMR+E+gAEQFEAAAAKgAqACoANAA+AEgAUgBcAGYAcAB6AIQAjgCYAKIArAC2AMAAygDUAN4A6ADyAPwBBgEQARoBJAEuATgBQgFMAVYBYAFqAXQBfgGIAZIBnAGmAbIBzgHsAAB42u2NMQ6CUAyGW568x9AneYYgm4MJbhKFaExIOAVX8ApewSt4Bic4AfeAid3VOBixDxfPYEza5O+Xfi04YADggiUIULCuEJK8VhO4bSvpdnktHI5QCYtdi2sl8ZnXaHlqUrNKzdKcT8cjlq+rwZSvIVczNiezsfnP/uznmfPFBNODM2K7MTQ45YEAZqGP81AmGGcF3iPqOop0r1SPTaTbVkfUe4HXj97wYE+yNwWYxwWu4v1ugWHgo3S1XdZEVqWM7ET0cfnLGxWfkgR42o2PvWrDMBSFj/IHLaF0zKjRgdiVMwScNRAoWUoH78Y2icB/yIY09An6AH2Bdu/UB+yxopYshQiEvnvu0dURgDt8QeC8PDw7Fpji3fEA4z/PEJ6YOB5hKh4dj3EvXhxPqH/SKUY3rJ7srZ4FZnh1PMAtPhwP6fl2PMJMPDgeQ4rY8YT6Gzao0eAEA409DuggmTnFnOcSCiEiLMgxCiTI6Cq5DZUd3Qmp10vO0LaLTd2cjN4fOumlc7lUYbSQcZFkutRG7g6JKZKy0RmdLY680CDnEJ+UMkpFFe1RN7nxdVpXrC4aTtnaurOnYercZg2YVmLN/d/gczfEimrE/fs/bOuq29Zmn8tloORaXgZgGa78yO9/cnXm2BpaGvq25Dv9S4E9+5SIc9PqupJKhYFSSl47+Qcr1mYNAAAAeNptw0cKwkAAAMDZJA8Q7OUJvkLsPfZ6zFVERPy8qHh2YER+3i/BP83vIBLLySsoKimrqKqpa2hp6+jq6RsYGhmbmJqZSy0sraxtbO3sHRydnEMU4uR6yx7JJXveP7WrDycAAAAAAAH//wACeNpjYGRgYOABYhkgZgJCZgZNBkYGLQZtIJsFLMYAAAw3ALgAeNolizEKgDAQBCchRbC2sFER0YD6qVQiBCv/H9ezGI6Z5XBAw8CBK/m5iQQVauVbXLnOrMZv2oLdKFa8Pjuru2hJzGabmOSLzNMzvutpB3N42mNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB42mNgYGBkAIIbCZo5IPrmUn0hGA0AO8EFTQAA\\\") format(\\\"woff\\\");\\n  font-weight: 400;\\n  font-style: normal;\\n}\\n:root {\\n  --swiper-theme-color: #007aff;\\n}\\n\\n.swiper-container {\\n  margin-left: auto;\\n  margin-right: auto;\\n  position: relative;\\n  overflow: hidden;\\n  list-style: none;\\n  padding: 0;\\n  /* Fix of Webkit flickering */\\n  z-index: 1;\\n}\\n\\n.swiper-container-vertical > .swiper-wrapper {\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n      -ms-flex-direction: column;\\n          flex-direction: column;\\n}\\n\\n.swiper-wrapper {\\n  position: relative;\\n  width: 100%;\\n  height: 100%;\\n  z-index: 1;\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-transition-property: -webkit-transform;\\n  transition-property: -webkit-transform;\\n  transition-property: transform;\\n  transition-property: transform, -webkit-transform;\\n  -webkit-box-sizing: content-box;\\n          box-sizing: content-box;\\n}\\n\\n.swiper-container-android .swiper-slide,\\n.swiper-wrapper {\\n  -webkit-transform: translate3d(0px, 0, 0);\\n          transform: translate3d(0px, 0, 0);\\n}\\n\\n.swiper-container-multirow > .swiper-wrapper {\\n  -ms-flex-wrap: wrap;\\n      flex-wrap: wrap;\\n}\\n\\n.swiper-container-multirow-column > .swiper-wrapper {\\n  -ms-flex-wrap: wrap;\\n      flex-wrap: wrap;\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n      -ms-flex-direction: column;\\n          flex-direction: column;\\n}\\n\\n.swiper-container-free-mode > .swiper-wrapper {\\n  -webkit-transition-timing-function: ease-out;\\n          transition-timing-function: ease-out;\\n  margin: 0 auto;\\n}\\n\\n.swiper-slide {\\n  -ms-flex-negative: 0;\\n      flex-shrink: 0;\\n  width: 100%;\\n  height: 100%;\\n  position: relative;\\n  -webkit-transition-property: -webkit-transform;\\n  transition-property: -webkit-transform;\\n  transition-property: transform;\\n  transition-property: transform, -webkit-transform;\\n}\\n\\n.swiper-slide-invisible-blank {\\n  visibility: hidden;\\n}\\n\\n/* Auto Height */\\n.swiper-container-autoheight,\\n.swiper-container-autoheight .swiper-slide {\\n  height: auto;\\n}\\n.swiper-container-autoheight .swiper-wrapper {\\n  -webkit-box-align: start;\\n      -ms-flex-align: start;\\n          align-items: flex-start;\\n  -webkit-transition-property: height, -webkit-transform;\\n  transition-property: height, -webkit-transform;\\n  transition-property: transform, height;\\n  transition-property: transform, height, -webkit-transform;\\n}\\n\\n/* 3D Effects */\\n.swiper-container-3d {\\n  -webkit-perspective: 1200px;\\n          perspective: 1200px;\\n}\\n.swiper-container-3d .swiper-wrapper,\\n.swiper-container-3d .swiper-slide,\\n.swiper-container-3d .swiper-slide-shadow-left,\\n.swiper-container-3d .swiper-slide-shadow-right,\\n.swiper-container-3d .swiper-slide-shadow-top,\\n.swiper-container-3d .swiper-slide-shadow-bottom,\\n.swiper-container-3d .swiper-cube-shadow {\\n  -webkit-transform-style: preserve-3d;\\n          transform-style: preserve-3d;\\n}\\n.swiper-container-3d .swiper-slide-shadow-left,\\n.swiper-container-3d .swiper-slide-shadow-right,\\n.swiper-container-3d .swiper-slide-shadow-top,\\n.swiper-container-3d .swiper-slide-shadow-bottom {\\n  position: absolute;\\n  left: 0;\\n  top: 0;\\n  width: 100%;\\n  height: 100%;\\n  pointer-events: none;\\n  z-index: 10;\\n}\\n.swiper-container-3d .swiper-slide-shadow-left {\\n  background-image: -webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\\n  background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\\n}\\n.swiper-container-3d .swiper-slide-shadow-right {\\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\\n}\\n.swiper-container-3d .swiper-slide-shadow-top {\\n  background-image: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\\n  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\\n}\\n.swiper-container-3d .swiper-slide-shadow-bottom {\\n  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\\n}\\n\\n/* CSS Mode */\\n.swiper-container-css-mode > .swiper-wrapper {\\n  overflow: auto;\\n  scrollbar-width: none;\\n  /* For Firefox */\\n  -ms-overflow-style: none;\\n  /* For Internet Explorer and Edge */\\n}\\n.swiper-container-css-mode > .swiper-wrapper::-webkit-scrollbar {\\n  display: none;\\n}\\n.swiper-container-css-mode > .swiper-wrapper > .swiper-slide {\\n  scroll-snap-align: start start;\\n}\\n\\n.swiper-container-horizontal.swiper-container-css-mode > .swiper-wrapper {\\n  -ms-scroll-snap-type: x mandatory;\\n      scroll-snap-type: x mandatory;\\n}\\n\\n.swiper-container-vertical.swiper-container-css-mode > .swiper-wrapper {\\n  -ms-scroll-snap-type: y mandatory;\\n      scroll-snap-type: y mandatory;\\n}\\n\\n:root {\\n  --swiper-navigation-size: 44px;\\n  /*\\n  --swiper-navigation-color: var(--swiper-theme-color);\\n  */\\n}\\n\\n.swiper-button-prev,\\n.swiper-button-next {\\n  position: absolute;\\n  top: 50%;\\n  width: calc(var(--swiper-navigation-size) / 44 * 27);\\n  height: var(--swiper-navigation-size);\\n  margin-top: calc(-1 * var(--swiper-navigation-size) / 2);\\n  z-index: 10;\\n  cursor: pointer;\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-align: center;\\n      -ms-flex-align: center;\\n          align-items: center;\\n  -webkit-box-pack: center;\\n      -ms-flex-pack: center;\\n          justify-content: center;\\n  color: var(--swiper-navigation-color, var(--swiper-theme-color));\\n}\\n.swiper-button-prev.swiper-button-disabled,\\n.swiper-button-next.swiper-button-disabled {\\n  opacity: 0.35;\\n  cursor: auto;\\n  pointer-events: none;\\n}\\n.swiper-button-prev:after,\\n.swiper-button-next:after {\\n  font-family: swiper-icons;\\n  font-size: var(--swiper-navigation-size);\\n  text-transform: none !important;\\n  letter-spacing: 0;\\n  text-transform: none;\\n  font-variant: initial;\\n  line-height: 1;\\n}\\n\\n.swiper-button-prev,\\n.swiper-container-rtl .swiper-button-next {\\n  left: 10px;\\n  right: auto;\\n}\\n.swiper-button-prev:after,\\n.swiper-container-rtl .swiper-button-next:after {\\n  content: \\\"prev\\\";\\n}\\n\\n.swiper-button-next,\\n.swiper-container-rtl .swiper-button-prev {\\n  right: 10px;\\n  left: auto;\\n}\\n.swiper-button-next:after,\\n.swiper-container-rtl .swiper-button-prev:after {\\n  content: \\\"next\\\";\\n}\\n\\n.swiper-button-prev.swiper-button-white,\\n.swiper-button-next.swiper-button-white {\\n  --swiper-navigation-color: #ffffff;\\n}\\n\\n.swiper-button-prev.swiper-button-black,\\n.swiper-button-next.swiper-button-black {\\n  --swiper-navigation-color: #000000;\\n}\\n\\n.swiper-button-lock {\\n  display: none;\\n}\\n\\n.movies-header nav ul, .movies-header .header-left,\\n.movies-header .header-right, .movies-header {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-align: center;\\n      -ms-flex-align: center;\\n          align-items: center;\\n}\\n\\n.movies-header {\\n  height: 90px;\\n  -webkit-box-pack: justify;\\n      -ms-flex-pack: justify;\\n          justify-content: space-between;\\n}\\n.movies-header #logo {\\n  max-width: 200px;\\n  margin-right: 40px;\\n}\\n.movies-header nav ul {\\n  -webkit-box-pack: start;\\n      -ms-flex-pack: start;\\n          justify-content: flex-start;\\n}\\n.movies-header nav ul li {\\n  margin-right: 32px;\\n}\\n.movies-header nav ul li:last-of-type {\\n  margin-right: 0;\\n}\\n.movies-header nav ul li a.active {\\n  color: #CB1D1D;\\n}\\n.movies-header .wishlist-link {\\n  opacity: 0.7;\\n}\\n.movies-header .wishlist-link .wishlist-count {\\n  margin-left: 4px;\\n}\\n.movies-header .wishlist-link i {\\n  margin-right: 8px;\\n  opacity: 0.7;\\n}\\n\\n.container {\\n  width: 100%;\\n  max-width: 100%;\\n}\\n.container.full-height {\\n  height: 100%;\\n}\\n.container.full-height .container-padding {\\n  height: 100%;\\n}\\n.container .container-padding {\\n  padding: 0 32px;\\n}\\n\\n.genre-section {\\n  margin-bottom: 80px;\\n}\\n.genre-section.skeleton {\\n  padding: 0 32px;\\n}\\n.genre-section.skeleton .genre-movies {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  overflow: hidden;\\n}\\n.genre-section.skeleton .genre-movies .movie-item {\\n  -webkit-box-flex: 1;\\n      -ms-flex: 1 auto;\\n          flex: 1 auto;\\n  margin-right: 8px;\\n}\\n.genre-section .genre-title {\\n  margin-bottom: 16px;\\n}\\n.genre-section .genre-movies {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n}\\n@media (max-width: 599px) {\\n  .genre-section .genre-movies {\\n    padding: 0 32px;\\n  }\\n}\\n.genre-section .genre-movies .movie-item {\\n  margin-right: 16px;\\n}\\n\\n.swiper-container .swiper-button-prev,\\n.swiper-container .swiper-button-next {\\n  top: 40%;\\n  padding: 0 16px;\\n}\\n.swiper-container .swiper-button-prev:after,\\n.swiper-container .swiper-button-next:after {\\n  color: white;\\n}\\n\\n.movie-item {\\n  min-width: 100%;\\n  width: 100%;\\n}\\n@media (min-width: 600px) {\\n  .movie-item.swiper-slide, .movie-item skeleton, .movie-item.single, .movie-item.skeleton {\\n    min-width: 50%;\\n    width: 50%;\\n  }\\n}\\n@media (min-width: 900px) {\\n  .movie-item.swiper-slide, .movie-item skeleton, .movie-item.single, .movie-item.skeleton {\\n    min-width: 33.3333333333%;\\n    width: 33.3333333333%;\\n  }\\n}\\n@media (min-width: 1200px) {\\n  .movie-item.swiper-slide, .movie-item skeleton, .movie-item.single, .movie-item.skeleton {\\n    min-width: 16.6666666667%;\\n    width: 16.6666666667%;\\n  }\\n}\\n.movie-item:hover .movie-item-image img {\\n  -webkit-transform: scale(1.1);\\n          transform: scale(1.1);\\n}\\n.movie-item .movie-votes {\\n  font-size: 1rem;\\n}\\n.movie-item .movie-item-image {\\n  position: relative;\\n  width: 100%;\\n  margin-bottom: 8px;\\n  -webkit-transition: all 0.4s ease;\\n  transition: all 0.4s ease;\\n  overflow: hidden;\\n}\\n.movie-item .movie-item-image img {\\n  width: 100%;\\n  -webkit-transition: all 0.6s ease;\\n  transition: all 0.6s ease;\\n}\\n.movie-item .movie-item-title {\\n  text-overflow: ellipsis;\\n  margin-bottom: 8px;\\n  letter-spacing: 0.1px;\\n}\\n.movie-item .movie-item-meta {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-pack: justify;\\n      -ms-flex-pack: justify;\\n          justify-content: space-between;\\n  -webkit-box-align: center;\\n      -ms-flex-align: center;\\n          align-items: center;\\n  opacity: 0.7;\\n}\\n.movie-item .movie-item-meta p {\\n  font-size: 0.9em;\\n  font-weight: 400;\\n}\\n\\n.movie-votes {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-align: center;\\n      -ms-flex-align: center;\\n          align-items: center;\\n  margin-right: 16px;\\n  opacity: 0.8;\\n}\\n.movie-votes i {\\n  font-size: 0.875rem;\\n  color: #e4cf2c;\\n  margin-right: 4px;\\n}\\n.movie-votes span {\\n  margin-left: 4px;\\n}\\n\\n.movies-button {\\n  outline: none;\\n  -webkit-appearance: none;\\n     -moz-appearance: none;\\n          appearance: none;\\n  -webkit-box-shadow: none;\\n          box-shadow: none;\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-align: center;\\n      -ms-flex-align: center;\\n          align-items: center;\\n  -webkit-box-pack: center;\\n      -ms-flex-pack: center;\\n          justify-content: center;\\n  padding: 16px;\\n  font-size: 1rem;\\n  color: #565d62;\\n  background: none;\\n  border: 2px solid #565d62;\\n  -webkit-transition: all 0.3s ease;\\n  transition: all 0.3s ease;\\n}\\n.movies-button i {\\n  margin-right: 4px;\\n}\\n.movies-button:hover {\\n  cursor: pointer;\\n  background: #e9ebec;\\n}\\n\\n.tag {\\n  display: inline-block;\\n  padding: 4px 8px;\\n  border-radius: 4px;\\n  color: #565d62;\\n  background-color: #e1e3e5;\\n}\\n.tag.active {\\n  border: 1px solid #565d62;\\n}\\n\\n#movies-list {\\n  padding-top: 40px;\\n}\\n\\n.movie-detail {\\n  height: 100%;\\n  padding-top: 40px;\\n}\\n.movie-detail.action .movie-title {\\n  color: #CB1D1D;\\n}\\n.movie-detail.action .add-wishlist {\\n  color: #CB1D1D;\\n  border-color: #CB1D1D;\\n}\\n.movie-detail.adventure .movie-title {\\n  color: #261DCB;\\n}\\n.movie-detail.adventure .add-wishlist {\\n  color: #261DCB;\\n  border-color: #261DCB;\\n}\\n.movie-detail.animation .movie-title {\\n  color: #CB661D;\\n}\\n.movie-detail.animation .add-wishlist {\\n  color: #CB661D;\\n  border-color: #CB661D;\\n}\\n@media (min-width: 600px) {\\n  .movie-detail {\\n    display: -webkit-box;\\n    display: -ms-flexbox;\\n    display: flex;\\n    -webkit-box-pack: justify;\\n        -ms-flex-pack: justify;\\n            justify-content: space-between;\\n    max-width: 1200px;\\n    margin-left: auto;\\n    margin-right: auto;\\n  }\\n}\\n.movie-detail aside {\\n  height: 100%;\\n  width: 100%;\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n      -ms-flex-direction: column;\\n          flex-direction: column;\\n}\\n@media (min-width: 900px) {\\n  .movie-detail aside {\\n    width: 50%;\\n    padding-left: 8px;\\n  }\\n}\\n@media (min-width: 1200px) {\\n  .movie-detail aside {\\n    width: 33.3333%;\\n  }\\n}\\n.movie-detail aside .movie-meta {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-align: center;\\n      -ms-flex-align: center;\\n          align-items: center;\\n  margin: 8px 0;\\n}\\n.movie-detail aside .movie-title h1 {\\n  margin-right: 8px;\\n}\\n.movie-detail aside .add-wishlist {\\n  width: 100%;\\n  margin-top: 40px;\\n}\\n.movie-detail aside .add-wishlist .fas {\\n  color: #CB1D1D;\\n}\\n.movie-detail aside .description {\\n  margin-top: 24px;\\n}\\n.movie-detail aside .tags {\\n  margin-top: 8px;\\n}\\n.movie-detail aside .tags .tag {\\n  margin-right: 8px;\\n  margin-bottom: 8px;\\n}\\n.movie-detail main {\\n  max-width: 100%;\\n  position: relative;\\n  padding-right: 16px;\\n}\\n@media (min-width: 900px) {\\n  .movie-detail main {\\n    width: 50%;\\n    padding-right: 8px;\\n  }\\n}\\n@media (min-width: 1200px) {\\n  .movie-detail main {\\n    width: 66.6667%;\\n  }\\n}\\n.movie-detail main::-webkit-scrollbar {\\n  display: none;\\n}\\n.movie-detail main p {\\n  opacity: 0.7;\\n}\\n.movie-detail main .movie-item-image {\\n  width: 100%;\\n  text-align: center;\\n}\\n.movie-detail main .movie-item-image img {\\n  width: 100%;\\n  max-width: 500px;\\n}\\n.movie-detail main header {\\n  max-width: 100%;\\n}\\n@media (min-width: 900px) {\\n  .movie-detail main header {\\n    max-width: 85%;\\n  }\\n}\\n.movie-detail main header .top p:first-of-type {\\n  margin-bottom: 5px;\\n}\\n@media (min-width: 1200px) {\\n  .movie-detail main header .top {\\n    display: -webkit-box;\\n    display: -ms-flexbox;\\n    display: flex;\\n    -webkit-box-align: start;\\n        -ms-flex-align: start;\\n            align-items: flex-start;\\n    -webkit-box-pack: justify;\\n        -ms-flex-pack: justify;\\n            justify-content: space-between;\\n  }\\n  .movie-detail main header .top p:first-of-type {\\n    margin-bottom: 0;\\n  }\\n}\\n.movie-detail main header .top h1 {\\n  width: 75%;\\n  margin-bottom: 20px;\\n}\\n.movie-detail main h1 {\\n  font-size: 36px;\\n  line-height: 1;\\n}\\n@media (min-width: 900px) {\\n  .movie-detail main h1 {\\n    font-size: 48px;\\n  }\\n}\\n.movie-detail main h3 {\\n  font-size: 24px;\\n  margin-bottom: 20px;\\n}\\n.movie-detail main .content {\\n  width: 100%;\\n  height: 100%;\\n}\\n\\n.wishlists #movies-list {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -ms-flex-wrap: wrap;\\n      flex-wrap: wrap;\\n}\\n.wishlists .movie-item {\\n  margin-right: 16px;\\n}\\n.wishlists .movie-item .wish-action {\\n  margin-top: 8px;\\n}\\n.wishlists .movie-item .wish-action .fas {\\n  color: #CB1D1D;\\n  -webkit-transition: all 0.3s ease;\\n  transition: all 0.3s ease;\\n}\\n.wishlists .movie-item .wish-action:hover {\\n  cursor: pointer;\\n}\\n.wishlists .movie-item .wish-action:hover i {\\n  color: #881313;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./sass/index.sass?./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ref--5-2!./node_modules/sass-loader/dist/cjs.js??ref--5-3");

/***/ }),

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./log\": \"./node_modules/webpack/hot/log.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./node_modules/webpack/hot sync ^\\\\.\\\\/log$\";\n\n//# sourceURL=webpack:///(webpack)/hot_sync_nonrecursive_^\\.\\/log$?");

/***/ }),

/***/ "./sass/index.sass":
/*!*************************!*\
  !*** ./sass/index.sass ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js??ref--5-2!../node_modules/sass-loader/dist/cjs.js??ref--5-3!./index.sass */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./sass/index.sass\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\nif (true) {\n  if (!content.locals || module.hot.invalidate) {\n    var isEqualLocals = function isEqualLocals(a, b) {\n  if (!a && b || a && !b) {\n    return false;\n  }\n\n  var p;\n\n  for (p in a) {\n    if (a[p] !== b[p]) {\n      return false;\n    }\n  }\n\n  for (p in b) {\n    if (!a[p]) {\n      return false;\n    }\n  }\n\n  return true;\n};\n    var oldLocals = content.locals;\n\n    module.hot.accept(\n      /*! !../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js??ref--5-2!../node_modules/sass-loader/dist/cjs.js??ref--5-3!./index.sass */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./sass/index.sass\",\n      function () {\n        content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js??ref--5-2!../node_modules/sass-loader/dist/cjs.js??ref--5-3!./index.sass */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./sass/index.sass\");\n\n              content = content.__esModule ? content.default : content;\n\n              if (typeof content === 'string') {\n                content = [[module.i, content, '']];\n              }\n\n              if (!isEqualLocals(oldLocals, content.locals)) {\n                module.hot.invalidate();\n\n                return;\n              }\n\n              oldLocals = content.locals;\n\n              update(content);\n      }\n    )\n  }\n\n  module.hot.dispose(function() {\n    update();\n  });\n}\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./sass/index.sass?");

/***/ }),

/***/ "./src/Root.js":
/*!*********************!*\
  !*** ./src/Root.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core */ \"./src/core/index.js\");\n/* harmony import */ var _movie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./movie */ \"./src/movie/index.js\");\n/* harmony import */ var _movies__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./movies */ \"./src/movies/index.js\");\n/* harmony import */ var _core_components_Container__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/components/Container */ \"./src/core/components/Container.js\");\n/* harmony import */ var _wishlist__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./wishlist */ \"./src/wishlist/index.js\");\n\n\n\n\n\n\n\n\n\nvar Root = function Root(_ref) {\n  var store = _ref.store;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"Provider\"], {\n    store: store\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Switch\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n    exact: true,\n    path: \"/\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_movies__WEBPACK_IMPORTED_MODULE_5__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n    path: \"/movies/:genre/:id\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_movie__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n    path: \"/tv-shows\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_components_Container__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"TV Shows\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"Cooming soon!\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n    path: \"/wishlist\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_wishlist__WEBPACK_IMPORTED_MODULE_7__[\"default\"], null)))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Root);\n\n//# sourceURL=webpack:///./src/Root.js?");

/***/ }),

/***/ "./src/core/components/Button.js":
/*!***************************************!*\
  !*** ./src/core/components/Button.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Button; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction Button(_ref) {\n  var _ref$onClick = _ref.onClick,\n      onClick = _ref$onClick === void 0 ? function () {} : _ref$onClick,\n      children = _ref.children,\n      className = _ref.className;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('movies-button', className),\n    onClick: onClick\n  }, children);\n}\n\n//# sourceURL=webpack:///./src/core/components/Button.js?");

/***/ }),

/***/ "./src/core/components/Container.js":
/*!******************************************!*\
  !*** ./src/core/components/Container.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Container; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction Container(_ref) {\n  var className = _ref.className,\n      children = _ref.children,\n      _ref$fullHeight = _ref.fullHeight,\n      fullHeight = _ref$fullHeight === void 0 ? false : _ref$fullHeight;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('container', className, {\n      'full-height': fullHeight\n    })\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"container-padding\"\n  }, children));\n}\n\n//# sourceURL=webpack:///./src/core/components/Container.js?");

/***/ }),

/***/ "./src/core/components/Header.js":
/*!***************************************!*\
  !*** ./src/core/components/Header.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _core_components_Container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/components/Container */ \"./src/core/components/Container.js\");\n\n\n\n\n\nvar Header = function Header(_ref) {\n  var wishlistCount = _ref.wishlistCount;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_components_Container__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"header\", {\n    className: \"movies-header\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"header-left\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n    to: \"/\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    id: \"logo\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    src: \"/static/img/logo.svg\",\n    alt: \"Marvel Comics\"\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"nav\", {\n    className: \"navigation\",\n    role: \"navigation\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"], {\n    exact: true,\n    activeClassName: \"active\",\n    to: \"/\"\n  }, \"Movies\"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"header-right\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"], {\n    exact: true,\n    activeClassName: \"active\",\n    to: \"/wishlist\",\n    className: \"wishlist-link\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    \"aria-hidden\": true,\n    className: \"fas fa-heart\"\n  }), \" Wishlist\", wishlistCount > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"small\", {\n    className: \"wishlist-count\"\n  }, \"(\", wishlistCount, \")\") : null))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);\n\n//# sourceURL=webpack:///./src/core/components/Header.js?");

/***/ }),

/***/ "./src/core/components/MovieImage.js":
/*!*******************************************!*\
  !*** ./src/core/components/MovieImage.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MovieImage; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction MovieImage(_ref) {\n  var movie = _ref.movie,\n      poster = _ref.poster;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"movie-item-image\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    src: \"https://image.tmdb.org/t/p/w500\".concat(poster ? movie.poster_path : movie.backdrop_path),\n    alt: movie.title\n  }));\n}\n\n//# sourceURL=webpack:///./src/core/components/MovieImage.js?");

/***/ }),

/***/ "./src/core/components/SEO.js":
/*!************************************!*\
  !*** ./src/core/components/SEO.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SEO; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-helmet */ \"./node_modules/react-helmet/es/Helmet.js\");\n\n\nfunction SEO(_ref) {\n  var _ref$lang = _ref.lang,\n      lang = _ref$lang === void 0 ? 'en' : _ref$lang,\n      _ref$title = _ref.title,\n      title = _ref$title === void 0 ? '' : _ref$title,\n      _ref$description = _ref.description,\n      description = _ref$description === void 0 ? 'Find the most amazing movies and create your wishlist' : _ref$description,\n      _ref$meta = _ref.meta,\n      meta = _ref$meta === void 0 ? [] : _ref$meta;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_1__[\"Helmet\"], {\n    htmlAttributes: {\n      lang: lang\n    },\n    title: title,\n    titleTemplate: \"%s | Fakelix\",\n    meta: [{\n      name: \"description\",\n      content: description\n    }, {\n      property: \"og:title\",\n      content: title\n    }, {\n      property: \"og:description\",\n      content: description\n    }, {\n      property: \"og:type\",\n      content: \"website\"\n    }, {\n      name: \"twitter:card\",\n      content: \"summary\"\n    }, {\n      name: \"twitter:creator\",\n      content: 'behind.design'\n    }, {\n      name: \"twitter:title\",\n      content: title\n    }, {\n      name: \"twitter:description\",\n      content: description\n    }].concat(meta)\n  });\n}\n\n//# sourceURL=webpack:///./src/core/components/SEO.js?");

/***/ }),

/***/ "./src/core/components/Tag.js":
/*!************************************!*\
  !*** ./src/core/components/Tag.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Tag; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction Tag(_ref) {\n  var children = _ref.children,\n      _ref$active = _ref.active,\n      active = _ref$active === void 0 ? false : _ref$active;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('tag', {\n      active: active\n    })\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"small\", null, children));\n}\n\n//# sourceURL=webpack:///./src/core/components/Tag.js?");

/***/ }),

/***/ "./src/core/components/TagList.js":
/*!****************************************!*\
  !*** ./src/core/components/TagList.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TagList; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tag */ \"./src/core/components/Tag.js\");\n\n\nfunction TagList(_ref) {\n  var active = _ref.active,\n      _ref$items = _ref.items,\n      items = _ref$items === void 0 ? [] : _ref$items,\n      field = _ref.field;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"tags\"\n  }, items.map(function (item) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Tag__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n      key: item.id,\n      active: item[field].toLowerCase() === active\n    }, item[field]);\n  }));\n}\n\n//# sourceURL=webpack:///./src/core/components/TagList.js?");

/***/ }),

/***/ "./src/core/hooks/useWishlist.js":
/*!***************************************!*\
  !*** ./src/core/hooks/useWishlist.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return useWishlist; });\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _store_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/actions */ \"./src/store/actions/index.js\");\n/* harmony import */ var _store_reducers_byId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/reducers/byId */ \"./src/store/reducers/byId.js\");\n\n\n\n\nfunction useWishlist() {\n  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__[\"useDispatch\"])();\n  var ids = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__[\"useSelector\"])(function (state) {\n    return state.wishlist;\n  });\n  var wishlist = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__[\"useSelector\"])(function (state) {\n    return (ids || []).map(function (id) {\n      return _store_reducers_byId__WEBPACK_IMPORTED_MODULE_3__[\"getItem\"](state.movies, id);\n    });\n  });\n\n  var toggleWishlistMovie = function toggleWishlistMovie(movieId, inWishlist) {\n    inWishlist ? dispatch(Object(_store_actions__WEBPACK_IMPORTED_MODULE_2__[\"removeWishlistMovie\"])(movieId)) : dispatch(Object(_store_actions__WEBPACK_IMPORTED_MODULE_2__[\"addWishlistMovie\"])(movieId));\n  };\n\n  return {\n    wishlist: wishlist,\n    toggleWishlistMovie: toggleWishlistMovie\n  };\n}\n\n//# sourceURL=webpack:///./src/core/hooks/useWishlist.js?");

/***/ }),

/***/ "./src/core/index.js":
/*!***************************!*\
  !*** ./src/core/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _store_reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/reducers */ \"./src/store/reducers/index.js\");\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Header */ \"./src/core/components/Header.js\");\n\n\n\n\n\n\nvar Core = function Core(_ref) {\n  var isFetching = _ref.isFetching,\n      wishlistCount = _ref.wishlistCount,\n      children = _ref.children;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    id: \"movie-app\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Header__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    wishlistCount: wishlistCount\n  }), children);\n};\n\nvar mapStateToProps = function mapStateToProps(state, ownProps) {\n  return {\n    wishlistCount: Object(_store_reducers__WEBPACK_IMPORTED_MODULE_3__[\"getWishlist\"])(state).length\n  };\n};\n\nvar mapDispatchToProps = null;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, mapDispatchToProps)(Core));\n\n//# sourceURL=webpack:///./src/core/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Root__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Root */ \"./src/Root.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store */ \"./src/store/index.js\");\n/* harmony import */ var _sass_index_sass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sass/index.sass */ \"./sass/index.sass\");\n/* harmony import */ var _sass_index_sass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_sass_index_sass__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\nvar _configureStore = Object(_store__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(),\n    store = _configureStore.store;\n\nObject(react_dom__WEBPACK_IMPORTED_MODULE_2__[\"hydrate\"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"BrowserRouter\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Root__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n  store: store\n})), document.getElementById('root'));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/movie/components/Aside.js":
/*!***************************************!*\
  !*** ./src/movie/components/Aside.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-loading-skeleton */ \"./node_modules/react-loading-skeleton/lib/index.js\");\n/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _core_components_TagList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/components/TagList */ \"./src/core/components/TagList.js\");\n/* harmony import */ var _MovieRating__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MovieRating */ \"./src/movie/components/MovieRating.js\");\n/* harmony import */ var _MovieOverview__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MovieOverview */ \"./src/movie/components/MovieOverview.js\");\n/* harmony import */ var _core_components_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/components/Button */ \"./src/core/components/Button.js\");\n\n\n\n\n\n\n\n\nvar ReleaseDate = function ReleaseDate(_ref) {\n  var date = _ref.date;\n  if (!date) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2___default.a, null);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"strong\", null, \"Released:\"), \" \", date);\n};\n\nvar Aside = function Aside(_ref2) {\n  var movie = _ref2.movie,\n      genre = _ref2.genre,\n      toggleWishlist = _ref2.toggleWishlist,\n      _ref2$inWishlist = _ref2.inWishlist,\n      inWishlist = _ref2$inWishlist === void 0 ? false : _ref2$inWishlist;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"aside\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"top\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", {\n    className: \"movie-title\"\n  }, movie.title || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"movie-meta\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MovieRating__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    votes: movie.vote_average,\n    voteCount: movie.vote_count\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"small\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ReleaseDate, {\n    date: movie.release_date\n  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"content\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_components_TagList__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    active: genre,\n    items: movie.genres,\n    field: \"name\"\n  }), movie.overview ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MovieOverview__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    overview: movie.overview\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    count: 10\n  }), movie.id ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_components_Button__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    className: \"add-wishlist\",\n    onClick: toggleWishlist\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    \"aria-hidden\": true,\n    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('fa-heart', {\n      fas: inWishlist,\n      far: !inWishlist\n    })\n  }), \" \", inWishlist ? 'Remove from' : 'Add to', \" Wishlist\") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    className: \"add-wishlist\",\n    height: 60\n  })));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Aside);\n\n//# sourceURL=webpack:///./src/movie/components/Aside.js?");

/***/ }),

/***/ "./src/movie/components/MovieDetail.js":
/*!*********************************************!*\
  !*** ./src/movie/components/MovieDetail.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-loading-skeleton */ \"./node_modules/react-loading-skeleton/lib/index.js\");\n/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Aside__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Aside */ \"./src/movie/components/Aside.js\");\n/* harmony import */ var _core_components_SEO__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/components/SEO */ \"./src/core/components/SEO.js\");\n/* harmony import */ var _core_components_Container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/components/Container */ \"./src/core/components/Container.js\");\n/* harmony import */ var _core_components_MovieImage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/components/MovieImage */ \"./src/core/components/MovieImage.js\");\n\n\n\n\n\n\n\n\nvar MovieDetail = function MovieDetail(_ref) {\n  var movie = _ref.movie,\n      genre = _ref.genre,\n      inWishlist = _ref.inWishlist,\n      toggleWishlist = _ref.toggleWishlist;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_components_SEO__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    title: movie.title,\n    description: movie.tagline\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_components_Container__WEBPACK_IMPORTED_MODULE_5__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(\"movie-detail\", genre)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"main\", null, movie.id ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_components_MovieImage__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    poster: true,\n    movie: movie\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    width: 500,\n    height: 650\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Aside__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    genre: genre,\n    movie: movie,\n    inWishlist: inWishlist,\n    toggleWishlist: toggleWishlist\n  }))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MovieDetail);\n\n//# sourceURL=webpack:///./src/movie/components/MovieDetail.js?");

/***/ }),

/***/ "./src/movie/components/MovieOverview.js":
/*!***********************************************!*\
  !*** ./src/movie/components/MovieOverview.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MovieOverview; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction MovieOverview(_ref) {\n  var overview = _ref.overview;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"description\"\n  }, overview ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, overview) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"No overview available.\"));\n}\n\n//# sourceURL=webpack:///./src/movie/components/MovieOverview.js?");

/***/ }),

/***/ "./src/movie/components/MovieRating.js":
/*!*********************************************!*\
  !*** ./src/movie/components/MovieRating.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MovieRating; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-loading-skeleton */ \"./node_modules/react-loading-skeleton/lib/index.js\");\n/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction MovieRating(_ref) {\n  var votes = _ref.votes,\n      voteCount = _ref.voteCount;\n\n  if (votes && votes >= 0) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", {\n      className: \"movie-votes\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n      \"aria-hidden\": true,\n      className: \"fas fa-star\"\n    }), \" \", votes, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"small\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, \"(\", voteCount, \" votes)\")));\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {\n    width: 80\n  });\n}\n\n//# sourceURL=webpack:///./src/movie/components/MovieRating.js?");

/***/ }),

/***/ "./src/movie/index.js":
/*!****************************!*\
  !*** ./src/movie/index.js ***!
  \****************************/
/*! exports provided: Movie, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Movie\", function() { return Movie; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ \"./node_modules/react-router/esm/react-router.js\");\n/* harmony import */ var _store_reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/reducers */ \"./src/store/reducers/index.js\");\n/* harmony import */ var _store_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/actions */ \"./src/store/actions/index.js\");\n/* harmony import */ var _components_MovieDetail__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/MovieDetail */ \"./src/movie/components/MovieDetail.js\");\n/* harmony import */ var _core_hooks_useWishlist__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/hooks/useWishlist */ \"./src/core/hooks/useWishlist.js\");\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\n\n\n\nfunction Movie(props) {\n  var movieId = props.movieId,\n      fetchMovie = props.fetchMovie;\n\n  var _useWishlist = Object(_core_hooks_useWishlist__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(),\n      toggleWishlistMovie = _useWishlist.toggleWishlistMovie;\n\n  var toggleMovie = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useCallback\"])(function () {\n    toggleWishlistMovie(movieId, props.inWishlist);\n  }, [toggleWishlistMovie]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    fetchMovie(movieId);\n  }, [movieId, fetchMovie]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_MovieDetail__WEBPACK_IMPORTED_MODULE_5__[\"default\"], _extends({}, props, {\n    toggleWishlist: toggleMovie\n  }));\n}\n\nvar mapStateToProps = function mapStateToProps(state, _ref) {\n  var params = _ref.match.params;\n  return {\n    movieId: ~~params.id,\n    genre: params.genre,\n    movie: Object(_store_reducers__WEBPACK_IMPORTED_MODULE_3__[\"getMovie\"])(state, params.id) || {},\n    inWishlist: Object(_store_reducers__WEBPACK_IMPORTED_MODULE_3__[\"getWishlist\"])(state).includes(~~params.id)\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {\n  var params = _ref2.match.params;\n  return {\n    fetchMovie: function fetchMovie(movieId) {\n      return dispatch(Object(_store_actions__WEBPACK_IMPORTED_MODULE_4__[\"fetchMovie\"])(movieId));\n    },\n    addWishlistMovie: function addWishlistMovie(movieId) {\n      return dispatch(Object(_store_actions__WEBPACK_IMPORTED_MODULE_4__[\"addWishlistMovie\"])(movieId));\n    },\n    removeWishlistMovie: function removeWishlistMovie(movieId) {\n      return dispatch(Object(_store_actions__WEBPACK_IMPORTED_MODULE_4__[\"removeWishlistMovie\"])(movieId));\n    }\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_router__WEBPACK_IMPORTED_MODULE_2__[\"withRouter\"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, mapDispatchToProps)(Movie)));\n\n//# sourceURL=webpack:///./src/movie/index.js?");

/***/ }),

/***/ "./src/movies/components/GenreSection.js":
/*!***********************************************!*\
  !*** ./src/movies/components/GenreSection.js ***!
  \***********************************************/
/*! exports provided: GenreSectionSkeleton, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GenreSectionSkeleton\", function() { return GenreSectionSkeleton; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GenreSection; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-loading-skeleton */ \"./node_modules/react-loading-skeleton/lib/index.js\");\n/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/swiper.esm.js\");\n/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper/react */ \"./node_modules/swiper/swiper-react.esm.js\");\n/* harmony import */ var _MovieItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MovieItem */ \"./src/movies/components/MovieItem.js\");\n/* harmony import */ var _core_components_Container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/components/Container */ \"./src/core/components/Container.js\");\n\n\n\n\n\n\nswiper__WEBPACK_IMPORTED_MODULE_2__[\"default\"].use([swiper__WEBPACK_IMPORTED_MODULE_2__[\"Navigation\"]]);\nvar GenreSectionSkeleton = function GenreSectionSkeleton() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"genre-section skeleton\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"genre-title\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {\n    width: 100\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"genre-movies\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MovieItem__WEBPACK_IMPORTED_MODULE_4__[\"MovieItemSkeleton\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MovieItem__WEBPACK_IMPORTED_MODULE_4__[\"MovieItemSkeleton\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MovieItem__WEBPACK_IMPORTED_MODULE_4__[\"MovieItemSkeleton\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MovieItem__WEBPACK_IMPORTED_MODULE_4__[\"MovieItemSkeleton\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MovieItem__WEBPACK_IMPORTED_MODULE_4__[\"MovieItemSkeleton\"], null)));\n};\nfunction GenreSection(_ref) {\n  var genre = _ref.genre;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"genre-section\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_components_Container__WEBPACK_IMPORTED_MODULE_5__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", {\n    className: \"genre-title\"\n  }, genre.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(swiper_react__WEBPACK_IMPORTED_MODULE_3__[\"Swiper\"], {\n    className: \"genre-movies\",\n    navigation: true,\n    centeredSlides: true,\n    spaceBetween: 8,\n    slidesPerGroup: 1,\n    slidesPerView: 1,\n    breakpoints: {\n      600: {\n        slidesPerView: 2,\n        centeredSlides: false\n      },\n      900: {\n        slidesPerView: 3,\n        centeredSlides: false,\n        slidesOffsetBefore: 32\n      },\n      1200: {\n        slidesPerView: 6,\n        centeredSlides: false,\n        slidesOffsetBefore: 32\n      }\n    }\n  }, genre.movies.map(function (movie) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(swiper_react__WEBPACK_IMPORTED_MODULE_3__[\"SwiperSlide\"], {\n      key: movie.id\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MovieItem__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      movie: movie,\n      genre: (genre.name || \"\").toLowerCase()\n    }));\n  })));\n}\n\n//# sourceURL=webpack:///./src/movies/components/GenreSection.js?");

/***/ }),

/***/ "./src/movies/components/MovieItem.js":
/*!********************************************!*\
  !*** ./src/movies/components/MovieItem.js ***!
  \********************************************/
/*! exports provided: MovieItemSkeleton, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MovieItemSkeleton\", function() { return MovieItemSkeleton; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var truncatise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! truncatise */ \"./node_modules/truncatise/index.js\");\n/* harmony import */ var truncatise__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(truncatise__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-loading-skeleton */ \"./node_modules/react-loading-skeleton/lib/index.js\");\n/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _core_components_MovieImage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/components/MovieImage */ \"./src/core/components/MovieImage.js\");\n/* harmony import */ var _movie_components_MovieRating__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../movie/components/MovieRating */ \"./src/movie/components/MovieRating.js\");\n\n\n\n\n\n\n\nvar truncateOptions = {\n  TruncateBy: 'words',\n  TruncateLength: 3,\n  StripHTML: true,\n  Strict: true,\n  Suffix: '...'\n};\n\nvar fullTitle = function fullTitle(movie) {\n  return \"\".concat(movie.title);\n};\n\nvar MovieItem = function MovieItem(_ref) {\n  var movie = _ref.movie,\n      genre = _ref.genre,\n      single = _ref.single,\n      children = _ref.children;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('movie-item', {\n      single: single\n    }),\n    title: fullTitle(movie)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Link\"], {\n    to: \"/movies/\".concat(genre, \"/\").concat(movie.id)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_components_MovieImage__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    movie: movie\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", {\n    className: \"movie-item-title\",\n    title: fullTitle(movie)\n  }, truncatise__WEBPACK_IMPORTED_MODULE_3___default()(fullTitle(movie), truncateOptions)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_movie_components_MovieRating__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    votes: movie.vote_average,\n    voteCount: movie.vote_count\n  })), children);\n};\n\nvar MovieItemSkeleton = function MovieItemSkeleton() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"movie-item skeleton\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    height: 260\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    width: 80\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    widht: 40\n  }));\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (MovieItem);\n\n//# sourceURL=webpack:///./src/movies/components/MovieItem.js?");

/***/ }),

/***/ "./src/movies/components/MoviesLoading.js":
/*!************************************************!*\
  !*** ./src/movies/components/MoviesLoading.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MoviesLoading; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GenreSection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GenreSection */ \"./src/movies/components/GenreSection.js\");\n\n\nfunction MoviesLoading() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GenreSection__WEBPACK_IMPORTED_MODULE_1__[\"GenreSectionSkeleton\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GenreSection__WEBPACK_IMPORTED_MODULE_1__[\"GenreSectionSkeleton\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GenreSection__WEBPACK_IMPORTED_MODULE_1__[\"GenreSectionSkeleton\"], null));\n}\n\n//# sourceURL=webpack:///./src/movies/components/MoviesLoading.js?");

/***/ }),

/***/ "./src/movies/index.js":
/*!*****************************!*\
  !*** ./src/movies/index.js ***!
  \*****************************/
/*! exports provided: Movies, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Movies\", function() { return Movies; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ \"./node_modules/rxjs/_esm5/index.js\");\n/* harmony import */ var _store_reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/reducers */ \"./src/store/reducers/index.js\");\n/* harmony import */ var _store_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/actions */ \"./src/store/actions/index.js\");\n/* harmony import */ var _store_reducers_movies__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../store/reducers/movies */ \"./src/store/reducers/movies.js\");\n/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ \"./node_modules/rxjs/_esm5/operators/index.js\");\n/* harmony import */ var _components_GenreSection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/GenreSection */ \"./src/movies/components/GenreSection.js\");\n/* harmony import */ var _core_components_Container__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/components/Container */ \"./src/core/components/Container.js\");\n/* harmony import */ var _components_MoviesLoading__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/MoviesLoading */ \"./src/movies/components/MoviesLoading.js\");\n/* harmony import */ var _core_components_SEO__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/components/SEO */ \"./src/core/components/SEO.js\");\n\n\n\n\n\n\n\n\n\n\n\nfunction Movies(_ref) {\n  var genres = _ref.genres,\n      fetchMovies = _ref.fetchMovies,\n      cancelRequests = _ref.cancelRequests;\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    fetchMovies();\n    return function () {\n      return cancelRequests();\n    };\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_components_SEO__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n    title: \"Movies\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_components_Container__WEBPACK_IMPORTED_MODULE_8__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"Movies\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    id: \"movies-list\",\n    className: \"movies-list\"\n  }, !genres.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_MoviesLoading__WEBPACK_IMPORTED_MODULE_9__[\"default\"], null) : genres.map(function (genre) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_GenreSection__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      key: genre.name,\n      genre: genre\n    });\n  })));\n}\n\nvar mapStateToProps = function mapStateToProps(state, ownProps) {\n  return {\n    genres: Object(_store_reducers__WEBPACK_IMPORTED_MODULE_3__[\"getGenres\"])(state)\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    fetchMovies: function fetchMovies() {\n      return dispatch(Object(_store_actions__WEBPACK_IMPORTED_MODULE_4__[\"fetchMovies\"])());\n    },\n    cancelRequests: function cancelRequests() {\n      return dispatch(Object(_store_actions__WEBPACK_IMPORTED_MODULE_4__[\"cancelRequests\"])());\n    }\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, mapDispatchToProps)(Movies));\n\n//# sourceURL=webpack:///./src/movies/index.js?");

/***/ }),

/***/ "./src/store/actions/index.js":
/*!************************************!*\
  !*** ./src/store/actions/index.js ***!
  \************************************/
/*! exports provided: FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_FAILURE, FETCH_GENRE_MOVIES_REQUEST, FETCH_MOVIE_REQUEST, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_FAILURE, ADD_WISHLIST_MOVIE, REMOVE_WISHLIST_MOVIE, CANCEL_REQUESTS, LOCATION_CHANGE, cancelRequests, fetchMovies, fetchGenreMovies, fetchMoviesSuccess, fetchMoviesFailure, fetchMovie, fetchMovieSuccess, fetchMovieFailure, addWishlistMovie, removeWishlistMovie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CANCEL_REQUESTS\", function() { return CANCEL_REQUESTS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LOCATION_CHANGE\", function() { return LOCATION_CHANGE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cancelRequests\", function() { return cancelRequests; });\n/* harmony import */ var _movies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./movies */ \"./src/store/actions/movies.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"FETCH_MOVIES_REQUEST\", function() { return _movies__WEBPACK_IMPORTED_MODULE_0__[\"FETCH_MOVIES_REQUEST\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"FETCH_MOVIES_SUCCESS\", function() { return _movies__WEBPACK_IMPORTED_MODULE_0__[\"FETCH_MOVIES_SUCCESS\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"FETCH_MOVIES_FAILURE\", function() { return _movies__WEBPACK_IMPORTED_MODULE_0__[\"FETCH_MOVIES_FAILURE\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"FETCH_GENRE_MOVIES_REQUEST\", function() { return _movies__WEBPACK_IMPORTED_MODULE_0__[\"FETCH_GENRE_MOVIES_REQUEST\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"fetchMovies\", function() { return _movies__WEBPACK_IMPORTED_MODULE_0__[\"fetchMovies\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"fetchGenreMovies\", function() { return _movies__WEBPACK_IMPORTED_MODULE_0__[\"fetchGenreMovies\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"fetchMoviesSuccess\", function() { return _movies__WEBPACK_IMPORTED_MODULE_0__[\"fetchMoviesSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"fetchMoviesFailure\", function() { return _movies__WEBPACK_IMPORTED_MODULE_0__[\"fetchMoviesFailure\"]; });\n\n/* harmony import */ var _movie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./movie */ \"./src/store/actions/movie.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"FETCH_MOVIE_REQUEST\", function() { return _movie__WEBPACK_IMPORTED_MODULE_1__[\"FETCH_MOVIE_REQUEST\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"FETCH_MOVIE_SUCCESS\", function() { return _movie__WEBPACK_IMPORTED_MODULE_1__[\"FETCH_MOVIE_SUCCESS\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"FETCH_MOVIE_FAILURE\", function() { return _movie__WEBPACK_IMPORTED_MODULE_1__[\"FETCH_MOVIE_FAILURE\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"fetchMovie\", function() { return _movie__WEBPACK_IMPORTED_MODULE_1__[\"fetchMovie\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"fetchMovieSuccess\", function() { return _movie__WEBPACK_IMPORTED_MODULE_1__[\"fetchMovieSuccess\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"fetchMovieFailure\", function() { return _movie__WEBPACK_IMPORTED_MODULE_1__[\"fetchMovieFailure\"]; });\n\n/* harmony import */ var _wishlist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wishlist */ \"./src/store/actions/wishlist.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ADD_WISHLIST_MOVIE\", function() { return _wishlist__WEBPACK_IMPORTED_MODULE_2__[\"ADD_WISHLIST_MOVIE\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"REMOVE_WISHLIST_MOVIE\", function() { return _wishlist__WEBPACK_IMPORTED_MODULE_2__[\"REMOVE_WISHLIST_MOVIE\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"addWishlistMovie\", function() { return _wishlist__WEBPACK_IMPORTED_MODULE_2__[\"addWishlistMovie\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"removeWishlistMovie\", function() { return _wishlist__WEBPACK_IMPORTED_MODULE_2__[\"removeWishlistMovie\"]; });\n\n\n\n\nvar LOCATION_CHANGE = \"@@router/LOCATION_CHANGE\";\nvar CANCEL_REQUESTS = \"@@movies/CANCEL_REQUESTS\";\n\nvar cancelRequests = function cancelRequests() {\n  return {\n    type: CANCEL_REQUESTS\n  };\n};\n\n\n\n//# sourceURL=webpack:///./src/store/actions/index.js?");

/***/ }),

/***/ "./src/store/actions/movie.js":
/*!************************************!*\
  !*** ./src/store/actions/movie.js ***!
  \************************************/
/*! exports provided: FETCH_MOVIE_REQUEST, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_FAILURE, fetchMovie, fetchMovieSuccess, fetchMovieFailure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FETCH_MOVIE_REQUEST\", function() { return FETCH_MOVIE_REQUEST; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FETCH_MOVIE_SUCCESS\", function() { return FETCH_MOVIE_SUCCESS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FETCH_MOVIE_FAILURE\", function() { return FETCH_MOVIE_FAILURE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchMovie\", function() { return fetchMovie; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchMovieSuccess\", function() { return fetchMovieSuccess; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchMovieFailure\", function() { return fetchMovieFailure; });\nvar FETCH_MOVIE_REQUEST = '@@marvel-comics/FETCH_MOVIE_REQUEST';\nvar FETCH_MOVIE_SUCCESS = '@@marvel-comics/FETCH_MOVIE_SUCCESS';\nvar FETCH_MOVIE_FAILURE = '@@marvel-comics/FETCH_MOVIE_FAILURE';\nvar fetchMovie = function fetchMovie(movieId) {\n  return {\n    type: FETCH_MOVIE_REQUEST,\n    movieId: movieId\n  };\n};\nvar fetchMovieSuccess = function fetchMovieSuccess(movieId, response) {\n  return {\n    type: FETCH_MOVIE_SUCCESS,\n    response: response,\n    movieId: movieId\n  };\n};\nvar fetchMovieFailure = function fetchMovieFailure(movieId, message) {\n  return {\n    type: FETCH_MOVIE_FAILURE,\n    message: message,\n    movieId: movieId\n  };\n};\n\n//# sourceURL=webpack:///./src/store/actions/movie.js?");

/***/ }),

/***/ "./src/store/actions/movies.js":
/*!*************************************!*\
  !*** ./src/store/actions/movies.js ***!
  \*************************************/
/*! exports provided: FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_FAILURE, FETCH_GENRE_MOVIES_REQUEST, fetchMovies, fetchMoviesSuccess, fetchMoviesFailure, fetchGenreMovies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FETCH_MOVIES_REQUEST\", function() { return FETCH_MOVIES_REQUEST; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FETCH_MOVIES_SUCCESS\", function() { return FETCH_MOVIES_SUCCESS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FETCH_MOVIES_FAILURE\", function() { return FETCH_MOVIES_FAILURE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FETCH_GENRE_MOVIES_REQUEST\", function() { return FETCH_GENRE_MOVIES_REQUEST; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchMovies\", function() { return fetchMovies; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchMoviesSuccess\", function() { return fetchMoviesSuccess; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchMoviesFailure\", function() { return fetchMoviesFailure; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchGenreMovies\", function() { return fetchGenreMovies; });\nvar FETCH_MOVIES_REQUEST = '@@movies/FETCH_MOVIES_REQUEST';\nvar FETCH_MOVIES_SUCCESS = '@@movies/FETCH_MOVIES_SUCCESS';\nvar FETCH_MOVIES_FAILURE = '@@movies/FETCH_MOVIES_FAILURE';\nvar FETCH_GENRE_MOVIES_REQUEST = '@@movies/FETCH_GENRE_MOVIES_REQUEST';\nvar fetchMovies = function fetchMovies() {\n  var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n  return {\n    type: FETCH_MOVIES_REQUEST,\n    offset: offset\n  };\n};\nvar fetchMoviesSuccess = function fetchMoviesSuccess(_ref) {\n  var response = _ref.response,\n      offset = _ref.offset,\n      total = _ref.total;\n  return {\n    type: FETCH_MOVIES_SUCCESS,\n    response: response,\n    offset: offset,\n    total: total\n  };\n};\nvar fetchMoviesFailure = function fetchMoviesFailure(message) {\n  return {\n    type: FETCH_MOVIES_FAILURE,\n    message: message\n  };\n};\nvar fetchGenreMovies = function fetchGenreMovies(genre) {\n  return {\n    type: FETCH_GENRE_MOVIES_REQUEST,\n    genre: genre\n  };\n};\n\n//# sourceURL=webpack:///./src/store/actions/movies.js?");

/***/ }),

/***/ "./src/store/actions/wishlist.js":
/*!***************************************!*\
  !*** ./src/store/actions/wishlist.js ***!
  \***************************************/
/*! exports provided: ADD_WISHLIST_MOVIE, REMOVE_WISHLIST_MOVIE, addWishlistMovie, removeWishlistMovie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_WISHLIST_MOVIE\", function() { return ADD_WISHLIST_MOVIE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"REMOVE_WISHLIST_MOVIE\", function() { return REMOVE_WISHLIST_MOVIE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addWishlistMovie\", function() { return addWishlistMovie; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeWishlistMovie\", function() { return removeWishlistMovie; });\nvar ADD_WISHLIST_MOVIE = '@@movies/ADD_WISHLIST_MOVIE';\nvar REMOVE_WISHLIST_MOVIE = '@@movies/REMOVE_WISHLIST_MOVIE';\nvar addWishlistMovie = function addWishlistMovie(movieId) {\n  return {\n    type: ADD_WISHLIST_MOVIE,\n    movieId: movieId\n  };\n};\nvar removeWishlistMovie = function removeWishlistMovie(movieId) {\n  return {\n    type: REMOVE_WISHLIST_MOVIE,\n    movieId: movieId\n  };\n};\n\n//# sourceURL=webpack:///./src/store/actions/wishlist.js?");

/***/ }),

/***/ "./src/store/epics/movie.js":
/*!**********************************!*\
  !*** ./src/store/epics/movie.js ***!
  \**********************************/
/*! exports provided: fetchMovieEpic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchMovieEpic\", function() { return fetchMovieEpic; });\n/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ \"./node_modules/rxjs/_esm5/index.js\");\n/* harmony import */ var rxjs_ajax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/ajax */ \"./node_modules/rxjs/_esm5/ajax/index.js\");\n/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ \"./node_modules/rxjs/_esm5/operators/index.js\");\n/* harmony import */ var redux_observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-observable */ \"./node_modules/redux-observable/lib/esm/index.js\");\n/* harmony import */ var normalizr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! normalizr */ \"./node_modules/normalizr/dist/normalizr.es.js\");\n/* harmony import */ var _utils_buildUrl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/buildUrl */ \"./src/store/epics/utils/buildUrl.js\");\n/* harmony import */ var _utils_cancelActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/cancelActions */ \"./src/store/epics/utils/cancelActions.js\");\n/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../schema */ \"./src/store/schema.js\");\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../actions */ \"./src/store/actions/index.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\n\n\nvar movieRequest = function movieRequest(movieId) {\n  return {\n    method: 'GET',\n    crossDomain: true,\n    url: Object(_utils_buildUrl__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"/movie/\".concat(movieId), {})\n  };\n};\n\nvar movieError = function movieError(movieId) {\n  return function (error) {\n    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__[\"of\"])(Object(_actions__WEBPACK_IMPORTED_MODULE_8__[\"fetchMovieFailure\"])(movieId, error.message || 'Error Fetching Movie Detail'));\n  };\n};\n\nvar movieSuccess = function movieSuccess(movieId) {\n  return function (response) {\n    var _normalize = Object(normalizr__WEBPACK_IMPORTED_MODULE_4__[\"normalize\"])(response, _schema__WEBPACK_IMPORTED_MODULE_7__[\"movie\"]),\n        movies = _normalize.entities.movies;\n\n    return Object(_actions__WEBPACK_IMPORTED_MODULE_8__[\"fetchMovieSuccess\"])(movieId, _defineProperty({}, movieId, _objectSpread({}, movies[movieId])));\n  };\n};\n/**\n * This epic will fetch the movie detail for a particular page.\n */\n\n\nvar fetchMovieEpic = function fetchMovieEpic(action$, store, _ref) {\n  var ajax = _ref.ajax;\n  return action$.pipe(Object(redux_observable__WEBPACK_IMPORTED_MODULE_3__[\"ofType\"])(_actions__WEBPACK_IMPORTED_MODULE_8__[\"FETCH_MOVIE_REQUEST\"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"switchMap\"])(function (_ref2) {\n    var movieId = _ref2.movieId;\n    return ajax(movieRequest(movieId)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"takeUntil\"])(Object(_utils_cancelActions__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(action$, _actions__WEBPACK_IMPORTED_MODULE_8__[\"CANCEL_REQUESTS\"], _actions__WEBPACK_IMPORTED_MODULE_8__[\"LOCATION_CHANGE\"])), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"map\"])(movieSuccess(movieId)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__[\"catchError\"])(movieError(movieId)));\n  }));\n};\n\n//# sourceURL=webpack:///./src/store/epics/movie.js?");

/***/ }),

/***/ "./src/store/epics/movies.js":
/*!***********************************!*\
  !*** ./src/store/epics/movies.js ***!
  \***********************************/
/*! exports provided: fetchGenreMoviesEpic, fetchMoviesEpic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchGenreMoviesEpic\", function() { return fetchGenreMoviesEpic; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchMoviesEpic\", function() { return fetchMoviesEpic; });\n/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ \"./node_modules/rxjs/_esm5/index.js\");\n/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ \"./node_modules/rxjs/_esm5/operators/index.js\");\n/* harmony import */ var redux_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-observable */ \"./node_modules/redux-observable/lib/esm/index.js\");\n/* harmony import */ var normalizr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! normalizr */ \"./node_modules/normalizr/dist/normalizr.es.js\");\n/* harmony import */ var _utils_buildUrl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/buildUrl */ \"./src/store/epics/utils/buildUrl.js\");\n/* harmony import */ var _utils_cancelActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/cancelActions */ \"./src/store/epics/utils/cancelActions.js\");\n/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../schema */ \"./src/store/schema.js\");\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../actions */ \"./src/store/actions/index.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\nvar MAX_GENRES = 3;\n\nvar genresRequest = function genresRequest() {\n  return {\n    method: 'GET',\n    crossDomain: true,\n    url: Object(_utils_buildUrl__WEBPACK_IMPORTED_MODULE_4__[\"default\"])('/genre/movie/list', {})\n  };\n};\n\nvar moviesRequest = function moviesRequest(_ref) {\n  var genre = _ref.genre;\n  return {\n    method: 'GET',\n    crossDomain: true,\n    url: Object(_utils_buildUrl__WEBPACK_IMPORTED_MODULE_4__[\"default\"])('/discover/movie', {\n      with_genres: genre.id\n    })\n  };\n};\n\nvar moviesError = function moviesError(error) {\n  return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__[\"of\"])(Object(_actions__WEBPACK_IMPORTED_MODULE_7__[\"fetchMoviesFailure\"])(error.message || 'Error Fetching Movies List'));\n};\n\nvar moviesSuccess = function moviesSuccess(action) {\n  return function (_ref2) {\n    var _ref2$results = _ref2.results,\n        results = _ref2$results === void 0 ? [] : _ref2$results;\n    // Remove any movies/items with no title or no backdrop image that we can use\n    var response = Object(normalizr__WEBPACK_IMPORTED_MODULE_3__[\"normalize\"])(results.filter(function (m) {\n      return m.title && m.backdrop_path;\n    }).map(function (m) {\n      return _objectSpread(_objectSpread({}, m), {}, {\n        genre: action.genre\n      });\n    }), _schema__WEBPACK_IMPORTED_MODULE_6__[\"arrayOfMovies\"]);\n    return Object(_actions__WEBPACK_IMPORTED_MODULE_7__[\"fetchMoviesSuccess\"])({\n      response: response\n    });\n  };\n};\n\nvar fetchGenreMoviesEpic = function fetchGenreMoviesEpic(action$, store, _ref3) {\n  var ajax = _ref3.ajax;\n  return action$.pipe(Object(redux_observable__WEBPACK_IMPORTED_MODULE_2__[\"ofType\"])(_actions__WEBPACK_IMPORTED_MODULE_7__[\"FETCH_GENRE_MOVIES_REQUEST\"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__[\"mergeMap\"])(function (action) {\n    return ajax(moviesRequest(action)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__[\"map\"])(moviesSuccess(action)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__[\"takeUntil\"])(Object(_utils_cancelActions__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(action$, _actions__WEBPACK_IMPORTED_MODULE_7__[\"LOCATION_CHANGE\"], _actions__WEBPACK_IMPORTED_MODULE_7__[\"CANCEL_REQUESTS\"])), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__[\"catchError\"])(moviesError));\n  }));\n};\nvar fetchMoviesEpic = function fetchMoviesEpic(action$, store, _ref4) {\n  var ajax = _ref4.ajax;\n  return action$.pipe(Object(redux_observable__WEBPACK_IMPORTED_MODULE_2__[\"ofType\"])(_actions__WEBPACK_IMPORTED_MODULE_7__[\"FETCH_MOVIES_REQUEST\"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__[\"switchMap\"])(function (action) {\n    return ajax(genresRequest()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__[\"pluck\"])('genres'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__[\"map\"])(function (genres) {\n      return MAX_GENRES ? genres.slice(0, MAX_GENRES) : genres;\n    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__[\"switchMap\"])(function (genres) {\n      return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__[\"merge\"])(genres.map(function (g) {\n        return Object(_actions__WEBPACK_IMPORTED_MODULE_7__[\"fetchGenreMovies\"])(g);\n      }));\n    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__[\"takeUntil\"])(Object(_utils_cancelActions__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(action$, _actions__WEBPACK_IMPORTED_MODULE_7__[\"LOCATION_CHANGE\"], _actions__WEBPACK_IMPORTED_MODULE_7__[\"CANCEL_REQUESTS\"])), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__[\"catchError\"])(moviesError));\n  }));\n};\n\n//# sourceURL=webpack:///./src/store/epics/movies.js?");

/***/ }),

/***/ "./src/store/epics/utils/buildUrl.js":
/*!*******************************************!*\
  !*** ./src/store/epics/utils/buildUrl.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! query-string */ \"./node_modules/query-string/index.js\");\n/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_0__);\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nvar version = '3'; // TODO: Add dotenv support\n\nvar apiKey = 'bc604082af64048621bf25c5bd136b98';\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (endpoint) {\n  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  var defaultParams = {\n    api_key: apiKey\n  };\n\n  var queryParams = _objectSpread(_objectSpread({}, defaultParams), params);\n\n  var base = \"https://api.themoviedb.org/\".concat(version);\n  var url = base + (endpoint[0] === '/' ? endpoint : \"/\".concat(endpoint));\n  return \"\".concat(url, \"?\").concat(Object(query_string__WEBPACK_IMPORTED_MODULE_0__[\"stringify\"])(queryParams));\n});\n\n//# sourceURL=webpack:///./src/store/epics/utils/buildUrl.js?");

/***/ }),

/***/ "./src/store/epics/utils/cancelActions.js":
/*!************************************************!*\
  !*** ./src/store/epics/utils/cancelActions.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ \"./node_modules/rxjs/_esm5/index.js\");\n/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ \"./node_modules/rxjs/_esm5/operators/index.js\");\n/* harmony import */ var redux_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-observable */ \"./node_modules/redux-observable/lib/esm/index.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\n/**\n * This functions gets the observable of actions from the store\n * and a list of actions that we subscribe to in order to\n * cancel any ajax requests.\n * This works by merging any `action$` with the correct `ofType`.\n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (action$) {\n  for (var _len = arguments.length, actions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n    actions[_key - 1] = arguments[_key];\n  }\n\n  var toCancel = actions.map(function (action) {\n    return action$.pipe(Object(redux_observable__WEBPACK_IMPORTED_MODULE_2__[\"ofType\"])(action));\n  });\n  return rxjs__WEBPACK_IMPORTED_MODULE_0__[\"merge\"].apply(void 0, _toConsumableArray(toCancel));\n});\n\n//# sourceURL=webpack:///./src/store/epics/utils/cancelActions.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! isomorphic-unfetch */ \"./node_modules/isomorphic-unfetch/browser.js\");\n/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var rxjs_ajax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/ajax */ \"./node_modules/rxjs/_esm5/ajax/index.js\");\n/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-logger */ \"./node_modules/redux-logger/dist/redux-logger.js\");\n/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var redux_observable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-observable */ \"./node_modules/redux-observable/lib/esm/index.js\");\n/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reducers */ \"./src/store/reducers/index.js\");\n/* harmony import */ var _epics_movie__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./epics/movie */ \"./src/store/epics/movie.js\");\n/* harmony import */ var _epics_movies__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./epics/movies */ \"./src/store/epics/movies.js\");\n/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ \"./node_modules/rxjs/_esm5/index.js\");\n\n\n\n\n\n\n\n\n\nvar rootEpic = Object(redux_observable__WEBPACK_IMPORTED_MODULE_4__[\"combineEpics\"])(_epics_movie__WEBPACK_IMPORTED_MODULE_6__[\"fetchMovieEpic\"], _epics_movies__WEBPACK_IMPORTED_MODULE_7__[\"fetchMoviesEpic\"], _epics_movies__WEBPACK_IMPORTED_MODULE_7__[\"fetchGenreMoviesEpic\"] // fetchComicEpic\n);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  var epicMiddleware = Object(redux_observable__WEBPACK_IMPORTED_MODULE_4__[\"createEpicMiddleware\"])({\n    dependencies: {\n      ajax: function ajax(_ref) {\n        var url = _ref.url,\n            method = _ref.method,\n            crossDomain = _ref.crossDomain;\n        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__[\"from\"])(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1___default()(url, {\n          method: method,\n          crossDomain: crossDomain\n        }).then(function (response) {\n          return response.json();\n        }));\n      }\n    }\n  });\n  var middlewares = [epicMiddleware];\n\n  if (true) {\n    middlewares.push(Object(redux_logger__WEBPACK_IMPORTED_MODULE_3__[\"createLogger\"])());\n  }\n\n  var store = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducers__WEBPACK_IMPORTED_MODULE_5__[\"default\"], redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"].apply(void 0, middlewares));\n  epicMiddleware.run(rootEpic);\n  return {\n    store: store\n  };\n});\n\n//# sourceURL=webpack:///./src/store/index.js?");

/***/ }),

/***/ "./src/store/reducers/byId.js":
/*!************************************!*\
  !*** ./src/store/reducers/byId.js ***!
  \************************************/
/*! exports provided: default, getItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getItem\", function() { return getItem; });\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions */ \"./src/store/actions/index.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nvar byId = function byId() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  if (action.response && action.type === _actions__WEBPACK_IMPORTED_MODULE_0__[\"FETCH_MOVIES_SUCCESS\"]) {\n    return _objectSpread(_objectSpread({}, state), action.response.entities.movies);\n  }\n\n  if (action.response && action.type === _actions__WEBPACK_IMPORTED_MODULE_0__[\"FETCH_MOVIE_SUCCESS\"]) {\n    return _objectSpread(_objectSpread({}, state), action.response);\n  }\n\n  return state;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (byId);\nvar getItem = function getItem(state, id) {\n  return state.byId[id];\n};\n\n//# sourceURL=webpack:///./src/store/reducers/byId.js?");

/***/ }),

/***/ "./src/store/reducers/createErrorReducer.js":
/*!**************************************************!*\
  !*** ./src/store/reducers/createErrorReducer.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (_ref) {\n  var _ref2 = _slicedToArray(_ref, 3),\n      requestAction = _ref2[0],\n      successAction = _ref2[1],\n      failureAction = _ref2[2];\n\n  return function errorMessage() {\n    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n    var action = arguments.length > 1 ? arguments[1] : undefined;\n\n    switch (action.type) {\n      case requestAction:\n      case successAction:\n        return null;\n\n      case failureAction:\n        return action.message;\n\n      default:\n        return state;\n    }\n  };\n});\n\n//# sourceURL=webpack:///./src/store/reducers/createErrorReducer.js?");

/***/ }),

/***/ "./src/store/reducers/createFetchingReducer.js":
/*!*****************************************************!*\
  !*** ./src/store/reducers/createFetchingReducer.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/index */ \"./src/store/actions/index.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (_ref) {\n  var _ref2 = _slicedToArray(_ref, 3),\n      requestAction = _ref2[0],\n      successAction = _ref2[1],\n      failureAction = _ref2[2];\n\n  var initial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  return function isFetching() {\n    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial;\n    var action = arguments.length > 1 ? arguments[1] : undefined;\n\n    switch (action.type) {\n      case requestAction:\n        return true;\n\n      case successAction:\n      case failureAction:\n      case _actions_index__WEBPACK_IMPORTED_MODULE_0__[\"LOCATION_CHANGE\"]:\n        return false;\n\n      default:\n        return state;\n    }\n  };\n});\n\n//# sourceURL=webpack:///./src/store/reducers/createFetchingReducer.js?");

/***/ }),

/***/ "./src/store/reducers/index.js":
/*!*************************************!*\
  !*** ./src/store/reducers/index.js ***!
  \*************************************/
/*! exports provided: default, getGenres, getMovies, getWishlist, getWishlistMovies, getMovie, getIsFetching */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getGenres\", function() { return getGenres; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getMovies\", function() { return getMovies; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getWishlist\", function() { return getWishlist; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getWishlistMovies\", function() { return getWishlistMovies; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getMovie\", function() { return getMovie; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getIsFetching\", function() { return getIsFetching; });\n/* harmony import */ var lodash_groupby__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.groupby */ \"./node_modules/lodash.groupby/index.js\");\n/* harmony import */ var lodash_groupby__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_groupby__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var react_router_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-redux */ \"./node_modules/react-router-redux/lib/index.js\");\n/* harmony import */ var react_router_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_redux__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _wishlist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wishlist */ \"./src/store/reducers/wishlist.js\");\n/* harmony import */ var _byId__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./byId */ \"./src/store/reducers/byId.js\");\n/* harmony import */ var _movie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./movie */ \"./src/store/reducers/movie.js\");\n/* harmony import */ var _movies__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./movies */ \"./src/store/reducers/movies.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(redux__WEBPACK_IMPORTED_MODULE_1__[\"combineReducers\"])({\n  movie: _movie__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  movies: _movies__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  wishlist: _wishlist__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  router: react_router_redux__WEBPACK_IMPORTED_MODULE_2__[\"routerReducer\"]\n}));\nvar getGenres = function getGenres(state) {\n  var ids = _movies__WEBPACK_IMPORTED_MODULE_6__[\"getMovies\"](state.movies);\n  var movies = ids.map(function (id) {\n    return _byId__WEBPACK_IMPORTED_MODULE_4__[\"getItem\"](state.movies, id);\n  });\n  var groups = lodash_groupby__WEBPACK_IMPORTED_MODULE_0___default()(movies || [], function (movie) {\n    if (movie.genre) return movie.genre.name;\n\n    var _movie$genres = _slicedToArray(movie.genres, 1),\n        genre = _movie$genres[0];\n\n    return genre ? genre.name : 'Unknown';\n  });\n  return Object.keys(groups).map(function (name) {\n    return {\n      name: name,\n      movies: groups[name]\n    };\n  });\n};\nvar getMovies = function getMovies(state) {\n  var ids = _movies__WEBPACK_IMPORTED_MODULE_6__[\"getMovies\"](state.movies);\n  var movies = ids.map(function (id) {\n    return _byId__WEBPACK_IMPORTED_MODULE_4__[\"getItem\"](state.movies, id);\n  });\n  return lodash_groupby__WEBPACK_IMPORTED_MODULE_0___default()(movies, function (movie) {\n    return movie.genre.name;\n  });\n};\nvar getWishlist = function getWishlist(state) {\n  return state.wishlist;\n};\nvar getWishlistMovies = function getWishlistMovies(state) {\n  var ids = state.wishlist;\n  return ids.map(function (id) {\n    return _byId__WEBPACK_IMPORTED_MODULE_4__[\"getItem\"](state.movies, id);\n  });\n}; // If time would allowed, we could've abstracted and\n// normalized the state a bit more. Which would've\n// allowed us to \"load the cached\" data for a movie.\n\nvar getMovie = function getMovie(state, id) {\n  return _movie__WEBPACK_IMPORTED_MODULE_5__[\"getMovie\"](state.movie, id);\n};\nvar getIsFetching = function getIsFetching(state) {\n  return _movies__WEBPACK_IMPORTED_MODULE_6__[\"getIsFetching\"](state.movies) || _movie__WEBPACK_IMPORTED_MODULE_5__[\"getIsFetching\"](state.movie);\n};\n\n//# sourceURL=webpack:///./src/store/reducers/index.js?");

/***/ }),

/***/ "./src/store/reducers/movie.js":
/*!*************************************!*\
  !*** ./src/store/reducers/movie.js ***!
  \*************************************/
/*! exports provided: detail, isFetching, errorMessage, default, getMovie, getIsFetching, getErrorMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"detail\", function() { return detail; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isFetching\", function() { return isFetching; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"errorMessage\", function() { return errorMessage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getMovie\", function() { return getMovie; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getIsFetching\", function() { return getIsFetching; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getErrorMessage\", function() { return getErrorMessage; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var _createErrorReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createErrorReducer */ \"./src/store/reducers/createErrorReducer.js\");\n/* harmony import */ var _createFetchingReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createFetchingReducer */ \"./src/store/reducers/createFetchingReducer.js\");\n/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/index */ \"./src/store/actions/index.js\");\n\n\n\n\nvar detail = function detail() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case _actions_index__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_MOVIE_SUCCESS\"]:\n      return action.response;\n\n    case _actions_index__WEBPACK_IMPORTED_MODULE_3__[\"LOCATION_CHANGE\"]:\n    case _actions_index__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_MOVIE_REQUEST\"]:\n      caseMOVIEH_MOVIE_FAILURE: return null;\n\n    default:\n      return state;\n  }\n};\nvar isFetching = Object(_createFetchingReducer__WEBPACK_IMPORTED_MODULE_2__[\"default\"])([_actions_index__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_MOVIE_REQUEST\"], _actions_index__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_MOVIE_SUCCESS\"], _actions_index__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_MOVIE_FAILURE\"]], true);\nvar errorMessage = Object(_createErrorReducer__WEBPACK_IMPORTED_MODULE_1__[\"default\"])([_actions_index__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_MOVIE_REQUEST\"], _actions_index__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_MOVIE_SUCCESS\"], _actions_index__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_MOVIE_FAILURE\"]]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n  detail: detail,\n  isFetching: isFetching,\n  errorMessage: errorMessage\n}));\nvar getMovie = function getMovie(state, id) {\n  return state.detail ? state.detail[id] : state.detail;\n};\nvar getIsFetching = function getIsFetching(state) {\n  return state.isFetching;\n};\nvar getErrorMessage = function getErrorMessage(state) {\n  return state.errorMessage;\n};\n\n//# sourceURL=webpack:///./src/store/reducers/movie.js?");

/***/ }),

/***/ "./src/store/reducers/movies.js":
/*!**************************************!*\
  !*** ./src/store/reducers/movies.js ***!
  \**************************************/
/*! exports provided: allIds, isFetching, errorMessage, default, getMovies, getDumpingIds, getIsFetching, getErrorMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"allIds\", function() { return allIds; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isFetching\", function() { return isFetching; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"errorMessage\", function() { return errorMessage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getMovies\", function() { return getMovies; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDumpingIds\", function() { return getDumpingIds; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getIsFetching\", function() { return getIsFetching; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getErrorMessage\", function() { return getErrorMessage; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash.uniq */ \"./node_modules/lodash.uniq/index.js\");\n/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_uniq__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _byId__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./byId */ \"./src/store/reducers/byId.js\");\n/* harmony import */ var _actions_movies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/movies */ \"./src/store/actions/movies.js\");\n/* harmony import */ var _createErrorReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createErrorReducer */ \"./src/store/reducers/createErrorReducer.js\");\n/* harmony import */ var _createFetchingReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createFetchingReducer */ \"./src/store/reducers/createFetchingReducer.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\n\n\n\nvar allIdsInitialState = {\n  ids: [],\n  originalIds: []\n};\nvar allIds = function allIds() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : allIdsInitialState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case _actions_movies__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_MOVIES_SUCCESS\"]:\n      return {\n        ids: lodash_uniq__WEBPACK_IMPORTED_MODULE_1___default()([].concat(_toConsumableArray(state.ids), _toConsumableArray(action.response.result))),\n        originalIds: [].concat(_toConsumableArray(state.originalIds), _toConsumableArray(action.response.result))\n      };\n\n    default:\n      return state;\n  }\n};\nvar isFetching = Object(_createFetchingReducer__WEBPACK_IMPORTED_MODULE_5__[\"default\"])([_actions_movies__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_MOVIES_REQUEST\"], _actions_movies__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_MOVIES_SUCCESS\"], _actions_movies__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_MOVIES_FAILURE\"]], true);\nvar errorMessage = Object(_createErrorReducer__WEBPACK_IMPORTED_MODULE_4__[\"default\"])([_actions_movies__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_MOVIES_REQUEST\"], _actions_movies__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_MOVIES_SUCCESS\"], _actions_movies__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_MOVIES_FAILURE\"]]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n  byId: _byId__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  allIds: allIds,\n  isFetching: isFetching,\n  errorMessage: errorMessage\n}));\nvar getMovies = function getMovies(state) {\n  return state.allIds.ids;\n};\nvar getDumpingIds = function getDumpingIds(state) {\n  return state.allIds.originalIds;\n};\nvar getIsFetching = function getIsFetching(state) {\n  return state.isFetching;\n};\nvar getErrorMessage = function getErrorMessage(state) {\n  return state.errorMessage;\n};\n\n//# sourceURL=webpack:///./src/store/reducers/movies.js?");

/***/ }),

/***/ "./src/store/reducers/wishlist.js":
/*!****************************************!*\
  !*** ./src/store/reducers/wishlist.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return wishlist; });\n/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.uniq */ \"./node_modules/lodash.uniq/index.js\");\n/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_uniq__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _actions_wishlist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/wishlist */ \"./src/store/actions/wishlist.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\nvar initialState = [];\nfunction wishlist() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case _actions_wishlist__WEBPACK_IMPORTED_MODULE_1__[\"ADD_WISHLIST_MOVIE\"]:\n      return lodash_uniq__WEBPACK_IMPORTED_MODULE_0___default()([].concat(_toConsumableArray(state), [action.movieId]));\n\n    case _actions_wishlist__WEBPACK_IMPORTED_MODULE_1__[\"REMOVE_WISHLIST_MOVIE\"]:\n      return lodash_uniq__WEBPACK_IMPORTED_MODULE_0___default()(state.filter(function (movieId) {\n        return movieId !== action.movieId;\n      }));\n\n    default:\n      return state;\n  }\n}\n\n//# sourceURL=webpack:///./src/store/reducers/wishlist.js?");

/***/ }),

/***/ "./src/store/schema.js":
/*!*****************************!*\
  !*** ./src/store/schema.js ***!
  \*****************************/
/*! exports provided: movie, genre, arrayOfGenres, arrayOfMovies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"movie\", function() { return movie; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"genre\", function() { return genre; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"arrayOfGenres\", function() { return arrayOfGenres; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"arrayOfMovies\", function() { return arrayOfMovies; });\n/* harmony import */ var normalizr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! normalizr */ \"./node_modules/normalizr/dist/normalizr.es.js\");\n\nvar VARIANTS = {\n  fantastic: 'portrait_fantastic',\n  uncanny: 'portrait_uncanny'\n};\nvar NOT_FOUND = \"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/\".concat(VARIANTS.uncanny, \".jpg\");\n\nvar cleanTitle = function cleanTitle(title) {\n  return title.split(' ').slice(0, -2).join(' ');\n};\n\nvar getYear = function getYear(title) {\n  return title.match(/\\(([\\d,\\w,\\s,-]+)\\)/)[1];\n};\n\nvar movie = new normalizr__WEBPACK_IMPORTED_MODULE_0__[\"schema\"].Entity('movies', {});\nvar genre = new normalizr__WEBPACK_IMPORTED_MODULE_0__[\"schema\"].Entity('genres', {// movies: [movie], // NOTE: We could normalize this as well, but for sake of simplicity...\n});\nvar arrayOfGenres = new normalizr__WEBPACK_IMPORTED_MODULE_0__[\"schema\"].Array(genre);\nvar arrayOfMovies = new normalizr__WEBPACK_IMPORTED_MODULE_0__[\"schema\"].Array(movie);\n\n//# sourceURL=webpack:///./src/store/schema.js?");

/***/ }),

/***/ "./src/wishlist/index.js":
/*!*******************************!*\
  !*** ./src/wishlist/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Wishlist; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _core_hooks_useWishlist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/hooks/useWishlist */ \"./src/core/hooks/useWishlist.js\");\n/* harmony import */ var _core_components_MovieImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/components/MovieImage */ \"./src/core/components/MovieImage.js\");\n/* harmony import */ var _core_components_Container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/components/Container */ \"./src/core/components/Container.js\");\n/* harmony import */ var _movies_components_MovieItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../movies/components/MovieItem */ \"./src/movies/components/MovieItem.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\nfunction WishlistItem(_ref) {\n  var movie = _ref.movie,\n      toggleMovie = _ref.toggleMovie;\n  var toggle = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useCallback\"])(function () {\n    toggleMovie(movie.id, true);\n  }, [toggleMovie]);\n  var genre = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useMemo\"])(function () {\n    if (movie.genre) return (movie.genre.name || '').toLowerCase();\n\n    var _movie$genres = _slicedToArray(movie.genres, 1),\n        genre = _movie$genres[0];\n\n    return genre ? genre.name.toLowerCase() : 'unknown';\n  }, [movie]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_movies_components_MovieItem__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    movie: movie,\n    genre: genre,\n    single: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"wish-action\",\n    onClick: toggle\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"small\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    \"aria-hidden\": true,\n    className: \"fa-trash fas\"\n  }), \" Remove\")));\n}\n\nfunction Wishlist(props) {\n  var _useWishlist = Object(_core_hooks_useWishlist__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(),\n      wishlist = _useWishlist.wishlist,\n      toggleWishlistMovie = _useWishlist.toggleWishlistMovie;\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_components_Container__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    className: \"wishlists\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"Wishlist\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    id: \"movies-list\"\n  }, !wishlist.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"No movies saved yet.\") : (wishlist || []).map(function (movie) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(WishlistItem, {\n      key: movie.id,\n      movie: movie,\n      toggleMovie: toggleWishlistMovie\n    });\n  })));\n}\n\n//# sourceURL=webpack:///./src/wishlist/index.js?");

/***/ }),

/***/ 0:
/*!**********************************************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://localhost:3000 (webpack)/hot/dev-server.js ./src/index.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! /Users/bernat/Documents/behind/fakelix/node_modules/webpack-dev-server/client/index.js?http://localhost:3000 */\"./node_modules/webpack-dev-server/client/index.js?http://localhost:3000\");\n__webpack_require__(/*! /Users/bernat/Documents/behind/fakelix/node_modules/webpack/hot/dev-server.js */\"./node_modules/webpack/hot/dev-server.js\");\nmodule.exports = __webpack_require__(/*! /Users/bernat/Documents/behind/fakelix/src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_(webpack)-dev-server/client?");

/***/ })

/******/ });