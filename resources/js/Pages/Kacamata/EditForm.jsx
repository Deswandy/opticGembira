import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import PrimaryButton from '@/Components/PrimaryButton';

const EditForm = ({ item, kacamata, onSuccess }) => {
    // Mengambil data unik untuk dropdown dari prop 'kacamata'
    const lacis = Array.from(
        new Map(kacamata.map((i) => [i.laci_relasi.id, i.laci_relasi])).values()
    );
    const merks = Array.from(
        new Map(kacamata.map((i) => [i.merk_relasi.id, i.merk_relasi])).values()
    );
    const statuses = Array.from(
        new Map(kacamata.map((i) => [i.status_relasi.id, i.status_relasi])).values()
    );

    // Inisialisasi useForm dengan data awal dari 'item'
    const { data, setData, patch, processing, errors } = useForm({
        tipe: item?.tipe || "",
        bahan: item?.bahan || "",
        ms_lacis_id: item?.ms_lacis_id?.toString() || "",
        ms_merks_id: item?.ms_merks_id?.toString() || "",
        ms_kacamata_statuses_id: item?.ms_kacamata_statuses_id?.toString() || "",
        foto: null, // 'foto' di-set null, hanya diisi saat user memilih file baru
    });

    // **FUNGSI HANDLE SUBMIT YANG DIPERBAIKI**
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Gunakan 'patch' langsung dari hook useForm.
        // Inertia akan otomatis menangani file upload dan method spoofing.
        patch(route('ms-kacamatas.update', item.id), {
            onSuccess: () => onSuccess?.(), // Panggil callback onSuccess untuk menutup dialog
            preserveScroll: true, // Agar halaman tidak scroll ke atas setelah submit
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
                <div className="w-1/2">
                    <InputLabel htmlFor="tipe" value="Tipe" />
                    <TextInput id="tipe" name="tipe" value={data.tipe} onChange={(e) => setData('tipe', e.target.value)} className="mt-1 block w-full" />
                    <InputError message={errors.tipe} className="mt-2" />
                </div>
                <div className="w-1/2">
                    <InputLabel htmlFor="bahan" value="Bahan" />
                    <TextInput id="bahan" name="bahan" value={data.bahan} onChange={(e) => setData('bahan', e.target.value)} className="mt-1 block w-full" />
                    <InputError message={errors.bahan} className="mt-2" />
                </div>
            </div>

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
                <InputLabel htmlFor="foto">Ganti Foto (Opsional)</InputLabel>
                <Input
                    type="file"
                    id="foto"
                    name="foto"
                    accept="image/*"
                    onChange={(e) => setData('foto', e.target.files[0])}
                    className="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <InputError message={errors.foto} className="mt-2" />
            </div>

            <PrimaryButton disabled={processing}>Update</PrimaryButton>
        </form>
    );
};

export default EditForm;