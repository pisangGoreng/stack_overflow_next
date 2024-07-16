"use server";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { GetQuestionsParams, CreateQuestionParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    // * connect to DB
    await connectToDatabase();

    const { title, content, tags, author, path } = params;

    // * 1. create the question
    const question = await Question.create({ title, content, author });

    // * 2. create the tags, or get them if they already exist
    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } }, // * find a specific tag
        { $setOnInsert: { name: tag }, $push: { question: question._id } }, // * update or create new tag & push to question relation
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id); // * hanya push _id nya aja
    }

    // * 3. update the tags question
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // * 4. create an interaction record for the user's ask_question action

    // * 5. increment author's reputation by +5 for creating a question

    // * purge cached-data
    // * serve data baru yang baru aja di submit barusan
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
