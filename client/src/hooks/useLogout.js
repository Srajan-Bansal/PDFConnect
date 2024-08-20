import axios from 'axios';
import config from '../config';
import { useContextAPI } from '../context/ContextAPI';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useLogout = () => {
	const { setAuthUser } = useContextAPI();
	const navigate = useNavigate();

	const logout = async () => {
		try {
			const response = await axios.get(`${config.userAPI}/logout`, {
				withCredentials: true,
			});

			if (response.error) throw new Error(response.error);

			localStorage.removeItem('user-info');
			setAuthUser(null);
			navigate('/');
			toast.success('Successfully logged out');
		} catch (error) {
			const errorMessage =
				error.response?.data?.error || 'Something went wrong!';
			toast.error(errorMessage);
			console.error('Error updating user:', errorMessage);
		}
	};

	return { logout };
};

export default useLogout;
