import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const usePageTracking = () => {
	const location = useLocation();

	useEffect(() => {
		const NODE_ENV = import.meta.env.VITE_ENVIRONMENT;
		if (NODE_ENV === 'production') {
			ReactGA.send({
				hitType: 'pageview',
				page: location.pathname + location.search,
			});
		} else {
			console.log(
				'Page view tracked:',
				location.pathname + location.search
			);
		}
	}, [location]);
};

export default usePageTracking;
