const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const FOLDER_NAME = 'images';

exports.uploadOnCloudinary = async (filePath) => {
	try {
		if (!filePath) throw new Error('File path is required');

		const upload = await cloudinary.uploader.upload(filePath, {
			resource_type: 'auto',
			folder: FOLDER_NAME,
		});

		return upload;
	} catch (error) {
		console.log('Error in uploadOnCloudinary', error);
		return error;
	}
};

exports.deleteFromCloudinary = async (publicId) => {
	try {
		if (!publicId) throw new Error('Public ID is required');

		const deleteImage = await cloudinary.uploader.destroy(publicId);

		return deleteImage;
	} catch (error) {
		console.error('Error in deleteFromCloudinary', error);
		throw new Error(error.message || 'Cloudinary deletion error');
	}
};
