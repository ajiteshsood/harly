
const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const app = path.join(root, "apps", "web");

console.log("\n========== GODADDY DEPLOYMENT DIAGNOSTIC ==========");
console.log("Working directory:", root);
console.log("Node version:", process.version);

function check(label, target) {
  console.log(
    `[GODADDY-DIAG] ${label}: ${fs.existsSync(target) ? "FOUND" : "MISSING"}`
  );
}

check("Root package.json", path.join(root, "package.json"));
check("pnpm lockfile", path.join(root, "pnpm-lock.yaml"));
check("Workspace file", path.join(root, "pnpm-workspace.yaml"));
check("Root node_modules", path.join(root, "node_modules"));
check("Turbo executable", path.join(root, "node_modules", ".bin", "turbo"));
check("Web package.json", path.join(app, "package.json"));
check("Web node_modules", path.join(app, "node_modules"));
check("Next executable", path.join(app, "node_modules", ".bin", "next"));
check("Next build folder", path.join(app, ".next"));
check(
  "Standalone server",
  path.join(app, ".next", "standalone", "server.js")
);

for (const name of ["next", "@harly/db"]) {
  try {
    console.log(
      `[GODADDY-DIAG] Resolve ${name}:`,
      require.resolve(name, { paths: [app] })
    );
  } catch (error) {
    console.log(`[GODADDY-DIAG] Resolve ${name}: FAILED - ${error.message}`);
  }
}

console.log("========== END DIAGNOSTIC ==========\n");
