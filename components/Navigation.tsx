import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { UserButton } from "./UserButton";
const Navigation = ({ col = false }: { col?: boolean }) => {
  return (
    <div
      className={
        col ? "flex flex-col  " : "flex items-center gap-3 justify-center"
      }
    >
      <Link href={"/"}>
        <Button variant={"link"}>
          <span>Dashboard</span>
        </Button>
      </Link>
      <Link href={"/add"}>
        <Button variant={"link"}>
          <span>Add Product</span>
        </Button>
      </Link>
      <Link href={"/all"}>
        <Button variant={"link"}>
          <span>All Products</span>
        </Button>
      </Link>
      <Link href={"/bill"}>
        <Button variant={"link"}>
          <span>Bill</span>
        </Button>
      </Link>
      <ThemeToggle />
      <UserButton />
    </div>
  );
};

export default Navigation;
