import React, { useEffect } from 'react'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm, router } from '@inertiajs/react';
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
  const lacis = Array.from(
    new Map(kacamata.map((i) => [i.laci_relasi.id, i.laci_relasi])).values()
  );
  const merks = Array.from(
    new Map(kacamata.map((i) => [i.merk_relasi.id, i.merk_relasi])).values()
  );
  const statuses = Array.from(
    new Map(kacamata.map((i) => [i.status_relasi.id, i.status_relasi])).values()
  );

  const { data, setData, patch, processing, errors } = useForm({
    tipe: item?.tipe || "",
    bahan: item?.bahan || "",
    ms_lacis_id: item?.ms_lacis_id?.toString() || "",
    ms_merks_id: item?.ms_merks_id?.toString() || "",
    ms_kacamata_statuses_id: item?.ms_kacamata_statuses_id?.toString() || "",
    foto: null,
  });

  const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('_method', 'PUT'); // method spoofing
  formData.append('tipe', data.tipe);
  formData.append('bahan', data.bahan);
  formData.append('ms_lacis_id', data.ms_lacis_id);
  formData.append('ms_merks_id', data.ms_merks_id);
  formData.append('ms_kacamata_statuses_id', data.ms_kacamata_statuses_id);
  if (data.foto) {
    formData.append('foto', data.foto);
  }

  // Use `post()` with method spoofing instead of `patch()`
  router.post(route('ms-kacamatas.update', item.id), formData, {
    forceFormData: true,
    onSuccess: () => onSuccess?.(),
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
        <InputLabel htmlFor="foto">Foto (Opsional)</InputLabel>
        <Input
          type="file"
          id="foto"
          name="foto"
          accept="image/*"
          onChange={(e) => setData('foto', e.target.files[0])}
          className="mt-1 block w-full"
        />
        <InputError message={errors.foto} className="mt-2" />
      </div>

      <PrimaryButton disabled={processing}>Update</PrimaryButton>
    </form>
  );
};

export default EditForm;
