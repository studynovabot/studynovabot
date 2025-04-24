/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/chat/route";
exports.ids = ["app/api/chat/route"];
exports.modules = {

/***/ "(rsc)/./app/api/chat/route.ts":
/*!*******************************!*\
  !*** ./app/api/chat/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nasync function POST(req) {\n    try {\n        // Parse the request body\n        const body = await req.json();\n        const { messages } = body;\n        // Validate the `messages` array\n        if (!messages || !Array.isArray(messages)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid messages format. It must be an array.\"\n            }, {\n                status: 400\n            });\n        }\n        // Validate each message's structure\n        const validRoles = [\n            \"user\",\n            \"assistant\",\n            \"system\"\n        ];\n        for (const message of messages){\n            if (!message.role || !message.content) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: \"Each message must have a 'role' and 'content'.\"\n                }, {\n                    status: 400\n                });\n            }\n            if (!validRoles.includes(message.role)) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: `Invalid role: ${message.role}. Valid roles are ${validRoles.join(\", \")}.`\n                }, {\n                    status: 400\n                });\n            }\n        }\n        // Forward the request to the external AI service\n        const response = await fetch(\"https://api.groq.com/openai/v1/chat/completions\", {\n            method: \"POST\",\n            headers: {\n                \"Authorization\": `Bearer ${process.env.GROQ_API_KEY}`,\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                model: \"llama-3.1-8b-instant\",\n                messages\n            })\n        });\n        // Handle external API errors\n        if (!response.ok) {\n            const errorData = await response.json();\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: errorData.error || \"Failed to fetch response from Groq API.\"\n            }, {\n                status: response.status\n            });\n        }\n        // Parse and return the successful response\n        const data = await response.json();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            reply: data.choices[0]?.message?.content || \"No response from AI.\"\n        });\n    } catch (error) {\n        console.error(\"Error occurred:\", error); // Fixed unused variable error\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoYXQvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBMkM7QUFFcEMsZUFBZUMsS0FBS0MsR0FBWTtJQUNyQyxJQUFJO1FBQ0YseUJBQXlCO1FBQ3pCLE1BQU1DLE9BQU8sTUFBTUQsSUFBSUUsSUFBSTtRQUMzQixNQUFNLEVBQUVDLFFBQVEsRUFBRSxHQUFHRjtRQUVyQixnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDRSxZQUFZLENBQUNDLE1BQU1DLE9BQU8sQ0FBQ0YsV0FBVztZQUN6QyxPQUFPTCxxREFBWUEsQ0FBQ0ksSUFBSSxDQUN0QjtnQkFBRUksT0FBTztZQUFnRCxHQUN6RDtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsb0NBQW9DO1FBQ3BDLE1BQU1DLGFBQWE7WUFBQztZQUFRO1lBQWE7U0FBUztRQUNsRCxLQUFLLE1BQU1DLFdBQVdOLFNBQVU7WUFDOUIsSUFBSSxDQUFDTSxRQUFRQyxJQUFJLElBQUksQ0FBQ0QsUUFBUUUsT0FBTyxFQUFFO2dCQUNyQyxPQUFPYixxREFBWUEsQ0FBQ0ksSUFBSSxDQUN0QjtvQkFBRUksT0FBTztnQkFBaUQsR0FDMUQ7b0JBQUVDLFFBQVE7Z0JBQUk7WUFFbEI7WUFDQSxJQUFJLENBQUNDLFdBQVdJLFFBQVEsQ0FBQ0gsUUFBUUMsSUFBSSxHQUFHO2dCQUN0QyxPQUFPWixxREFBWUEsQ0FBQ0ksSUFBSSxDQUN0QjtvQkFBRUksT0FBTyxDQUFDLGNBQWMsRUFBRUcsUUFBUUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFRixXQUFXSyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQUMsR0FDcEY7b0JBQUVOLFFBQVE7Z0JBQUk7WUFFbEI7UUFDRjtRQUVBLGlEQUFpRDtRQUNqRCxNQUFNTyxXQUFXLE1BQU1DLE1BQU0sbURBQW1EO1lBQzlFQyxRQUFRO1lBQ1JDLFNBQVM7Z0JBQ1AsaUJBQWlCLENBQUMsT0FBTyxFQUFFQyxRQUFRQyxHQUFHLENBQUNDLFlBQVksRUFBRTtnQkFDckQsZ0JBQWdCO1lBQ2xCO1lBQ0FuQixNQUFNb0IsS0FBS0MsU0FBUyxDQUFDO2dCQUNuQkMsT0FBTztnQkFDUHBCO1lBQ0Y7UUFDRjtRQUVBLDZCQUE2QjtRQUM3QixJQUFJLENBQUNXLFNBQVNVLEVBQUUsRUFBRTtZQUNoQixNQUFNQyxZQUFZLE1BQU1YLFNBQVNaLElBQUk7WUFDckMsT0FBT0oscURBQVlBLENBQUNJLElBQUksQ0FDdEI7Z0JBQUVJLE9BQU9tQixVQUFVbkIsS0FBSyxJQUFJO1lBQTBDLEdBQ3RFO2dCQUFFQyxRQUFRTyxTQUFTUCxNQUFNO1lBQUM7UUFFOUI7UUFFQSwyQ0FBMkM7UUFDM0MsTUFBTW1CLE9BQU8sTUFBTVosU0FBU1osSUFBSTtRQUNoQyxPQUFPSixxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO1lBQUV5QixPQUFPRCxLQUFLRSxPQUFPLENBQUMsRUFBRSxFQUFFbkIsU0FBU0UsV0FBVztRQUF1QjtJQUNoRyxFQUFFLE9BQU9MLE9BQU87UUFDZHVCLFFBQVF2QixLQUFLLENBQUMsbUJBQW1CQSxRQUFRLDhCQUE4QjtRQUN2RSxPQUFPUixxREFBWUEsQ0FBQ0ksSUFBSSxDQUN0QjtZQUFFSSxPQUFPO1FBQXdCLEdBQ2pDO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJFOlxcY2FzY2FkZVxcQ2FzY2FkZVByb2plY3RzXFx3aW5kc3VyZi1wcm9qZWN0XFxzdHVkeW5vdmFib3QtZmluYWxcXGFwcFxcYXBpXFxjaGF0XFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBQYXJzZSB0aGUgcmVxdWVzdCBib2R5XHJcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKTtcclxuICAgIGNvbnN0IHsgbWVzc2FnZXMgfSA9IGJvZHk7XHJcblxyXG4gICAgLy8gVmFsaWRhdGUgdGhlIGBtZXNzYWdlc2AgYXJyYXlcclxuICAgIGlmICghbWVzc2FnZXMgfHwgIUFycmF5LmlzQXJyYXkobWVzc2FnZXMpKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIkludmFsaWQgbWVzc2FnZXMgZm9ybWF0LiBJdCBtdXN0IGJlIGFuIGFycmF5LlwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVmFsaWRhdGUgZWFjaCBtZXNzYWdlJ3Mgc3RydWN0dXJlXHJcbiAgICBjb25zdCB2YWxpZFJvbGVzID0gW1widXNlclwiLCBcImFzc2lzdGFudFwiLCBcInN5c3RlbVwiXTtcclxuICAgIGZvciAoY29uc3QgbWVzc2FnZSBvZiBtZXNzYWdlcykge1xyXG4gICAgICBpZiAoIW1lc3NhZ2Uucm9sZSB8fCAhbWVzc2FnZS5jb250ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgICAgeyBlcnJvcjogXCJFYWNoIG1lc3NhZ2UgbXVzdCBoYXZlIGEgJ3JvbGUnIGFuZCAnY29udGVudCcuXCIgfSxcclxuICAgICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF2YWxpZFJvbGVzLmluY2x1ZGVzKG1lc3NhZ2Uucm9sZSkpIHtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgICB7IGVycm9yOiBgSW52YWxpZCByb2xlOiAke21lc3NhZ2Uucm9sZX0uIFZhbGlkIHJvbGVzIGFyZSAke3ZhbGlkUm9sZXMuam9pbihcIiwgXCIpfS5gIH0sXHJcbiAgICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRm9yd2FyZCB0aGUgcmVxdWVzdCB0byB0aGUgZXh0ZXJuYWwgQUkgc2VydmljZVxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vYXBpLmdyb3EuY29tL29wZW5haS92MS9jaGF0L2NvbXBsZXRpb25zXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7cHJvY2Vzcy5lbnYuR1JPUV9BUElfS0VZfWAsIC8vIFVzZSB5b3VyIEdyb3EgQVBJIGtleVxyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgbW9kZWw6IFwibGxhbWEtMy4xLThiLWluc3RhbnRcIiwgLy8gUmVwbGFjZSB3aXRoIHRoZSBjb3JyZWN0IG1vZGVsIGlmIG5lZWRlZFxyXG4gICAgICAgIG1lc3NhZ2VzLFxyXG4gICAgICB9KSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhbmRsZSBleHRlcm5hbCBBUEkgZXJyb3JzXHJcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6IGVycm9yRGF0YS5lcnJvciB8fCBcIkZhaWxlZCB0byBmZXRjaCByZXNwb25zZSBmcm9tIEdyb3EgQVBJLlwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUGFyc2UgYW5kIHJldHVybiB0aGUgc3VjY2Vzc2Z1bCByZXNwb25zZVxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHJlcGx5OiBkYXRhLmNob2ljZXNbMF0/Lm1lc3NhZ2U/LmNvbnRlbnQgfHwgXCJObyByZXNwb25zZSBmcm9tIEFJLlwiIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igb2NjdXJyZWQ6XCIsIGVycm9yKTsgLy8gRml4ZWQgdW51c2VkIHZhcmlhYmxlIGVycm9yXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApO1xyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJQT1NUIiwicmVxIiwiYm9keSIsImpzb24iLCJtZXNzYWdlcyIsIkFycmF5IiwiaXNBcnJheSIsImVycm9yIiwic3RhdHVzIiwidmFsaWRSb2xlcyIsIm1lc3NhZ2UiLCJyb2xlIiwiY29udGVudCIsImluY2x1ZGVzIiwiam9pbiIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwicHJvY2VzcyIsImVudiIsIkdST1FfQVBJX0tFWSIsIkpTT04iLCJzdHJpbmdpZnkiLCJtb2RlbCIsIm9rIiwiZXJyb3JEYXRhIiwiZGF0YSIsInJlcGx5IiwiY2hvaWNlcyIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/chat/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=E%3A%5Ccascade%5CCascadeProjects%5Cwindsurf-project%5Cstudynovabot-final%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Ccascade%5CCascadeProjects%5Cwindsurf-project%5Cstudynovabot-final&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=E%3A%5Ccascade%5CCascadeProjects%5Cwindsurf-project%5Cstudynovabot-final%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Ccascade%5CCascadeProjects%5Cwindsurf-project%5Cstudynovabot-final&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var E_cascade_CascadeProjects_windsurf_project_studynovabot_final_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/chat/route.ts */ \"(rsc)/./app/api/chat/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/chat/route\",\n        pathname: \"/api/chat\",\n        filename: \"route\",\n        bundlePath: \"app/api/chat/route\"\n    },\n    resolvedPagePath: \"E:\\\\cascade\\\\CascadeProjects\\\\windsurf-project\\\\studynovabot-final\\\\app\\\\api\\\\chat\\\\route.ts\",\n    nextConfigOutput,\n    userland: E_cascade_CascadeProjects_windsurf_project_studynovabot_final_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjaGF0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZjaGF0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY2hhdCUyRnJvdXRlLnRzJmFwcERpcj1FJTNBJTVDY2FzY2FkZSU1Q0Nhc2NhZGVQcm9qZWN0cyU1Q3dpbmRzdXJmLXByb2plY3QlNUNzdHVkeW5vdmFib3QtZmluYWwlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUUlM0ElNUNjYXNjYWRlJTVDQ2FzY2FkZVByb2plY3RzJTVDd2luZHN1cmYtcHJvamVjdCU1Q3N0dWR5bm92YWJvdC1maW5hbCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDNEM7QUFDekg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkU6XFxcXGNhc2NhZGVcXFxcQ2FzY2FkZVByb2plY3RzXFxcXHdpbmRzdXJmLXByb2plY3RcXFxcc3R1ZHlub3ZhYm90LWZpbmFsXFxcXGFwcFxcXFxhcGlcXFxcY2hhdFxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvY2hhdC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2NoYXRcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2NoYXQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJFOlxcXFxjYXNjYWRlXFxcXENhc2NhZGVQcm9qZWN0c1xcXFx3aW5kc3VyZi1wcm9qZWN0XFxcXHN0dWR5bm92YWJvdC1maW5hbFxcXFxhcHBcXFxcYXBpXFxcXGNoYXRcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=E%3A%5Ccascade%5CCascadeProjects%5Cwindsurf-project%5Cstudynovabot-final%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Ccascade%5CCascadeProjects%5Cwindsurf-project%5Cstudynovabot-final&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=E%3A%5Ccascade%5CCascadeProjects%5Cwindsurf-project%5Cstudynovabot-final%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Ccascade%5CCascadeProjects%5Cwindsurf-project%5Cstudynovabot-final&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();