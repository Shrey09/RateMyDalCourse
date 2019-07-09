export class Post {
  constructor(
      public postContent: string,
      public postedByEmail: string,
      public postedByName: string,
      public courseId: string,
      public likedByUsers: Array<string>,
      public postedTime: Date
  ) {}
}
