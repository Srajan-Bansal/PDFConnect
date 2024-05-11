import axios from 'axios';
import config from '../config';
import { useAuthContext } from '../context/AuthContext';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useSignup = () => {
	const { setAuthUser } = useAuthContext();

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

			if (response.error) throw new Error(response.error);

			localStorage.setItem('user-info', JSON.stringify(response.data));
			setAuthUser(response.data);
			console.log(response.data);
		} catch (err) {
			console.log(email);
			if (
				err.response?.data.message ==
				`E11000 duplicate key error collection: Extraction.users index: email_1 dup key: { email: "${email}" }`
			)
				return toast.error('Email aldready exist');
			toast.error(err.message);
			console.log('Error signing in ', err);
		}
	};

	return { signup };
};

export default useSignup;
