-- CreateEnum
CREATE TYPE "QueryType" AS ENUM ('General_Inquiry', 'Technical_Support', 'Career_Opportunity', 'Other');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('unanswered', 'answered');

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "thumbnail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "heading" TEXT NOT NULL,
    "paragraphs" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "price" DOUBLE PRECISION,
    "discount" DOUBLE PRECISION,
    "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "thumbnail" TEXT NOT NULL,
    "status" TEXT,
    "syllabus" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "certificate" TEXT,
    "totalContent" TEXT,
    "schedule" TEXT,
    "hashtags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Query" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "queryType" "QueryType" NOT NULL,
    "message" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'unanswered',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Query_pkey" PRIMARY KEY ("id")
);
