@extends('layouts.app')

@section('title', 'Select Role')

@section('content')
<div class="row justify-content-center">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">Select Your Role</div>
            <div class="card-body">
                <form method="POST" action="{{ route('select.role') }}">
                    @csrf
                    <div class="mb-3">
                        <label for="role" class="form-label">I am a:</label>
                        <select class="form-select" id="role" name="role" required>
                            
                            <option value="superadmin">Admin</option>
                            <option value="karyawan">Karyawan</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Continue</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection