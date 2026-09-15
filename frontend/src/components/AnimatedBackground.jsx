export default function AnimatedBackground() {
  const nodes = [
    [8, 20],
    [22, 65],
    [38, 30],
    [52, 75],
    [67, 25],
    [82, 60],
    [94, 30],
    [75, 90],
    [45, 90],
    [15, 90],
  ];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute h-full w-full opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="lineGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          <radialGradient id="glow">
            <stop
              offset="0%"
              stopColor="#6366f1"
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              stopColor="#6366f1"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        <rect
          width="100"
          height="100"
          fill="url(#glow)"
          opacity="0.25"
        />

        {nodes.slice(0, -1).map((node, index) => {
          const next = nodes[index + 1];

          return (
            <line
              key={index}
              x1={node[0]}
              y1={node[1]}
              x2={next[0]}
              y2={next[1]}
              stroke="url(#lineGradient)"
              strokeWidth="0.08"
              strokeDasharray="1 2"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-20"
                dur={`${5 + index}s`}
                repeatCount="indefinite"
              />
            </line>
          );
        })}

        {nodes.map(([x, y], index) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={index % 2 === 0 ? "0.35" : "0.22"}
            fill="#818cf8"
          >
            <animate
              attributeName="r"
              values="0.2;0.55;0.2"
              dur={`${3 + index * 0.4}s`}
              repeatCount="indefinite"
            />

            <animate
              attributeName="opacity"
              values="0.2;0.8;0.2"
              dur={`${3 + index * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      <div className="absolute left-[10%] top-[10%] h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="absolute right-[5%] top-[30%] h-80 w-80 rounded-full bg-purple-600/10 blur-3xl" />

      <div className="absolute bottom-[5%] left-[35%] h-72 w-72 rounded-full bg-cyan-600/5 blur-3xl" />
    </div>
  );
}
