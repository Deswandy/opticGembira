import React from 'react'
import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod"

const formSchema= z.object({
    tipe: z.string().min(5,{
        message: "Tipemu jelek"
    }).max(50, {
        message: "Tipemu kepanjangan"
    }),
})

const Form = () => {
    const {data, setData, post, processing, errors} = useForm({
        tipe:"",
    })
    return (
        <div>

        </div>
    )
}

export default Form