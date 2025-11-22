<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Role;

class AuthController extends Controller
{
    // Đăng ký tài khoản mới
    public function register(Request $request)
    {
        $data = $request->validate([
            'username' => 'required|string|unique:users,username',
            'password' => 'required|string|min:6',
            'full_name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'class_id' => 'nullable|integer',
            'avatar_url' => 'nullable|string',
            'role' => 'required|string|in:admin,teacher,student',
        ]);

        $user = User::create($data);

        // Gán role
        $role = Role::where('name', $data['role'])->first();
        if ($role) {
            $user->roles()->sync([$role->id]);
        }

        return response()->json([
            'user' => $user,
        ], 201);
    }

    // Đăng nhập
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Sai tài khoản hoặc mật khẩu'], 401);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        $roles = $user->roles()->pluck('name');

        return response()->json([
            'token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'full_name' => $user->full_name,
                'email' => $user->email,
                'class_id' => $user->class_id,
                'avatar_url' => $user->avatar_url,
            ],
            'roles' => $roles,
        ]);
    }

    // Đăng xuất (xoá tất cả token của user đang đăng nhập)
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Đăng xuất thành công']);
    }
}
