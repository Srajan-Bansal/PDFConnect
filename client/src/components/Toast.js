import { toast } from 'react-toastify';

const showSuccess = (message) => toast.success(message);
const showError = (message) => toast.error(message);
const showInfo = (message) => toast.info(message);
const showWarning = (message) => toast.warning(message);

export { showSuccess, showError, showInfo, showWarning };
