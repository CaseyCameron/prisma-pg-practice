-- CreateTable
CREATE TABLE "Scale" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "modeId" INTEGER,

    CONSTRAINT "Scale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "origin" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Composer" (
    "id" SERIAL NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Composer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Composition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "composerId" INTEGER,

    CONSTRAINT "Composition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Scale" ADD CONSTRAINT "Scale_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "Mode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composition" ADD CONSTRAINT "Composition_composerId_fkey" FOREIGN KEY ("composerId") REFERENCES "Composer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
