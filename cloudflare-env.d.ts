interface CloudflareEnv {
  DB: D1Database;
}

declare namespace NodeJS {
  interface ProcessEnv {
    CMS_ADMIN_PASSWORD?: string;
    CMS_SESSION_SECRET?: string;
    NEXT_PUBLIC_SITE_URL?: string;
  }
}
