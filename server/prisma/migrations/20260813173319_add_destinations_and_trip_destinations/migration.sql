-- CreateTable
CREATE TABLE "destinations" (
    "id" UUID NOT NULL,
    "providerId" VARCHAR(32) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "country" VARCHAR(120),
    "countryCode" VARCHAR(2),
    "region" VARCHAR(160),
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "timezone" VARCHAR(80),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_destinations" (
    "id" UUID NOT NULL,
    "tripId" UUID NOT NULL,
    "destinationId" UUID NOT NULL,
    "position" INTEGER NOT NULL,
    "arrivalDate" DATE,
    "departureDate" DATE,
    "notes" TEXT,

    CONSTRAINT "trip_destinations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "destinations_providerId_key" ON "destinations"("providerId");

-- CreateIndex
CREATE INDEX "trip_destinations_destinationId_idx" ON "trip_destinations"("destinationId");

-- CreateIndex
CREATE UNIQUE INDEX "trip_destinations_tripId_position_key" ON "trip_destinations"("tripId", "position");

-- AddForeignKey
ALTER TABLE "trip_destinations" ADD CONSTRAINT "trip_destinations_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_destinations" ADD CONSTRAINT "trip_destinations_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
