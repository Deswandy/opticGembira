import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { IoGlassesOutline } from "react-icons/io5"

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <div className='flex flex-row gap-2 items-center justify-center p-4 text-center bg-blue-700 rounded-lg md:justify-start md:px-8'>
                        <IoGlassesOutline className='size-12 invert' />
                        <h1 className='font-extrabold text-xl text-white'>OPTIC GEMBIRA</h1>

                    </div>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
