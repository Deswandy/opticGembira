@extends('layouts.app')

@section('title', 'Edit Kacamata')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Edit Kacamata {{ $kacamata->id }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('kacamata.update', $kacamata->id) }}" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')

                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">ID Kacamata</label>
                            <div class="col-md-6">
                                <p class="form-control-plain-text font-weight-bold">{{ $kacamata->id }}</p>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="merk" class="col-md-4 col-form-label text-md-right">Merk</label>
                            <div class="col-md-6">
                                <select id="merk" class="form-control @error('merk') is-invalid @enderror" name="merk" required>
                                    @foreach($merks as $merk)
                                        <option value="{{ $merk->id }}" {{ $kacamata->merk == $merk->id ? 'selected' : '' }}>
                                            {{ $merk->merk }}
                                        </option>
                                    @endforeach
                                </select>
                                @error('merk')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="tipe" class="col-md-4 col-form-label text-md-right">Tipe</label>
                            <div class="col-md-6">
                                <input id="tipe" type="text" class="form-control @error('tipe') is-invalid @enderror" 
                                    name="tipe" value="{{ old('tipe', $kacamata->tipe) }}" required>
                                @error('tipe')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="bahan" class="col-md-4 col-form-label text-md-right">Bahan</label>
                            <div class="col-md-6">
                                <input id="bahan" type="text" class="form-control @error('bahan') is-invalid @enderror" 
                                    name="bahan" value="{{ old('bahan', $kacamata->bahan) }}" required>
                                @error('bahan')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="status" class="col-md-4 col-form-label text-md-right">Status</label>
                            <div class="col-md-6">
                                <select id="status" class="form-control @error('status') is-invalid @enderror" name="status" required>
                                    @foreach($statuses as $status)
                                        <option value="{{ $status->status }}" {{ $kacamata->status == $status->status ? 'selected' : '' }}>
                                            {{ $status->description }}
                                        </option>
                                    @endforeach
                                </select>
                                @error('status')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="foto" class="col-md-4 col-form-label text-md-right">Foto</label>
                            <div class="col-md-6">
                                @if($kacamata->foto)
                                <div class="mb-3">
                                    <img src="{{ asset('storage/' . $kacamata->foto) }}" alt="Foto Kacamata" class="img-thumbnail" style="max-height: 200px;">
                                    <div class="form-check mt-2">
                                        <input class="form-check-input" type="checkbox" name="hapus_foto" id="hapus_foto">
                                        <label class="form-check-label" for="hapus_foto">
                                            Hapus foto saat disimpan
                                        </label>
                                    </div>
                                </div>
                                @endif
                                <input id="foto" type="file" class="form-control-file @error('foto') is-invalid @enderror" name="foto">
                                @error('foto')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Simpan Perubahan
                                </button>
                                <a href="{{ route('kacamata.index') }}" class="btn btn-secondary">
                                    Batal
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection