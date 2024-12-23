import mongoose, { Schema, Document } from "mongoose";

export interface IImage extends Document {
  objectID: number;
  museumID: string;
  accessionNumber: string;
  accessionYear: string;
  isPublicDomain: boolean;
  objectType: string;
  objectTitle: string;
  medium: string;
  primaryImage: string;
  primaryImageSmall: string;
  constituentULAN_URL: string;
  constituentWikidata_URL: string;
  dimensions: string;
  objectDate: string;
  artistName: string;
  artistDisplayBio: string;
  artistNationality: string;
  artistBeginDate: string;
  artistEndDate: string;
  artistWikidata_URL: string;
  artistULAN_URL: string;
  culture: string;
  creditLine: string;
  repository: string;
  objectURL: string;
  GalleryNumber: string;
  metadataDate: string;
}

// Schema definition
const ImageSchema = new Schema<IImage>(
  {
    objectID: { type: Number, required: true, unique: true },
    museumID: { type: String, required: true },
    accessionNumber: { type: String, required: true },
    accessionYear: { type: String, required: true },
    isPublicDomain: { type: Boolean, default: false },
    objectType: { type: String },
    objectTitle: { type: String, required: true },
    medium: { type: String },
    primaryImage: { type: String },
    primaryImageSmall: { type: String },
    dimensions: { type: String },
    objectDate: { type: String },
    artistName: { type: String },
    artistDisplayBio: { type: String },
    artistNationality: { type: String },
    artistBeginDate: { type: String },
    artistEndDate: { type: String },
    culture: { type: String },
    creditLine: { type: String },
    repository: { type: String },
    GalleryNumber: { type: String },
    metadataDate: { type: String },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Image = mongoose.models.Image || mongoose.model<IImage>("Image", ImageSchema);

export default Image;