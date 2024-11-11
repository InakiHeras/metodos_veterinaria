export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center w-full rounded-lg border border-transparent px-4 py-2 text-sm font-semibold tracking-wider transition duration-150 ease-in-out ${
                    disabled ? 'opacity-50 cursor-not-allowed' : ''
                } font-['DS Digital'] ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
