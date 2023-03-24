-- CreateTable
CREATE TABLE "ExchangeRate" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "ExchangeRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExchangeRate_name_key" ON "ExchangeRate"("name");
