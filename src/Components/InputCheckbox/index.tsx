import clsx from "clsx";
import { useId } from "react";

type InputCheckboxProps = {
    labelText?: string;
    type?: string;
} & React.ComponentProps<'input'>;

export function InputCheckbox({ labelText = '', type = 'checkbox', ...props }: InputCheckboxProps) {
    const id = useId();

    return (
        <div className='flex items-center gap-3'>
            <input
                {...props}
                className={clsx(
                    'w-8 h-8 outline-none rounded-sm  focus:ring-2 focus:ring-blue-500',
                    props.className,
                )}
                id={id}
                type={type}
            />
            {labelText && (
                <label className='text-sm' htmlFor={id}>
                    {labelText}
                </label>
            )}
        </div>
    );
}