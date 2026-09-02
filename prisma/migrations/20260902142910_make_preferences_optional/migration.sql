-- AlterTable
ALTER TABLE "user_project_preferences" ALTER COLUMN "last_opened_at" DROP NOT NULL,
ALTER COLUMN "last_active_artifact_id" DROP NOT NULL;
