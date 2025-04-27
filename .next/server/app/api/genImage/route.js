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
exports.id = "app/api/genImage/route";
exports.ids = ["app/api/genImage/route"];
exports.modules = {

/***/ "(rsc)/./app/api/genImage/route.ts":
/*!***********************************!*\
  !*** ./app/api/genImage/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const { input } = body;\n        if (!input) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: 'Input is required'\n            }, {\n                status: 400\n            });\n        }\n        // Call Stability AI API for image generation\n        const STABILITY_API_KEY = process.env.STABILITY_API_KEY || 'sk-1hOO7fFs2MkyGhxCWr7OoXFbVbYryTuDMGCpe6SsECvANa5B';\n        const STABILITY_API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image';\n        const stabilityRes = await fetch(STABILITY_API_URL, {\n            method: 'POST',\n            headers: {\n                'Content-Type': 'application/json',\n                'Accept': 'application/json',\n                'Authorization': `Bearer ${STABILITY_API_KEY}`\n            },\n            body: JSON.stringify({\n                text_prompts: [\n                    {\n                        text: input\n                    }\n                ],\n                cfg_scale: 7,\n                height: 512,\n                width: 512,\n                steps: 30,\n                samples: 1\n            })\n        });\n        if (!stabilityRes.ok) {\n            const error = await stabilityRes.text();\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error\n            }, {\n                status: stabilityRes.status\n            });\n        }\n        const data = await stabilityRes.json();\n        const base64 = data.artifacts && data.artifacts[0] && data.artifacts[0].base64;\n        if (!base64) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'No image returned from Stability AI'\n            }, {\n                status: 500\n            });\n        }\n        const image = `data:image/png;base64,${base64}`;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            image\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Error generating image:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: 'Internal Server Error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2dlbkltYWdlL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXdEO0FBRWpELGVBQWVDLEtBQUtDLEdBQWdCO0lBQ3pDLElBQUk7UUFDRixNQUFNQyxPQUFPLE1BQU1ELElBQUlFLElBQUk7UUFDM0IsTUFBTSxFQUFFQyxLQUFLLEVBQUUsR0FBR0Y7UUFFbEIsSUFBSSxDQUFDRSxPQUFPO1lBQ1YsT0FBT0wscURBQVlBLENBQUNJLElBQUksQ0FDdEI7Z0JBQUVFLFNBQVM7WUFBb0IsR0FDL0I7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLDZDQUE2QztRQUM3QyxNQUFNQyxvQkFBb0JDLFFBQVFDLEdBQUcsQ0FBQ0YsaUJBQWlCLElBQUk7UUFDM0QsTUFBTUcsb0JBQW9CO1FBRTFCLE1BQU1DLGVBQWUsTUFBTUMsTUFBTUYsbUJBQW1CO1lBQ2xERyxRQUFRO1lBQ1JDLFNBQVM7Z0JBQ1AsZ0JBQWdCO2dCQUNoQixVQUFVO2dCQUNWLGlCQUFpQixDQUFDLE9BQU8sRUFBRVAsbUJBQW1CO1lBQ2hEO1lBQ0FMLE1BQU1hLEtBQUtDLFNBQVMsQ0FBQztnQkFDbkJDLGNBQWM7b0JBQUM7d0JBQUVDLE1BQU1kO29CQUFNO2lCQUFFO2dCQUMvQmUsV0FBVztnQkFDWEMsUUFBUTtnQkFDUkMsT0FBTztnQkFDUEMsT0FBTztnQkFDUEMsU0FBUztZQUNYO1FBQ0Y7UUFFQSxJQUFJLENBQUNaLGFBQWFhLEVBQUUsRUFBRTtZQUNwQixNQUFNQyxRQUFRLE1BQU1kLGFBQWFPLElBQUk7WUFDckMsT0FBT25CLHFEQUFZQSxDQUFDSSxJQUFJLENBQUM7Z0JBQUVzQjtZQUFNLEdBQUc7Z0JBQUVuQixRQUFRSyxhQUFhTCxNQUFNO1lBQUM7UUFDcEU7UUFFQSxNQUFNb0IsT0FBTyxNQUFNZixhQUFhUixJQUFJO1FBQ3BDLE1BQU13QixTQUFTRCxLQUFLRSxTQUFTLElBQUlGLEtBQUtFLFNBQVMsQ0FBQyxFQUFFLElBQUlGLEtBQUtFLFNBQVMsQ0FBQyxFQUFFLENBQUNELE1BQU07UUFDOUUsSUFBSSxDQUFDQSxRQUFRO1lBQ1gsT0FBTzVCLHFEQUFZQSxDQUFDSSxJQUFJLENBQUM7Z0JBQUVzQixPQUFPO1lBQXNDLEdBQUc7Z0JBQUVuQixRQUFRO1lBQUk7UUFDM0Y7UUFDQSxNQUFNdUIsUUFBUSxDQUFDLHNCQUFzQixFQUFFRixRQUFRO1FBQy9DLE9BQU81QixxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO1lBQUUwQjtRQUFNLEdBQUc7WUFBRXZCLFFBQVE7UUFBSTtJQUNwRCxFQUFFLE9BQU9tQixPQUFPO1FBQ2RLLFFBQVFMLEtBQUssQ0FBQywyQkFBMkJBO1FBQ3pDLE9BQU8xQixxREFBWUEsQ0FBQ0ksSUFBSSxDQUN0QjtZQUFFRSxTQUFTO1FBQXdCLEdBQ25DO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJFOlxcY2FzY2FkZVxcQ2FzY2FkZVByb2plY3RzXFx3aW5kc3VyZi1wcm9qZWN0XFxzdHVkeW5vdmFib3QtZmluYWxcXGFwcFxcYXBpXFxnZW5JbWFnZVxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpO1xuICAgIGNvbnN0IHsgaW5wdXQgfSA9IGJvZHk7XG5cbiAgICBpZiAoIWlucHV0KSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgbWVzc2FnZTogJ0lucHV0IGlzIHJlcXVpcmVkJyB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gQ2FsbCBTdGFiaWxpdHkgQUkgQVBJIGZvciBpbWFnZSBnZW5lcmF0aW9uXG4gICAgY29uc3QgU1RBQklMSVRZX0FQSV9LRVkgPSBwcm9jZXNzLmVudi5TVEFCSUxJVFlfQVBJX0tFWSB8fCAnc2stMWhPTzdmRnMyTWt5R2h4Q1dyN09vWEZiVmJZcnlUdURNR0NwZTZTc0VDdkFOYTVCJztcbiAgICBjb25zdCBTVEFCSUxJVFlfQVBJX1VSTCA9ICdodHRwczovL2FwaS5zdGFiaWxpdHkuYWkvdjEvZ2VuZXJhdGlvbi9zdGFibGUtZGlmZnVzaW9uLXYxLTYvdGV4dC10by1pbWFnZSc7XG5cbiAgICBjb25zdCBzdGFiaWxpdHlSZXMgPSBhd2FpdCBmZXRjaChTVEFCSUxJVFlfQVBJX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke1NUQUJJTElUWV9BUElfS0VZfWAsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB0ZXh0X3Byb21wdHM6IFt7IHRleHQ6IGlucHV0IH1dLFxuICAgICAgICBjZmdfc2NhbGU6IDcsXG4gICAgICAgIGhlaWdodDogNTEyLFxuICAgICAgICB3aWR0aDogNTEyLFxuICAgICAgICBzdGVwczogMzAsXG4gICAgICAgIHNhbXBsZXM6IDEsXG4gICAgICB9KSxcbiAgICB9KTtcblxuICAgIGlmICghc3RhYmlsaXR5UmVzLm9rKSB7XG4gICAgICBjb25zdCBlcnJvciA9IGF3YWl0IHN0YWJpbGl0eVJlcy50ZXh0KCk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvciB9LCB7IHN0YXR1czogc3RhYmlsaXR5UmVzLnN0YXR1cyB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgc3RhYmlsaXR5UmVzLmpzb24oKTtcbiAgICBjb25zdCBiYXNlNjQgPSBkYXRhLmFydGlmYWN0cyAmJiBkYXRhLmFydGlmYWN0c1swXSAmJiBkYXRhLmFydGlmYWN0c1swXS5iYXNlNjQ7XG4gICAgaWYgKCFiYXNlNjQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTm8gaW1hZ2UgcmV0dXJuZWQgZnJvbSBTdGFiaWxpdHkgQUknIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gICAgfVxuICAgIGNvbnN0IGltYWdlID0gYGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwke2Jhc2U2NH1gO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGltYWdlIH0sIHsgc3RhdHVzOiAyMDAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGdlbmVyYXRpbmcgaW1hZ2U6XCIsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IG1lc3NhZ2U6ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIlBPU1QiLCJyZXEiLCJib2R5IiwianNvbiIsImlucHV0IiwibWVzc2FnZSIsInN0YXR1cyIsIlNUQUJJTElUWV9BUElfS0VZIiwicHJvY2VzcyIsImVudiIsIlNUQUJJTElUWV9BUElfVVJMIiwic3RhYmlsaXR5UmVzIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiSlNPTiIsInN0cmluZ2lmeSIsInRleHRfcHJvbXB0cyIsInRleHQiLCJjZmdfc2NhbGUiLCJoZWlnaHQiLCJ3aWR0aCIsInN0ZXBzIiwic2FtcGxlcyIsIm9rIiwiZXJyb3IiLCJkYXRhIiwiYmFzZTY0IiwiYXJ0aWZhY3RzIiwiaW1hZ2UiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/genImage/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FgenImage%2Froute&page=%2Fapi%2FgenImage%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FgenImage%2Froute.ts&appDir=E%3A%5Ccascade%5CCascadeProjects%5Cwindsurf-project%5Cstudynovabot-final%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Ccascade%5CCascadeProjects%5Cwindsurf-project%5Cstudynovabot-final&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FgenImage%2Froute&page=%2Fapi%2FgenImage%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FgenImage%2Froute.ts&appDir=E%3A%5Ccascade%5CCascadeProjects%5Cwindsurf-project%5Cstudynovabot-final%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Ccascade%5CCascadeProjects%5Cwindsurf-project%5Cstudynovabot-final&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var E_cascade_CascadeProjects_windsurf_project_studynovabot_final_app_api_genImage_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/genImage/route.ts */ \"(rsc)/./app/api/genImage/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/genImage/route\",\n        pathname: \"/api/genImage\",\n        filename: \"route\",\n        bundlePath: \"app/api/genImage/route\"\n    },\n    resolvedPagePath: \"E:\\\\cascade\\\\CascadeProjects\\\\windsurf-project\\\\studynovabot-final\\\\app\\\\api\\\\genImage\\\\route.ts\",\n    nextConfigOutput,\n    userland: E_cascade_CascadeProjects_windsurf_project_studynovabot_final_app_api_genImage_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZnZW5JbWFnZSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGZ2VuSW1hZ2UlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZnZW5JbWFnZSUyRnJvdXRlLnRzJmFwcERpcj1FJTNBJTVDY2FzY2FkZSU1Q0Nhc2NhZGVQcm9qZWN0cyU1Q3dpbmRzdXJmLXByb2plY3QlNUNzdHVkeW5vdmFib3QtZmluYWwlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUUlM0ElNUNjYXNjYWRlJTVDQ2FzY2FkZVByb2plY3RzJTVDd2luZHN1cmYtcHJvamVjdCU1Q3N0dWR5bm92YWJvdC1maW5hbCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDZ0Q7QUFDN0g7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkU6XFxcXGNhc2NhZGVcXFxcQ2FzY2FkZVByb2plY3RzXFxcXHdpbmRzdXJmLXByb2plY3RcXFxcc3R1ZHlub3ZhYm90LWZpbmFsXFxcXGFwcFxcXFxhcGlcXFxcZ2VuSW1hZ2VcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2dlbkltYWdlL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvZ2VuSW1hZ2VcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2dlbkltYWdlL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRTpcXFxcY2FzY2FkZVxcXFxDYXNjYWRlUHJvamVjdHNcXFxcd2luZHN1cmYtcHJvamVjdFxcXFxzdHVkeW5vdmFib3QtZmluYWxcXFxcYXBwXFxcXGFwaVxcXFxnZW5JbWFnZVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FgenImage%2Froute&page=%2Fapi%2FgenImage%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FgenImage%2Froute.ts&appDir=E%3A%5Ccascade%5CCascadeProjects%5Cwindsurf-project%5Cstudynovabot-final%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Ccascade%5CCascadeProjects%5Cwindsurf-project%5Cstudynovabot-final&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FgenImage%2Froute&page=%2Fapi%2FgenImage%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FgenImage%2Froute.ts&appDir=E%3A%5Ccascade%5CCascadeProjects%5Cwindsurf-project%5Cstudynovabot-final%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5Ccascade%5CCascadeProjects%5Cwindsurf-project%5Cstudynovabot-final&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();