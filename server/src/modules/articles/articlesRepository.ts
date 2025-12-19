import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

export type Article = {
  idarticles: number;
  article_title: string;
  subtitle: string;
  release_date: string;
  content: string;
  reference_source: string;
  user_id: number;
  url_photoArticle: string;
};

class ArticleRepository {
  // The C of CRUD - Create operation

  async create(article: Omit<Article, "id">) {
    // Execute the SQL INSERT query to add a new item to the "article" table
    const [result] = await databaseClient.query<Result>(
      "insert into articles (title, user_id) values (?, ?)",
      [article.article_title, article.user_id],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from articles where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Article;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "article" table
    const [rows] = await databaseClient.query<Rows>("select * from articles");

    // Return the array of items
    return rows as Article[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(item: Item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new ArticleRepository();
