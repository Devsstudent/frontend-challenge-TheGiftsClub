export default function CustomBadge({ color, width }: { color: string, width?: string }) {
  return <div className={`w-${width || '1'} bg-${color}-600 mr-4 flex-shrink-0`} />;
}
