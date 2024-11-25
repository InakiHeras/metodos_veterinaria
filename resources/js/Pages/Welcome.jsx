import { Head, Link } from '@inertiajs/react';
import '../../css/welcome.css'; // Ruta al archivo CSS

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-white-50 text-red/50 dark:bg dark:text-white overflow-hidden">
                <img
                    id="background"
                    className="absolute inset-0 w-full h-full object-cover overflow-hidden"
                    src="/assets/nube.png"
                    alt="Background Image"
                />

                <div className="relative flex min-h-screen flex-col items-center justify-center">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center"></div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-black dark:hover:text-black/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-black dark:hover:text-black/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="flex min-h-screen items-start pt-10">
                                <div className="absolute top-5 left-5">
                                    <img
                                        src="/assets/logo.png"
                                        alt="Logo"
                                        className="w-21 h-auto"
                                    />
                                </div>

                                <div className="w-1/2 flex flex-col justify-center px-10 text-pink-800">
                                    <h1 className="text-pink-600 font-bold text-xl">NOS IMPORTA TU MASCOTA</h1>
                                    <h2 className="text-4xl font-semibold my-4">
                                        Atención especializada y de emergencia para mascotas
                                    </h2>
                                    <p className="text-lg">
                                        En Pet Society, entendemos que tus mascotas son parte de tu familia. Con casi 24 años de experiencia, estamos
                                        comprometidos a proporcionar el más alto nivel de atención médica, bienestar y amor para tus compañeros de vida.
                                        <br /><br />
                                        Síguenos en:
                                    </p>

                                    <div className="flex justify-start items-center space-x-4 py-8 mt-1">
                                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-black dark:text-white hover:text-[#3b5998]">
                                            <img src="/assets/facebook-logo.svg" alt="Facebook" className="w-10 h-10" />
                                        </a>
                                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-black dark:text-white hover:text-[#C13584]">
                                            <img src="/assets/instagram-logo.svg" alt="Instagram" className="w-10 h-10" />
                                        </a>
                                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-black dark:text-white hover:text-[#0077b5]">
                                            <img src="/assets/linkedin-logo.svg" alt="LinkedIn" className="w-10 h-10" />
                                        </a>
                                        <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-black dark:text-white hover:text-[#1DA1F2]">
                                            <img src="/assets/x-logo.svg" alt="X" className="w-10 h-10" />
                                        </a>

                                        <div className="text-sm text-black ml-6">
                                            <p>Dirección: 123 Calle industrial, Ciudad cancun</p>
                                            <p>Teléfono: (998) 456-7890</p>
                                            <p>Email: contacto@petsociety.com</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-1/2 flex justify-center items-center relative">
                                    <img
                                        src="/assets/gato.png"
                                        alt="Cat Image"
                                        className="w-3/4 h-auto ml-auto"
                                    />
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
