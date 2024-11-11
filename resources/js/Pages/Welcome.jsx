import { Head, Link } from '@inertiajs/react';

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
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/assets/nube.png" // Ajusta esta ruta si mueves la imagen a `public`
                    alt="Background Image"
                />

                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
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
                                        src="/assets/logo.png" // Asegúrate de que esta ruta sea correcta
                                        alt="Logo"
                                        className="w-21 h-auto" // Ajusta el tamaño del logo aquí
                                    />
                                </div>

                                {/* Sección Izquierda - Texto */}
                                <div className="w-1/2 flex flex-col justify-center px-10 text-gray-800">
                                    <h1 className="text-pink-600 font-bold text-xl">NOS IMPORTA TU MASCOTA</h1>
                                    <h2 className="text-4xl font-semibold my-4">
                                        Atención especializada y de emergencia para mascotas
                                    </h2>
                                    <p className="text-lg">
                                        En Pet Society, entendemos que tus mascotas son parte de tu familia. Con casi 24 años de experiencia, estamos
                                        comprometidos a proporcionar el más alto nivel de atención médica, bienestar y amor para tus compañeros de vida.
                                    </p>
                                </div>

                                {/* Sección Derecha - Imagen */}
                                <div className="w-1/2 flex justify-center items-center relative">
                                    <img
                                        src="/assets/gato.png" // Asegúrate de que esta ruta sea correcta
                                        alt="Cat Image"
                                        className="w-1/2 h-auto"
                                    />
                                </div>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
