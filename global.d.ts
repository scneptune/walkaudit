import type { PrismaClient } from "@prisma/client";

declare global {
  const prisma: PrismaClient;
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_APPLICATION_CREDENTIALS: string;
      SMTP_HOST: string;
      SMTP_PORT: string;
      SMTP_USER: string;
      SMTP_PASSWORD: string;
      SECRET_HASH: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
      PG_USER: string;
      PG_PASSWORD: string;
      PG_PORT: string;
      PG_DATABASE: string;
    }
  }
}
