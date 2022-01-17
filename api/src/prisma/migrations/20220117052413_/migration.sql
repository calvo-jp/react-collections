/*
  Warnings:

  - You are about to drop the column `createdAt` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerifiedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_id` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_userId_fkey";

-- DropForeignKey
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_authorId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_authorId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_recipeId_fkey";

-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "createdAt",
DROP COLUMN "recipeId",
DROP COLUMN "userId",
ADD COLUMN     "author_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "recipe_id" INTEGER;

-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "authorId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "author_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "authorId",
DROP COLUMN "createdAt",
DROP COLUMN "recipeId",
DROP COLUMN "updatedAt",
ADD COLUMN     "author_id" INTEGER,
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "recipe_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "emailVerifiedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email_verified_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
