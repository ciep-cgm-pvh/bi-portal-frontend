export default function FooterSidebar() {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-yellow-400 text-black px-4 py-2 text-sm flex items-center gap-2">
      {/* Logo */}
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Bras%C3%A3o_de_Porto_Velho.svg" alt="Logo" className="h-10 w-10" />

      {/* Texto ao lado */}
      <div className="flex flex-col leading-tight">
        <p className="font-semibold">CGM</p>
        <p className="text-xs">cgm.ti.pvh@gmail.com</p>
      </div>
    </div>
  );
}

