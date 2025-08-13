export default function FooterSidebar() {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-official-green border-t-4 border-t-official-yellow text-black px-4 py-2 text-sm flex items-center gap-2">
      {/* Logo */}
      <img src="/logo - escudo - cidade de porto velho.svg" alt="Logo" className="h-10 w-10 drop-shadow-md"/>

      {/* Texto ao lado */}
      <div className="flex flex-col leading-tight">
        <p className="font-semibold">CGM</p>
        <p className="text-xs">cgm.ti.pvh@gmail.com</p>
      </div>
    </div>
  );
}

