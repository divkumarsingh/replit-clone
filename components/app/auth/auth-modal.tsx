'use client';

import { authClient } from '@/lib/auth-client';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { AuthMode, OAuthProvider } from '@/lib/types/account';
import { cn } from '@/lib/utils';
import { CloseIcon } from './auth-icons';
import { useAuthModal } from './auth-modal-provider';
import { OAuthButton } from './oauth-button';
import { useRouter } from 'next/navigation';

const DEFAULT_CALLBACK_URL = '/app';

const modeCopy: Record<
    AuthMode,
    {
        title: string;
        subtitle: string;
        submit: string;
        switchPrompt: string;
        switchAction: string;
    }
> = {
    login: {
        title: 'Welcome back',
        subtitle: 'Log in to continue building on Replit.',
        submit: 'Log in',
        switchPrompt: "Don't have an account?",
        switchAction: 'Create account',
    },
    register: {
        title: 'Create your account',
        subtitle: 'Start building apps with Replit agent in minutes',
        submit: 'Create account',
        switchPrompt: 'Already have an account?',
        switchAction: 'Log in',
    },
};

function AuthDivider() {
    return (
        <div className="relative py-1">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border-light" />
            <p className="relative mx-auto w-fit bg-surface-white px-3 text-xs text-text-muted">
                or continue with email
            </p>
        </div>
    );
}

type AuthFieldProps = {
    id: string;
    label: string;
    type: string;
    autoComplete: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
};

function AuthField({
    id,
    label,
    type,
    autoComplete,
    placeholder,
    value,
    onChange,
}: AuthFieldProps) {
    return (
        <div className="space-y-1.5">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-text-secondary">
                {label}
            </label>
            <input
                type={type}
                id={id}
                autoComplete={autoComplete}
                placeholder={placeholder}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className={cn(
                    'h-11 w-full rounded-xl border border-border-light bg-surface-white px-3.5 text-sm text-text-primary placeholder:text-text-muted',
                    'transition-[border-color,box-shadow] focus:border-replit-orange focus:outline-none focus:ring-2 focus:ring-replit-orange/20',
                )}
            />
        </div>
    );
}

export function AuthModal() {
    const router = useRouter();
    const { isOpen, mode, closeAuthModal, setAuthMode } = useAuthModal();
    const titleId = useId();
    const descriptionId = useId();
    const panelRef = useRef<HTMLDivElement>(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const copy = modeCopy[mode];
    const alternateMode: AuthMode = mode === 'login' ? 'register' : 'login';
    const callbackUrl =
        typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search).get('callbackUrl')
            : null;
    const redirectHint =
        callbackUrl === '/app'
            ? 'Sign in to open your workspace'
            : callbackUrl?.startsWith('/')
                ? 'Sign in to continue'
                : null;

    const handleClose = useCallback(() => {
        closeAuthModal();

        const params = new URLSearchParams(window.location.search);
        if (!params.has('auth') && !params.has('callbackUrl')) return;

        params.delete('auth');
        params.delete('callbackUrl');
        const query = params.toString();

        router.replace(
            query ? `${window.location.pathname}?${query}` : window.location.pathname,
        );
    }, [closeAuthModal, router]);

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleClose]);

    useEffect(() => {
        if (!isOpen) return;

        const reset = () => {
            setName('');
            setEmail('');
            setPassword('');
            setError(null);
            setIsLoading(false);
        };

        reset();
    }, [isOpen]);

    function getCallbackUrl() {
        const params = new URLSearchParams(window.location.search);
        const callback = params.get('callbackUrl');

        if (callback?.startsWith('/')) {
            return callback;
        }
        return DEFAULT_CALLBACK_URL;
    }

    function handleOAuthClick(provider: OAuthProvider) {
        setError(null);
        setIsLoading(true);
        void authClient.signIn.social({
            provider,
            callbackURL: getCallbackUrl(),
            fetchOptions: {
                onError: (ctx) => {
                    setIsLoading(false);
                    setError(ctx.error.message ?? 'sign-in failed. Please try again');
                },
            },
        });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(
            'Email sign-in is not configured yet. Please use Google or GitHub.',
        );
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <button
                type="button"
                aria-label="Close authentication modal"
                className="absolute inset-0 bg-[#191818]/45 backdrop-blur-[2px]"
                onClick={handleClose}
            />

            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                className="relative max-h-auth-modal w-full max-w-auth-modal overflow-y-auto rounded-[24px] border border-[#e3e2dd] bg-surface-white shadow-[0_24px_80px_rgba(0,0,0,0.18)] auth-modal-panel">
                <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] px-6 pb-5 pt-6">
                    <div>
                        <h2
                            id={titleId}
                            className="font-display text-[28px] font-normal leading-tight tracking-[-0.04em] text-text-agent-heading">
                            {copy.title}
                        </h2>
                        <p
                            id={descriptionId}
                            className="mt-1.5 text-sm leading-relaxed text-text-muted">
                            {redirectHint ?? copy.subtitle}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Close"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-pricing-surface hover:text-text-secondary">
                        <CloseIcon className="h-5 w-5" />
                    </button>
                </div>

                <div className="px-6 py-5">
                    <div
                        role="tablist"
                        aria-label="Authentication mode"
                        className="mb-5 grid grid-cols-2 gap-1 rounded-full bg-pricing-surface p-1">
                        {(['login', 'register'] as const).map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                role="tab"
                                aria-selected={mode === tab}
                                onClick={() => setAuthMode(tab)}
                                className={cn(
                                    'h-9 rounded-full text-sm font-medium transition-colors',
                                    mode === tab
                                        ? 'bg-surface-white text-text-primary shadow-sm'
                                        : 'text-text-muted hover:text-text-secondary',
                                )}>
                                {tab === 'login' ? 'Log in' : 'Sign up'}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-3">
                        <OAuthButton
                            provider="google"
                            disabled={isLoading}
                            onClick={() => handleOAuthClick('google')}
                        />
                        <OAuthButton
                            provider="github"
                            disabled={isLoading}
                            onClick={() => handleOAuthClick('github')}
                        />
                    </div>

                    {error && (
                        <p className="mt-3 rounded-xl bg-replit-orange/10 px-3 py-2 text-sm text-replit-orange">
                            {error}
                        </p>
                    )}

                    <AuthDivider />

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {mode === 'register' && (
                            <AuthField
                                id="auth-name"
                                label="Full name"
                                type="text"
                                autoComplete="name"
                                placeholder="Ada Lovelace"
                                value={name}
                                onChange={setName}
                            />
                        )}

                        <AuthField
                            id="auth-email"
                            label="Email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@company.com"
                            value={email}
                            onChange={setEmail}
                        />

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-3">
                                <label
                                    htmlFor="auth-password"
                                    className="text-sm font-medium text-text-secondary">
                                    Password
                                </label>
                                {mode === 'login' && (
                                    <button
                                        type="button"
                                        className="text-xs font-medium text-replit-orange transition-colors hover:text-[#e03600]">
                                        Forgot password?
                                    </button>
                                )}
                            </div>
                            <input
                                id="auth-password"
                                type="password"
                                autoComplete={
                                    mode === 'login' ? 'current-password' : 'new-password'
                                }
                                placeholder={
                                    mode === 'login' ? 'Enter your password' : 'Create a password'
                                }
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className={cn(
                                    'h-11 w-full rounded-xl border border-border-light bg-surface-white px-3.5 text-sm text-text-primary placeholder:text-text-muted',
                                    'transition-[border-color,box-shadow] focus:border-replit-orange focus:outline-none focus:ring-2 focus:ring-replit-orange/20',
                                )}
                            />
                        </div>

                        {mode === 'register' && (
                            <p className="text-xs leading-relaxed text-text-muted">
                                By creating an account, you agree to our{' '}
                                <a
                                    href="/terms"
                                    className="text-text-secondary underline underline-offset-2">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a
                                    href="/privacy"
                                    className="text-text-secondary underline underline-offset-2">
                                    Privacy Policy
                                </a>
                                .
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="h-11 w-full rounded-full bg-replit-orange text-sm font-medium text-white transition-colors hover:bg-[#e03600] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-replit-orange focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
                            {copy.submit}
                        </button>
                    </form>
                </div>

                <div className="border-t border-black/[0.06] px-6 py-4 text-center text-sm text-text-muted">
                    {copy.switchPrompt}{' '}
                    <button
                        type="button"
                        onClick={() => setAuthMode(alternateMode)}
                        className="font-medium text-replit-orange transition-colors hover:text-[#e03600]">
                        {copy.switchAction}
                    </button>
                </div>
            </div>
        </div>
    );
}
