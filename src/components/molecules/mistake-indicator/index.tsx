interface MistakeIndicatorProps {
  current: number;
  max: number;
}

export default function MistakeIndicator({
  current,
  max,
}: MistakeIndicatorProps) {
  return (
    <div className="flex gap-4 items-center">
      <p className="text-lg font-semibold">
        Mistakes: {current} / {max}
      </p>
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < current ? "bg-red-500" : "bg-gray-300 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
