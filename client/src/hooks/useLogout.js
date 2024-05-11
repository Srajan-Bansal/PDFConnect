import axios from 'axios';
import config from '../config';
import { useContextAPI } from '../context/ContextAPI';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useLogout = () => {
	const { setAuthUser } = useContextAPI();

	const logout = async () => {
		try {
			const response = await axios.get(`${config.userAPI}/logout`, {
				withCredentials: true,
			});

			if (response.error) throw new Error(response.error);

			localStorage.removeItem('user-info');
			setAuthUser(null);
			toast.success('Successfully logged out');
		} catch (error) {
			toast.error(error.message);
			console.error('Error logging out:', error);
		}
	};

	return { logout };
};

export default useLogout;
