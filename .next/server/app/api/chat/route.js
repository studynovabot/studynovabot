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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nasync function POST(req) {\n    try {\n        // Parse the request body\n        const body = await req.json();\n        const { messages } = body;\n        // Validate the `messages` array\n        if (!messages || !Array.isArray(messages)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid messages format. It must be an array.\"\n            }, {\n                status: 400\n            });\n        }\n        // Validate each message's structure\n        const validRoles = [\n            \"user\",\n            \"assistant\",\n            \"system\"\n        ];\n        for (const message of messages){\n            if (!message.role || !message.content) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: \"Each message must have a 'role' and 'content'.\"\n                }, {\n                    status: 400\n                });\n            }\n            if (!validRoles.includes(message.role)) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: `Invalid role: ${message.role}. Valid roles are ${validRoles.join(\", \")}.`\n                }, {\n                    status: 400\n                });\n            }\n        }\n        // Forward the request to the external AI service\n        const response = await fetch(process.env.GROQ_API_URL, {\n            method: \"POST\",\n            headers: {\n                \"Authorization\": `Bearer ${process.env.GROQ_API_KEY}`,\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                model: process.env.GROQ_MODEL,\n                messages\n            })\n        });\n        // Handle external API errors\n        if (!response.ok) {\n            let errorData = {};\n            try {\n                errorData = await response.json();\n            } catch  {\n                const errorText = await response.text();\n                errorData = {\n                    error: errorText\n                };\n            }\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: errorData.error || \"Failed to fetch response from Groq API.\"\n            }, {\n                status: response.status\n            });\n        }\n        // Parse and return the successful response\n        const data = await response.json();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            reply: data.choices[0]?.message?.content || \"No response from AI.\"\n        });\n    } catch (error) {\n        console.error(\"Error occurred:\", error); // Fixed unused variable error\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoYXQvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBMkM7QUFFcEMsZUFBZUMsS0FBS0MsR0FBWTtJQUNyQyxJQUFJO1FBQ0YseUJBQXlCO1FBQ3pCLE1BQU1DLE9BQU8sTUFBTUQsSUFBSUUsSUFBSTtRQUMzQixNQUFNLEVBQUVDLFFBQVEsRUFBRSxHQUFHRjtRQUVyQixnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDRSxZQUFZLENBQUNDLE1BQU1DLE9BQU8sQ0FBQ0YsV0FBVztZQUN6QyxPQUFPTCxxREFBWUEsQ0FBQ0ksSUFBSSxDQUN0QjtnQkFBRUksT0FBTztZQUFnRCxHQUN6RDtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsb0NBQW9DO1FBQ3BDLE1BQU1DLGFBQWE7WUFBQztZQUFRO1lBQWE7U0FBUztRQUNsRCxLQUFLLE1BQU1DLFdBQVdOLFNBQVU7WUFDOUIsSUFBSSxDQUFDTSxRQUFRQyxJQUFJLElBQUksQ0FBQ0QsUUFBUUUsT0FBTyxFQUFFO2dCQUNyQyxPQUFPYixxREFBWUEsQ0FBQ0ksSUFBSSxDQUN0QjtvQkFBRUksT0FBTztnQkFBaUQsR0FDMUQ7b0JBQUVDLFFBQVE7Z0JBQUk7WUFFbEI7WUFDQSxJQUFJLENBQUNDLFdBQVdJLFFBQVEsQ0FBQ0gsUUFBUUMsSUFBSSxHQUFHO2dCQUN0QyxPQUFPWixxREFBWUEsQ0FBQ0ksSUFBSSxDQUN0QjtvQkFBRUksT0FBTyxDQUFDLGNBQWMsRUFBRUcsUUFBUUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFRixXQUFXSyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQUMsR0FDcEY7b0JBQUVOLFFBQVE7Z0JBQUk7WUFFbEI7UUFDRjtRQUVBLGlEQUFpRDtRQUNqRCxNQUFNTyxXQUFXLE1BQU1DLE1BQU1DLFFBQVFDLEdBQUcsQ0FBQ0MsWUFBWSxFQUFHO1lBQ3REQyxRQUFRO1lBQ1JDLFNBQVM7Z0JBQ1AsaUJBQWlCLENBQUMsT0FBTyxFQUFFSixRQUFRQyxHQUFHLENBQUNJLFlBQVksRUFBRTtnQkFDckQsZ0JBQWdCO1lBQ2xCO1lBQ0FwQixNQUFNcUIsS0FBS0MsU0FBUyxDQUFDO2dCQUNuQkMsT0FBT1IsUUFBUUMsR0FBRyxDQUFDUSxVQUFVO2dCQUM3QnRCO1lBQ0Y7UUFDRjtRQUVBLDZCQUE2QjtRQUM3QixJQUFJLENBQUNXLFNBQVNZLEVBQUUsRUFBRTtZQUNoQixJQUFJQyxZQUFpQixDQUFDO1lBQ3RCLElBQUk7Z0JBQ0ZBLFlBQVksTUFBTWIsU0FBU1osSUFBSTtZQUNqQyxFQUFFLE9BQU07Z0JBQ04sTUFBTTBCLFlBQVksTUFBTWQsU0FBU2UsSUFBSTtnQkFDckNGLFlBQVk7b0JBQUVyQixPQUFPc0I7Z0JBQVU7WUFDakM7WUFDQSxPQUFPOUIscURBQVlBLENBQUNJLElBQUksQ0FDdEI7Z0JBQUVJLE9BQU9xQixVQUFVckIsS0FBSyxJQUFJO1lBQTBDLEdBQ3RFO2dCQUFFQyxRQUFRTyxTQUFTUCxNQUFNO1lBQUM7UUFFOUI7UUFFQSwyQ0FBMkM7UUFDM0MsTUFBTXVCLE9BQU8sTUFBTWhCLFNBQVNaLElBQUk7UUFDaEMsT0FBT0oscURBQVlBLENBQUNJLElBQUksQ0FBQztZQUFFNkIsT0FBT0QsS0FBS0UsT0FBTyxDQUFDLEVBQUUsRUFBRXZCLFNBQVNFLFdBQVc7UUFBdUI7SUFDaEcsRUFBRSxPQUFPTCxPQUFPO1FBQ2QyQixRQUFRM0IsS0FBSyxDQUFDLG1CQUFtQkEsUUFBUSw4QkFBOEI7UUFDdkUsT0FBT1IscURBQVlBLENBQUNJLElBQUksQ0FDdEI7WUFBRUksT0FBTztRQUF3QixHQUNqQztZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiRTpcXGNhc2NhZGVcXENhc2NhZGVQcm9qZWN0c1xcd2luZHN1cmYtcHJvamVjdFxcc3R1ZHlub3ZhYm90LWZpbmFsXFxhcHBcXGFwaVxcY2hhdFxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIC8vIFBhcnNlIHRoZSByZXF1ZXN0IGJvZHlcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgICBjb25zdCB7IG1lc3NhZ2VzIH0gPSBib2R5O1xuXG4gICAgLy8gVmFsaWRhdGUgdGhlIGBtZXNzYWdlc2AgYXJyYXlcbiAgICBpZiAoIW1lc3NhZ2VzIHx8ICFBcnJheS5pc0FycmF5KG1lc3NhZ2VzKSkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiBcIkludmFsaWQgbWVzc2FnZXMgZm9ybWF0LiBJdCBtdXN0IGJlIGFuIGFycmF5LlwiIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBWYWxpZGF0ZSBlYWNoIG1lc3NhZ2UncyBzdHJ1Y3R1cmVcbiAgICBjb25zdCB2YWxpZFJvbGVzID0gW1widXNlclwiLCBcImFzc2lzdGFudFwiLCBcInN5c3RlbVwiXTtcbiAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgbWVzc2FnZXMpIHtcbiAgICAgIGlmICghbWVzc2FnZS5yb2xlIHx8ICFtZXNzYWdlLmNvbnRlbnQpIHtcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICAgIHsgZXJyb3I6IFwiRWFjaCBtZXNzYWdlIG11c3QgaGF2ZSBhICdyb2xlJyBhbmQgJ2NvbnRlbnQnLlwiIH0sXG4gICAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoIXZhbGlkUm9sZXMuaW5jbHVkZXMobWVzc2FnZS5yb2xlKSkge1xuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgICAgeyBlcnJvcjogYEludmFsaWQgcm9sZTogJHttZXNzYWdlLnJvbGV9LiBWYWxpZCByb2xlcyBhcmUgJHt2YWxpZFJvbGVzLmpvaW4oXCIsIFwiKX0uYCB9LFxuICAgICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZvcndhcmQgdGhlIHJlcXVlc3QgdG8gdGhlIGV4dGVybmFsIEFJIHNlcnZpY2VcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHByb2Nlc3MuZW52LkdST1FfQVBJX1VSTCEsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7cHJvY2Vzcy5lbnYuR1JPUV9BUElfS0VZfWAsIC8vIFVzZSB5b3VyIEdyb3EgQVBJIGtleVxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG1vZGVsOiBwcm9jZXNzLmVudi5HUk9RX01PREVMISxcbiAgICAgICAgbWVzc2FnZXMsXG4gICAgICB9KSxcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBleHRlcm5hbCBBUEkgZXJyb3JzXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgbGV0IGVycm9yRGF0YTogYW55ID0ge307XG4gICAgICB0cnkge1xuICAgICAgICBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgY29uc3QgZXJyb3JUZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICBlcnJvckRhdGEgPSB7IGVycm9yOiBlcnJvclRleHQgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogZXJyb3JEYXRhLmVycm9yIHx8IFwiRmFpbGVkIHRvIGZldGNoIHJlc3BvbnNlIGZyb20gR3JvcSBBUEkuXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFBhcnNlIGFuZCByZXR1cm4gdGhlIHN1Y2Nlc3NmdWwgcmVzcG9uc2VcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHJlcGx5OiBkYXRhLmNob2ljZXNbMF0/Lm1lc3NhZ2U/LmNvbnRlbnQgfHwgXCJObyByZXNwb25zZSBmcm9tIEFJLlwiIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBvY2N1cnJlZDpcIiwgZXJyb3IpOyAvLyBGaXhlZCB1bnVzZWQgdmFyaWFibGUgZXJyb3JcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIlBPU1QiLCJyZXEiLCJib2R5IiwianNvbiIsIm1lc3NhZ2VzIiwiQXJyYXkiLCJpc0FycmF5IiwiZXJyb3IiLCJzdGF0dXMiLCJ2YWxpZFJvbGVzIiwibWVzc2FnZSIsInJvbGUiLCJjb250ZW50IiwiaW5jbHVkZXMiLCJqb2luIiwicmVzcG9uc2UiLCJmZXRjaCIsInByb2Nlc3MiLCJlbnYiLCJHUk9RX0FQSV9VUkwiLCJtZXRob2QiLCJoZWFkZXJzIiwiR1JPUV9BUElfS0VZIiwiSlNPTiIsInN0cmluZ2lmeSIsIm1vZGVsIiwiR1JPUV9NT0RFTCIsIm9rIiwiZXJyb3JEYXRhIiwiZXJyb3JUZXh0IiwidGV4dCIsImRhdGEiLCJyZXBseSIsImNob2ljZXMiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/chat/route.ts\n");

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