import axios from 'axios';
import config from '../config';
import { useContextAPI } from '../context/ContextAPI';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

			if (response.error) throw new Error(response.error);

			localStorage.setItem('user-info', JSON.stringify(response.data));
			setAuthUser(response.data);
		} catch (error) {
			toast.error(error.response.data.error);
			console.error('Error Loging in:', error.response.data.error);
		}
	};

	return { login };
};

export default useLogin;
