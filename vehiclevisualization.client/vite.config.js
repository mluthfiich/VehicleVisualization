import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import { env } from "process";

const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== ""
    ? `${env.APPDATA}/ASP.NET/https`
    : `${env.HOME}/.aspnet/https`;

const certificateName = "vehiclevisualization.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (
    0 !==
    child_process.spawnSync(
      "dotnet",
      [
        "dev-certs",
        "https",
        "--export-path",
        certFilePath,
        "--format",
        "Pem",
        "--no-password",
      ],
      { stdio: "inherit" }
    ).status
  ) {
    throw new Error("Could not create certificate.");
  }
}

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(";")[0]
  : "https://localhost:7284";

export default defineConfig({
  plugins: [plugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "^/api/Auth/Login": {
        target,
        secure: false,
      },
      "^/api/Auth/RefreshToken": {
        target,
        secure: false,
      },
      "^/api/Auth/Register": {
        target,
        secure: false,
      },
      "^/api/Auth/AddRole": {
        target,
        secure: false,
      },
      "^/api/Auth/AssignRole": {
        target,
        secure: false,
      },
      "^/api/Auth/ListUser": {
        target,
        secure: false,
      },
      "^/api/Auth/ListRole": {
        target,
        secure: false,
      },
      "^/api/Auth/ListUserRole": {
        target,
        secure: false,
      },
      "^/api/Auth/DeleteUserRole": {
        target,
        secure: false,
      },
      "^/api/Auth/UpdateUserRole": {
        target,
        secure: false,
      },
      "^/api/MenuPermission/Permission": {
        target,
        secure: false,
      },
      "^/api/MenuPermission/ListMenu": {
        target,
        secure: false,
      },
      "^/api/MenuPermission/ListRoleMenu": {
        target,
        secure: false,
      },
      "^/api/MenuPermission/AddMenuPermission": {
        target,
        secure: false,
      },
      "^/api/MenuPermission/DeleteMenuPermission": {
        target,
        secure: false,
      },
      "^/api/MenuPermission/UpdateMenuPermission": {
        target,
        secure: false,
      },
      "^/api/Vehicle/units": {
        target,
        secure: false,
      },
      "^/api/Vehicle/growthyoy": {
        target,
        secure: false,
      },
    },
    port: 5173,
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath),
    },
  },
});