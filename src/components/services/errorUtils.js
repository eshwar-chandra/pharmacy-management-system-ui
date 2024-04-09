import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const processError = (error) => {
    if (error && error.response && error.response.data && error.response.data.error) {
      return {
        message: error.response.data.error.message,
        details: error.response.data,
      };
    } else if (error && error.message) {
      return {
        message: error.message,
        details: error,
      };
    } else {
      return {
        message: "An unexpected error occurred.",
        details: error,
      };
    }
  };

  export const displayErrorToast = (error) => {
    const errorMessage = processError(error).message;
    toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
  };
  