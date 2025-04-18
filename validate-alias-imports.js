// validate-alias-imports.js
const fs = require("fs");
const path = require("path");

const aliasPrefix = "@/"; // change if using different alias
const srcRoot = path.resolve(__dirname); // assumes alias maps to root
const fileExtensions = [".ts", ".tsx", ".js", ".jsx"];

function checkFileExists(p) {
  for (const ext of fileExtensions) {
    if (fs.existsSync(p + ext)) return true;
    if (fs.existsSync(path.join(p, "index" + ext))) return true;
  }
  return false;
}

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      const matches = [...content.matchAll(/@\/[^\s'"]+/g)];

      matches.forEach((m) => {
        const importPath = m[0];
        const realPath = path.resolve(srcRoot, importPath.replace(aliasPrefix, ""));

        if (!checkFileExists(realPath)) {
          console.error(
            `[❌ MISSING] ${importPath} → ${realPath}  (used in ${fullPath})`
          );
        } else {
          console.log(`[✅ OK] ${importPath}`);
        }
      });
    }
  }
}

console.log("🔍 Checking alias imports...");
scanDir(srcRoot);
