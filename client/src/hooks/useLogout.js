import axios from 'axios';
import URL from '../config';
import { useContextAPI } from '../context/ContextAPI';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

const useLogout = () => {
	const { setAuthUser } = useContextAPI();
	const navigate = useNavigate();

	const logout = async () => {
		try {
			await axios.get(`${URL}/user/logout`, {
				withCredentials: true,
			});

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
