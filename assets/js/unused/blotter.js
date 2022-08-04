/*!
// ███   █    ████▄    ▄▄▄▄▀ ▄▄▄▄▀ ▄███▄   █▄▄▄▄
// █  █  █    █   █ ▀▀▀ █ ▀▀▀ █    █▀   ▀  █  ▄▀
// █ ▀ ▄ █    █   █     █     █    ██▄▄    █▀▀▌
// █  ▄▀ ███▄ ▀████    █     █     █▄   ▄▀ █  █
// ███       ▀        ▀     ▀      ▀███▀     █
//                                          ▀
// The MIT License
//
// Copyright © 1986 - ∞, Blotter / Bradley Griffith / http://bradley.computer
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
*/

//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for their old module API. If we're in
  // the browser, add `_` as a global object.
  // (`nodeType` is checked to ensure that `module`
  // and `exports` are not HTML elements.)
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      // The 2-parameter case has been omitted only because no current consumers
      // made use of it.
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  var builtinIteratee;

  // An internal function to generate callbacks that can be applied to each
  // element in a collection, returning the desired result — either `identity`,
  // an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };

  // External wrapper for our callback generator. Users may customize
  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
  // This abstraction hides the internal-only argCount argument.
  _.iteratee = builtinIteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // Similar to ES6's rest param (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
  // This accumulates the arguments passed into an array, after a given index.
  var restArgs = function(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0);
      var rest = Array(length);
      for (var index = 0; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object.
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  var createReduce = function(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function(obj, iteratee, memo, initial) {
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      if (!initial) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };

    return function(obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = restArgs(function(obj, method, args) {
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  });

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection.
  _.shuffle = function(obj) {
    return _.sample(obj, Infinity);
  };

  // Sample **n** random values from a collection using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
    var length = getLength(sample);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    for (var index = 0; index < n; index++) {
      var rand = _.random(index, last);
      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
    }
    return sample.slice(0, n);
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior, partition) {
    return function(obj, iteratee, context) {
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (_.isString(obj)) {
      // Keep surrogate pair characters together
      return obj.match(reStrSymbol);
    }
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, Boolean);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    output = output || [];
    var idx = output.length;
    for (var i = 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        // Flatten current level of array or arguments object.
        if (shallow) {
          var j = 0, len = value.length;
          while (j < len) output[idx++] = value[j++];
        } else {
          flatten(value, shallow, strict, output);
          idx = output.length;
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = restArgs(function(array, otherArrays) {
    return _.difference(array, otherArrays);
  });

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = restArgs(function(arrays) {
    return _.uniq(flatten(arrays, true, true));
  });

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      var j;
      for (j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = restArgs(function(array, rest) {
    rest = flatten(rest, true, true);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  });

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices.
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = restArgs(_.unzip);

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions.
  var createPredicateIndexFinder = function(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  };

  // Returns the first index on an array-like that passes a predicate test.
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions.
  var createIndexFinder = function(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Split an **array** into several arrays containing **count** or less elements
  // of initial array.
  _.chunk = function(array, count) {
    if (count == null || count < 1) return [];

    var result = [];
    var i = 0, length = array.length;
    while (i < length) {
      result.push(slice.call(array, i, i += count));
    }
    return result;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments.
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = restArgs(function(func, context, args) {
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArgs(function(callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  });

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder by default, allowing any combination of arguments to be
  // pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
  _.partial = restArgs(function(func, boundArgs) {
    var placeholder = _.partial.placeholder;
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  });

  _.partial.placeholder = _;

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = restArgs(function(obj, keys) {
    keys = flatten(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');
    while (index--) {
      var key = keys[index];
      obj[key] = _.bind(obj[key], obj);
    }
  });

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = restArgs(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArgs(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  _.restArgs = restArgs;

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  var collectNonEnumProps = function(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  };

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`.
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object.
  // In contrast to _.map it returns an object.
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = _.keys(obj),
        length = keys.length,
        results = {};
    for (var index = 0; index < length; index++) {
      var currentKey = keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`.
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s).
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test.
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Internal pick helper function to determine if `obj` has key `key`.
  var keyInObj = function(value, key, obj) {
    return key in obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = restArgs(function(obj, keys) {
    var result = {}, iteratee = keys[0];
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
      keys = _.allKeys(obj);
    } else {
      iteratee = keyInObj;
      keys = flatten(keys, false, false);
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  });

  // Return a copy of the object without the blacklisted properties.
  _.omit = restArgs(function(obj, keys) {
    var iteratee = keys[0], context;
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
      if (keys.length > 1) context = keys[1];
    } else {
      keys = _.map(flatten(keys, false, false), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  });

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq, deepEq;
  eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a) return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  };

  // Internal recursive comparison function for `isEqual`.
  deepEq = function(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
  var nodelist = root.document && root.document.childNodes;
  if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    return isNaN(obj) && _.isNumber(obj);
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

  // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, prop, fallback) {
    var value = object == null ? void 0 : object[prop];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offset.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    var render;
    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var chainResult = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return chainResult(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return chainResult(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define == 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}());
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

var Detector = {

  canvas: !! window.CanvasRenderingContext2D,
  webgl: ( function () {

    try {

      var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

    } catch ( e ) {

      return false;

    }

  } )(),
  workers: !! window.Worker,
  fileapi: window.File && window.FileReader && window.FileList && window.Blob,

  getWebGLErrorMessage: function () {

    var element = document.createElement( 'div' );
    element.id = 'webgl-error-message';
    element.style.fontFamily = 'monospace';
    element.style.fontSize = '13px';
    element.style.fontWeight = 'normal';
    element.style.textAlign = 'center';
    element.style.background = '#fff';
    element.style.color = '#000';
    element.style.padding = '1.5em';
    element.style.width = '400px';
    element.style.margin = '5em auto 0';

    if ( ! this.webgl ) {

      element.innerHTML = window.WebGLRenderingContext ? [
        'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
        'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
      ].join( '\n' ) : [
        'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
        'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
      ].join( '\n' );

    }

    return element;

  },

  addGetWebGLMessage: function ( parameters ) {

    var parent, id, element;

    parameters = parameters || {};

    parent = parameters.parent !== undefined ? parameters.parent : document.body;
    id = parameters.id !== undefined ? parameters.id : 'oldie';

    element = Detector.getWebGLErrorMessage();
    element.id = id;

    parent.appendChild( element );

  }

};

// browserify support
if ( typeof module === 'object' ) {

  module.exports = Detector;

}
/* jshint -W067 */
/* jshint unused: false */
(function(global, undefined) {
    'use strict';

    if (!notUseNative() && (global.msSetImmediate || global.setImmediate)) {
        if (!global.setImmediate) {
            global.setImmediate = global.msSetImmediate;
            global.clearImmediate = global.msClearImmediate;
        }

        return;
    }

    var doc = global.document;
    var slice = Array.prototype.slice;
    var toString = Object.prototype.toString;
    var Timer = {};

    Timer.polifill = {};
    Timer.nextId = 1;
    Timer.tasks = {};
    Timer.lock = false;

    Timer.run = function(handleId) {
        if (Timer.lock) {
            global.setTimeout( Timer.wrap( Timer.run, handleId ), 0 );

        } else {
            var task = Timer.tasks[ handleId ];

            if (task) {
                Timer.lock = true;

                try {
                    task();

                } finally {
                    Timer.clear( handleId );
                    Timer.lock = false;
                }
            }
        }
    };

    Timer.wrap = function(handler) {
        var args = slice.call(arguments, 1);

        return function() {
            handler.apply(undefined, args);
        };
    };

    Timer.create = function(args) {
        Timer.tasks[ Timer.nextId ] = Timer.wrap.apply(undefined, args);
        return Timer.nextId++;
    };

    Timer.clear = function(handleId) {
        delete Timer.tasks[ handleId ];
    };

    /* polifill/messageChannel.js begin */
/* global global, Timer */

Timer.polifill.messageChannel = function() {
    var channel = new global.MessageChannel();

    channel.port1.onmessage = function(event) {
        Timer.run(Number(event.data));
    };

    return function() {
        var handleId = Timer.create(arguments);
        channel.port2.postMessage(handleId);
        return handleId;
    };
};

/* polifill/messageChannel.js end */

    /* polifill/nextTick.js begin */
/* global global, Timer */

Timer.polifill.nextTick = function() {
    return function() {
        var handleId = Timer.create(arguments);
        global.process.nextTick( Timer.wrap( Timer.run, handleId ) );
        return handleId;
    };
};

/* polifill/nextTick.js end */

    /* polifill/postMessage.js begin */
/* global global, Timer */

Timer.polifill.postMessage = function() {
    var messagePrefix = 'setImmediate$' + Math.random() + '$';

    var onGlobalMessage = function(event) {
        if (event.source === global &&
            typeof(event.data) === 'string' &&
            event.data.indexOf(messagePrefix) === 0) {

            Timer.run(Number(event.data.slice(messagePrefix.length)));
        }
    };

    if (global.addEventListener) {
        global.addEventListener('message', onGlobalMessage, false);

    } else {
        global.attachEvent('onmessage', onGlobalMessage);
    }

    return function() {
        var handleId = Timer.create(arguments);
        global.postMessage(messagePrefix + handleId, '*');
        return handleId;
    };
};

/* polifill/postMessage.js end */

    /* polifill/readyStateChange.js begin */
/* global Timer, doc */

Timer.polifill.readyStateChange = function() {
    var html = doc.documentElement;

    return function() {
        var handleId = Timer.create(arguments);
        var script = doc.createElement('script');

        script.onreadystatechange = function() {
            Timer.run(handleId);
            script.onreadystatechange = null;
            html.removeChild(script);
            script = null;
        };

        html.appendChild(script);

        return handleId;
    };
};

/* polifill/readyStateChange.js end */

    /* polifill/setTimeout.js begin */
/* global global, Timer */

Timer.polifill.setTimeout = function() {
    return function() {
        var handleId = Timer.create(arguments);
        global.setTimeout( Timer.wrap( Timer.run, handleId ), 0 );
        return handleId;
    };
};

/* polifill/setTimeout.js end */




    function canUsePostMessage() {
        if (global.postMessage && !global.importScripts) {
            var asynch = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                asynch = false;
            };
            global.postMessage('', '*');
            global.onmessage = oldOnMessage;
            return asynch;
        }
    }

    function notUseNative() {
        // @see http://codeforhire.com/2013/09/21/setimmediate-and-messagechannel-broken-on-internet-explorer-10/
        return (global.navigator && /Trident/.test(global.navigator.userAgent));
    }


    var polifill;

    if (notUseNative()) {
        polifill = 'setTimeout';

    // Don't get fooled by e.g. browserify environments.
    // For Node.js before 0.9
    } else if (toString.call(global.process) === '[object process]') {
        polifill = 'nextTick';

    // For non-IE10 modern browsers
    } else if (canUsePostMessage()) {
        polifill = 'postMessage';

    // For web workers, where supported
    } else if (global.MessageChannel) {
        polifill = 'messageChannel';

    // For IE 6–8
    } else if (doc && ('onreadystatechange' in doc.createElement('script'))) {
        polifill = 'readyStateChange';

    // For older browsers
    } else {
        polifill = 'setTimeout';
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = (attachTo && attachTo.setTimeout ? attachTo : global);

    attachTo.setImmediate = Timer.polifill[ polifill ]();
    attachTo.setImmediate.usePolifill = polifill;
    attachTo.msSetImmediate = attachTo.setImmediate;

    attachTo.clearImmediate = Timer.clear;
    attachTo.msClearImmediate = Timer.clear;

}(function() {
    return this || (1, eval)('this');
}()));
/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

;(function () {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
            if (listenersMap.hasOwnProperty(key)) {
                listeners = listenersMap[key].slice(0);
                i = listeners.length;

                while (i--) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return EventEmitter;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}.call(this));
/******************************************************************************

This is a binary tree based bin packing algorithm that is more complex than
the simple Packer (packer.js). Instead of starting off with a fixed width and
height, it starts with the width and height of the first block passed and then
grows as necessary to accomodate each subsequent block. As it grows it attempts
to maintain a roughly square ratio by making 'smart' choices about whether to
grow right or down.

When growing, the algorithm can only grow to the right OR down. Therefore, if
the new block is BOTH wider and taller than the current target then it will be
rejected. This makes it very important to initialize with a sensible starting
width and height. If you are providing sorted input (largest first) then this
will not be an issue.

A potential way to solve this limitation would be to allow growth in BOTH
directions at once, but this requires maintaining a more complex tree
with 3 children (down, right and center) and that complexity can be avoided
by simply chosing a sensible starting block.

Best results occur when the input blocks are sorted by height, or even better
when sorted by max(width,height).

Inputs:
------

  blocks: array of any objects that have .w and .h attributes

Outputs:
-------

  marks each block that fits with a .fit attribute pointing to a
  node with .x and .y coordinates

Example:
-------

  var blocks = [
    { w: 100, h: 100 },
    { w: 100, h: 100 },
    { w:  80, h:  80 },
    { w:  80, h:  80 },
    etc
    etc
  ];

  var packer = new GrowingPacker();
  packer.fit(blocks);

  for(var n = 0 ; n < blocks.length ; n++) {
    var block = blocks[n];
    if (block.fit) {
      Draw(block.fit.x, block.fit.y, block.w, block.h);
    }
  }


******************************************************************************/

GrowingPacker = function() { };

GrowingPacker.prototype = {

  fit: function(blocks) {
    var n, node, block, len = blocks.length;
    var w = len > 0 ? blocks[0].w : 0;
    var h = len > 0 ? blocks[0].h : 0;
    this.root = { x: 0, y: 0, w: w, h: h };
    for (n = 0; n < len ; n++) {
      block = blocks[n];
      if (node = this.findNode(this.root, block.w, block.h))
        block.fit = this.splitNode(node, block.w, block.h);
      else
        block.fit = this.growNode(block.w, block.h);
    }
  },

  findNode: function(root, w, h) {
    if (root.used)
      return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
    else if ((w <= root.w) && (h <= root.h))
      return root;
    else
      return null;
  },

  splitNode: function(node, w, h) {
    node.used = true;
    node.down  = { x: node.x,     y: node.y + h, w: node.w,     h: node.h - h };
    node.right = { x: node.x + w, y: node.y,     w: node.w - w, h: h          };
    return node;
  },

  growNode: function(w, h) {
    var canGrowDown  = (w <= this.root.w);
    var canGrowRight = (h <= this.root.h);

    var shouldGrowRight = canGrowRight && (this.root.h >= (this.root.w + w)); // attempt to keep square-ish by growing right when height is much greater than width
    var shouldGrowDown  = canGrowDown  && (this.root.w >= (this.root.h + h)); // attempt to keep square-ish by growing down  when width  is much greater than height

    if (shouldGrowRight)
      return this.growRight(w, h);
    else if (shouldGrowDown)
      return this.growDown(w, h);
    else if (canGrowRight)
     return this.growRight(w, h);
    else if (canGrowDown)
      return this.growDown(w, h);
    else
      return null; // need to ensure sensible root starting size to avoid this happening
  },

  growRight: function(w, h) {
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w + w,
      h: this.root.h,
      down: this.root,
      right: { x: this.root.w, y: 0, w: w, h: this.root.h }
    };
    var node = this.findNode(this.root, w, h);
    if (node)
      return this.splitNode(node, w, h);
    else
      return null;
  },

  growDown: function(w, h) {
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w,
      h: this.root.h + h,
      down:  { x: 0, y: this.root.h, w: this.root.w, h: h },
      right: this.root
    };
    var node = this.findNode(this.root, w, h);
    if (node)
      return this.splitNode(node, w, h);
    else
      return null;
  }

};

/**
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * And modified to work with node.js
 */

(function() {

  var root = this;
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for (var x = 0; x < vendors.length && !root.requestAnimationFrame; ++x) {
    root.requestAnimationFrame = root[vendors[x]+'RequestAnimationFrame'];
    root.cancelAnimationFrame =
      root[vendors[x]+'CancelAnimationFrame'] || root[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!root.requestAnimationFrame)
    root.requestAnimationFrame = raf;

  if (!root.cancelAnimationFrame)
    root.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = root.requestAnimationFrame;
    }
    exports.requestAnimationFrame = root.requestAnimationFrame;
  } else {
    root.requestAnimationFrame = root.requestAnimationFrame;
  }

  if (typeof define === 'function' && define.amd) {
    define('requestAnimationFrame', [], function() {
      return root.requestAnimationFrame;
    });
  }

  function raf(callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = root.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  }

})();
(function(previousBlotter, _, THREE, Detector, EventEmitter) {

  var root = this;

  var Blotter = root.Blotter = previousBlotter = function (material, options) {
    if (!Detector.webgl) {
      Blotter.Messaging.throwError("Blotter", false, "device does not support webgl");
    }

    this._texts = [];
    this._textEventBindings = {};

    this._scopes = {};
    this._scopeEventBindings = {};

    this._renderer = new Blotter.Renderer();

    this._startTime = 0;
    this._lastDrawTime = 0;

    this.init.apply(this, arguments);
  };

  Blotter.prototype = (function () {

    function _updateMaterialUniforms () {
      var now = Date.now();

      this._material.uniforms.uTimeDelta.value = (now - (this._lastDrawTime || now)) / 1000;
      this._material.uniforms.uGlobalTime.value = (now - this._startTime) / 1000;

      this._lastDrawTime = now;
    }

    function _rendererRendered () {
      _updateMaterialUniforms.call(this);

      _.each(this._scopes, _.bind(function (scope) {
        if (scope.playing) {
          scope.render();
        }
        this.trigger("render");
      }, this));
    }

    function _updateUniformValue (uniformName) {
      if (this.mappingMaterial) {
        var value = this._material.uniforms[uniformName].value;

        this.mappingMaterial.uniformInterface[uniformName].value = value;
      }
    }

    function _updateTextUniformValue (textId, uniformName) {
      if (this.mappingMaterial) {
        var scope = this._scopes[textId],
            value = scope.material.uniforms[uniformName].value;

        this.mappingMaterial.textUniformInterface[textId][uniformName].value = value;
      }
    }

    function _update () {
      var buildMapping,
          buildMappingMaterial,
          mappingMaterial,
          buildStages;

      buildMapping = _.bind(function () {
        return _.bind(function (next) {
          Blotter.MappingBuilder.build(this._texts, _.bind(function (newMapping) {
            this._mapping = newMapping;
            this._mapping.ratio = this.ratio;

            next();
          }, this));
        }, this);
      }, this);

      buildMappingMaterial = _.bind(function () {
        return _.bind(function (next) {
          Blotter.MappingMaterialBuilder.build(this._mapping, this._material, _.bind(function (newMappingMaterial) {
            this.mappingMaterial = newMappingMaterial;

            next();
          }, this));
        }, this);
      }, this);

      buildStages = [
        buildMapping(),
        buildMappingMaterial()
      ];

      _(buildStages).reduceRight(_.wrap, _.bind(function () {
        this._renderer.stop();

        _.each(this._scopes, _.bind(function (scope, textId) {
          scope.mappingMaterial = this.mappingMaterial;
          scope.needsUpdate = true;
        }, this));

        this._renderer.material = this.mappingMaterial.shaderMaterial;
        this._renderer.width = this._mapping.width;
        this._renderer.height = this._mapping.height;

        if (this.autostart) {
          this.start();
        }

        this.trigger(this.lastUpdated ? "update" : "ready");
        this.lastUpdated = Date.now();
      }, this))();
    }

    return {

      constructor : Blotter,

      get needsUpdate () { }, // jshint

      set needsUpdate (value) {
        if (value === true) {
          _update.call(this);
        }
      },

      get material () {
        return this._material;
      },

      set material (material) {
        this.setMaterial(material);
      },

      get texts () {
        return this._texts;
      },

      set texts (texts) {
        this.removeTexts(this._texts);
        this.addTexts(texts);
      },

      get imageData () {
        return this._renderer.imageData;
      },

      init : function (material, options) {
        options = options || {};
        _.defaults(this, options, {
          ratio : Blotter.CanvasUtils.pixelRatio,
          autobuild : true,
          autostart : true,
          autoplay : true
        });

        this.setMaterial(material);
        this.addTexts(options.texts);

        this._renderer.on("render", _.bind(_rendererRendered, this));

        if (this.autobuild) {
          this.needsUpdate = true;
        }

        if (this.autostart) {
          this.start();
        }
      },

      start : function () {
        this.autostart = true;
        this._startTime = Date.now();
        this._renderer.start();
      },

      stop : function () {
        this.autostart = false;
        this._renderer.stop();
      },

      teardown : function () {
        this._renderer.teardown();
      },

      setMaterial : function (material) {
        Blotter.Messaging.ensureInstanceOf(material, Blotter.Material, "Blotter.Material", "Blotter", "setMaterial");

        this._material = material;

        if (this._materialEventBinding) {
          this._materialEventBinding.unsetEventCallbacks();
        }

        this._materialEventBinding = new Blotter.ModelEventBinding(material, {
          update : _.bind(function () {
            _update.call(this);
          }, this),

          updateUniform : _.bind(function (uniformName) {
            _updateUniformValue.call(this, uniformName);
          }, this),
        });
        material.on("update", this._materialEventBinding.eventCallbacks.update);
        material.on("update:uniform", this._materialEventBinding.eventCallbacks.updateUniform);
      },

      addText : function (text) {
        this.addTexts(text);
      },

      addTexts : function (texts) {
        var filteredTexts = Blotter.TextUtils.filterTexts(texts),
            newTexts = _.difference(filteredTexts, this._texts);

        _.each(newTexts, _.bind(function (text) {
          this._texts.push(text);

          this._textEventBindings[text.id] = new Blotter.ModelEventBinding(text, {
            update : _.bind(function () {
              _update.call(this);
            }, this)
          });
          text.on("update", this._textEventBindings[text.id].eventCallbacks.update);

          this._scopes[text.id] = new Blotter.RenderScope(text, this);

          this._scopeEventBindings[text.id] = new Blotter.ModelEventBinding(this._scopes[text.id], {
            updateUniform : _.bind(function (uniformName) {
              _updateTextUniformValue.call(this, text.id, uniformName);
            }, this),
          });
          this._scopes[text.id].on("update:uniform", this._scopeEventBindings[text.id].eventCallbacks.updateUniform);
        }, this));
      },

      removeText : function (text) {
        this.removeTexts(text);
      },

      removeTexts : function (texts) {
        var filteredTexts = Blotter.TextUtils.filterTexts(texts),
            removedTexts = _.intersection(this._texts, filteredTexts);

        _.each(removedTexts, _.bind(function (text) {
          this._texts = _.without(this._texts, text);

          this._textEventBindings[text.id].unsetEventCallbacks();
          this._scopeEventBindings[text.id].unsetEventCallbacks();

          delete this._textEventBindings[text.id];
          delete this._scopeEventBindings[text.id];
          delete this._scopes[text.id];
        }, this));
      },

      forText : function (text) {
        Blotter.Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter", "forText");

        if (!(this._scopes[text.id])) {
          Blotter.Messaging.logError("Blotter", "forText", "Blotter.Text object not found in blotter");
          return;
        }

        return this._scopes[text.id];
      },

      boundsForText : function (text) {
        Blotter.Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter", "boundsForText");

        if (!(this._scopes[text.id])) {
          Blotter.Messaging.logError("Blotter", "boundsForText", "Blotter.Text object not found in blotter");
          return;
        }

        if (this._mapping) {
          return this.mappingMaterial.boundsForText(text);
        }
      }
    };
  })();

  _.extend(Blotter.prototype, EventEmitter.prototype);

  Blotter.Version = "v0.1.0";

  // Use a single webgl context regardless of number of blotter instances.
  Blotter.webglRenderer = Blotter.webglRenderer || new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha : false });

  Blotter.Assets = Blotter.Assets || {};
  Blotter.Assets.Shaders = Blotter.Assets.Shaders || {};

})(
  this.Blotter, this._, this.THREE, this.Detector, this.EventEmitter
);

(function(Blotter) {

  Blotter.Math = {
    generateUUID : (function () {
      // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
      var lut = [];

      for ( var i = 0; i < 256; i ++ ) {
        lut[i] = ( i < 16 ? '0' : '' ) + (i).toString(16).toUpperCase();
      }

      return function generateUUID() {
        var d0 = Math.random() * 0xffffffff | 0;
        var d1 = Math.random() * 0xffffffff | 0;
        var d2 = Math.random() * 0xffffffff | 0;
        var d3 = Math.random() * 0xffffffff | 0;
        return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
          lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
          lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
          lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
      };
    })()
  };

})(
  this.Blotter
);

(function(Blotter) {

  Blotter.Messaging = (function () {

    function _formattedMessage (domain, method, message) {
      return domain + (method ? ("#" + method) : "") + ": " + message;
    }

    return {

      ensureInstanceOf : function (object, constructor, constructorStr, domain, method) {
        if (!(object instanceof constructor)) {
          this.logError(domain, method, "argument must be instanceof " + constructorStr);
          return;
        }
      },

      logError : function (domain, method, message) {
        var formatted = _formattedMessage(domain, method, message);

        //console.error(formatted);
      },

      logWarning : function (domain, method, message) {
        var formatted = _formattedMessage(domain, method, message);

        console.warn(formatted);
      },

      throwError : function (domain, method, message) {
        var formatted = _formattedMessage(domain, method, message);

        throw formatted;
      }
    };
  })();

})(
  this.Blotter
);

(function(Blotter, _) {

  Blotter._extendWithGettersSetters = function (obj) {
    _.each(Array.prototype.slice.call(arguments, 1), function (source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] && Object.getOwnPropertyDescriptor(obj, prop) && Object.getOwnPropertyDescriptor(obj, prop).set) {
            Object.getOwnPropertyDescriptor(obj, prop).set(source[prop]);
          } else {
            obj[prop] = source[prop];
          }
        }
      }
    });
    return obj;
  };

})(
  this.Blotter, this._
);

(function(Blotter) {

  Blotter.VendorPrefixes = ["ms", "moz", "webkit", "o"];

})(
  this.Blotter
);

  (function(Blotter, _) {

  Blotter.ModelEventBinding = function (model, eventCallbacks) {
    this.model = model;
    this.eventCallbacks = eventCallbacks || {};
  };

  Blotter.ModelEventBinding.prototype = {

    constructor : Blotter.ModelEventBinding,

    unsetEventCallbacks : function () {
      _.each(this.eventCallbacks, _.bind(function (callback, eventKey) {
        this.model.off(eventKey, callback);
      }, this));
    }
  };

})(
  this.Blotter, this._
);

(function(Blotter) {

  Blotter.CanvasUtils = {

    // Creates and returns a high a canvas

    canvas : function (w, h, options) {
      options = options || {};
      var canvas = document.createElement("canvas");

      canvas.className = options.class;
      canvas.innerHTML = options.html;

      canvas.width = w;
      canvas.height = h;

      return canvas;
    },

    // Creates and returns a high DPI canvas based on a device specific pixel ratio

    hiDpiCanvas : function (w, h, ratio, options) {
      ratio = ratio || this.pixelRatio;
      options = options || {};
      var canvas = document.createElement("canvas");

      canvas.className = options.class;
      canvas.innerHTML = options.html;

      this.updateCanvasSize(canvas, w, h, ratio);

      return canvas;
    },

    updateCanvasSize : function (canvas, w, h, ratio) {
      ratio = ratio || 1;

      canvas.width = w * ratio;
      canvas.height = h * ratio;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    },

    // Returns the device's pixel ratio

    pixelRatio : (function () {
      var ctx = document.createElement("canvas").getContext("2d"),
          dpr = window.devicePixelRatio || 1,
          bsr = ctx.backingStorePixelRatio;

      for(var x = 0; x < Blotter.VendorPrefixes.length && !bsr; ++x) {
        bsr = ctx[Blotter.VendorPrefixes[x]+"BackingStorePixelRatio"];
      }

      bsr = bsr || 1;

      return (dpr / bsr);
    })(),

    // Returns the mouse position within a canvas

    mousePosition : function (canvas, event) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    },

    // Returns the mouse position within a canvas, normalized to a value between 0 and 1

    normalizedMousePosition : function (canvas, event) {
      var rect = canvas.getBoundingClientRect(),
          position = this.mousePosition(canvas, event);

      return {
        x: position.x / rect.width,
        y: position.y / rect.height
      };
    }
  };

})(
  this.Blotter
);

(function(Blotter, _) {

  Blotter.PropertyDefaults = {
    family       : 'sans-serif',
    size         : 12,
    leading      : 1.5,
    fill         : '#000',
    style        : 'normal',
    weight       : 400,
    padding      : 0,
    paddingTop   : 0,
    paddingRight : 0,
    paddingBottom: 0,
    paddingLeft  : 0
  };

  Blotter.TextUtils = {

    Properties : _.keys(Blotter.PropertyDefaults),

    // Recieves property values (optional) and fills in any missing values with default values

    ensurePropertyValues : function(properties) {
      properties = _.defaults(properties || {}, Blotter.PropertyDefaults);
      return properties;
    },

    filterTexts : function(texts) {
      if (texts instanceof Blotter.Text) {
        texts = [texts];
      } else {
        texts = _.toArray(texts);
      }

      return _.filter(texts, _.bind(function (text) {
        var isText = text instanceof Blotter.Text;

        if (!isText) {
          Blotter.Messaging.logWarning("Blotter.TextUtils", "filterTexts", "object must be instance of Blotter.Text");
        }

        return isText;
      }, this));
    },

    // Format padding values from style properties for passing to document

    stringifiedPadding : function(properties) {
      var _properties = properties || this.ensurePropertyValues(),
          pTop = properties.paddingTop || _properties.padding,
          pRight = _properties.paddingRight || _properties.padding,
          pBottom = _properties.paddingBottom || _properties.padding,
          pLeft = _properties.paddingLeft || _properties.padding;

      return pTop + "px " + pRight + "px " + pBottom + "px " + pLeft + "px";
    },

    // Determines size of text within the document given certain style properties

    sizeForText : function(textValue, properties) {
      // Using a <span> here may not be the best approach. In theory a user's stylesheet
      //   could override the necessary styling for determining sizes below. With growing
      //   support for custom tags in html, we may consider using them if this raises problems.
      var el = document.createElement("span"),
          size;

      properties = this.ensurePropertyValues(properties);

      el.innerHTML = textValue;
      el.style.display = "inline-block";
      el.style.fontFamily = properties.family;
      el.style.fontSize = properties.size + "px";
      el.style.fontWeight = properties.weight;
      el.style.fontStyle = properties.style;
      el.style.lineHeight = properties.leading;
      el.style.maxWidth = "none";
      el.style.padding = this.stringifiedPadding(properties);
      el.style.position = "absolute";
      el.style.width = "auto";
      el.style.visibility = "hidden";


      document.body.appendChild(el);

      size = {
        w: el.offsetWidth,
        h: el.offsetHeight
      };

      document.body.removeChild(el);

      return size;
    }
  };

})(
  this.Blotter, this._
);

(function(Blotter, _) {

  Blotter.UniformUtils = {

    // Uniform type values we accept for public uniforms

    UniformTypes : ["1f", "2f", "3f", "4f"],

    // Default uniforms (required) provided to all materials

    defaultUniforms : {
      uResolution : { type : "2f", value : [0.0, 0.0] }, // Resolution of individual text areas within mapping texture
      uGlobalTime : { type : "1f", value : 0.0 }, // The global time in seconds
      uTimeDelta : { type : "1f", value : 0.0 }, // The render time in seconds
      uBlendColor : { type : "4f", value : [1.0, 1.0, 1.0, 1.0] },
      uPixelRatio : { type : "1f", value : Blotter.CanvasUtils.pixelRatio } // The pixel ratio of the user's device
    },

    // Determine if value is valid for public uniform type

    validValueForUniformType : function (type, value) {
      var valid = false,
          isValid = function (element) {
            return !isNaN(element);
          };

      switch (type) {
        case "1f":
          valid = !isNaN(value) && [value].every(isValid);
          break;

        case "2f":
          valid = _.isArray(value) && value.length == 2 && value.every(isValid);
          break;

        case "3f":
          valid = _.isArray(value) && value.length == 3 && value.every(isValid);
          break;

        case "4f":
          valid = _.isArray(value) && value.length == 4 && value.every(isValid);
          break;

        default:
          break;
      }

      return valid;
    },

    glslDataTypeForUniformType : function (type) {
      var dataType;
      switch (type) {
        case "1f":
          dataType = "float";
          break;

        case "2f":
          dataType = "vec2";
          break;

        case "3f":
          dataType = "vec3";
          break;

        case "4f":
          dataType = "vec4";
          break;

        default:
          break;
      }

      return dataType;
    },

    fullSwizzleStringForUniformType : function (type) {
      var swizzleString;

      switch (type) {
        case "1f":
          swizzleString = "x";
          break;

        case "2f":
          swizzleString = "xy";
          break;

        case "3f":
          swizzleString = "xyz";
          break;

        case "4f":
          swizzleString = "xyzw";
          break;

        default:
          break;
      }

      return swizzleString;
    },

    // Given an object containing uniform descriptions, return an object containing only valid uniforms based on the uniform's type and value

    extractValidUniforms : function (uniforms) {
      uniforms = uniforms || {};
      return _.reduce(uniforms, function (memo, uniformDescription, uniformName) {
        if (Blotter.UniformUtils.UniformTypes.indexOf(uniformDescription.type) == -1) {
          Blotter.Messaging.logError("Blotter.UniformUtils", "extractValidUniforms", "uniforms must be one of type: " +
            Blotter.UniformUtils.UniformTypes.join(", "));
          return memo;
        }

        if (!Blotter.UniformUtils.validValueForUniformType(uniformDescription.type, uniformDescription.value)) {
          Blotter.Messaging.logError("Blotter.UniformUtils", "extractValidUniforms", "uniform value for " + uniformName + " is incorrect for type: " + uniformDescription.type);
          return memo;
        }

        memo[uniformName] = _.pick(uniformDescription, "type", "value");
        return memo;
      }, {});
    },

    ensureHasRequiredDefaultUniforms : function (uniforms, domain, method) {
      if (!(Blotter.UniformUtils.hasRequiredDefaultUniforms(uniforms))) {
        this.logError(domain, method, "uniforms object is missing required default uniforms defined in Blotter.UniformUtils.defaultUniforms");
        return;
      }
    },

    hasRequiredDefaultUniforms : function (uniforms) {
      var missingKeys = _.difference(_.allKeys(Blotter.UniformUtils.defaultUniforms), _.allKeys(uniforms));

      return !!!missingKeys.length;
    }

  };

})(
  this.Blotter, this._
);

(function(Blotter, _, THREE, EventEmitter) {

  Blotter.Text = function (value, properties) {
    this.id = Blotter.Math.generateUUID();
    this.value = value;
    this.properties = properties;
  };

  Blotter.Text.prototype = {
    constructor : Blotter.Text,

    get needsUpdate () { }, // jshint

    set needsUpdate (value) {
      if (value === true) {
        this.trigger("update");
      }
    },

    get properties () {
      return this._properties;
    },

    set properties (properties) {
      this._properties = Blotter.TextUtils.ensurePropertyValues(properties);
    }
  };

  Blotter._extendWithGettersSetters(Blotter.Text.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.THREE, this.EventEmitter
);

(function(Blotter, _) {

  Blotter.Assets.Shaders.Blending = [
    "//",
    "// Author : Bradley Griffith",
    "// License : Distributed under the MIT License.",
    "//",
    "",
    "// Returns the resulting blend color by blending a top color over a base color",
    "highp vec4 normalBlend(highp vec4 topColor, highp vec4 baseColor) {",
    "  highp vec4 blend = vec4(0.0);",

    "  // HACK",
    "  // Cant divide by 0 (see the 'else' alpha) and after a lot of attempts",
    "  // this simply seems like the only solution Im going to be able to come up with to get alpha back.",
    "  if (baseColor.a == 1.0) {",
    "    baseColor.a = 0.9999999;",
    "  };",

    "  if (topColor.a >= 1.0) {",
    "    blend.a = topColor.a;",
    "    blend.r = topColor.r;",
    "    blend.g = topColor.g;",
    "    blend.b = topColor.b;",
    "  } else if (topColor.a == 0.0) {",
    "    blend.a = baseColor.a;",
    "    blend.r = baseColor.r;",
    "    blend.g = baseColor.g;",
    "    blend.b = baseColor.b;",
    "  } else {",
    "    blend.a = 1.0 - (1.0 - topColor.a) * (1.0 - baseColor.a); // alpha",
    "    blend.r = (topColor.r * topColor.a / blend.a) + (baseColor.r * baseColor.a * (1.0 - topColor.a) / blend.a);",
    "    blend.g = (topColor.g * topColor.a / blend.a) + (baseColor.g * baseColor.a * (1.0 - topColor.a) / blend.a);",
    "    blend.b = (topColor.b * topColor.a / blend.a) + (baseColor.b * baseColor.a * (1.0 - topColor.a) / blend.a);",
    "  }",

    "  return blend;",
    "}",

    "// Returns a vec4 representing the original top color that would have been needed to blend",
    "//  against a passed in base color in order to result in the passed in blend color.",
    "highp vec4 normalUnblend(highp vec4 blendColor, highp vec4 baseColor) {",
    "  highp vec4 unblend = vec4(0.0);",

    "  // HACKY",
    "  // Cant divide by 0 (see alpha) and after a lot of attempts",
    "  // this simply seems like the only solution Im going to be able to come up with to get alpha back.",
    "  if (baseColor.a == 1.0) {",
    "    baseColor.a = 0.9999999;",
    "  }",

    "  unblend.a = 1.0 - ((1.0 - blendColor.a) / (1.0 - baseColor.a));",
    "  // Round to two decimal places",
    "  unblend.a = (sign(100.0 * unblend.a) * floor(abs(100.0 * unblend.a) + 0.5)) / 100.0;",

    "  if (unblend.a >= 1.0) {",
    "    unblend.r = blendColor.r;",
    "    unblend.g = blendColor.g;",
    "    unblend.b = blendColor.b;",
    "  } else if (unblend.a == 0.0) {",
    "    unblend.r = baseColor.r;",
    "    unblend.g = baseColor.g;",
    "    unblend.b = baseColor.b;",
    "  } else {",
    "    unblend.r = (blendColor.r - (baseColor.r * baseColor.a * (1.0 - unblend.a) / blendColor.a)) / (unblend.a / blendColor.a);",
    "    unblend.g = (blendColor.g - (baseColor.g * baseColor.a * (1.0 - unblend.a) / blendColor.a)) / (unblend.a / blendColor.a);",
    "    unblend.b = (blendColor.b - (baseColor.b * baseColor.a * (1.0 - unblend.a) / blendColor.a)) / (unblend.a / blendColor.a);",
    "  }",

    "  return unblend;",
    "}",
  ].join("\n");

})(
  this.Blotter, this._
);

(function(Blotter, _) {

  Blotter.Assets.Shaders.Inf = [
    "//",
    "// Author : Bradley Griffith",
    "// License : Distributed under the MIT License.",
    "//",
    "bool isinf(float val) {",
    "    return (val != 0.0 && val * 2.0 == val) ? true : false;",
    "}",
  ].join("\n");

})(
  this.Blotter, this._
);

(function(Blotter, _) {

  Blotter.Assets.Shaders.LineMath = [
    Blotter.Assets.Shaders.Inf,
    "",
    "//",
    "// Author : Bradley Griffith",
    "// License : Distributed under the MIT License.",
    "//",
    "",
    "// Returns the slope of a line given the degrees of the angle on which that line is rotated;",
    "float slopeForDegrees(float deg) {",
    "    // Ensure degrees stay withing 0.0 - 360.0",
    "    deg = mod(deg, 360.0);",

    "    float radians = deg * (PI / 180.0);",

    "    return tan(radians);",
    "}",

    "// Given x, a slope, and another point, find y for x.",
    "float yForXOnSlope(float x, float slope, vec2 p2) {",
    "    return -1.0 * ((slope * (p2.x - x)) - p2.y);",
    "}",

    "// Given y, a slope, and another point, find x for y.",
    "float xForYOnSlope(float y, float slope, vec2 p2) {",
    "    return ((y - p2.y) + (slope * p2.x)) / slope;",
    "}",

    "// Returns slope adjusted for screen ratio.",
    "float normalizedSlope(float slope, vec2 resolution) {",
    "    vec2 p = vec2(1.0) / resolution;",
    "    return ((slope * 100.0) / p.x) / (100.0 / p.x);",
    "}",

    "// Returns offsets (+/-) for any coordinate at distance given slope.",
    "//   Note: This function does not normalize distance.",
    "//   Note: This function does not adjust slope for screen ratio.",
    "vec2 offsetsForCoordAtDistanceOnSlope(float d, float slope) {",
    "    return vec2(",
    "        (d * cos(atan(slope))),",
    "        (d * sin(atan(slope)))",
    "    );",
    "}",
    "// Returns a boolean designating whether or not an infinite line intersects with an infinite line, and sets an `out` variable for the intersection point if it is found.",
    "//   Note: This function does not adjust slope for screen ratio.",
    "bool lineLineIntersection (out vec2 intersect, in vec2 p1, in float m1, in vec2 p2, in float m2) {",
    "    // See: http://gamedev.stackexchange.com/questions/44720/line-intersection-from-parametric-equation",
    "    //      http://stackoverflow.com/questions/41687083/formula-to-determine-if-an-infinite-line-and-a-line-segment-intersect/41687904#41687904",

    "    bool isIntersecting = false;",

    "    float dx = 1.0;",
    "    float dy = m1;",

    "    float dxx = 1.0;",
    "    float dyy = m2;",

    "    float denominator = ((dxx * dy) - (dyy * dx));",
    "    if (denominator == 0.0) {",
    "        // Lines are parallel",
    "        return isIntersecting;",
    "    }",

    "    if (isinf(dy)) {",
    "        float y = yForXOnSlope(p1.x, m2, p2);",
    "        isIntersecting = true;",
    "        intersect = vec2(p1.x, y);",
    "        return isIntersecting;",
    "    }",

    "    if (isinf(dyy)) {",
    "        float y = yForXOnSlope(p2.x, m1, p1);",
    "        isIntersecting = true;",
    "        intersect = vec2(p2.x, y);",
    "        return isIntersecting;",
    "    }",

    "    float u = ((dx * (p2.y - p1.y)) + (dy * (p1.x - p2.x))) / denominator;",

    "    isIntersecting = true;",
    "    intersect = p2 + (u * vec2(dxx, dyy));",

    "    return isIntersecting;",
    "}",

    "// Returns a boolean designating whether or not an infinite line intersects with a line segment, and sets an `out` variable for the intersection point if it is found.",
    "//   Note: This function does not adjust slope for screen ratio.",
    "bool lineLineSegmentIntersection (out vec2 intersect, in vec2 point, in float m, in vec2 pA, in vec2 pB) {",
    "    // See: http://gamedev.stackexchange.com/questions/44720/line-intersection-from-parametric-equation",
    "    //      http://stackoverflow.com/questions/41687083/formula-to-determine-if-an-infinite-line-and-a-line-segment-intersect/41687904#41687904",

    "    bool isIntersecting = false;",

    "    float dx = 1.0;",
    "    float dy = m;",

    "    float dxx = pB.x - pA.x;",
    "    float dyy = pB.y - pA.y;",

    "    float denominator = ((dxx * dy) - (dyy * dx));",
    "    if (denominator == 0.0 || (isinf(dyy / dxx) && isinf(dy))) {",
    "        // Lines are parallel",
    "        return isIntersecting;",
    "    }",

    "    if (isinf(dy)) {",
    "        float m2 = dyy / dxx;",
    "        float y = yForXOnSlope(point.x, m2, pB);",
    "        isIntersecting = true;",
    "        intersect = vec2(point.x, y);",
    "        return isIntersecting;",
    "    }",

    "    float u = ((dx * (pA.y - point.y)) + (dy * (point.x - pA.x))) / denominator;",

    "    if (u >= 0.0 && u <= 1.0) {",
    "        // Intersection occured on line segment",
    "        isIntersecting = true;",
    "        intersect = pA + (u * vec2(dxx, dyy));",
    "    }",

    "    return isIntersecting;",
    "}",
    "// Dev Note: Terrible code. Needs refactor. Just trying to find ",
    "//   which two edges of the rect the intersections occur at.",
    "void intersectsOnRectForLine(out vec2 iA, out vec2 iB, in vec2 rMinXY, in vec2 rMaxXY, in vec2 point, in float slope) {",
    "    bool firstIntersectFound = false;",

    "    vec2 intersectLeft = vec2(0.0);",
    "    vec2 intersectTop = vec2(0.0);",
    "    vec2 intersectRight = vec2(0.0);",
    "    vec2 intersectBottom = vec2(0.0);",

    "    bool intersectsLeft = lineLineSegmentIntersection(intersectLeft, point, slope, rMinXY, vec2(rMinXY.x, rMaxXY.y));",
    "    bool intersectsTop = lineLineSegmentIntersection(intersectTop, point, slope, vec2(rMinXY.x, rMaxXY.y), rMaxXY);",
    "    bool intersectsRight = lineLineSegmentIntersection(intersectRight, point, slope, rMaxXY, vec2(rMaxXY.x, rMinXY.y));",
    "    bool intersectsBottom = lineLineSegmentIntersection(intersectBottom, point, slope, rMinXY, vec2(rMaxXY.x, rMinXY.y));",


    "    if (intersectsLeft) {",
    "        if (firstIntersectFound) {",
    "            iB = intersectLeft;",
    "        }",
    "        else {",
    "            iA = intersectLeft;",
    "            firstIntersectFound = true;",
    "        }",
    "    }",

    "    if (intersectsTop) {",
    "        if (firstIntersectFound) {",
    "            iB = intersectTop;",
    "        }",
    "        else {",
    "            iA = intersectTop;",
    "            firstIntersectFound = true;",
    "        }",
    "    }",

    "    if (intersectsRight) {",
    "        if (firstIntersectFound) {",
    "            iB = intersectRight;",
    "        }",
    "        else {",
    "            iA = intersectRight;",
    "            firstIntersectFound = true;",
    "        }",
    "    }",

    "    if (intersectsBottom) {",
    "        if (firstIntersectFound) {",
    "            iB = intersectBottom;",
    "        }",
    "        else {",
    "            iA = intersectBottom;",
    "        }",
    "    }",
    "}"

  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.BlinnPhongSpecular = [
    "//",
    "// Author : Reza Ali",
    "// License : Distributed under the MIT License.",
    "//",
    "",
    "float blinnPhongSpecular( vec3 lightDirection, vec3 viewDirection, vec3 surfaceNormal, float shininess ) {",
    "",
    "  //Calculate Blinn-Phong power",
    "  vec3 H = normalize(viewDirection + lightDirection);",
    "  return pow(max(0.0, dot(surfaceNormal, H)), shininess);",
    "}"
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Easing = [
    "//",
    "// Author : Reza Ali",
    "// License : Distributed under the MIT License.",
    "//",
    "",
    "float linear( float t, float b, float c, float d )",
    "{",
    "    return t * ( c / d ) + b;",
    "}",
    "",
    "float linear( float t )",
    "{",
    "    return t;",
    "}",
    "",
    "float inQuad( float t, float b, float c, float d )",
    "{",
    "    return c * ( t /= d ) * t + b;",
    "}",
    "",
    "float inQuad( float t )",
    "{",
    "    return t * t;",
    "}",
    "",
    "float outQuad( float t, float b, float c, float d )",
    "{",
    "    return -c * ( t /= d ) * ( t - 2.0 ) + b;",
    "}",
    "",
    "float outQuad( float t )",
    "{",
    "    return - ( t -= 1.0 ) * t + 1.0;",
    "}",
    "",
    "float inOutQuad( float t, float b, float c, float d )",
    "{",
    "    if( ( t /= d / 2.0 ) < 1.0 ) {",
    "      return c / 2.0 * t * t + b;",
    "    }",
    "    return - c / 2.0 * ( ( --t ) * ( t - 2.0 ) - 1.0 ) + b;",
    "}",
    "",
    "float inOutQuad( float t )",
    "{",
    "    if( ( t /= 0.5 ) < 1.0 ) return 0.5 * t * t;",
    "    return -0.5 * ( ( --t ) * ( t-2 ) - 1 );",
    "}",
    "",
    "float inCubic( float t, float b, float c, float d )",
    "{",
    "    return c * ( t /= d ) * t * t + b;",
    "}",
    "",
    "float inCubic( float t )",
    "{",
    "    return t * t * t;",
    "}",
    "",
    "float outCubic( float t, float b, float c, float d )",
    "{",
    "    return c * ( ( t = t/d - 1.0 ) * t * t + 1.0 ) + b;",
    "}",
    "",
    "float outCubic( float t )",
    "{",
    "    return ( ( --t ) * t * t + 1.0 );",
    "}",
    "",
    "float inOutCubic( float t, float b, float c, float d )",
    "{",
    "    if( ( t /= d / 2.0 ) < 1.0 ) return  c / 2.0 * t * t * t + b;",
    "    return c / 2.0 * ( ( t -= 2.0 ) * t * t + 2.0 ) + b;",
    "}",
    "",
    "float inOutCubic( float t )",
    "{",
    "    if( ( t /= 0.5 ) < 1.0 ) return 0.5 * t * t * t;",
    "    return 0.5 * ( ( t -= 2.0 ) * t * t + 2.0 );",
    "}",
    "",
    "float inQuart( float t, float b, float c, float d )",
    "{",
    "    return c * ( t /= d ) * t * t * t + b;",
    "}",
    "",
    "float inQuart( float t )",
    "{",
    "    return t * t * t * t;",
    "}",
    "",
    "float outQuart( float t, float b, float c, float d )",
    "{",
    "    return -c * ( ( t = t/d - 1.0 ) * t * t * t - 1.0 ) + b;",
    "}",
    "",
    "float outQuart( float t )",
    "{",
    "    return - ( ( --t ) * t * t * t - 1.0 );",
    "}",
    "",
    "float inOutQuart( float t, float b, float c, float d )",
    "{",
    "    if ( ( t /= d / 2.0 ) < 1.0 ) return c / 2.0 * t * t * t * t + b;",
    "    return -c / 2.0 * ( ( t -= 2.0 ) * t * t * t - 2.0 ) + b;",
    "}",
    "",
    "float inOutQuart( float t )",
    "{",
    "    if ( (t /= 0.5 ) < 1.0 ) return 0.5 * t * t * t * t;",
    "    return -0.5 * ( ( t -= 2.0 ) * t * t * t - 2.0 );",
    "}",
    "",
    "float inQuint( float t, float b, float c, float d )",
    "{",
    "    return c * ( t /= d ) * t * t * t * t + b;",
    "}",
    "",
    "float inQuint( float t )",
    "{",
    "    return t * t * t * t * t;",
    "}",
    "",
    "float outQuint( float t, float b, float c, float d )",
    "{",
    "    return c * ( ( t = t/d - 1.0) * t * t * t * t + 1.0 ) + b;",
    "}",
    "",
    "float outQuint( float t )",
    "{",
    "    return ( ( --t ) * t * t * t * t + 1.0 );",
    "}",
    "",
    "float inOutQuint( float t, float b, float c, float d )",
    "{",
    "    if( ( t /= d /2.0 ) < 1.0 ) return  c / 2.0 * t * t * t * t * t + b;",
    "    return c / 2.0 * ( ( t -= 2.0 ) * t * t * t * t + 2.0) + b;",
    "}",
    "",
    "float inOutQuint( float t )",
    "{",
    "    if ( ( t /= 0.5 ) < 1.0 ) return 0.5 * t * t * t * t * t;",
    "    return 0.5 * ( ( t -= 2 ) * t * t * t * t + 2.0 );",
    "}",
    "",
    "float inSine( float t, float b, float c, float d )",
    "{",
    "    return -c * cos( t / d * ( 1.5707963268 ) ) + c + b;",
    "}",
    "",
    "float inSine( float t )",
    "{",
    "    return -1.0 * cos( t * ( 1.5707963268 ) ) + 1.0;",
    "}",
    "",
    "float outSine( float t, float b, float c, float d )",
    "{",
    "    return c * sin( t / d * ( 1.5707963268 ) ) + b;",
    "}",
    "",
    "float outSine( float t )",
    "{",
    "    return sin( t * ( 1.5707963268 ) );",
    "}",
    "",
    "float inOutSine( float t, float b, float c, float d )",
    "{",
    "    return - c / 2.0 * ( cos( 3.1415926536 * t / d ) - 1.0 ) + b;",
    "}",
    "",
    "float inOutSine( float t )",
    "{",
    "    return -0.5 * ( cos( 3.1415926536 * t ) - 1.0 );",
    "}",
    "",
    "float inExpo( float t, float b, float c, float d )",
    "{",
    "    return ( t == 0.0 ) ? b : c * pow( 2.0, 10.0 * ( t / d - 1.0 ) ) + b;",
    "}",
    "",
    "float inExpo( float t )",
    "{",
    "    return ( t == 0 ) ? 0.0 : pow( 2.0, 10.0 * ( t - 1.0 ) );",
    "}",
    "",
    "float outExpo( float t, float b, float c, float d )",
    "{",
    "    return ( t == d ) ? b + c : c * ( - pow( 2.0, -10.0 * t / d ) + 1.0 ) + b;",
    "}",
    "",
    "float outExpo( float t )",
    "{",
    "    return ( t == 1.0 ) ? 1.0 : ( - pow( 2.0, -10.0 * t ) + 1.0 );",
    "}",
    "",
    "float inOutExpo( float t, float b, float c, float d )",
    "{",
    "    if( t == 0 ) return b;",
    "    if( t == d ) return b + c;",
    "    if(( t /= d / 2.0 ) < 1.0 ) return c / 2.0 * pow( 2.0, 10.0 * ( t - 1.0 ) ) + b;",
    "    return c / 2.0 * ( - pow( 2.0, -10.0 * --t ) + 2.0 ) + b;",
    "}",
    "",
    "float inOutExpo( float t )",
    "{",
    "    if( t == 0.0 ) return 0.0;",
    "    if( t == 1.0 ) return 1.0;",
    "    if( ( t /= 0.5 ) < 1.0 ) return 0.5 * pow( 2.0, 10.0 * ( t - 1.0 ) );",
    "    return 0.5 * ( - pow( 2.0, -10.0 * --t ) + 2.0 );",
    "}",
    "",
    "float inCirc( float t, float b, float c, float d )",
    "{",
    "    return -c * ( sqrt( 1.0 - (t/=d)*t) - 1) + b;",
    "}",
    "",
    "float inCirc( float t )",
    "{",
    "    return - ( sqrt( 1.0 - t*t) - 1);",
    "}",
    "",
    "float outCirc( float t, float b, float c, float d )",
    "{",
    "    return c * sqrt( 1.0 - (t=t/d-1)*t) + b;",
    "}",
    "",
    "float outCirc( float t )",
    "{",
    "    return sqrt( 1.0 - (--t)*t);",
    "}",
    "",
    "float inOutCirc( float t, float b, float c, float d )",
    "{",
    "    if ( ( t /= d / 2.0 ) < 1 ) return - c / 2.0 * ( sqrt( 1.0 - t * t ) - 1.0 ) + b;",
    "    return c / 2.0 * ( sqrt( 1.0 - ( t -= 2.0 ) * t ) + 1.0 ) + b;",
    "}",
    "",
    "float inOutCirc( float t )",
    "{",
    "    if( ( t /= 0.5 ) < 1.0 ) return -0.5 * ( sqrt( 1.0 - t * t ) - 1.0 );",
    "    return 0.5 * ( sqrt( 1.0 - ( t -= 2.0 ) * t ) + 1.0 );",
    "}",
    "",
    "float inElastic( float t, float b, float c, float d )",
    "{",
    "    float s = 1.70158; float p = 0.0; float a = c;",
    "    if( t == 0 ) return b;  if( ( t /= d ) == 1 ) return b + c;",
    "    p = d * 0.3;",
    "    if( a < abs( c ) ) { a = c; float s = p / 4.0; }",
    "    else s = 0.1591549431 * p / ( 6.2831853072 ) * asin( c / a );",
    "    return -( a * pow( 2.0, 10.0 * ( t -= 1.0 ) ) * sin( ( t * d - s ) * ( 6.2831853072 ) / p ) )  + b;",
    "}",
    "",
    "float inElastic( float t )",
    "{",
    "    float s = 1.70158; float p = 0.0; float a = 1.0;",
    "    if( t == 0.0 ) return 0.0;",
    "    if( t == 1.0 ) return 1.0;",
    "    p = 0.3;",
    "    s = p / ( 6.2831853072 ) * asin( 1.0 / a );",
    "    return -( a * pow( 2.0, 10.0 * ( t -= 1.0 ) ) * sin( ( t - s ) * ( 6.2831853072 ) / p ) );",
    "}",
    "",
    "float outElastic( float t, float b, float c, float d )",
    "{",
    "    float s = 1.70158; float p = 0.0; float a = c;",
    "    if( t == 0.0 ) return b;",
    "    if( (t /= d ) == 1.0 ) return b + c;",
    "    p = d * 0.3;",
    "    if( a < abs( c ) ) { a = c; s = p / 4.0; }",
    "    else { s = p / ( 6.2831853072 ) * asin( c / a ); }",
    "    return a * pow( 2.0, -10.0 * t ) * sin( ( t * d - s ) * ( 6.2831853072 ) / p ) + c + b;",
    "}",
    "",
    "float outElastic( float t )",
    "{",
    "    float s = 1.70158; float p = 0.0 ; float a = 1.0;",
    "    if( t == 0.0 ) return 0.0;  if( t == 1.0 ) return 1.0;",
    "    p = 0.3;",
    "    s = p / ( 6.2831853072 ) * asin( 1.0 / a );",
    "    return a * pow( 2.0, -10.0 * t ) * sin( ( t - s ) * ( 6.2831853072 ) / p ) + 1.0;",
    "}",
    "",
    "float inOutElastic( float t, float b, float c, float d )",
    "{",
    "    float s = 1.70158; float p = 0.0; float a = c;",
    "    if( t == 0.0 ) return b;",
    "    if( ( t /= d / 2.0 ) == 2.0 ) return b + c;",
    "    p = d * ( 0.3 * 1.5 );",
    "    if( a < abs( c ) ) { a = c; s = p / 4.0; }",
    "    else { s = p / ( 6.2831853072 ) * asin( c / a ); }",
    "    if( t < 1.0 ) return -0.5 * ( a * pow( 2.0, 10.0 * ( t -= 1.0 ) ) * sin( ( t * d - s ) * ( 6.2831853072 ) / p ) ) + b;",
    "    return a * pow( 2.0, -10.0 * ( t -= 1.0 ) ) * sin( ( t * d - s ) * ( 6.2831853072 ) / p ) * 0.5 + c + b;",
    "}",
    "",
    "float inOutElastic( float t )",
    "{",
    "    float s = 1.70158; float p = 0; float a = 1.0;",
    "    if( t == 0 ) return 0.0;",
    "    if( ( t /= 0.5 ) == 2.0 ) return 1.0;",
    "    p = ( 0.3 * 1.5 );",
    "    s = p / ( 6.2831853072 ) * asin( 1.0 / a );",
    "    if( t < 1.0 ) return -0.5 * ( a * pow( 2.0, 10.0 * ( t -= 1.0 ) ) * sin( ( t - s ) * ( 6.2831853072 ) / p ) );",
    "    return a * pow( 2.0, -10.0 * ( t -= 1.0 ) ) * sin( ( t - s ) * ( 6.2831853072 ) / p ) * 0.5 + 1.0;",
    "}",
    "",
    "float inBack( float t, float b, float c, float d )",
    "{",
    "    float s = 1.70158;",
    "    return c * ( t /= d ) * t * ( ( s + 1.0 ) * t - s ) + b;",
    "}",
    "",
    "float inBack( float t )",
    "{",
    "    float s = 1.70158;",
    "    return t * t * ( ( s + 1.0 ) * t - s);",
    "}",
    "",
    "float outBack( float t,  float b,  float c,  float d )",
    "{",
    "    float s = 1.70158;",
    "    return c * ( ( t = t / d - 1.0 ) * t * ( ( s + 1.0 ) * t + s ) + 1.0 ) + b;",
    "}",
    "",
    "float outBack( float t )",
    "{",
    "    float s = 1.70158;",
    "    return ( ( --t ) * t * ( ( s + 1.0 ) * t + s ) + 1.0);",
    "}",
    "",
    "float inOutBack( float t, float b, float c, float d )",
    "{",
    "    float s = 1.70158;",
    "    if( ( t /= d / 2.0 ) < 1.0 ) return c / 2.0 * ( t * t * ( ( ( s *= 1.525 ) + 1.0 ) * t - s ) ) + b;",
    "    return c / 2.0 * ( ( t -= 2.0 ) * t * ( ( ( s *= ( 1.525 ) ) + 1.0 ) * t + s ) + 2.0 ) + b;",
    "}",
    "",
    "float inOutBack( float t )",
    "{",
    "    float s = 1.70158;",
    "    if( ( t /= 0.5 ) < 1.0 ) return 0.5 * ( t * t * ( ( ( s *= 1.525 ) + 1.0 ) * t - s ) );",
    "    return 0.5 * ( ( t -= 2 ) * t * ( ( ( s *= ( 1.525 ) ) + 1.0 ) * t + s ) + 2.0 );",
    "}",
    "",
    "float outBounce( float t, float b, float c, float d )",
    "{",
    "    if( ( t /= d ) < ( 1.0 / 2.75 ) ) {",
    "        return c * ( 7.5625 * t * t ) + b;",
    "    } else if ( t < ( 2.0 / 2.75 ) ) {",
    "        return c * ( 7.5625 * ( t -= ( 1.5 / 2.75 ) ) * t + 0.75 ) + b;",
    "    } else if ( t < ( 2.5 / 2.75 ) ) {",
    "        return c * ( 7.5625 * ( t -= ( 2.25 / 2.75 ) ) * t + 0.9375 ) + b;",
    "    } else {",
    "        return c * ( 7.5625 * ( t -= ( 2.625 / 2.75 ) ) * t + 0.984375 ) + b;",
    "    }",
    "}",
    "",
    "float outBounce( float t )",
    "{",
    "    if( t < ( 1.0 / 2.75 ) ) {",
    "        return ( 7.5625 * t * t );",
    "    } else if ( t < ( 2.0 / 2.75 ) ) {",
    "        return ( 7.5625 * ( t-= ( 1.5 / 2.75 ) ) * t + .75 );",
    "    } else if ( t < ( 2.5 / 2.75 ) ) {",
    "        return ( 7.5625 * ( t -= ( 2.25 / 2.75 ) ) * t + 0.9375 );",
    "    } else {",
    "        return ( 7.5625 * ( t -= ( 2.625 / 2.75 ) ) * t + 0.984375 );",
    "    }",
    "}",
    "",
    "float inBounce( float t, float b, float c, float d )",
    "{",
    "    return c - outBounce( d - t, 0.0, c, d ) + b;",
    "}",
    "",
    "float inBounce( float t )",
    "{",
    "    return 1.0 - outBounce( 1.0 - t);",
    "}",
    "",
    "float inOutBounce( float t, float b, float c, float d )",
    "{",
    "    if ( t < d /2.0 ) return inBounce ( t * 2.0, 0.0, c, d ) * 0.5 + b;",
    "    return outBounce ( t * 2.0 - d, 0, c, d ) * 0.5 + c * 0.5 + b;",
    "}",
    "",
    "float inOutBounce( float t )",
    "{",
    "    if ( t < 0.5 ) return inBounce( t * 2.0 ) * 0.5;",
    "    return outBounce( t * 2.0 - 1.0 ) * 0.5 + 0.5;",
    "}"
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Gamma = [
    "//",
    "// Author : Reza Ali",
    "// License : Distributed under the MIT License.",
    "//",
    "",
    "const vec3 cGammaCorrection = vec3( 0.4545454545 );",
    "",
    "vec3 gamma( in vec3 color )",
    "{",
    "  return pow( color, cGammaCorrection );",
    "}",
    "",
    "vec4 gamma( in vec4 color )",
    "{",
    "  return vec4( gamma( color.rgb ), color.a );",
    "}"
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Map = [
    "//",
    "// Author : Reza Ali",
    "// License : Distributed under the MIT License.",
    "//",
    "",
    "float map( float value, float inMin, float inMax, float outMin, float outMax )",
    "{",
    "    return ( (value - inMin) / ( inMax - inMin ) * ( outMax - outMin ) ) + outMin;",
    "}"
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Noise = [
    "//",
    "// Author : Patricio Gonzalez Vivo and Jen Lowe",
    "// License : Distributed under the MIT License.",
    "// Source : https://github.com/patriciogonzalezvivo/thebookofshaders",
    "//",
    "float random (in float _x) {",
    "    return fract(sin(_x)*1e4);",
    "}",
    "",
    "float random (in vec2 co) {",
    "    return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);",
    "}",
    "",
    "float noise (in float _x) {",
    "    float i = floor(_x);",
    "    float f = fract(_x);",
    "    float u = f * f * (3.0 - 2.0 * f);",
    "    return mix(random(i), random(i + 1.0), u);",
    "}",
    "",
    "float noise (in vec2 _st) {",
    "    vec2 i = floor(_st);",
    "    vec2 f = fract(_st);",
    "    // Four corners in 2D of a tile",
    "    float a = random(i);",
    "    float b = random(i + vec2(1.0, 0.0));",
    "    float c = random(i + vec2(0.0, 1.0));",
    "    float d = random(i + vec2(1.0, 1.0));",
    "    vec2 u = f * f * (3.0 - 2.0 * f);",
    "    return mix(a, b, u.x) + ",
    "            (c - a)* u.y * (1.0 - u.x) + ",
    "            (d - b) * u.x * u.y;",
    "}",
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Noise2D = [
    "//",
    "// Description : Array and textureless GLSL 2D simplex noise function.",
    "//      Author : Ian McEwan, Ashima Arts.",
    "//  Maintainer : ijm",
    "//     Lastmod : 20110822 (ijm)",
    "//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.",
    "//               Distributed under the MIT License. See LICENSE file.",
    "//               https://github.com/ashima/webgl-noise",
    "//",
    "",
    "vec2 n2mod289(vec2 x) {",
    "  return x - floor(x * (1.0 / 289.0)) * 289.0;",
    "}",
    "",
    "vec3 n2mod289(vec3 x) {",
    "  return x - floor(x * (1.0 / 289.0)) * 289.0;",
    "}",
    "",
    "vec4 n2mod289(vec4 x) {",
    "  return x - floor(x * (1.0 / 289.0)) * 289.0;",
    "}",
    "",
    "vec3 permute(vec3 x) {",
    "  return n2mod289(((x*34.0)+1.0)*x);",
    "}",
    "",
    "float snoise(vec2 v)",
    "  {",
    "  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0",
    "                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)",
    "                     -0.577350269189626,  // -1.0 + 2.0 * C.x",
    "                      0.024390243902439); // 1.0 / 41.0",
    "// First corner",
    "  vec2 i  = floor(v + dot(v, C.yy) );",
    "  vec2 x0 = v -   i + dot(i, C.xx);",
    "",
    "// Other corners",
    "  vec2 i1;",
    "  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0",
    "  //i1.y = 1.0 - i1.x;",
    "  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);",
    "  // x0 = x0 - 0.0 + 0.0 * C.xx ;",
    "  // x1 = x0 - i1 + 1.0 * C.xx ;",
    "  // x2 = x0 - 1.0 + 2.0 * C.xx ;",
    "  vec4 x12 = x0.xyxy + C.xxzz;",
    "  x12.xy -= i1;",
    "",
    "// Permutations",
    "  i = n2mod289(i); // Avoid truncation effects in permutation",
    "  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))",
    "   + i.x + vec3(0.0, i1.x, 1.0 ));",
    "",
    "  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);",
    "  m = m*m ;",
    "  m = m*m ;",
    "",
    "// Gradients: 41 points uniformly over a line, mapped onto a diamond.",
    "// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)",
    "",
    "  vec3 x = 2.0 * fract(p * C.www) - 1.0;",
    "  vec3 h = abs(x) - 0.5;",
    "  vec3 ox = floor(x + 0.5);",
    "  vec3 a0 = x - ox;",
    "",
    "// Normalise gradients implicitly by scaling m",
    "// Approximation of: m *= inversesqrt( a0*a0 + h*h );",
    "  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );",
    "",
    "// Compute final noise value at P",
    "  vec3 g;",
    "  g.x  = a0.x  * x0.x  + h.x  * x0.y;",
    "  g.yz = a0.yz * x12.xz + h.yz * x12.yw;",
    "  return 130.0 * dot(m, g);",
    "}"
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Noise3D = [
    "//",
    "// Description : Array and textureless GLSL 2D/3D/4D simplex",
    "//               noise functions.",
    "//      Author : Ian McEwan, Ashima Arts.",
    "//  Maintainer : ijm",
    "//     Lastmod : 20110822 (ijm)",
    "//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.",
    "//               Distributed under the MIT License. See LICENSE file.",
    "//               https://github.com/ashima/webgl-noise",
    "//",
    "",
    "vec2 n3mod289(vec2 x) {",
    "  return x - floor(x * (1.0 / 289.0)) * 289.0;",
    "}",
    "",
    "vec3 n3mod289(vec3 x) {",
    "  return x - floor(x * (1.0 / 289.0)) * 289.0;",
    "}",
    "",
    "vec4 n3mod289(vec4 x) {",
    "  return x - floor(x * (1.0 / 289.0)) * 289.0;",
    "}",
    "",
    "vec4 permute(vec4 x) {",
    "     return n3mod289(((x*34.0)+1.0)*x);",
    "}",
    "",
    "vec4 taylorInvSqrt(vec4 r)",
    "{",
    "  return 1.79284291400159 - 0.85373472095314 * r;",
    "}",
    "",
    "float snoise(vec3 v)",
    "  {",
    "  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;",
    "  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);",
    "",
    "// First corner",
    "  vec3 i  = floor(v + dot(v, C.yyy) );",
    "  vec3 x0 =   v - i + dot(i, C.xxx) ;",
    "",
    "// Other corners",
    "  vec3 g = step(x0.yzx, x0.xyz);",
    "  vec3 l = 1.0 - g;",
    "  vec3 i1 = min( g.xyz, l.zxy );",
    "  vec3 i2 = max( g.xyz, l.zxy );",
    "",
    "  //   x0 = x0 - 0.0 + 0.0 * C.xxx;",
    "  //   x1 = x0 - i1  + 1.0 * C.xxx;",
    "  //   x2 = x0 - i2  + 2.0 * C.xxx;",
    "  //   x3 = x0 - 1.0 + 3.0 * C.xxx;",
    "  vec3 x1 = x0 - i1 + C.xxx;",
    "  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y",
    "  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y",
    "",
    "// Permutations",
    "  i = n3mod289(i);",
    "  vec4 p = permute( permute( permute(",
    "             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))",
    "           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))",
    "           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));",
    "",
    "// Gradients: 7x7 points over a square, mapped onto an octahedron.",
    "// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)",
    "  float n_ = 0.142857142857; // 1.0/7.0",
    "  vec3  ns = n_ * D.wyz - D.xzx;",
    "",
    "  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)",
    "",
    "  vec4 x_ = floor(j * ns.z);",
    "  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)",
    "",
    "  vec4 x = x_ *ns.x + ns.yyyy;",
    "  vec4 y = y_ *ns.x + ns.yyyy;",
    "  vec4 h = 1.0 - abs(x) - abs(y);",
    "",
    "  vec4 b0 = vec4( x.xy, y.xy );",
    "  vec4 b1 = vec4( x.zw, y.zw );",
    "",
    "  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;",
    "  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;",
    "  vec4 s0 = floor(b0)*2.0 + 1.0;",
    "  vec4 s1 = floor(b1)*2.0 + 1.0;",
    "  vec4 sh = -step(h, vec4(0.0));",
    "",
    "  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;",
    "  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;",
    "",
    "  vec3 p0 = vec3(a0.xy,h.x);",
    "  vec3 p1 = vec3(a0.zw,h.y);",
    "  vec3 p2 = vec3(a1.xy,h.z);",
    "  vec3 p3 = vec3(a1.zw,h.w);",
    "",
    "//Normalise gradients",
    "  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));",
    "  p0 *= norm.x;",
    "  p1 *= norm.y;",
    "  p2 *= norm.z;",
    "  p3 *= norm.w;",
    "",
    "// Mix final noise value",
    "  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);",
    "  m = m * m;",
    "  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),",
    "                                dot(p2,x2), dot(p3,x3) ) );",
    "  }"
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Noise4D = [
    "//",
    "// Description : Array and textureless GLSL 2D/3D/4D simplex",
    "//               noise functions.",
    "//      Author : Ian McEwan, Ashima Arts.",
    "//  Maintainer : ijm",
    "//     Lastmod : 20110822 (ijm)",
    "//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.",
    "//               Distributed under the MIT License. See LICENSE file.",
    "//               https://github.com/ashima/webgl-noise",
    "//",
    "",
    "vec4 mod289(vec4 x) {",
    "  return x - floor(x * (1.0 / 289.0)) * 289.0; }",
    "",
    "float mod289(float x) {",
    "  return x - floor(x * (1.0 / 289.0)) * 289.0; }",
    "",
    "vec4 permute(vec4 x) {",
    "     return mod289(((x*34.0)+1.0)*x);",
    "}",
    "",
    "float permute(float x) {",
    "     return mod289(((x*34.0)+1.0)*x);",
    "}",
    "",
    "vec4 taylorInvSqrt(vec4 r)",
    "{",
    "  return 1.79284291400159 - 0.85373472095314 * r;",
    "}",
    "",
    "float taylorInvSqrt(float r)",
    "{",
    "  return 1.79284291400159 - 0.85373472095314 * r;",
    "}",
    "",
    "vec4 grad4(float j, vec4 ip)",
    "  {",
    "  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);",
    "  vec4 p,s;",
    "",
    "  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;",
    "  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);",
    "  s = vec4(lessThan(p, vec4(0.0)));",
    "  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;",
    "",
    "  return p;",
    "  }",
    "",
    "// (sqrt(5) - 1)/4 = F4, used once below",
    "#define F4 0.309016994374947451",
    "",
    "float snoise(vec4 v)",
    "  {",
    "  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4",
    "                        0.276393202250021,  // 2 * G4",
    "                        0.414589803375032,  // 3 * G4",
    "                       -0.447213595499958); // -1 + 4 * G4",
    "",
    "// First corner",
    "  vec4 i  = floor(v + dot(v, vec4(F4)) );",
    "  vec4 x0 = v -   i + dot(i, C.xxxx);",
    "",
    "// Other corners",
    "",
    "// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)",
    "  vec4 i0;",
    "  vec3 isX = step( x0.yzw, x0.xxx );",
    "  vec3 isYZ = step( x0.zww, x0.yyz );",
    "//  i0.x = dot( isX, vec3( 1.0 ) );",
    "  i0.x = isX.x + isX.y + isX.z;",
    "  i0.yzw = 1.0 - isX;",
    "//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );",
    "  i0.y += isYZ.x + isYZ.y;",
    "  i0.zw += 1.0 - isYZ.xy;",
    "  i0.z += isYZ.z;",
    "  i0.w += 1.0 - isYZ.z;",
    "",
    "  // i0 now contains the unique values 0,1,2,3 in each channel",
    "  vec4 i3 = clamp( i0, 0.0, 1.0 );",
    "  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );",
    "  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );",
    "",
    "  //  x0 = x0 - 0.0 + 0.0 * C.xxxx",
    "  //  x1 = x0 - i1  + 1.0 * C.xxxx",
    "  //  x2 = x0 - i2  + 2.0 * C.xxxx",
    "  //  x3 = x0 - i3  + 3.0 * C.xxxx",
    "  //  x4 = x0 - 1.0 + 4.0 * C.xxxx",
    "  vec4 x1 = x0 - i1 + C.xxxx;",
    "  vec4 x2 = x0 - i2 + C.yyyy;",
    "  vec4 x3 = x0 - i3 + C.zzzz;",
    "  vec4 x4 = x0 + C.wwww;",
    "",
    "// Permutations",
    "  i = mod289(i);",
    "  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);",
    "  vec4 j1 = permute( permute( permute( permute (",
    "             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))",
    "           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))",
    "           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))",
    "           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));",
    "",
    "// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope",
    "// 7*7*6 = 294, which is close to the ring size 17*17 = 289.",
    "  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;",
    "",
    "  vec4 p0 = grad4(j0,   ip);",
    "  vec4 p1 = grad4(j1.x, ip);",
    "  vec4 p2 = grad4(j1.y, ip);",
    "  vec4 p3 = grad4(j1.z, ip);",
    "  vec4 p4 = grad4(j1.w, ip);",
    "",
    "// Normalise gradients",
    "  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));",
    "  p0 *= norm.x;",
    "  p1 *= norm.y;",
    "  p2 *= norm.z;",
    "  p3 *= norm.w;",
    "  p4 *= taylorInvSqrt(dot(p4,p4));",
    "",
    "// Mix contributions from the five corners",
    "  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);",
    "  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);",
    "  m0 = m0 * m0;",
    "  m1 = m1 * m1;",
    "  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))",
    "               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;",
    "",
    "  }"
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.PI = [
    "//",
    "// Author : Reza Ali",
    "// License : Distributed under the MIT License.",
    "//",
    "",
    "#define TWO_PI 6.2831853072",
    "#define PI 3.14159265359",
    "#define HALF_PI 1.57079632679"
  ].join("\n");

})(
  this.Blotter, this._
);

// See License comments in shader string

(function(Blotter, _) {

  Blotter.Assets.Shaders.Random = [
    "//",
    "// Author : Patricio Gonzalez Vivo and Jen Lowe",
    "// License : Distributed under the MIT License.",
    "// Source : https://github.com/patriciogonzalezvivo/thebookofshaders",
    "//",
    "",
    "float random (in float _x) {",
  	"    return fract(sin(_x)*1e4);",
  	"}",
  	"",
  	"float random (in vec2 co) {",
  	"    return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);",
	  "}"
  ].join("\n");

})(
  this.Blotter, this._
);

(function(Blotter, _) {

  Blotter.Mapping = function (texts, textBounds, width, height) {
    this.texts = texts;

    this._textBounds = textBounds;

    this._width = width;
    this._height = height;

    this._ratio = 1;
  };

  Blotter.Mapping.prototype = (function () {

    function _getLineHeightPixels (size, lineHeight) {
      lineHeight = lineHeight || Blotter.TextUtils.ensurePropertyValues().leading;
      if (!isNaN(lineHeight)) {
        lineHeight = size * lineHeight;
      } else if (lineHeight.toString().indexOf("px") !== -1) {
        lineHeight = parseInt(lineHeight);
      } else if (lineHeight.toString().indexOf("%") !== -1) {
        lineHeight = (parseInt(lineHeight) / 100) * size;
      }

      return lineHeight;
    }

    return {

      constructor : Blotter.Mapping,

      get ratio () {
        return this._ratio;
      },

      set ratio (ratio) {
        this._ratio = ratio || 1;
      },

      get width () {
        return this._width * this._ratio;
      },

      get height () {
        return this._height * this._ratio;
      },

      boundsForText : function (text) {
        Blotter.Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Mapping", "boundsForText");

        var bounds = this._textBounds[text.id];

        if (bounds) {
          bounds = {
            w : bounds.w * this._ratio,
            h : bounds.h * this._ratio,
            x : bounds.x * this._ratio,
            y : bounds.y * this._ratio
          };
        }

        return bounds;
      },

      toCanvas : function (completion) {
        var canvas = Blotter.CanvasUtils.hiDpiCanvas(this._width, this._height, this._ratio),
            ctx = canvas.getContext("2d", { alpha: false }),
            img = new Image();

        ctx.textBaseline = "middle";

        for (var i = 0; i < this.texts.length; i++) {
          var text = this.texts[i],
              bounds = this._textBounds[text.id],
              halfLH = (_getLineHeightPixels.call(this, text.properties.size, text.properties.leading) / 2);

          ctx.font = text.properties.style +
               " " + text.properties.weight +
               " " + text.properties.size + "px" +
               " " + text.properties.family;

          ctx.save();

          ctx.translate(
            bounds.x + text.properties.paddingLeft,
            (this._height - (bounds.y + bounds.h)) + text.properties.paddingTop
          );
          ctx.fillStyle = text.properties.fill;
          ctx.fillText(
            text.value,
            0,
            Math.round(halfLH)
          );

          ctx.restore();
        }

        img.onload = _.bind(function () {
          // Flip Y for WebGL
          ctx.save();
          ctx.scale(1, -1);
          ctx.clearRect(0, this._height * -1, this._width, this._height);
          ctx.drawImage(img, 0, this._height * -1, this._width, this._height);
          ctx.restore();

          completion(canvas);
        }, this);

        img.src = canvas.toDataURL("image/png");
      }
    };
  })();

})(
  this.Blotter, this._
);

(function(Blotter, _, EventEmitter) {

  Blotter.MappingMaterial = function(mapping, material, shaderMaterial, userUniformDataTextureObjects) {
    this.mapping = mapping;
    this.material = material;
    this.shaderMaterial = shaderMaterial;

    this._userUniformDataTextureObjects = userUniformDataTextureObjects;

    this.init.apply(this, arguments);
  };

  Blotter.MappingMaterial.prototype = (function() {

    function _setValueAtIndexInDataTextureObject (value, i, data, userUniform) {
      var type = userUniform.type;

      if (type == "1f") {
        data[4*i]   = value;    // x (r)
        data[4*i+1] = 0.0;
        data[4*i+2] = 0.0;
        data[4*i+3] = 0.0;
      } else if (type == "2f") {
        data[4*i]   = value[0]; // x (r)
        data[4*i+1] = value[1]; // y (g)
        data[4*i+2] = 0.0;
        data[4*i+3] = 0.0;
      } else if (type == "3f") {
        data[4*i]   = value[0]; // x (r)
        data[4*i+1] = value[1]; // y (g)
        data[4*i+2] = value[2]; // z (b)
        data[4*i+3] = 0.0;
      } else if (type == "4f") {
        data[4*i]   = value[0]; // x (r)
        data[4*i+1] = value[1]; // y (g)
        data[4*i+2] = value[2]; // z (b)
        data[4*i+3] = value[3]; // w (a)
      } else {
        data[4*i]   = 0.0;
        data[4*i+1] = 0.0;
        data[4*i+2] = 0.0;
        data[4*i+3] = 0.0;
      }
    }

    function _getUniformInterfaceForDataTextureObject (dataTextureObject) {
      var interface = {
        _type : dataTextureObject.userUniform.type,
        _value : dataTextureObject.userUniform.value,

        get value () {
          return this._value;
        },

        set value (v) {
          if (!Blotter.UniformUtils.validValueForUniformType(this._type, v)) {
            Blotter.Messaging.logError("Blotter.MappingMaterial", false, "uniform value not valid for uniform type: " + this._type);
            return;
          }
          this._value = v;

          this.trigger("update");
        }
      };

      _.extend(interface, EventEmitter.prototype);

      return interface;
    }

    function _getTextUniformInterface (mapping, userUniformDataTextureObjects) {
      return _.reduce(mapping.texts, function (memo, text, textIndex) {
        memo[text.id] = _.reduce(userUniformDataTextureObjects.userUniforms, function (memo, dataTextureObject, uniformName) {
          var uniformIndex = dataTextureObject.position + textIndex;

          memo[uniformName] = _getUniformInterfaceForDataTextureObject(dataTextureObject);

          memo[uniformName].on("update", function () {
            _setValueAtIndexInDataTextureObject(
              memo[uniformName].value,
              uniformIndex,
              userUniformDataTextureObjects.data,
              dataTextureObject.userUniform
            );

            userUniformDataTextureObjects.texture.needsUpdate = true;
          });

          memo[uniformName].value = dataTextureObject.userUniform.value;

          return memo;
        }, {});

        return memo;
      }, {});
    }

    function _getUniformInterface (mapping, userUniformDataTextureObjects, textUniformInterface) {
      return _.reduce(userUniformDataTextureObjects.userUniforms, function (memo, dataTextureObject, uniformName) {
        memo[uniformName] = _getUniformInterfaceForDataTextureObject(dataTextureObject);

        memo[uniformName].on("update", function () {
          _.each(mapping.texts, function (text) {
            textUniformInterface[text.id][uniformName].value = memo[uniformName].value;
          });

          userUniformDataTextureObjects.texture.needsUpdate = true;
        });

        return memo;
      }, {});
    }

    return {

      constructor : Blotter.MappingMaterial,

      get uniforms () {
        return this.material.uniforms;
      },

      get mainImage () {
        return this.material.mainImage;
      },

      get width () {
        return this.mapping.width;
      },

      get height () {
        return this.mapping.height;
      },

      get ratio () {
        return this.mapping.ratio;
      },

      init : function (mapping, material, shaderMaterial, userUniformDataTextureObjects) {
        this.textUniformInterface = _getTextUniformInterface(this.mapping, this._userUniformDataTextureObjects);
        this.uniformInterface = _getUniformInterface(this.mapping, this._userUniformDataTextureObjects, this.textUniformInterface);
      },

      boundsForText : function (text) {
        Blotter.Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.MappingMaterial", "boundsForText");
        return this.mapping.boundsForText(text);
      }
    };
  })();

})(
  this.Blotter, this._, this.EventEmitter
);

(function(Blotter, _, EventEmitter) {

  Blotter.Material = function () {
    this.init.apply(this, arguments);
  };

  Blotter.Material.prototype = (function() {

    function _defaultMainImageSrc () {
      var mainImage = [

        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",

          "mainImage = textTexture(fragCoord / uResolution);",

        "}"

      ];

      return mainImage.join("\n");
    }

    function _getUniformInterfaceForUniformDescription (uniformDescription) {
      var interface = {
        _type : uniformDescription.type,
        _value : uniformDescription.value,

        get type () {
          return this._type;
        },

        set type (v) {
          this._type = v;
        },

        get value () {
          return this._value;
        },

        set value (v) {
          if (!Blotter.UniformUtils.validValueForUniformType(this._type, v)) {
            Blotter.Messaging.logError("Blotter.Material", false, "uniform value not valid for uniform type: " + this._type);
            return;
          }
          this._value = v;

          this.trigger("update");
        }
      };

      _.extend(interface, EventEmitter.prototype);

      return interface;
    }

    function _getUniformInterface (uniforms) {
      return _.reduce(uniforms, _.bind(function (memo, uniformDescription, uniformName) {
        memo[uniformName] = _getUniformInterfaceForUniformDescription(uniformDescription);
        memo[uniformName].on("update", _.bind(function () {
          this.trigger("update:uniform", [uniformName]);
        }, this));

        return memo;
      }, this), {});
    }

    return {

      constructor : Blotter.Material,

      get needsUpdate () { }, // jshint

      set needsUpdate (value) {
        if (value === true) {
          this.trigger("update");
        }
      },

      get mainImage () {
        return this._mainImage;
      },

      set mainImage (mainImage) {
        this._mainImage = mainImage || _defaultMainImageSrc();
      },

      get uniforms () {
        return this._uniforms;
      },

      set uniforms (uniforms) {
        this._uniforms = _getUniformInterface.call(this, Blotter.UniformUtils.extractValidUniforms(
          _.extend(uniforms, Blotter.UniformUtils.defaultUniforms)
        ));
      },

      init : function () {
        this.mainImage = _defaultMainImageSrc();
        this.uniforms = {};
      }
    };
  })();

  Blotter._extendWithGettersSetters(Blotter.Material.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.EventEmitter
);

(function(Blotter, _) {

  Blotter.ShaderMaterial = function(mainImage, options) {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.ShaderMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.ShaderMaterial.prototype, (function () {

    return {

      constructor : Blotter.ShaderMaterial,

      init : function (mainImage, options) {
        _.defaults(this, options);

        this.mainImage = mainImage;
      }
    };

  })());

})(
  this.Blotter, this._
);

(function(Blotter, _, EventEmitter) {

  Blotter.RenderScope = function (text, blotter) {
    this.text = text;
    this.blotter = blotter;

    this.material = {
      mainImage : this.blotter.material.mainImage
    };

    this._mappingMaterial = blotter.mappingMaterial;

    this.playing = this.blotter.autoplay;
    this.timeDelta = 0;
    this.lastDrawTime = false;
    this.frameCount = 0;

    this.domElement = Blotter.CanvasUtils.hiDpiCanvas(0, 0, this.blotter.ratio, {
      class : "b-canvas",
      html : text.value
    });

    this.context = this.domElement.getContext("2d");
  };

  Blotter.RenderScope.prototype = (function () {

    function _setMouseEventListeners () {
      var self = this,
          eventNames = ["mousedown", "mouseup", "mousemove", "mouseenter", "mouseleave"];

      function setMouseListener (eventName) {
        self.domElement.addEventListener(eventName, function(e) {
          var position = Blotter.CanvasUtils.normalizedMousePosition(self.domElement, e);

          self.emit(eventName, position);
        }, false);
      }

      for (var i = 0; i < eventNames.length; i++) {
        var eventName = eventNames[i];

        setMouseListener(eventName);
      }
    }

    function _getBoundsForMappingMaterialAndText (mappingMaterial, text) {
      var bounds = mappingMaterial.boundsForText(text);

      if (bounds) {
        return {
          w : bounds.w,
          h : bounds.h,
          x : -1 * Math.floor(bounds.x),
          y : -1 * Math.floor(mappingMaterial.height - (bounds.y + bounds.h))
        };
      }
    }

    function _transferInferfaceValues (oldInterface, newInterface) {
      _.each(oldInterface, function(interfaceObject, uniformName) {
        var newInterfaceObject = newInterface[uniformName];

        if (newInterfaceObject) {
          var typesMatch = newInterfaceObject.type == interfaceObject.type,
              valuesMatch = newInterfaceObject.value == interfaceObject.value;

          if (typesMatch && !valuesMatch) {
            newInterfaceObject.value = interfaceObject.value;
          }
        }
      });
    }

    function _getUniformInterfaceForUniformDescription (uniformDescription) {
      var interface = {
        _type : uniformDescription.type,
        _value : uniformDescription.value,

        get type () {
          return this._type;
        },

        set type (v) {
          Blotter.Messaging.logError("Blotter.RenderScope", false, "uniform types may not be updated through a text scope");
        },

        get value () {
          return this._value;
        },

        set value (v) {
          if (!Blotter.UniformUtils.validValueForUniformType(this._type, v)) {
            Blotter.Messaging.logError("Blotter.RenderScope", false, "uniform value not valid for uniform type: " + this._type);
            return;
          }
          this._value = v;

          this.trigger("update");
        }
      };

      _.extend(interface, EventEmitter.prototype);

      return interface;
    }

    function _getUniformInterfaceForMaterialUniforms (uniforms) {
      return _.reduce(uniforms, _.bind(function (memo, uniformDescription, uniformName) {
        memo[uniformName] = _getUniformInterfaceForUniformDescription(uniformDescription);
        memo[uniformName].on("update", _.bind(function () {
          this.trigger("update:uniform", [uniformName]);
        }, this));

        return memo;
      }, this), {});
    }

    function _update () {
      var mappingMaterial = this._mappingMaterial,
          bounds = mappingMaterial && _getBoundsForMappingMaterialAndText(mappingMaterial, this.text),
          previousUniforms = this.material.uniforms;

      if (mappingMaterial && bounds) {
        Blotter.CanvasUtils.updateCanvasSize(
          this.domElement,
          bounds.w / this.blotter.ratio,
          bounds.h / this.blotter.ratio,
          this.blotter.ratio
        );
        this.domElement.innerHTML = this.text.value;

        this.bounds = bounds;

        this.material.uniforms = _getUniformInterfaceForMaterialUniforms.call(this, mappingMaterial.uniforms);
        this.material.mainImage = mappingMaterial.mainImage;

        if (previousUniforms) {
          _transferInferfaceValues(previousUniforms, this.material.uniforms);
        }

        this.trigger(this.lastUpdated ? "update" : "ready");
        this.lastUpdated = Date.now();
      }
    }

    return {

      constructor : Blotter.RenderScope,

      get needsUpdate () { }, // jshint

      set needsUpdate (value) {
        if (value === true) {
          _update.call(this);
        }
      },

      get mappingMaterial () { },

      set mappingMaterial (mappingMaterial) {
        this._mappingMaterial = mappingMaterial;
      },

      play : function () {
        this.playing = true;
      },

      pause : function () {
        this.playing = false;
      },

      render : function () {
        if (this.bounds) {
          var now = Date.now();

          this.frameCount += 1;
          this.timeDelta = (now - (this.lastDrawTime || now)) / 1000;
          this.lastDrawTime = now;

          this.context.clearRect(0, 0, this.domElement.width, this.domElement.height);

          this.context.putImageData(
            this.blotter.imageData,
            this.bounds.x,
            this.bounds.y
          );

          this.trigger("render", [this.frameCount]);
        }
      },

      appendTo : function (element) {
        if (typeof element.append === "function") {
          element.append(this.domElement);
        } else {
          element.appendChild(this.domElement);
        }

        _setMouseEventListeners.call(this);

        return this;
      }
    };
  })();

  Blotter._extendWithGettersSetters(Blotter.RenderScope.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.EventEmitter
);

(function(Blotter, _, THREE, EventEmitter) {

  var root = this;

  Blotter.Renderer = function () {
    this._currentAnimationLoop = false;

    this._scene = new THREE.Scene();

    this._plane = new THREE.PlaneGeometry(1, 1);

    this._material = new THREE.MeshBasicMaterial(); // Stub material.

    this._mesh = new THREE.Mesh(this._plane, this._material);
    this._scene.add(this._mesh);

    this._camera = new THREE.OrthographicCamera(0.5, 0.5, 0.5, 0.5, 0, 100);

    this.init.apply(this, arguments);
  };

  Blotter.Renderer.prototype = (function () {

    function _getRenderTargetWithSize (width, height) {
      var renderTarget = new THREE.WebGLRenderTarget(width, height, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType
      });

      renderTarget.texture.generateMipmaps = false;
      renderTarget.width = width;
      renderTarget.height = height;

      return renderTarget;
    }

    function _loop () {
      Blotter.webglRenderer.render(this._scene, this._camera, this._renderTarget);

      Blotter.webglRenderer.readRenderTargetPixels(
        this._renderTarget,
        0,
        0,
        this._renderTarget.width,
        this._renderTarget.height,
        this._imageDataArray
      );

      this.trigger("render");

      this._currentAnimationLoop = root.requestAnimationFrame(_.bind(_loop, this));
    }

    return {

      constructor : Blotter.Renderer,

      get material () { }, // jshint

      set material (material) {
        if (material instanceof THREE.Material) {
          this._material = material;
          this._mesh.material = material;
        }
      },

      get width () {
        return this._width;
      },

      set width (width) {
        this.setSize(width, this._height);
      },

      get height () {
        return this._height;
      },

      set height (height) {
        this.setSize(this._width, height);
      },

      init : function () {
        this.setSize(1, 1);
      },

      start : function () {
        if (!this._currentAnimationLoop) {
          _loop.call(this);
        }
      },

      stop : function () {
        if (this._currentAnimationLoop) {
          root.cancelAnimationFrame(this._currentAnimationLoop);
          this._currentAnimationLoop = undefined;
        }
      },

      setSize : function (width, height) {
        this._width = Math.trunc(width) || 1;
        this._height = Math.trunc(height) || 1;

        this._mesh.scale.set(this._width, this._height, 1);

        this._camera.left = this._width / - 2;
        this._camera.right = this._width / 2;
        this._camera.top = this._height / 2;
        this._camera.bottom = this._height / - 2;
        this._camera.updateProjectionMatrix();

        this._renderTarget = _getRenderTargetWithSize(this._width, this._height);

        this._viewBuffer = new ArrayBuffer(this._width * this._height * 4);
        this._imageDataArray = new Uint8Array(this._viewBuffer);
        this._clampedImageDataArray = new Uint8ClampedArray(this._viewBuffer);

        this.imageData = new ImageData(this._clampedImageDataArray, this._width, this._height);
      },

      teardown : function () {
        this.stop();
      }
    };
  })();

  Blotter._extendWithGettersSetters(Blotter.Renderer.prototype, EventEmitter.prototype);

})(
  this.Blotter, this._, this.THREE, this.EventEmitter
);

(function(Blotter, _, THREE, setImmediate) {

  // Create a Data Texture holding the boundaries (x/y offset and w/h) that should be available to any given texel for any given text.

  Blotter.BoundsDataTextureBuilder = (function () {

    function _boundsDataForMapping (mapping) {
      var texts = mapping.texts,
          data = new Float32Array(texts.length * 4);

      for (var i = 0; i < texts.length; i++) {
        var text = texts[i],
            bounds = mapping.boundsForText(text);

        data[4*i]   = bounds.x;                               // x
        data[4*i+1] = mapping.height - (bounds.y + bounds.h); // y
        data[4*i+2] = bounds.w;                               // w
        data[4*i+3] = bounds.h;                               // h
      }

      return data;
    }

    return {

      build : function (mapping, completion) {
        setImmediate(function() {
          var data = _boundsDataForMapping(mapping),
              texture = new THREE.DataTexture(data, mapping.texts.length, 1, THREE.RGBAFormat, THREE.FloatType);

          texture.needsUpdate = true;

          completion(texture);
        });
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.setImmediate
);

(function(Blotter, _, THREE, setImmediate) {

  // Create a Data Texture the size of our text map wherein every texel holds the index of text whose boundaries contain the given texel's position.

  Blotter.IndicesDataTextureBuilder = (function () {

    function _indicesDataForMapping (mapping, width, height, sampleAccuracy) {

      var ratio = mapping.ratio,
          points = new Float32Array((height * width) * 4),
          widthStepModifier = width % 1,
          indicesOffset = (1 / mapping.texts.length) / 2; // Values stored in this texture will be sampled from the 'middle' of their texel position.

      for (var i = 1; i < points.length / 4; i++) {

        var y = Math.ceil(i / (width - widthStepModifier)),
            x = i - ((width - widthStepModifier) * (y - 1)),
            refIndex = 0.0,
            bg = 0.0,
            a = 0.0;

        for (var ki = 0; ki < mapping.texts.length; ki++) {
          var text = mapping.texts[ki],
              bounds = mapping.boundsForText(text),
              bW = (bounds.w / ratio) * sampleAccuracy,
              bH = (bounds.h / ratio) * sampleAccuracy,
              bX = (bounds.x / ratio) * sampleAccuracy,
              bY = (bounds.y / ratio) * sampleAccuracy;

          // If x and y are within the fit bounds of the text space within our mapped texts texture.
          if (y >= bY &&
              y <= bY + bH &&
              x >= bX &&
              x <= bX + bW) {
            refIndex = (ki / mapping.texts.length) + indicesOffset;
            a = 1.0;
            break;
          }
        }

        var index = i - 1;

        points[4*index+0] = refIndex;
        points[4*index+1] = bg;
        points[4*index+2] = bg;
        points[4*index+3] = a;
      }
      return points;
    }

    return {

      build : function (mapping, completion) {
        // There is a negative coorelation between the sampleAccuracy value and
        // the speed at which texture generation happens.
        // However, the lower this value, the less sampleAccuracy you can expect
        // for indexing into uniforms for any given text.
        // Value must be between 0.0 and 1.0, and you are advised to keep it around 0.5.
        var sampleAccuracy = 0.5;

        setImmediate(function() {
          var width = (mapping.width / mapping.ratio) * sampleAccuracy,
              height = (mapping.height / mapping.ratio) * sampleAccuracy,
              data = _indicesDataForMapping(mapping, width, height, sampleAccuracy),
              texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.FloatType);

          texture.flipY = true;
          texture.needsUpdate = true;

          completion(texture);
        });
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.setImmediate
);


(function(Blotter, _, THREE) {

  Blotter.TextTextureBuilder = (function() {

    return {

      build : function (mapping, completion) {
        var loader = new THREE.TextureLoader(),
            url;

        mapping.toCanvas(_.bind(function(canvas) {
          url = canvas.toDataURL();

          loader.load(url, _.bind(function(texture) {
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = true;
            texture.needsUpdate = true;

            completion(texture);
          }, this));
        }, this));
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE
);

(function(Blotter, _, THREE, GrowingPacker, setImmediate) {

  Blotter.MappingBuilder = (function () {

    // Sort texts based on area of space required for any given text, descending

    function _sortTexts (textA, textB) {
      var areaA = textA.w * textA.h,
          areaB = textB.w * textB.h;

      return areaB - areaA;
    }

    function _getTextSizes (texts) {
      return _.reduce(texts, function (textSizes, text) {
        var size = Blotter.TextUtils.sizeForText(text.value, text.properties);
        textSizes[text.id] = size;
        return textSizes;
      }, []);
    }

    return {

      build : function (texts, completion) {
        setImmediate(function() {
          var filteredTexts = Blotter.TextUtils.filterTexts(texts),
              textSizes = _getTextSizes(filteredTexts),
              packer = new GrowingPacker(),
              tempTextBounds = [],
              textBounds = {},
              mapping;

          // Build array of objects holding a Text object's id, width, and height for sorting.
          for (var textId in textSizes) {
            if (textSizes.hasOwnProperty(textId)) {
              var tempSizesObject = textSizes[textId];
              tempSizesObject.referenceId = textId;
              tempTextBounds.push(tempSizesObject);
            }
          }

          // Add fit object to all objects in tempTextBounds.
          packer.fit(tempTextBounds.sort(_sortTexts));

          // Add fit objects back into this._textBounds for each Text id.
          for (var i = 0; i < tempTextBounds.length; i++) {
            var packedSizesObject = tempTextBounds[i];
            textBounds[packedSizesObject.referenceId] = {
              w : packedSizesObject.w,
              h : packedSizesObject.h,
              x : packedSizesObject.fit.x,
              y : packer.root.h - (packedSizesObject.fit.y + packedSizesObject.h)
            };
          }

          completion(new Blotter.Mapping(filteredTexts, textBounds, packer.root.w, packer.root.h));
        });
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE, this.GrowingPacker, this.setImmediate
);

(function(Blotter, _, THREE) {

  Blotter.MappingMaterialBuilder = (function() {

    function _vertexSrc () {
      var vertexSrc = [

        "varying vec2 _vTexCoord;",

        "void main() {",

        "  _vTexCoord = uv;",
        "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",

        "}"

      ];

      return vertexSrc.join("\n");
    }

    function _fragmentSrc (userUniformDataTextureObjects, textsLength, mainImageSrc) {
      var fragmentSrc,
          userUniforms = {
            // Strings of uniform declarations for each publicly facing version of each user defined and default uniform.
            publicUniformDeclarations : "",
            // Strings of uniform definitions for each publicly facing version of each user defined and default uniform.
            publicUniformDefinitions : ""
          },
          halfPixel = ((1 / userUniformDataTextureObjects.data.length) / 2).toFixed(20),
          userUniformsTextureWidth = (userUniformDataTextureObjects.texture.image.width).toFixed(1);

      _.reduce(userUniformDataTextureObjects.userUniforms, function (userUniforms, uniformObject, uniformName) {
        var glslSwizzle = Blotter.UniformUtils.fullSwizzleStringForUniformType(uniformObject.userUniform.type),
            glslDataType = Blotter.UniformUtils.glslDataTypeForUniformType(uniformObject.userUniform.type);

        // This is super convoluted. Sorry. All user uniforms are passed in a single texture, where for each uniform
        //   there is a single rgba value per text. Within this texture data we need to be able to locate the position
        //   of any given text's value for the given uniform. The maths here use the `textIndex` value, a value
        //   sampled via the `indicesValueTexture`, to locate the text value for the given uniform, and then offsets that
        //   value by half a texel in the overall _userUniformsTexture
        var uniformSamplePosition = "((" + (uniformObject.position).toFixed(1) + " + ((textIndex - ((1.0 / " + textsLength.toFixed(1) + ") / 2.0)) * " + textsLength.toFixed(1) + ")) / " + userUniformsTextureWidth + ") + " + halfPixel;

        userUniforms.publicUniformDeclarations += glslDataType + " " + uniformName + ";\n";
        userUniforms.publicUniformDefinitions += "   " + uniformName + " = texture2D(_userUniformsTexture, vec2(" + uniformSamplePosition + ", 0.5))." + glslSwizzle + ";\n";

        return userUniforms;
      }, userUniforms);

      fragmentSrc = [

        Blotter.Assets.Shaders.Blending,

        Blotter.Assets.Shaders.TextTexture,

        // Private blotter defined uniforms.
        "uniform sampler2D _uSampler;",
        "uniform vec2 _uCanvasResolution;",
        "uniform sampler2D _uTextIndicesTexture;",
        "uniform sampler2D _uTextBoundsTexture;",

        // Private texCoord and bounds information.
        "varying vec2 _vTexCoord;",
        "vec4 _textBounds;",

        // Private versions of user defined and default uniform declarations
        "uniform sampler2D _userUniformsTexture;",

        // Public versions of user defined and default uniform declarations
        userUniforms.publicUniformDeclarations,

        "// Helper function used by user programs to retrieve texel color information within the bounds of",
        "// any given text. This is to be used instead of `texture2D` in the fragment sources for all Blotter materials.",
        "vec4 textTexture(vec2 coord) {",
        "   vec2 adjustedFragCoord = _textBounds.xy + vec2((_textBounds.z * coord.x), (_textBounds.w * coord.y));",
        "   vec2 uv = adjustedFragCoord.xy / _uCanvasResolution;",

        "   //  If adjustedFragCoord falls outside the bounds of the current texel's text, return `vec4(0.0)`.",
        "   if (adjustedFragCoord.x < _textBounds.x ||",
        "       adjustedFragCoord.x > _textBounds.x + _textBounds.z ||",
        "       adjustedFragCoord.y < _textBounds.y ||",
        "       adjustedFragCoord.y > _textBounds.y + _textBounds.w) {",
        "     return vec4(0.0);",
        "   }",

        "   return texture2D(_uSampler, uv);",
        "}",

        "void mainImage(out vec4 mainImage, in vec2 fragCoord);",

        mainImageSrc,

        "void main(void) {",

        //  Retrieve text index and text alpha for text bounds in which texel is contained.
        "   vec4 textIndexData = texture2D(_uTextIndicesTexture, _vTexCoord);",
        "   float textIndex = textIndexData.r;",
        "   float textAlpha = textIndexData.a;",

        //  Make bounds for the current text globally visible.
        "   _textBounds = texture2D(_uTextBoundsTexture, vec2(textIndex, 0.5));",

        //  Set "uniform" values visible to user.
        userUniforms.publicUniformDefinitions,
        "   uResolution = _textBounds.zw;",

        //  Set fragment coordinate in respect to position within text bounds.
        "   vec2 fragCoord = gl_FragCoord.xy - _textBounds.xy;",
        //  Call user defined fragment function, setting outColor on return.
        "   vec4 outColor;",
        "   mainImage(outColor, fragCoord);",

        //  Multiply alpha by original textIndexData's fourth value."
        //  this will be 0 for texels not within any 'text' area."
        "   outColor.a = outColor.a * textAlpha;",
        "   gl_FragColor = outColor;",
        "}"

      ];

      return fragmentSrc.join("\n");
    }

    function _buildMappedTextsTexture (mapping, completion) {
      Blotter.TextTextureBuilder.build(mapping, function (texture) {
        completion(texture);
      });
    }

    function _buildMappingDataTextureObjects (mapping, completion) {
      var buildIndicesTexture,
          buildBoundsTexture,
          mappingDataTextureObjects = [],
          buildStages;

      buildIndicesTexture = function () {
        return function (next) {
          Blotter.IndicesDataTextureBuilder.build(mapping, function (texture) {
            mappingDataTextureObjects.push({
              uniformName : "_uTextIndicesTexture",
              texture : texture
            });
            next();
          });
        };
      };

      buildBoundsTexture = function () {
        return function (next) {
          Blotter.BoundsDataTextureBuilder.build(mapping, function (texture) {
            mappingDataTextureObjects.push({
              uniformName : "_uTextBoundsTexture",
              texture : texture
            });
            next();
          });
        };
      };

      buildStages = [
        buildIndicesTexture(),
        buildBoundsTexture()
      ];

      _(buildStages).reduceRight(_.wrap, function () {
        completion(mappingDataTextureObjects);
      })();
    }

    function _buildUserUniformDataTextureObjects (userUniforms, textsLength, completion) {
      Blotter.UniformUtils.ensureHasRequiredDefaultUniforms(userUniforms,
        "Blotter.MappingMaterialBuilder",
        "_buildUserUniformDataTextureObjects");

      userUniforms = Blotter.UniformUtils.extractValidUniforms(userUniforms);

      var uniformsDataLength = Object.keys(userUniforms).length * textsLength;
      var data = new Float32Array(uniformsDataLength * 4);
      var texture = new THREE.DataTexture(data, uniformsDataLength, 1, THREE.RGBAFormat, THREE.FloatType);

      var userUniformDataTextureObjects = {
        data : data,
        texture : texture,
        userUniforms : {}
      };

      _.reduce(userUniforms, function (memo, userUniform, uniformName) {
        var uniformPosition = Object.keys(userUniforms).indexOf(uniformName) * textsLength;

        memo.userUniforms[uniformName] = {
          userUniform : userUniform,
          position : uniformPosition
        };

        return memo;
      }, userUniformDataTextureObjects);

      completion(userUniformDataTextureObjects);
    }

    function _getUniformsForMappingDataTextureObjects (mappingDataTextureObjects) {
      return _.reduce(mappingDataTextureObjects, function (memo, mappingDataTextureObject) {
        memo[mappingDataTextureObject.uniformName] = {
          type : "t",
          value : mappingDataTextureObject.texture
        };
        return memo;
      }, {});
    }

    function _getUniformsForUserUniformDataObjects (userUniformDataObjects) {
      return {
        _userUniformsTexture: {
          type : "t",
          value : userUniformDataObjects.texture
        }
      };
    }

    function _getUniforms (width, height, mappedTextsTexture, mappingDataTextureObjects, userUniformDataTextureObjects) {
      var uniforms = {
        _uSampler : { type : "t", value : mappedTextsTexture },
        _uCanvasResolution : { type : "2f", value : [width, height] }
      };

      _.extend(uniforms, _getUniformsForMappingDataTextureObjects(mappingDataTextureObjects));
      _.extend(uniforms, _getUniformsForUserUniformDataObjects(userUniformDataTextureObjects));

      return uniforms;
    }

    function _getThreeMaterial (vertexSrc, fragmentSrc, uniforms) {
      var threeMaterial = new THREE.ShaderMaterial({
        vertexShader : vertexSrc,
        fragmentShader : fragmentSrc,
        uniforms : uniforms
      });

      threeMaterial.depthTest = false;
      threeMaterial.depthWrite = false;
      threeMaterial.premultipliedAlpha = false;

      return threeMaterial;
    }

    return {

      build : function (mapping, material, completion) {
        var buildMappedTextsTexture,
            buildMappingDataTextureObjects,
            buildUserUniformDataAndDataTextureObjects,
            mappedTextsTexture,
            mappingDataTextureObjects,
            userUniformDataAndDataTextureObjects,
            buildStages;

        buildMappedTextsTexture = function () {
          return function (next) {
            _buildMappedTextsTexture(mapping, function (texture) {
              mappedTextsTexture = texture;
              next();
            });
          };
        };

        buildMappingDataTextureObjects = function () {
          return function (next) {
            _buildMappingDataTextureObjects(mapping, function (objects) {
              mappingDataTextureObjects = objects;
              next();
            });
          };
        };

        buildUserUniformDataTextureObjects = function () {
          return function (next) {
            _buildUserUniformDataTextureObjects(material.uniforms, mapping.texts.length, function (objects) {
              userUniformDataTextureObjects = objects;
              next();
            });
          };
        };

        buildStages = [
          buildMappedTextsTexture(),
          buildMappingDataTextureObjects(),
          buildUserUniformDataTextureObjects()
        ];

        _(buildStages).reduceRight(_.wrap, function () {
          var uniforms = _getUniforms(
                mapping.width,
                mapping.height,
                mappedTextsTexture,
                mappingDataTextureObjects,
                userUniformDataTextureObjects
              ),
              userUniforms = _.omit(uniforms, "_uCanvasResolution", "_uSampler", "_uTextBoundsTexture", "_uTextIndicesTexture"),
              threeMaterial = _getThreeMaterial(_vertexSrc(), _fragmentSrc(userUniformDataTextureObjects, mapping.texts.length, material.mainImage), uniforms);

          completion(new Blotter.MappingMaterial(mapping, material, threeMaterial, userUniformDataTextureObjects));
        })();
      }
    };
  })();

})(
  this.Blotter, this._, this.THREE
);
