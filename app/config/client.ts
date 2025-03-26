import { BuildConfig, getBuildConfig } from "./build";
import { FIXED_API_BASE_URL } from "../constant";

export function getClientConfig() {
  if (typeof document !== "undefined") {
    // client side
    return JSON.parse(queryMeta("config") || "{}") as BuildConfig;
  }

  if (typeof process !== "undefined") {
    // server side
    return getBuildConfig();
  }
}

function queryMeta(key: string, defaultValue?: string): string {
  let ret: string;
  if (document) {
    const meta = document.head.querySelector(
      `meta[name='${key}']`,
    ) as HTMLMetaElement;
    ret = meta?.content ?? "";
  } else {
    ret = defaultValue ?? "";
  }

  return ret;
}

// 添加初始化检测
export function initializeClientConfig() {
  const isVercelProduction = process.env.VERCEL === "1";
  
  if (isVercelProduction) {
    console.log("Running on Vercel production - Using fixed API URL:", FIXED_API_BASE_URL);
  } else {
    console.log("Running in development/other environment - Using dynamic API URLs");
  }
  
  return getClientConfig();
}
