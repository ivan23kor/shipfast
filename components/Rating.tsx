"use client";

import { useState } from "react";

/**
 * Rating - Star rating component
 *
 * Usage:
 * <Rating value={4.5} /> // Display only
 * <Rating value={rating} onChange={setRating} /> // Interactive
 *
 * Features:
 * - Display or interactive mode
 * - Half-star support
 * - Customizable size and color
 * - Hover preview
 * - Read-only mode
 */

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  showValue?: boolean;
  className?: string;
}

export default function Rating({
  value = 0,
  onChange,
  max = 5,
  size = "md",
  readonly = false,
  showValue = false,
  className = "",
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const isInteractive = !readonly && onChange !== undefined;

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const handleClick = (rating: number) => {
    if (isInteractive) {
      onChange?.(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (isInteractive) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    if (isInteractive) {
      setHoverValue(null);
    }
  };

  const displayValue = hoverValue ?? value;

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const fillPercentage = Math.min(Math.max((displayValue - index) * 100, 0), 100);

    return (
      <button
        key={index}
        type="button"
        onClick={() => handleClick(starValue)}
        onMouseEnter={() => handleMouseEnter(starValue)}
        className={`
          relative ${sizeClasses[size]}
          ${isInteractive ? "cursor-pointer hover:scale-110" : "cursor-default"}
          transition-transform
        `}
        disabled={!isInteractive}
        aria-label={`Rate ${starValue} out of ${max}`}
      >
        {/* Background star (empty) */}
        <svg
          className="absolute inset-0 text-base-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>

        {/* Filled star with gradient */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          <svg
            className="text-warning"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </button>
    );
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="flex gap-1"
        onMouseLeave={handleMouseLeave}
        role="radiogroup"
        aria-label="Rating"
      >
        {Array.from({ length: max }, (_, i) => renderStar(i))}
      </div>

      {showValue && (
        <span className="text-sm font-medium">
          {displayValue.toFixed(1)} / {max}
        </span>
      )}
    </div>
  );
}
