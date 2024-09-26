import axios from 'axios';
import URL from '../config';
import { useContextAPI } from '../context/ContextAPI';
import { showSuccess, showError } from '../components/Toast';

const useSignup = () => {
	const { setAuthUser } = useContextAPI();

	const signup = async ({ name, email, password, passwordConfirm }) => {
		try {
			if (!name || !email || !password || !passwordConfirm) {
				throw new Error('Please fill all fields');
			}

			if (password !== passwordConfirm)
				throw new Error('password and passConfirm does not match');

			const formData = { name, email, password, passwordConfirm };

			const response = await axios.post(`${URL}/user/signup`, formData, {
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
			showSuccess('Succesfully signed up');
		} catch (err) {
			if (err.response?.data?.message.startsWith('E11000'))
				return showError('Email already exists');
			showError(err.message);
			console.log('Error signing in ', err);
		}
	};

	return { signup };
};

export default useSignup;
