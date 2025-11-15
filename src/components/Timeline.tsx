type Props = {
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
};

export default function TimelineEvent({ year, title, description, isLast = false }: Props) {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
          {year}
        </div>
        {!isLast && <div className="w-0.5 flex-grow bg-blue-200 mt-4"></div>}
      </div>
      
      <div className="pb-12">
        <h3 className="text-xl font-semibold text-gray-300 mb-2">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}