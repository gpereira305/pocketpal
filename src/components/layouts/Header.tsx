import { ModeToggle } from "../shared/theme-toggle";

export default function Header() {
  return (
    <header className="standard-container flex min-h-[60px] items-center justify-between bg-[#121214] p-4 text-white">
      <h1 className="text-2xl font-bold">PocketPal</h1>

      <ModeToggle />
    </header>
  );
}
