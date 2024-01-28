import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <div>
      <header>
        <UserButton afterSignOutUrl="/" />
      </header>
      <section></section>
    </div>
  );
}
