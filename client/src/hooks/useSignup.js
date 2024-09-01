import axios from 'axios';
import config from '../config';
import { useContextAPI } from '../context/ContextAPI';

import { toast } from 'react-toastify';

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

			const response = await axios.post(
				`${config.userAPI}/signup`,
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
		} catch (err) {
			if (err.response?.data?.message.startsWith('E11000'))
				return toast.error('Email aldready exist');
			toast.error(err.message);
			console.log('Error signing in ', err);
		}
	};

	return { signup };
};

export default useSignup;
