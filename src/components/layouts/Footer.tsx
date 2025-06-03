export default function Footer() {
  return (
    <footer className="standard-container flex min-h-[80px] items-center justify-center bg-[#121214] px-4 text-white">
      <span className="text-center">
        Pocketpal | Copyright &copy; {new Date().getFullYear()}{" "}
      </span>
    </footer>
  );
}
