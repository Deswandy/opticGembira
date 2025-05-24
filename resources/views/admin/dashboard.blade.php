@extends('layouts.app')

@section('title', 'Admin Dashboard')

@section('content')
<div class="row">
    <div class="col-md-3">
        <div class="card">
            <div class="card-header">Menu</div>
            <div class="card-body">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" href="{{ route('admin.dashboard') }}">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('kacamata.index') }}">Manage Kacamata</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('admin.users.index') }}">Manage Users</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="col-md-9">
        <div class="card">
            <div class="card-header">Admin Dashboard</div>
            <div class="card-body">
                <h5>Welcome, Admin!</h5>
                <p>You can manage kacamata inventory and users from here.</p>
            </div>
        </div>
    </div>
</div>
@endsection