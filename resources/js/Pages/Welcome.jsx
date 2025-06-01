import {React,useEffect} from "react"
import { Link, Head, useForm } from '@inertiajs/react'
import { IoGlassesOutline } from "react-icons/io5"
import { Button } from "@/Components/ui/button";
import { TbLogin2 } from "react-icons/tb";


export default function Welcome(props) {

    return (
        <div className='min-h-screen flex flex-col'>
            <Head title="Welcome" />

                <div className='flex flex-row gap-2 items-center justify-center p-4 text-center bg-blue-700 md:justify-start md:px-8'>
                    <IoGlassesOutline className='size-12 invert' />
                    <h1 className='font-extrabold text-xl text-white'>OPTIC GEMBIRA</h1>

                </div>

                <div className='flex-1 flex flex-col items-center justify-around gap-8 p-5 px-6 h-full md:flex-row-reverse md:px-20 md:justify-between'>
                    <img className="h-72 shrink brightness-110 md:h-96" src="/image/landing.webp" alt="Landing"/>
                    <div className='flex flex-col gap-6 items-center justify-center md:items-start'>
                        <h1 className='text-4xl text-center font-extrabold md:text-start'>Gak pake pusing lagi ngurusin stok!</h1>
                        <p className='text-lg text-center md:text-start'>Sistem database stok kacamata dipermudah menggunakan website</p>
                        <Button className='bg-blue-700'>
                            <Link
                                href={route('login')}
                                className="flex flex-row items-center gap-2"
                            >
                                Masuk
                                <TbLogin2 className="size-16"/>
                            </Link>
                        </Button>
                    </div>
                </div>         
        </div>
    );
}
