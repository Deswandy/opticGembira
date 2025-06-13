import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// --- PERUBAHAN 1: Terima props 'lacis', 'merks', 'statuses' dan HAPUS 'kacamata' ---
const Form = ({ lacis, merks, statuses, onSuccess }) => {

    // --- PERUBAHAN 2: HAPUS SEMUA logika 'Array.from(new Map(...))' ---
    
    const defaultStatus = statuses.find(status => status.id === 1)?.id.toString() || "";

    const { data, setData, post, processing, errors, reset } = useForm({
        tipe: "",
        bahan: "",
        ms_lacis_id: "",
        ms_merks_id: "",
        ms_kacamata_statuses_id: defaultStatus,
        foto: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('ms-kacamatas.store'), {
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess();
            },
            preserveScroll: true,
        });
    };

    // --- Tidak ada perubahan di bawah ini. Kode JSX sudah benar ---
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
                <div className="w-1/2">
                    <InputLabel htmlFor="tipe" value="Tipe" />
                    <TextInput
                        id="tipe"
                        name="tipe"
                        value={data.tipe}
                        onChange={(e) => setData('tipe', e.target.value)}
                        className="mt-1 block w-full"
                        isFocused
                    />
                    <InputError message={errors.tipe} className="mt-2" />
                </div>
                <div className="w-1/2">
                    <InputLabel htmlFor="bahan" value="Bahan" />
                    <TextInput
                        id="bahan"
                        name="bahan"
                        value={data.bahan}
                        onChange={(e) => setData('bahan', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.bahan} className="mt-2" />
                </div>
            </div>

            {/* Dropdown Laci akan menggunakan data master yang lengkap */}
            <div>
                <InputLabel htmlFor="ms_lacis_id">Laci</InputLabel>
                <Select
                    value={data.ms_lacis_id}
                    onValueChange={(value) => setData('ms_lacis_id', value)}
                >
                    <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Pilih Laci" />
                    </SelectTrigger>
                    <SelectContent>
                        {lacis.map((laci) => (
                            <SelectItem key={laci.id} value={laci.id.toString()}>
                                {laci.laci}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.ms_lacis_id} className="mt-2" />
            </div>

            {/* Dropdown Merk akan menggunakan data master yang lengkap */}
            <div>
                <InputLabel htmlFor="ms_merks_id">Merk</InputLabel>
                <Select
                    value={data.ms_merks_id}
                    onValueChange={(value) => setData('ms_merks_id', value)}
                >
                    <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Pilih Merk" />
                    </SelectTrigger>
                    <SelectContent>
                        {merks.map((merk) => (
                            <SelectItem key={merk.id} value={merk.id.toString()}>
                                {merk.merk}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.ms_merks_id} className="mt-2" />
            </div>

            {/* ... Sisa form lainnya ... */}
             <div>
                <InputLabel htmlFor="ms_kacamata_statuses_id">Status</InputLabel>
                <Select
                    value={data.ms_kacamata_statuses_id}
                    onValueChange={(value) => setData('ms_kacamata_statuses_id', value)}
                >
                    <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {statuses.map((status) => (
                            <SelectItem key={status.id} value={status.id.toString()}>
                                {status.status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.ms_kacamata_statuses_id} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="foto" value="Foto (opsional)" />
                <Input
                    id="foto"
                    name="foto"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setData('foto', e.target.files[0])}
                    className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <InputError message={errors.foto} className="mt-2" />
            </div>

            <div className="mt-6">
                <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
            </div>
        </form>
    );
};

export default Form;