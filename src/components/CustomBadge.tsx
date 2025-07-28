export default function CustomBadge({
  color,
  width,
  height = 'full',
}: {
  color: string;
  width?: string;
  height?: string;
}) {

  const tailwindColors = {
    blue: 'bg-blue-600',
    red: 'bg-red-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    purple: 'bg-purple-600',
    pink: 'bg-pink-600',
    indigo: 'bg-indigo-600',
    gray: 'bg-gray-400',
    orange: 'bg-orange-400',
  };

  return (
    <div
      className={`w-${width || "1"} ? ${tailwindColors[color]} mr-4 flex-shrink-0 h-${height}`}
    />
  );
}
