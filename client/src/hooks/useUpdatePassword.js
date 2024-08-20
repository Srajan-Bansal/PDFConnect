import axios from 'axios';
import config from '../config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useUpdatePassword = () => {
	const updatePassword = async (currPassword, password, passwordConfirm) => {
		try {
			const updateData = { currPassword, password, passwordConfirm };
			const response = await axios.patch(
				`${config.userAPI}/updateMyPassword`,
				updateData,
				{
					withCredentials: true,
				}
			);

			if (response.data.error) throw new Error(response.data.error);

			toast.success('Successfully Password Changed');
		} catch (error) {
			const errorMessage =
				error.response?.data?.error || 'Something went wrong!';
			toast.error(errorMessage);
			console.error('Error updating user:', errorMessage);
		}
	};

	return { updatePassword };
};

export default useUpdatePassword;
