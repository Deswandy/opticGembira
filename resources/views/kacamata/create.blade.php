@extends('layouts.app')

@section('title', 'Tambah Kacamata Baru')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Tambah Kacamata Baru</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('kacamata.store') }}" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group row">
                            <label for="laci" class="col-md-4 col-form-label text-md-right">Laci</label>
                            <div class="col-md-6">
                                <select id="laci" class="form-control @error('laci') is-invalid @enderror" name="laci" required>
                                    <option value="">Pilih Laci</option>
                                    @foreach($lacis as $laci)
                                        <option value="{{ $laci->laci }}" {{ old('laci') == $laci->laci ? 'selected' : '' }}>
                                            {{ $laci->laci }} - {{ $laci->description }}
                                        </option>
                                    @endforeach
                                </select>
                                @error('laci')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="merk" class="col-md-4 col-form-label text-md-right">Merk</label>
                            <div class="col-md-6">
                                <select id="merk" class="form-control @error('merk') is-invalid @enderror" name="merk" required>
                                    <option value="">Pilih Merk</option>
                                    @foreach($merks as $merk)
                                        <option value="{{ $merk->id }}" {{ old('merk') == $merk->id ? 'selected' : '' }}>
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
                                <input id="tipe" type="text" class="form-control @error('tipe') is-invalid @enderror" name="tipe" value="{{ old('tipe') }}" required>
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
                                <input id="bahan" type="text" class="form-control @error('bahan') is-invalid @enderror" name="bahan" value="{{ old('bahan') }}" required>
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
                                        <option value="{{ $status->status }}" {{ old('status') == $status->status ? 'selected' : '' }}>
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
                                    Simpan
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