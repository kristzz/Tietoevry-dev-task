import Image from "next/image";
import Card from "./components/card";

export default function Home() {
  return (
    <main className="flex space-x-16">
      <div className="w-48 h-72">
        <Card />
      </div>
      <div className="w-48 h-72">
        <Card />
      </div>
      <div className="w-48 h-72">
        <Card />
      </div>
    </main>
  );
}
