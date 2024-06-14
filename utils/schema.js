import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockinterview", {
  id: serial("id").primaryKey().notNull(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPostition: varchar("jobPostition").notNull(),
  jobDescription: varchar("jobDescription").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy"),
  createdAt: varchar('createdAt'),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswer=pgTable('userAnswer',{
  id:serial('id').primaryKey(),
  mockIdRef:varchar('mockId').notNull(),
  question:varchar('question').notNull(),
  correctAns:text('correctAns'),
  userAns:text('userAns'),
  feedback:text('feedback'),
  rating:varchar('rating'),
  userEmail:varchar('userEmail'),
  createdAt:varchar('createdAt'),

})