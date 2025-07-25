import { CheckCircle } from "lucide-react";

const IntegratedBadge = () => {
  return (
    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
      <CheckCircle className="w-3 h-3 mr-1" />
      Intégré
    </span>
  );
};

export default IntegratedBadge;