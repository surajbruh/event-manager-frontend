import { toast, type ToastOptions } from "react-toastify";

const options: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  closeButton: false,
//   icon: false,
};

export const successToast = (message: string) =>
  toast.success(message, options);

export const errorToast = (message: string) => toast.error(message, options);

export const loadingToast = (message: string) =>
  toast.loading(message, options);
