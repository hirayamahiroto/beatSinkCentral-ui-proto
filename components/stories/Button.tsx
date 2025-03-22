import React from "react";

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  // Tailwindのクラスを条件に基づいて設定
  const baseClasses = "font-sans font-medium rounded transition-colors duration-200";

  // サイズに基づくクラス
  const sizeClasses = {
    small: "px-3 py-1.5 text-xs",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  // プライマリボタンかセカンダリボタンかによるクラス
  const variantClasses = primary
    ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50";

  // 最終的なクラス名の組み合わせ
  const buttonClasses = [baseClasses, sizeClasses[size], variantClasses].join(" ");

  return (
    <button
      type="button"
      className={buttonClasses}
      style={backgroundColor ? { backgroundColor } : {}}
      {...props}
    >
      {label}
    </button>
  );
};
