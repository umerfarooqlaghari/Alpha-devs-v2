-- CreateTable
CREATE TABLE "ai_agents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "businessFunction" TEXT,
    "domain" TEXT,
    "industry" TEXT,
    "status" TEXT NOT NULL DEFAULT 'LIVE',
    "iconColor" TEXT NOT NULL DEFAULT '#4A5D4E',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_agents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ai_agents_slug_key" ON "ai_agents"("slug");
