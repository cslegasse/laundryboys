import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";

type Props = {
  imageUrl: string;
  name: string;
  title: string;
  bio: string;
};

export default function TeamMember({ imageUrl, name, title, bio }: Props) {
  return (
    <div className="p-6 text-center bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
      <Image
        src={imageUrl}
        alt={name}
        width={96}
        height={96}
        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
      />
      <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
      <p className="text-blue-600 font-medium text-sm mb-3">{title}</p>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{bio}</p>
      <div className="flex justify-center gap-4">
        <a href="#" className="text-gray-400 hover:text-blue-500 transition">
          <Twitter className="w-5 h-5" />
        </a>
        <a href="#" className="text-gray-400 hover:text-blue-700 transition">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}