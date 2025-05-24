@extends('layouts.app')

@section('title', 'Daftar Kacamata')

@section('content')
<div class="container-fluid">
    <div class="row mb-3">
        <div class="col">
            <h1 class="float-left">Daftar Kacamata</h1>
            <a href="{{ route('kacamata.create') }}" class="btn btn-primary float-right">Tambah Baru</a>
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-md-6">
            <form action="{{ route('kacamata.index') }}" method="GET">
                <div class="input-group">
                    <input type="text" name="search" class="form-control" placeholder="Cari kacamata..." value="{{ request('search') }}">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="submit">Cari</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="card">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Merk</th>
                            <th>Tipe</th>
                            <th>Bahan</th>
                            <th>Laci</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($kacamatas as $kacamata)
                        <tr>
                            <td>{{ $kacamata->id }}</td>
                            <td>{{ $kacamata->merkData->merk }}</td>
                            <td>{{ $kacamata->tipe }}</td>
                            <td>{{ $kacamata->bahan }}</td>
                            <td>{{ $kacamata->laci }}</td>
                            <td>
                                <span class="badge badge-{{ $kacamata->status == 'in_stock' ? 'success' : ($kacamata->status == 'sold' ? 'danger' : 'warning') }}">
                                    {{ $kacamata->statusData->description }}
                                </span>
                            </td>
                            <td>
                                <a href="{{ route('kacamata.edit', $kacamata->id) }}" class="btn btn-sm btn-warning">Edit</a>
                                        <a href="{{ route('kacamata.edit-status', $kacamata->id) }}" class="btn btn-sm btn-info" title="Ubah Status">
                                            <i class="fas fa-exchange-alt"></i>
                                        <form action="{{ route('kacamata.destroy', $kacamata->id) }}" method="POST" class="d-inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Hapus data ini?')">Hapus</button>
                                </form>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="7" class="text-center">Tidak ada data kacamata</td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
            
            @if($kacamatas->hasPages())
            <div class="mt-3">
                {{ $kacamatas->links() }}
            </div>
            @endif
        </div>
    </div>
</div>
@endsection