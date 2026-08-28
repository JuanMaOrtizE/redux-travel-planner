-- CreateEnum
CREATE TYPE "BudgetCategory" AS ENUM ('ACCOMMODATION', 'TRANSPORT', 'FOOD', 'ACTIVITIES', 'SHOPPING', 'OTHER');

-- CreateTable
CREATE TABLE "budget_items" (
    "id" UUID NOT NULL,
    "tripId" UUID NOT NULL,
    "activityId" UUID,
    "category" "BudgetCategory" NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "estimatedAmount" DECIMAL(12,2) NOT NULL,
    "actualAmount" DECIMAL(12,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budget_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "budget_items_tripId_category_idx" ON "budget_items"("tripId", "category");

-- CreateIndex
CREATE INDEX "budget_items_activityId_idx" ON "budget_items"("activityId");

-- AddForeignKey
ALTER TABLE "budget_items" ADD CONSTRAINT "budget_items_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_items" ADD CONSTRAINT "budget_items_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
