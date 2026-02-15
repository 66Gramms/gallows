interface MistakeIndicatorProps {
  current: number;
  max: number;
}

export default function MistakeIndicator({
  current,
  max,
}: MistakeIndicatorProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
      <p className="text-sm sm:text-base md:text-lg font-semibold">
        Mistakes: {current} / {max}
      </p>
      <div className="flex gap-1 sm:gap-1.5">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            aria-label={i < current ? "Mistake" : "Remaining attempt"}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
              i < current ? "bg-red-500" : "bg-gray-300 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
