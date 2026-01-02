import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type FaqI = {
  idtable1: number;
  question: string;
  answer: string;
};

class faqRepository {
  async create(faq: Omit<FaqI, "idtable1">) {
    // Execute the SQL INSERT query to add a new review to the "reviews" table
    const [result] = await databaseClient.query<Result>(
      "insert into faq ( question,answer) values (?,?)",
      [faq.question, faq.answer],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async read(idtable1: number) {
    // Execute the SQL SELECT query to retrieve a specific question by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from faq where id = ?",
      [idtable1],
    );

    // Return the first row of the result, which represents the review
    return rows[0] as FaqI;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all reviews from the "review" table
    const [rows] = await databaseClient.query<Rows>("select * from faq");

    // Return the array of reviews
    return rows as FaqI[];
  }

  async update(faq: FaqI) {
    // Execute the SQL UPDATE query to update an existing review in the "reviews" table
    const [result] = await databaseClient.query<Result>(
      "update faq set question = ?,answer = ?",
      [faq.question, faq.answer],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  async delete(idtable1: number) {
    // Execute the SQL DELETE query to delete an existing review from the "reviews" table
    const [result] = await databaseClient.query<Result>(
      "delete from faq where idtable1 = ?",
      [idtable1],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new faqRepository();
