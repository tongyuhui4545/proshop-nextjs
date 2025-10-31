import ModeToggle from "@/components/shared/header/mode-toggle"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart, UserIcon } from "lucide-react";
import { EllipsisVertical } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import UserButton from './user-button'

const Menu = () => {
    return (
        <div className="flex justify-end gap-3">
            <nav className="hidden md:flex w-full max-w-xs gap-1">
                <ModeToggle />
                <Button asChild>
                    <Link href="/cart">
                        <ShoppingCart /> Cart
                    </Link>
                </Button>
                {/* <Button asChild variant="ghost">
                    <Link href="/sign-in">
                        <UserIcon /> Sign In
                    </Link>
                </Button> */}
                <UserButton></UserButton>
            </nav>
            <nav className="md:hidden">
                <Sheet>
                    <SheetTrigger className="align-middle">
                        <EllipsisVertical />
                    </SheetTrigger>
                    <SheetContent className="flex flex-col items-start">
                        <SheetTitle>Menu</SheetTitle>
                        <ModeToggle />
                        <Button asChild variant="ghost">
                            <Link href="/cart">
                                <ShoppingCart />
                            </Link>
                        </Button>
                     <UserButton></UserButton>
                        <SheetDescription></SheetDescription>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )
}

export default Menu