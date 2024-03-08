import Link from "next/link";
import Navigation from "./Navigation";
import { Button } from "./ui/button";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Header = () => {
  return (
    <div className=" px-5 flex justify-between items-center bg-[#071224] text-foreground py-5 rounded-3xl">
      <Link href={"/"}>
        <h1 className="text-4xl text-orange-600 font-bold">MH</h1>
      </Link>
      <div className="hidden md:block">
        <Navigation />
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <span className="bg-primary px-5 py-2 rounded-lg font-bold">
              Menu
            </span>
          </SheetTrigger>
          <SheetContent>
            <Navigation col />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Header;
