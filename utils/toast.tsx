// import { ExclamationCircleIcon } from '@heroicons/react/outline';
// import { CheckIcon } from '@heroicons/react/outline';
import styles from './toast.module.css';
import toast from 'react-hot-toast';
import { BsExclamationCircle } from 'react-icons/bs';

const TOAST_DURATION = 5000;

export function errorToast(message: string) {
  toast.error(message, {
    duration: TOAST_DURATION,
    className: styles.error,
    icon: <BsExclamationCircle className="text-xl" />,
  });
}

// interface Options {
//   size: 'small' | 'default';
// }

// export function successToast(message: string, { size = 'default' }: Options) {
//   toast.error(message, {
//     duration: TOAST_DURATION,
//     className: clsx('!rounded-xmd !bg-kabochi-400 !text-white', {
//       '!p-2 !text-base !max-w-5xl !shadow-xl': size === 'default',
//       '!p-0 !text-sm !max-w-5xl !shadow-md': size === 'small',
//     }),
//     icon: (
//       <CheckIcon className={clsx('h-6 w-6', { '-mr-1': size === 'small' })} />
//     ),
//   });
// }
