-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "ingredients" TEXT[];

-- CreateTable
CREATE TABLE "recipe_instructions" (
    "id" SERIAL NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "video" TEXT,
    "image" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "recipe_instructions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recipe_instructions" ADD CONSTRAINT "recipe_instructions_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
