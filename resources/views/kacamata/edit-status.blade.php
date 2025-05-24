@extends('layouts.app')

@section('title', 'Ubah Status Kacamata')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    Ubah Status Kacamata - {{ $kacamata->merkData->merk }} {{ $kacamata->tipe }}
                    <span class="float-right">ID: {{ $kacamata->id }}</span>
                </div>

                <div class="card-body">
                    <form method="POST" action="{{ route('kacamata.update-status', $kacamata->id) }}">
                        @csrf
                        @method('PUT')

                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">Status Saat Ini</label>
                            <div class="col-md-6">
                                <span class="badge badge-{{ $kacamata->status == 'in_stock' ? 'success' : ($kacamata->status == 'sold' ? 'danger' : 'warning') }}">
                                    {{ $kacamata->statusData->description }}
                                </span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="status" class="col-md-4 col-form-label text-md-right">Status Baru</label>
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
                            <label for="notes" class="col-md-4 col-form-label text-md-right">Catatan</label>
                            <div class="col-md-6">
                                <textarea id="notes" class="form-control @error('notes') is-invalid @enderror" 
                                    name="notes" rows="3" placeholder="Opsional: Jelaskan alasan perubahan status">{{ old('notes') }}</textarea>
                                @error('notes')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-save"></i> Simpan Perubahan
                                </button>
                                <a href="{{ route('kacamata.index') }}" class="btn btn-secondary">
                                    <i class="fas fa-times"></i> Batal
                                </a>
                            </div>
                        </div>
                    </form>

                    <hr>

                    <h5 class="mt-4"><i class="fas fa-history"></i> Riwayat Status</h5>
                    @if($logs->isEmpty())
                        <div class="alert alert-info">Belum ada riwayat perubahan status</div>
                    @else
                        <div class="table-responsive">
                            <table class="table table-sm table-hover">
                                <thead class="thead-light">
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Status</th>
                                        <th>User</th>
                                        <th>Catatan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($logs as $log)
                                    <tr>
                                        <td>{{ $log->created_at->format('d/m/Y H:i') }}</td>
                                        <td>
                                            <span class="badge badge-{{ $log->status_id == 'in_stock' ? 'success' : ($log->status_id == 'sold' ? 'danger' : 'warning') }}">
                                                {{ $log->statusData->description }}
                                            </span>
                                        </td>
                                        <td>{{ $log->user->nama }}</td>
                                        <td>{{ $log->notes }}</td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection