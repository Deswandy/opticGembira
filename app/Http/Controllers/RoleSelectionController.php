<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoleSelectionController extends Controller
{
    public function index()
    {
        return view('role-selection');
    }
    
   public function selectRole(Request $request)
{
    $role = $request->input('role');
    
    if (!in_array($role, ['superadmin', 'karyawan'])) {
        return back()->with('error', 'Invalid role selected');
    }
    
    // Set the role in session
    session(['user_role' => $role]);
    
    if ($role === 'superadmin') {
        return redirect()->route('admin.dashboard');
    }
    
    return redirect()->route('karyawan.dashboard');
}
}