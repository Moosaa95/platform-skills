export function Typography({
    children,
    variant = "primary",
    size = 16, // Default size in pixels
    className = "",
    ...props
  }: {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "transparent";
    size?: number; // Allows direct pixel values (e.g., 14, 16, 18, 24)
    className?: string;
  } & React.HTMLAttributes<HTMLSpanElement>) {
    // Define base color styles
    const baseStyles = {
      primary: "text-primary-700",
      secondary: "text-secondary-700",
      transparent: "text-transparent",
    };
  
    return (
      <span
        className={`${baseStyles[variant]} ${className}`}
        style={{ fontSize: `${size}px` }} // Apply custom size directly
        {...props}
      >
        {children}
      </span>
    );
  }
  