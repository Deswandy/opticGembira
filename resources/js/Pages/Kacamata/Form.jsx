import React from 'react'
import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Input } from '@/Components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
// import {z} from 'zod';
// import {zodResolver} from "@hookform/resolvers/zod"


// const formSchema= z.object({
//     tipe: z.string().min(5,{
//         message: "Tipemu jelek"
//     }).max(50, {
//         message: "Tipemu kepanjangan"
//     }),
// })

const Form = ({ kacamata }) => {
    const lacis = Array.from(
        new Map(kacamata.map((item) => [item.laci_relasi.id, item.laci_relasi])).values()
    );
    const merks = Array.from(
        new Map(kacamata.map((item) => [item.merk_relasi.id, item.merk_relasi])).values()
    );
    const statuses = Array.from(
        new Map(kacamata.map((item) => [item.status_relasi.id, item.status_relasi])).values()
    );

    const { data, setData, post, processing, errors } = useForm({
        tipe: "",
        bahan: "",
        ms_lacis_id: "",
        ms_merks_id: "",
        ms_kacamata_statuses_id: "",
        foto: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipe', data.tipe);
        formData.append('bahan', data.bahan);
        formData.append('ms_merks_id', data.ms_merks_id);
        formData.append('ms_lacis_id', data.ms_lacis_id);
        formData.append('ms_kacamata_statuses_id', data.ms_kacamata_statuses_id);

        if (data.foto) {
            formData.append('foto', data.foto);
        }

        post(route('ms-kacamatas.store'), {
            data: formData,
            forceFormData: true,
        });
    };


    const handleOnChange = (e) => {
        const { name, value, type, files } = e.target;
        setData(name, type === "file" ? files[0] : value);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <InputLabel htmlFor="tipe" value="Tipe" />
                <TextInput id="tipe" name="tipe" value={data.tipe} onChange={handleOnChange} className="mt-1 block w-full" />
                <InputError message={errors.tipe} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="bahan" value="Bahan" />
                <TextInput id="bahan" name="bahan" value={data.bahan} onChange={handleOnChange} className="mt-1 block w-full" />
                <InputError message={errors.bahan} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="ms_lacis_id" value="Laci" />
                <select
                    id="ms_lacis_id"
                    name="ms_lacis_id"
                    value={data.ms_lacis_id}
                    onChange={handleOnChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">Pilih Laci</option>
                    {lacis.map((laci) => (
                        <option key={laci.id} value={laci.id}>{laci.laci}</option>
                    ))}
                </select>
                <InputError message={errors.ms_lacis_id} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="ms_merks_id" value="Merk" />
                <select
                    id="ms_merks_id"
                    name="ms_merks_id"
                    value={data.ms_merks_id}
                    onChange={handleOnChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">Pilih Merk</option>
                    {merks.map((merk) => (
                        <option key={merk.id} value={merk.id}>{merk.merk}</option>
                    ))}
                </select>
                <InputError message={errors.ms_merks_id} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="ms_kacamata_statuses_id" value="Status" />
                <select
                    id="ms_kacamata_statuses_id"
                    name="ms_kacamata_statuses_id"
                    value={data.ms_kacamata_statuses_id}
                    onChange={handleOnChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">Pilih Status</option>
                    {statuses.map((status) => (
                        <option key={status.id} value={status.id}>{status.status}</option>
                    ))}
                </select>
                <InputError message={errors.ms_kacamata_statuses_id} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="foto" value="Foto (opsional)" />
                <Input
                    id="foto"
                    name="foto"
                    type="file"
                    onChange={handleOnChange}
                    className="mt-1 block w-full"
                />
                <InputError message={errors.foto} className="mt-2" />
            </div>

            <div>
                <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
            </div>
        </form>
    );
};


export default Form