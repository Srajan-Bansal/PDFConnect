import axios from 'axios';
import config from '../config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useUploadPhoto = () => {
	const uploadPhoto = async (photo) => {
		try {
			const formData = new FormData();
			formData.append('photo', photo);

			const response = await axios.post(
				`${config.viewAPI}/uploadPhoto`,
				formData,
				{
					withCredentials: true,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			if (response.data.error) throw new Error(response.data.error);

			toast.success('Photo uploaded successfully!');
		} catch (error) {
			const errorMessage =
				error.response?.data?.error || 'Something went wrong!';
			toast.error(errorMessage);
			console.error('Error uploading photo:', errorMessage);
		}
	};

	return { uploadPhoto };
};

export default useUploadPhoto;
