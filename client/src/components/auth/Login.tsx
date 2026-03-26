import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Building2, User, Shield, ArrowRight, Leaf, Eye, EyeOff,
  Loader2, ArrowLeft, Mail, CheckCircle2, KeyRound, Lock,
} from "lucide-react";
import { auth, ApiError } from "../../lib/api";

interface LoginProps {
  onEmailLogin: (email: string, password: string) => Promise<void>;
  onRegisterSuccess: (data: { token: string; user: { id: number; name: string; email: string; role: string; avatar?: string; phone?: string } }) => void;
}

type Portal = {
  key: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  iconBg: string;
  iconColor: string;
  hoverBorder: string;
  hoverBg: string;
};

const portals: Portal[] = [
  {
    key: "investor",
    label: "Investor Portal",
    description: "Track ROI & Assets",
    icon: <Building2 className="h-5 w-5" />,
    accent: "#DDA04E",
    iconBg: "bg-slate-100 group-hover:bg-[#DDA04E]",
    iconColor: "text-slate-600 group-hover:text-white",
    hoverBorder: "hover:border-[#DDA04E]",
    hoverBg: "hover:bg-[#DDA04E]/5",
  },
  {
    key: "tenant",
    label: "Tenant Portal",
    description: "Pay Rent & Requests",
    icon: <User className="h-5 w-5" />,
    accent: "#DDA04E",
    iconBg: "bg-slate-100 group-hover:bg-[#DDA04E]",
    iconColor: "text-slate-600 group-hover:text-white",
    hoverBorder: "hover:border-[#DDA04E]",
    hoverBg: "hover:bg-[#DDA04E]/5",
  },
  {
    key: "admin",
    label: "Admin Portal",
    description: "System Management",
    icon: <Shield className="h-5 w-5" />,
    accent: "#DDA04E",
    iconBg: "bg-slate-100 group-hover:bg-[#DDA04E]",
    iconColor: "text-slate-600 group-hover:text-white",
    hoverBorder: "hover:border-[#DDA04E]",
    hoverBg: "hover:bg-[#DDA04E]/5",
  },
  {
    key: "verdafarms",
    label: "Verda Farms",
    description: "Farm Investment Portal",
    icon: <Leaf className="h-5 w-5" />,
    accent: "#16a34a",
    iconBg: "bg-green-50 group-hover:bg-green-600",
    iconColor: "text-green-600 group-hover:text-white",
    hoverBorder: "hover:border-green-500",
    hoverBg: "hover:bg-green-50/50",
  },
];

type Mode =
  | "portal-select"
  | "signin"
  | "create-account"
  | "verify-email"
  | "forgot-password"
  | "reset-code"
  | "new-password";

export function Login({ onEmailLogin, onRegisterSuccess }: LoginProps) {
  const [mode, setMode] = useState<Mode>("portal-select");
  const [selectedPortal, setSelectedPortal] = useState<Portal | null>(null);

  // Sign-in
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Registration
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regShowPassword, setRegShowPassword] = useState(false);
  const [regRole, setRegRole] = useState<"investor" | "tenant">("tenant");

  // Email verification (after registration)
  const [verifyEmail, setVerifyEmailState] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyDevCode, setVerifyDevCode] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Forgot password
  const [fpEmail, setFpEmail] = useState("");
  const [fpCode, setFpCode] = useState("");
  const [fpCodeVerified, setFpCodeVerified] = useState(false);
  const [fpDevCode, setFpDevCode] = useState<string | null>(null);
  const [fpResendCooldown, setFpResendCooldown] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resendTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fpResendTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearError = () => setError(null);

  // ── Auto-verify email code on 6 digits ──────────────────────────────────────
  useEffect(() => {
    if (mode === "verify-email" && verifyCode.length === 6 && !isLoading) {
      handleVerifyCode();
    }
  }, [verifyCode]);

  // ── Auto-verify reset code on 6 digits ──────────────────────────────────────
  useEffect(() => {
    if (mode === "reset-code" && fpCode.length === 6 && !isLoading && !fpCodeVerified) {
      handleVerifyResetCode();
    }
  }, [fpCode]);

  const startCooldown = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    timerRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>
  ) => {
    setter(60);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setter((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const handlePortalSelect = (portal: Portal) => {
    setSelectedPortal(portal);
    setMode("signin");
    setEmail("");
    setPassword("");
    setError(null);
    setSuccessMsg(null);
  };

  const handleBack = () => {
    setMode("portal-select");
    setSelectedPortal(null);
    setEmail("");
    setPassword("");
    setError(null);
    setSuccessMsg(null);
  };

  const handleBackToSignin = () => {
    setMode("signin");
    setError(null);
    setSuccessMsg(null);
    setVerifyCode("");
    setVerifyDevCode(null);
    setFpCode("");
    setFpDevCode(null);
    setFpCodeVerified(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);
    try {
      await onEmailLogin(email.trim(), password);
    } catch (err: unknown) {
      if (err instanceof ApiError && err.data?.unverified) {
        setVerifyEmailState(email.trim().toLowerCase());
        setVerifyCode("");
        setVerifyDevCode(null);
        setMode("verify-email");
        setError("Your email is not yet verified. Enter the code sent to your inbox.");
      } else {
        const msg = err instanceof Error ? err.message : "Incorrect email or password.";
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) { setError("Please enter your full name."); return; }
    if (!regEmail.trim()) { setError("Please enter your email address."); return; }
    if (!regPassword) { setError("Please enter a password."); return; }
    if (regPassword.length < 8) { setError("Password must be at least 8 characters long."); return; }

    setError(null);
    setIsLoading(true);
    try {
      const result = await auth.register({
        name: regName.trim(),
        email: regEmail.trim(),
        password: regPassword,
        role: regRole,
      });
      setVerifyEmailState(result.email);
      setVerifyCode("");
      if (result.devCode) setVerifyDevCode(result.devCode);
      setMode("verify-email");
    } catch (err: unknown) {
      if (err instanceof ApiError && err.data?.unverified) {
        setVerifyEmailState(regEmail.trim().toLowerCase());
        setVerifyCode("");
        setMode("verify-email");
      } else {
        const msg = err instanceof Error ? err.message : "Failed to create account. Please try again.";
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (isLoading) return;
    setError(null);
    setIsLoading(true);
    try {
      const data = await auth.verifyEmail(verifyEmail, verifyCode.trim());
      auth.storeSession(data);
      onRegisterSuccess(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid or expired code. Please try again.";
      setError(msg);
      setVerifyCode("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0 || isLoading) return;
    setError(null);
    setIsLoading(true);
    try {
      const result = await auth.resendVerification(verifyEmail);
      if (result.devCode) setVerifyDevCode(result.devCode);
      startCooldown(setResendCooldown, resendTimerRef);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to resend code.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fpEmail.trim()) { setError("Please enter your email address."); return; }
    setError(null);
    setIsLoading(true);
    try {
      const result = await auth.forgotPassword(fpEmail.trim());
      if (result.devCode) setFpDevCode(result.devCode);
      setFpCode("");
      setFpCodeVerified(false);
      startCooldown(setFpResendCooldown, fpResendTimerRef);
      setMode("reset-code");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyResetCode = async () => {
    if (isLoading || fpCodeVerified) return;
    setError(null);
    setIsLoading(true);
    try {
      await auth.verifyResetCode(fpEmail.trim(), fpCode.trim());
      setFpCodeVerified(true);
      setTimeout(() => setMode("new-password"), 500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid or expired code.";
      setError(msg);
      setFpCode("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendResetCode = async () => {
    if (fpResendCooldown > 0 || isLoading) return;
    setError(null);
    setIsLoading(true);
    try {
      const result = await auth.forgotPassword(fpEmail.trim());
      if (result.devCode) setFpDevCode(result.devCode);
      setFpCode("");
      setFpCodeVerified(false);
      startCooldown(setFpResendCooldown, fpResendTimerRef);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to resend code.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) { setError("Please enter a new password."); return; }
    if (newPassword.length < 8) { setError("Password must be at least 8 characters long."); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    setError(null);
    setIsLoading(true);
    try {
      await auth.resetPassword(fpEmail.trim(), fpCode.trim(), newPassword);
      setEmail(fpEmail.trim());
      setPassword("");
      setFpEmail("");
      setFpCode("");
      setFpDevCode(null);
      setFpCodeVerified(false);
      setNewPassword("");
      setConfirmPassword("");
      setMode("signin");
      setSuccessMsg("Password reset successfully! You can now sign in with your new password.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to reset password. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Shared code-input box ────────────────────────────────────────────────────
  const CodeInput = ({
    value,
    onChange,
    verified,
  }: {
    value: string;
    onChange: (v: string) => void;
    verified?: boolean;
  }) => (
    <div className="relative">
      <Input
        type="text"
        inputMode="numeric"
        placeholder="000000"
        maxLength={6}
        className={`h-16 rounded-xl text-center text-3xl font-bold tracking-[0.6em] font-mono transition-all ${
          verified
            ? "border-green-400 bg-green-50 text-green-700"
            : value.length === 6
            ? "border-slate-400"
            : "border-slate-200"
        }`}
        value={value}
        onChange={(e) => {
          const v = e.target.value.replace(/\D/g, "").slice(0, 6);
          onChange(v);
          clearError();
        }}
        disabled={isLoading || verified}
        autoFocus
      />
      {(isLoading && value.length === 6) && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-xl">
          <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
        </div>
      )}
      {verified && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F9FB] p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-[32px] shadow-2xl overflow-hidden min-h-[600px]">

        {/* Left Side - Visual */}
        <div className="hidden md:flex bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[#DDA04E] rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-10" />
          <div className="relative z-10">
            <div className="h-12 w-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
              <span className="text-[#DDA04E] font-bold text-base">CF</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              Manage your real estate portfolio with confidence.
            </h1>
            <p className="text-slate-400 text-lg">
              ClientFlow provides full transparency and seamless communication for modern property management.
            </p>
          </div>
          <div className="relative z-10 flex space-x-2 mt-12">
            <div className="h-2 w-8 bg-[#DDA04E] rounded-full" />
            <div className="h-2 w-2 bg-slate-700 rounded-full" />
            <div className="h-2 w-2 bg-slate-700 rounded-full" />
          </div>
        </div>

        {/* Right Side */}
        <div className="p-10 flex flex-col justify-center overflow-y-auto">
          <div className="max-w-md w-full mx-auto space-y-6">

            {/* ── PORTAL SELECTION ── */}
            {mode === "portal-select" && (
              <>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-slate-900">Welcome to ClientFlow</h2>
                  <p className="text-slate-500 mt-1">Choose your portal to sign in or create an account</p>
                </div>
                <div className="grid gap-3">
                  {portals.map((portal) => (
                    <button
                      key={portal.key}
                      className={`group flex items-center p-4 rounded-2xl border border-slate-200 ${portal.hoverBorder} ${portal.hoverBg} transition-all text-left`}
                      onClick={() => handlePortalSelect(portal)}
                    >
                      <div className={`h-11 w-11 ${portal.iconBg} rounded-xl flex items-center justify-center ${portal.iconColor} transition-colors`}>
                        {portal.icon}
                      </div>
                      <div className="ml-4 flex-1">
                        <span className="block font-bold text-slate-900">{portal.label}</span>
                        <span className="block text-sm text-slate-500">{portal.description}</span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-300 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" style={{ color: portal.accent }} />
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ── SIGN IN ── */}
            {mode === "signin" && selectedPortal && (
              <>
                <div>
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-5"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to portals
                  </button>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 mb-5">
                    <div className={`h-10 w-10 ${selectedPortal.iconBg.split(" ")[0]} rounded-xl flex items-center justify-center ${selectedPortal.iconColor.split(" ")[0]}`}>
                      {selectedPortal.icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Signing in to</p>
                      <p className="font-bold text-slate-900">{selectedPortal.label}</p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900">Sign in</h2>
                  <p className="text-slate-500 mt-1">Enter your email and password to continue</p>
                </div>

                {successMsg && (
                  <div className="flex items-start gap-2.5 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-800">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="h-12 rounded-xl"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); clearError(); }}
                      disabled={isLoading}
                      autoFocus
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <button
                        type="button"
                        className="text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
                        onClick={() => {
                          setFpEmail(email);
                          setFpCode("");
                          setFpDevCode(null);
                          setFpCodeVerified(false);
                          setError(null);
                          setMode("forgot-password");
                        }}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="h-12 rounded-xl pr-12"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); clearError(); }}
                        disabled={isLoading}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Signing in…
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                {(selectedPortal.key === "investor" || selectedPortal.key === "tenant") && (
                  <p className="text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <button
                      className="font-semibold text-slate-900 hover:underline"
                      onClick={() => {
                        setRegRole(selectedPortal.key as "investor" | "tenant");
                        setRegName("");
                        setRegEmail("");
                        setRegPassword("");
                        setError(null);
                        setMode("create-account");
                      }}
                    >
                      Create one
                    </button>
                  </p>
                )}
              </>
            )}

            {/* ── CREATE ACCOUNT ── */}
            {mode === "create-account" && (
              <>
                <div>
                  <button
                    onClick={handleBackToSignin}
                    className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-5"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to sign in
                  </button>
                  <h2 className="text-2xl font-bold text-slate-900">Create an account</h2>
                  <p className="text-slate-500 mt-1">Fill in your details to get started</p>
                </div>

                <form onSubmit={handleCreateAccount} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Account type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "investor", label: "Investor", icon: <Building2 className="h-4 w-4" /> },
                        { value: "tenant", label: "Tenant", icon: <User className="h-4 w-4" /> },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setRegRole(opt.value as "investor" | "tenant")}
                          className={`flex items-center gap-2 justify-center py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                            regRole === opt.value
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-200 text-slate-600 hover:border-slate-400"
                          }`}
                        >
                          {opt.icon}
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Full name</Label>
                    <Input
                      id="reg-name"
                      type="text"
                      placeholder="Your full name"
                      className="h-12 rounded-xl"
                      value={regName}
                      onChange={(e) => { setRegName(e.target.value); clearError(); }}
                      disabled={isLoading}
                      autoFocus
                      autoComplete="name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email address</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="name@example.com"
                      className="h-12 rounded-xl"
                      value={regEmail}
                      onChange={(e) => { setRegEmail(e.target.value); clearError(); }}
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="reg-password"
                        type={regShowPassword ? "text" : "password"}
                        placeholder="At least 8 characters"
                        className="h-12 rounded-xl pr-12"
                        value={regPassword}
                        onChange={(e) => { setRegPassword(e.target.value); clearError(); }}
                        disabled={isLoading}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setRegShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        tabIndex={-1}
                      >
                        {regShowPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating account…
                      </span>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>

                <p className="text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <button className="font-semibold text-slate-900 hover:underline" onClick={handleBackToSignin}>
                    Sign in
                  </button>
                </p>
              </>
            )}

            {/* ── EMAIL VERIFICATION (post-registration) ── */}
            {mode === "verify-email" && (
              <>
                <div className="text-center">
                  <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-slate-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Check your email</h2>
                  <p className="text-slate-500 mt-2">We sent a 6-digit code to</p>
                  <p className="font-semibold text-slate-800 mt-0.5">{verifyEmail}</p>
                </div>

                {verifyDevCode && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
                    <p className="font-semibold mb-0.5">Development mode — email not sent</p>
                    <p>Your code is: <span className="font-mono font-bold text-lg tracking-widest">{verifyDevCode}</span></p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Verification code</Label>
                  <CodeInput value={verifyCode} onChange={setVerifyCode} />
                  <p className="text-xs text-slate-400 text-center">Enter the 6-digit code — it verifies automatically</p>
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                    {error}
                  </p>
                )}

                <div className="text-center space-y-2">
                  <p className="text-sm text-slate-500">
                    Didn't receive a code?{" "}
                    <button
                      className={`font-semibold transition-colors ${
                        resendCooldown > 0 ? "text-slate-400 cursor-not-allowed" : "text-slate-900 hover:underline"
                      }`}
                      onClick={handleResendCode}
                      disabled={resendCooldown > 0 || isLoading}
                    >
                      {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
                    </button>
                  </p>
                  <button
                    className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                    onClick={() => { setMode("portal-select"); setSelectedPortal(null); setError(null); setVerifyDevCode(null); }}
                  >
                    Back to portal selection
                  </button>
                </div>
              </>
            )}

            {/* ── FORGOT PASSWORD — enter email ── */}
            {mode === "forgot-password" && (
              <>
                <div>
                  <button
                    onClick={handleBackToSignin}
                    className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-5"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to sign in
                  </button>
                  <div className="h-14 w-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <KeyRound className="h-7 w-7 text-slate-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Forgot your password?</h2>
                  <p className="text-slate-500 mt-1">
                    Enter your email and we'll send you a 6-digit code to reset it.
                  </p>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fp-email">Email address</Label>
                    <Input
                      id="fp-email"
                      type="email"
                      placeholder="name@example.com"
                      className="h-12 rounded-xl"
                      value={fpEmail}
                      onChange={(e) => { setFpEmail(e.target.value); clearError(); }}
                      disabled={isLoading}
                      autoFocus
                      autoComplete="email"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                    disabled={isLoading || !fpEmail.trim()}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending code…
                      </span>
                    ) : (
                      "Send Reset Code"
                    )}
                  </Button>
                </form>
              </>
            )}

            {/* ── FORGOT PASSWORD — enter code ── */}
            {mode === "reset-code" && (
              <>
                <div className="text-center">
                  <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-slate-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Check your email</h2>
                  <p className="text-slate-500 mt-2">We sent a reset code to</p>
                  <p className="font-semibold text-slate-800 mt-0.5">{fpEmail}</p>
                </div>

                {fpDevCode && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
                    <p className="font-semibold mb-0.5">Development mode — email not sent</p>
                    <p>Your reset code is: <span className="font-mono font-bold text-lg tracking-widest">{fpDevCode}</span></p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Reset code</Label>
                  <CodeInput value={fpCode} onChange={setFpCode} verified={fpCodeVerified} />
                  <p className="text-xs text-slate-400 text-center">Enter the 6-digit code — it verifies automatically</p>
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                    {error}
                  </p>
                )}

                <div className="text-center space-y-2">
                  <p className="text-sm text-slate-500">
                    Didn't receive a code?{" "}
                    <button
                      className={`font-semibold transition-colors ${
                        fpResendCooldown > 0 ? "text-slate-400 cursor-not-allowed" : "text-slate-900 hover:underline"
                      }`}
                      onClick={handleResendResetCode}
                      disabled={fpResendCooldown > 0 || isLoading}
                    >
                      {fpResendCooldown > 0 ? `Resend in ${fpResendCooldown}s` : "Resend code"}
                    </button>
                  </p>
                  <button
                    className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                    onClick={() => { setMode("forgot-password"); setError(null); setFpCode(""); setFpCodeVerified(false); }}
                  >
                    Change email address
                  </button>
                </div>
              </>
            )}

            {/* ── FORGOT PASSWORD — new password ── */}
            {mode === "new-password" && (
              <>
                <div>
                  <div className="h-14 w-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                    <Lock className="h-7 w-7 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Set a new password</h2>
                  <p className="text-slate-500 mt-1">
                    Choose a strong password for your account.
                  </p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="At least 8 characters"
                        className="h-12 rounded-xl pr-12"
                        value={newPassword}
                        onChange={(e) => { setNewPassword(e.target.value); clearError(); }}
                        disabled={isLoading}
                        autoFocus
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        tabIndex={-1}
                      >
                        {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter your new password"
                        className="h-12 rounded-xl pr-12"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); clearError(); }}
                        disabled={isLoading}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {newPassword && confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-xs text-red-500">Passwords do not match.</p>
                  )}

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                    disabled={isLoading || !newPassword || !confirmPassword}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving password…
                      </span>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
