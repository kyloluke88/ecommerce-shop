"use server"; // 必须标记为服务端行为

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {

    console.log("login request start")
    const username = formData.get("username");
    const password = formData.get("password");

    // 1. 向 golang 发起请求
    // 注意：在容器内部通信，URL 应该是 http://api:8080
    // "api" 是你 docker-compose.yml 中定义的 service name
    const API_URL = process.env.INTERNAL_API_URL || "http://api:8080";

     console.log("login url", API_URL)
    const res = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
        // 确保不使用缓存，登录请求通常需要实时性
        cache: 'no-store'
    });

    if (!res.ok) {
        return { error: "登录失败，请检查账号密码" };
    }

    const data = await res.json(); // 假设返回 { token: "..." }

    // 2. 将 Token 存入加密的 HTTP-only Cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

    // 3. 重定向到首页
    redirect("/dashboard");
}