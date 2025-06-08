// resources/js/Pages/Laci/Form.jsx
import React from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Form = ({ onSuccess }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        laci: "",
        dibuat: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("ms-laci.store"), {
            onSuccess: () => {
                reset();
                onSuccess?.();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="laci">Nama Laci</Label>
                <Input
                    id="laci"
                    value={data.laci}
                    onChange={(e) => setData("laci", e.target.value)}
                />
                {errors.laci && (
                    <p className="text-sm text-red-500">{errors.laci}</p>
                )}
            </div>

            <Button type="submit" disabled={processing}>
                Simpan
            </Button>
        </form>
    );
};

export default Form;
