import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

export type Article = {
  idarticles: number;
  article_title: string;
  subtitle: string | null;
  release_date: string;
  content: string;
  reference_source: string | null;
  user_iduser: number;
  // url_photoArticle: string;
};

class ArticleRepository {
  // The C of CRUD - Create operation

  async create(article: Omit<Article, "idarticles">) {
    // Execute the SQL INSERT query to add a new item to the "article" table
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO articles 
      (article_title, subtitle, release_date, content, reference_source, user_iduser)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        article.article_title,
        article.subtitle,
        article.release_date || new Date().toISOString(),
        article.content,
        article.reference_source,
        article.user_iduser,
      ],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT idarticles, article_title, subtitle, release_date, 
              content, reference_source, user_iduser 
       FROM articles 
       WHERE idarticles = ?`,
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Article;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "article" table
    const [rows] = await databaseClient.query<Rows>(
      `SELECT idarticles, article_title, subtitle, release_date, 
              content, reference_source, user_iduser 
       FROM articles 
       ORDER BY release_date DESC`,
    );

    // Return the array of items
    return rows as Article[];
  }

  // The U of CRUD - Update operation
  async update(id: number, article: Partial<Omit<Article, "idarticles">>) {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (article.article_title !== undefined) {
      fields.push("article_title = ?");
      values.push(article.article_title);
    }
    if (article.subtitle !== undefined) {
      fields.push("subtitle = ?");
      values.push(article.subtitle);
    }
    if (article.content !== undefined) {
      fields.push("content = ?");
      values.push(article.content);
    }
    if (article.reference_source !== undefined) {
      fields.push("reference_source = ?");
      values.push(article.reference_source);
    }
    if (article.release_date !== undefined) {
      fields.push("release_date = ?");
      values.push(article.release_date);
    }

    if (fields.length === 0) {
      throw new Error("Aucun champ à mettre à jour");
    }

    values.push(id);

    const [result] = await databaseClient.query<Result>(
      `UPDATE articles SET ${fields.join(", ")} WHERE idarticles = ?`,
      values,
    );

    return result.affectedRows > 0;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM articles WHERE idarticles = ?",
      [id],
    );

    return result.affectedRows > 0;
  }
}

export default new ArticleRepository();
