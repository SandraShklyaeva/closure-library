// Copyright 2012 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Defines static 'wait' functions that provide a convenient way
 * to wait on results of asynchronous operations.
 *
 */


goog.provide('goog.labs.async.wait');

goog.require('goog.labs.async.Result');


/**
 * Calls the handler on resolution of the result (success or failure).
 * The handler is passed the result object as the only parameter. The call will
 * be immediate if the result is no longer pending.
 *
 * @param {!goog.labs.async.Result} result The result to install the handlers.
 * @param {!function(!goog.labs.async.Result)} handler The handler to be called.
 *     The handler is passed the result object as the only parameter.
 */
goog.labs.async.wait = function(result, handler) {
  result.wait(handler);
};


/**
 * Calls the handler if the result succeeds. The result object is the only
 * parameter passed to the handler. The call will be immediate if the result
 * has already succeeded.
 *
 * @param {!goog.labs.async.Result} result The result to install the handlers.
 * @param {!function(*, !goog.labs.async.Result)} handler The handler to be
 *     called. The handler is passed the result value and the result as
 *     parameters.
 */
goog.labs.async.wait.onSuccess = function(result, handler) {
  result.wait(function(res) {
    if (res.getState() == goog.labs.async.Result.State.SUCCESS) {
      handler(res.getValue(), res);
    }
  });
};


/**
 * Calls the handler if the result action errors. The result object is passed as
 * the only parameter to the handler. The call will be immediate if the result
 * object has already resolved to an error.
 *
 * @param {!goog.labs.async.Result} result The result to install the handlers.
 * @param {!function(!goog.labs.async.Result)} handler The handler to be called.
 *     The handler is passed the result object as the only parameter.
 */
goog.labs.async.wait.onError = function(result, handler) {
  result.wait(function(res) {
    if (res.getState() == goog.labs.async.Result.State.ERROR) {
      handler(res);
    }
  });
};
