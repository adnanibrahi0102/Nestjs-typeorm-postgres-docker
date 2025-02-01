-- CreateTable
CREATE TABLE "HotelProperty" (
    "id" TEXT NOT NULL,
    "hotelName" TEXT NOT NULL,
    "hotelAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "websiteURL" TEXT,
    "logo" TEXT,
    "description" TEXT NOT NULL,
    "hotelImages" TEXT[],
    "uniqueIdentificationPhotoCopy" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "checkInTime" TEXT NOT NULL DEFAULT '14:00',
    "checkOutTime" TEXT NOT NULL DEFAULT '12:00',
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "socialMedia" JSONB,
    "avgRating" DOUBLE PRECISION DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pricePerNight" DECIMAL(65,30) NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 2,
    "amenities" TEXT[],
    "images" TEXT[],
    "cancellationPolicy" TEXT,
    "hotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT,
    "guestName" TEXT NOT NULL,
    "guestEmail" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HotelProperty_id_key" ON "HotelProperty"("id");

-- CreateIndex
CREATE UNIQUE INDEX "HotelProperty_email_key" ON "HotelProperty"("email");

-- CreateIndex
CREATE INDEX "HotelProperty_city_idx" ON "HotelProperty"("city");

-- CreateIndex
CREATE INDEX "HotelProperty_state_idx" ON "HotelProperty"("state");

-- CreateIndex
CREATE INDEX "HotelProperty_country_idx" ON "HotelProperty"("country");

-- CreateIndex
CREATE INDEX "HotelProperty_avgRating_idx" ON "HotelProperty"("avgRating");

-- CreateIndex
CREATE UNIQUE INDEX "Room_id_key" ON "Room"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_id_key" ON "Review"("id");

-- AddForeignKey
ALTER TABLE "HotelProperty" ADD CONSTRAINT "HotelProperty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "HotelProperty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "HotelProperty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
