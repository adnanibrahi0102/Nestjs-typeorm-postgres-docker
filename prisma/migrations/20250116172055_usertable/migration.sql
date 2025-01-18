-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('ADMIN', 'VENDOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "userRole" NOT NULL DEFAULT 'VENDOR';
