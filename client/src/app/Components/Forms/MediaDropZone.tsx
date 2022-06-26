import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  multiFiles?: boolean;
}

export default function MediaDropZone(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: null });

  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      if (!props.multiFiles) {
        acceptedFiles[0] = Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        });
        field.onChange(acceptedFiles[0]);
      } else {
        acceptedFiles.forEach((file) => {
          file = Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        });

        field.onChange(acceptedFiles);
      }
    },
    [field, props.multiFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: props.multiFiles ? 5 : 1,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });
  return (
    <div
      {...getRootProps()}
      className={`h-full w-full text-inherit overflow-hidden `}
    >
      <div
        className={`${
          isDragActive ? ' bg-green-500' : 'bg-inherit '
        } flex flex-col justify-center items-center  w-full h-full cursor-pointer`}
      >
        <input aria-label='dropZone' {...getInputProps()} />
        <div className=' flex flex-row lg:flex-row items-center justify-start'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className=' w-12 h-12 m-2'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
              clipRule='evenodd'
            />
          </svg>

          <p className=' font-Montserrat text-base lg:text-sm max-w-sm whitespace-pre-wrap'>
            Drop image or click to browse{' '}
          </p>
        </div>
        {fieldState.error && (fieldState.isTouched || fieldState.isDirty) && (
          <div className='py-1 px-5 bg-red-500 w-full'>
            <p
              className={`text-base lg:text-sm leading-none w-full text-center lg:text-left text-white `}
            >
              {fieldState.error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}