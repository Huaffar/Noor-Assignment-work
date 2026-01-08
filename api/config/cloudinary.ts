
// This represents the backend Cloudinary configuration
// In a real environment: import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

/**
 * Helper to "upload" to Cloudinary
 * In production, this would use cloudinary.uploader.upload()
 */
export const uploadFile = async (file: File | string): Promise<string> => {
  console.log("Uploading file to Cloudinary...", file);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return a mock secure URL
  return `https://res.cloudinary.com/noor-official/image/upload/v12345678/proof_${Math.random().toString(36).substring(7)}.jpg`;
};
