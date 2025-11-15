import { Check } from "lucide-react";

type Props = {
  planName: string;
  price: string;
  pricePeriod: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
};

export default function PricingTier({ planName, price, pricePeriod, description, features, isFeatured = false }: Props) {
  const buttonClasses = isFeatured
    ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-xl"
    : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-50";

  return (
    <div className={`p-8 bg-white rounded-2xl shadow-lg relative ${isFeatured ? 'border-2 border-blue-500 shadow-glow' : 'border border-gray-200'}`}>
      <h3 className="text-lg font-semibold text-gray-500">{planName}</h3>
      <p className="mt-2 text-4xl font-extrabold text-gray-900">
        {price}
        <span className="text-base font-normal text-gray-500 ml-1">{pricePeriod}</span>
      </p>
      <p className="mt-4 text-sm text-gray-600">{description}</p>
      
      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className={`w-full mt-8 py-3 px-6 rounded-full text-base font-semibold transition ${buttonClasses}`}>
        Get Started
      </button>
    </div>
  );
}