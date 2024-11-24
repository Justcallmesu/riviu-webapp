import { BaseModel, BaseQuery } from "../globals/Base";
import { BaseUser } from "../users/users";

export interface BaseMovie extends BaseModel {
  name: string;
  synopsis: string;
  image: string;
  likeCount: number;
  releaseDate: Date;
  youtubeLink: string;
  authorId: number;
  author: BaseUser;
  authorReview: string;
  rating: number;
}

export interface CreateMovies {
  name: string;
  synopsis: string;
  releaseDate: Date;
  youtubeLink: string;
  authorReview: string;
  rating: number;
}

export interface UpdateMovies extends CreateMovies {}

export interface MoviesQuery extends BaseQuery {
  startRating?: number;
  endRating?: number;
  releaseDate: Date;
}
