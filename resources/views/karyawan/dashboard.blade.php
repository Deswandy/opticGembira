@extends('layouts.app')

@section('title', 'Karyawan Dashboard')

@section('content')
<div class="row">
    <div class="col-md-3">
        <div class="card">
            <div class="card-header">Menu</div>
            <div class="card-body">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" href="{{ route('karyawan.dashboard') }}">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('kacamata.index') }}">Manage Kacamata</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="col-md-9">
        <div class="card">
            <div class="card-header">Karyawan Dashboard</div>
            <div class="card-body">
                <h5>Welcome, Karyawan!</h5>
                <p>You can manage kacamata inventory from here.</p>
            </div>
        </div>
    </div>
</div>
@endsection