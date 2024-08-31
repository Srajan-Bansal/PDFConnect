import axios from 'axios';
import config from '../config';
import { useContextAPI } from '../context/ContextAPI';

import { toast } from 'react-toastify';

const useLogin = () => {
	const { setAuthUser } = useContextAPI();
	const login = async ({ email, password }) => {
		try {
			if (!email || !password) {
				throw new Error('Please fill all fields');
			}

			const formData = { email, password };

			const response = await axios.post(
				`${config.userAPI}/login`,
				formData,
				{
					withCredentials: true,
				}
			);

			const user = response.data;
			const expiryDate =
				new Date().getTime() +
				Number(import.meta.env.VITE_LOCALSTORAGE_EXPIRY);

			localStorage.setItem(
				'user-info',
				JSON.stringify({
					user,
					expiryDate,
				})
			);
			setAuthUser({
				user,
				expiryDate,
			});
		} catch (error) {
			const errorMessage =
				error.response?.data?.error || 'Something went wrong!';
			toast.error(errorMessage);
			console.error('Error updating user:', errorMessage);
		}
	};

	return { login };
};

export default useLogin;
