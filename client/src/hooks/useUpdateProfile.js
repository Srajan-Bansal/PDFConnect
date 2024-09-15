import axios from 'axios';
import URL from '../config';
import { toast } from 'react-toastify';
import { useContextAPI } from '../context/ContextAPI';

const useUpdateProfile = () => {
	const { setAuthUser } = useContextAPI();

	const updateProfile = async (name, email, photo) => {
		try {
			const updateData = { name, email };
			let response;

			if (name || email) {
				response = await axios.patch(
					`${URL}/user/updateMe`,
					updateData,
					{
						withCredentials: true,
					}
				);
			}

			if (photo) {
				const formData = new FormData();
				formData.append('photo', photo);

				const photoResponse = await axios.post(
					`${URL}/pdf/uploadPhoto`,
					formData,
					{
						withCredentials: true,
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);

				if (photoResponse.data.error)
					throw new Error(photoResponse.data.error);

				response = photoResponse;
			}

			const { expiryDate } = JSON.parse(
				localStorage.getItem('user-info')
			);
			const updatedUser = response.data;

			localStorage.setItem(
				'user-info',
				JSON.stringify({
					user: updatedUser,
					expiryDate,
				})
			);

			setAuthUser({
				user: updatedUser,
				expiryDate,
			});

			toast.success('Profile updated successfully!');
		} catch (error) {
			const errorMessage =
				error.response?.data?.error || 'Something went wrong!';
			toast.error(errorMessage);
			console.error('Error updating profile:', errorMessage);
		}
	};

	return { updateProfile };
};

export default useUpdateProfile;
