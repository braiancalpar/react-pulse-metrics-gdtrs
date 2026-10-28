import React, { useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function LoginForm() {
  const [email, setEmail] = useState("ana.lima@pulsecompany.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth() || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login?.(email, password);
      navigate("/");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Erro ao fazer login. Verifique suas credenciais.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && (
        <div
          style={{
            background: "#fee2e2",
            border: "1px solid #fca5a5",
            borderRadius: 6,
            padding: "10px 14px",
            color: "#dc2626",
            fontSize: 14,
          }}
        >
          {error}
        </div>
      )}
      <Button type="submit" loading={loading} fullWidth>
        Entrar
      </Button>
      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          style={{
            background: "none",
            border: "none",
            color: "#2563eb",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Esqueceu a senha?
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
