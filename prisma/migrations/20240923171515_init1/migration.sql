-- AlterTable
ALTER TABLE "users" ADD COLUMN     "token" TEXT,
ADD COLUMN     "verify" BOOLEAN NOT NULL DEFAULT false;
