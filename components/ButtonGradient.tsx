"use client";

/**
 * ButtonGradient - Styled gradient button component
 *
 * Usage:
 * <ButtonGradient>Click me</ButtonGradient>
 * <ButtonGradient gradient="purple">Premium</ButtonGradient>
 *
 * Features:
 * - Multiple gradient presets
 * - Hover animations
 * - Loading states
 * - Customizable
 */

interface ButtonGradientProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  gradient?: "primary" | "purple" | "blue" | "green" | "orange" | "pink";
  className?: string;
}

const gradientStyles = {
  primary: "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600",
  purple: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
  blue: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
  green: "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
  orange: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
  pink: "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600",
};

export default function ButtonGradient({
  children,
  onClick,
  type = "button",
  disabled = false,
  isLoading = false,
  gradient = "primary",
  className = "",
}: ButtonGradientProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        relative px-6 py-3 rounded-lg font-semibold text-white
        ${gradientStyles[gradient]}
        transform transition-all duration-200
        hover:scale-105 hover:shadow-lg
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${className}
      `}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="loading loading-spinner loading-sm"></span>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
