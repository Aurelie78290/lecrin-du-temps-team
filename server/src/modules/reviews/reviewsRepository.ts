import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type ReviewI = {
  idreviews: number;
  review_title: string;
  note: number;
  comment: string;
  user_iduser: number;
};

class ReviewsRepository {
  async create(review: Omit<ReviewI, "idreviews">) {
    // Execute the SQL INSERT query to add a new review to the "reviews" table
    const [result] = await databaseClient.query<Result>(
      "insert into reviews ( review_title, note, comment,user_iduser) values (?, ?, ?, ?,?,)",
      [review.review_title, review.note, review.comment, review.user_iduser],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async read(idreview: number) {
    // Execute the SQL SELECT query to retrieve a specific review by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from reviews where id = ?",
      [idreview],
    );

    // Return the first row of the result, which represents the review
    return rows[0] as ReviewI;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all reviews from the "review" table
    const [rows] = await databaseClient.query<Rows>("select * from review");

    // Return the array of reviews
    return rows as ReviewI[];
  }

  async update(review: ReviewI) {
    // Execute the SQL UPDATE query to update an existing review in the "reviews" table
    const [result] = await databaseClient.query<Result>(
      "update reviews set review_title = ?,note = ?, comment = ? , user_iduser = ? where idreviews = ?",
      [
        review.idreviews,
        review.review_title,
        review.note,
        review.comment,
        review.user_iduser,
      ],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  async delete(idreviews: number) {
    // Execute the SQL DELETE query to delete an existing review from the "reviews" table
    const [result] = await databaseClient.query<Result>(
      "delete from reviews where idreviews = ?",
      [idreviews],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new ReviewsRepository();
