export default function WavesBackground() {
  return (
    <div className="absolute inset-0 bg-[#946B66] overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 1440 560"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,280 C240,180 480,380 720,280 C960,180 1200,380 1440,280 L1440,560 L0,560 Z"
          fill="#C4A4A0"
        />
        <path
          d="M0,320 C200,220 440,420 720,320 C1000,220 1240,420 1440,320 L1440,560 L0,560 Z"
          fill="#D4B5B1"
          opacity="0.5"
        />
        <path
          d="M0,360 C180,280 420,440 720,360 C1020,280 1260,440 1440,360 L1440,560 L0,560 Z"
          fill="#E8D5D2"
          opacity="0.3"
        />
      </svg>
      <svg
        className="absolute inset-0 w-full h-full opacity-15"
        viewBox="0 0 1440 560"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,200 C300,100 600,300 900,200 C1200,100 1350,300 1440,200 L1440,0 L0,0 Z"
          fill="#C4A4A0"
        />
        <path
          d="M0,160 C250,80 550,260 850,160 C1150,80 1300,260 1440,160 L1440,0 L0,0 Z"
          fill="#D4B5B1"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
