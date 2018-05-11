export class Post {
  public description: string;
  public image: string;
  public isFavorite: boolean;

  constructor(description, image, isFavorite) {
    this.description = description;
    this.image = image;
    this.isFavorite = isFavorite;
  }
}
