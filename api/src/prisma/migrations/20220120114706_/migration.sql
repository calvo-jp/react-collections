/*
  Warnings:

  - You are about to drop the `recipe_instructions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `instructions` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "recipe_instructions" DROP CONSTRAINT "recipe_instructions_recipe_id_fkey";

-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "instructions" JSON NOT NULL;

-- DropTable
DROP TABLE "recipe_instructions";
