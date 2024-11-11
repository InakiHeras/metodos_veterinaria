export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-6 rounded-lg">
                {children}
            </div>
        </div>
    );
}
