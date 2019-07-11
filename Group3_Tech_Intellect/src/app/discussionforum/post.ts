// Author: Harsh Pamnani - B00802614

// Creating a class for Post having 7 attributes same as the collection in mongodb.
export class Post {
  constructor(
    public postContent: string,
    public postedByEmail: string,
    public postedByName: string,
    public courseCode: string,
    public likedByUsers: Array<string>,
    public postedTime: Date
  ) { }
}
