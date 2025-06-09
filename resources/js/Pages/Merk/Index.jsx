import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import MerkTable from "@/Components/MerkTabel"; // Impor komponen tabel baru
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

// Form untuk membuat data baru
const CreateForm = ({ onSuccess }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        merk: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("ms-merks.store"), {
            onSuccess: () => {
                reset();
                onSuccess(); // panggil callback untuk menutup dialog
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <InputLabel htmlFor="merk" value="Nama Merk" />
                <TextInput
                    id="merk"
                    name="merk"
                    value={data.merk}
                    onChange={(e) => setData("merk", e.target.value)}
                    className="mt-1 block w-full"
                    isFocused
                />
                <InputError message={errors.merk} className="mt-2" />
            </div>
            <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
        </form>
    );
};


export default function Index({ auth, merks }) {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Data Merk
                    </h2>
                    <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>Tambah Merk</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambah Merk Baru</DialogTitle>
                                <DialogDescription>
                                    Isi form di bawah untuk menambahkan data merk baru.
                                </DialogDescription>
                            </DialogHeader>
                            <CreateForm onSuccess={() => setCreateDialogOpen(false)} />
                        </DialogContent>
                    </Dialog>
                </div>
            }
        >
            <Head title="Merk" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        {/* Panggil komponen tabel baru di sini */}
                        <MerkTable data={merks} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}