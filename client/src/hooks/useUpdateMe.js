import axios from 'axios';
import config from '../config';
import { useContextAPI } from '../context/ContextAPI';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useUpdateMe = () => {
	const { setAuthUser } = useContextAPI();

	const updateMe = async (name, email) => {
		try {
			const updateData = { name, email };
			const response = await axios.patch(
				`${config.userAPI}/updateMe`,
				updateData,
				{
					withCredentials: true,
				}
			);

			if (response.data.error) throw new Error(response.data.error);

			toast.success('Successfully updated user details');
			localStorage.setItem('user-info', JSON.stringify(response.data));
			setAuthUser(response.data);
		} catch (error) {
			const errorMessage =
				error.response?.data?.error || 'Something went wrong!';
			toast.error(errorMessage);
			console.error('Error updating user:', errorMessage);
		}
	};

	return { updateMe };
};

export default useUpdateMe;
