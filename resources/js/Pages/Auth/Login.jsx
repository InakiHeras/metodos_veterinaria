import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '../../../css/login.css';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="flex flex-col items-center">
                {/* Logo */}
                <img src="/assets/logo.png" alt="Pet Society Logo" className="h-24 mb-4" />

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border-pink-200 focus:border-pink-400 focus:ring focus:ring-pink-200"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full border-pink-200 focus:border-pink-400 focus:ring focus:ring-pink-200"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4 block">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="mt-6">
                    <PrimaryButton className="bg-fuchsia-900 text-white py-2 rounded-full hover:bg-fuchsia-950" disabled={processing}>
                        Sign in
                    </PrimaryButton>
                    </div>

                    <div className="mt-4 text-center text-sm text-gray-600">
                        <Link href={route('password.request')} className="underline hover:text-pink-500">
                            Forgot password
                        </Link>{' '}
                        or{' '}
                        <Link href={route('register')} className="underline hover:text-pink-500">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
