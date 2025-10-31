import Link from 'next/link'
import {auth} from "@/auth"
import {signOutUser} from "@/lib/actions/user.actions"
import {DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger} from "@/componnets/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { UserIcon } from 'lucide-react'

const UserButton = async() => {
    const session = await auth();

    if(!session) {
        return(
            <Button asChild>
                <Link href="/sign-in">
                    <UserIcon /> Sign In
                </Link>
            </Button>
        )
    }

  return <>User</>
}

export default UserButton 