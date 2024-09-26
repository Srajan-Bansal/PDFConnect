import axios from 'axios';
import URL from '../config';
import { useContextAPI } from '../context/ContextAPI';
import { showSuccess, showError } from '../components/Toast';

const useLogin = () => {
	const { setAuthUser } = useContextAPI();
	const login = async ({ email, password }) => {
		try {
			if (!email || !password) {
				throw new Error('Please fill all fields');
			}

			const formData = { email, password };

			const response = await axios.post(`${URL}/user/login`, formData, {
				withCredentials: true,
			});

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
			showSuccess('Succesfully logged in');
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || 'Something went wrong!';
			showError(errorMessage);
			console.error('Error updating user:', errorMessage);
		}
	};

	return { login };
};

export default useLogin;
