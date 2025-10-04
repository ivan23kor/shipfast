"use client";

import { signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import config from "@/config";

/**
 * ButtonAccount - Account dropdown menu button
 *
 * Usage:
 * <ButtonAccount />
 *
 * Features:
 * - User avatar display
 * - Dropdown menu
 * - Sign out functionality
 * - Loading states
 * - Click outside to close
 */

interface ButtonAccountProps {
  className?: string;
}

export default function ButtonAccount({ className = "" }: ButtonAccountProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email?.[0].toUpperCase() || "U";

  return (
    <div className={`dropdown dropdown-end ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-ghost btn-circle avatar"
        aria-label="Account menu"
      >
        <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User avatar"}
              className="rounded-full"
            />
          ) : (
            <span className="text-sm font-semibold">{initials}</span>
          )}
        </div>
      </button>

      {isOpen && (
        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li className="menu-title">
            <span>{user.name || user.email}</span>
          </li>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/settings">Settings</a>
          </li>
          <li>
            <a href="/billing">Billing</a>
          </li>
          <div className="divider my-0"></div>
          <li>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-error"
            >
              Sign Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
