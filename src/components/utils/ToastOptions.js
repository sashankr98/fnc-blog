import { toast } from 'react-toastify';

const defaultOptions = {
    position: toast.POSITION.BOTTOM_RIGHT,
    hideProgressBar: true,
    autoClose: 1500,
    closeButton: false,
    closeOnClick: true,
}

const errorOptions = {
    ...defaultOptions,
    type: toast.TYPE.ERROR
}

const toastOptions = {
    DEFAULT: defaultOptions,
    ERROR: errorOptions
}

export default toastOptions;