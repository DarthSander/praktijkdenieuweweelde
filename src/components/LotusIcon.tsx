export default function LotusIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Center petal */}
      <path
        d="M16 4 C16 4 20 12 20 18 C20 22 18 24 16 26 C14 24 12 22 12 18 C12 12 16 4 16 4Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Left petal */}
      <path
        d="M16 26 C14 22 8 16 4 14 C4 14 6 20 10 24 C12 26 14 26 16 26Z"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Right petal */}
      <path
        d="M16 26 C18 22 24 16 28 14 C28 14 26 20 22 24 C20 26 18 26 16 26Z"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Far left petal */}
      <path
        d="M10 24 C8 20 4 18 2 18 C2 18 3 22 6 25 C8 26 9 25 10 24Z"
        fill="currentColor"
        opacity="0.35"
      />
      {/* Far right petal */}
      <path
        d="M22 24 C24 20 28 18 30 18 C30 18 29 22 26 25 C24 26 23 25 22 24Z"
        fill="currentColor"
        opacity="0.35"
      />
    </svg>
  );
}
