import { Menu } from "lucide-react";
export default function MenuButtonDesktop({
  openSideBar,
}: {
  openSideBar: (state: boolean) => void;
}) {
  if (typeof openSideBar !== "function") {
    console.error("Expected openSideBar to be a function, got:", openSideBar);
  }
  return (
    <button
      onClick={() => openSideBar(true)}
      className="hidden fixed md:block p-2 bg-official-blue text-white rounded-lg
    hover:bg-official-blue-active 
      transition
      top-4 left-4  z-50"
    >
      <Menu className="w-8 h-8 font-bold" />
    </button>
  );
}
