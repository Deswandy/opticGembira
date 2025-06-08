// resources/js/Pages/Laci/EditForm.jsx
import React from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditForm = ({ item, onSuccess }) => {
    const { data, setData, put, processing, errors } = useForm({
        tipe: item?.tipe ?? "",
        bahan: item?.bahan ?? "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("ms-laci.update", item.id), {
            onSuccess: () => {
                onSuccess?.();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="tipe">Tipe</Label>
                <Input
                    id="tipe"
                    value={data.tipe}
                    onChange={(e) => setData("tipe", e.target.value)}
                />
                {errors.tipe && (
                    <p className="text-sm text-red-500">{errors.tipe}</p>
                )}
            </div>

            <div>
                <Label htmlFor="bahan">Bahan</Label>
                <Input
                    id="bahan"
                    value={data.bahan}
                    onChange={(e) => setData("bahan", e.target.value)}
                />
                {errors.bahan && (
                    <p className="text-sm text-red-500">{errors.bahan}</p>
                )}
            </div>

            <Button type="submit" disabled={processing}>
                Update
            </Button>
        </form>
    );
};

export default EditForm;
