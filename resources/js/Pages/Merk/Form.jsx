import React, { useRef } from 'react'
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Input } from '@/Components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Form = ({ kacamata, onSuccess }) => {
  const lacis = Array.from(
    new Map(kacamata.map((item) => [item.laci_relasi.id, item.laci_relasi])).values()
  );
  const merks = Array.from(
    new Map(kacamata.map((item) => [item.merk_relasi.id, item.merk_relasi])).values()
  );
  const statuses = Array.from(
    new Map(kacamata.map((item) => [item.status_relasi.id, item.status_relasi])).values()
  );
  const defaultStatus = statuses.find(status => status.id === 1)?.id.toString() || "";

  const { data, setData, post, processing, errors } = useForm({
    tipe: "",
    bahan: "",
    ms_lacis_id: "",
    ms_merks_id: "",
    ms_kacamata_statuses_id: defaultStatus,
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
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    });
  };

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;
    setData(name, type === "file" ? files[0] : value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <div className="w-1/2">
          <InputLabel htmlFor="tipe" value="Tipe" />
          <TextInput id="tipe" name="tipe" value={data.tipe} onChange={handleOnChange} className="mt-1 block w-full" />
          <InputError message={errors.tipe} className="mt-2" />
        </div>

        <div className="w-1/2">
          <InputLabel htmlFor="bahan" value="Bahan" />
          <TextInput id="bahan" name="bahan" value={data.bahan} onChange={handleOnChange} className="mt-1 block w-full" />
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
            <SelectValue />
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

export default Form;
