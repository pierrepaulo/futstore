/*
  Warnings:

  - Added the required column `size` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductSize" AS ENUM ('P', 'M', 'G', 'GG');

-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "size" "ProductSize" NOT NULL;
