-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('PLANNED', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "activities" (
    "id" UUID NOT NULL,
    "tripId" UUID NOT NULL,
    "tripDestinationId" UUID,
    "title" VARCHAR(160) NOT NULL,
    "description" TEXT,
    "startsAt" TIMESTAMPTZ(3) NOT NULL,
    "endsAt" TIMESTAMPTZ(3),
    "locationName" VARCHAR(200),
    "status" "ActivityStatus" NOT NULL DEFAULT 'PLANNED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "activities_tripId_startsAt_idx" ON "activities"("tripId", "startsAt");

-- CreateIndex
CREATE INDEX "activities_tripDestinationId_idx" ON "activities"("tripDestinationId");

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_tripDestinationId_fkey" FOREIGN KEY ("tripDestinationId") REFERENCES "trip_destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
