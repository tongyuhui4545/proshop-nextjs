'use client';

import { Label } from '@/components/ui/label'
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { signInDefaultValues } from '@/lib/constants';

const CredentialsSigninForm = () => {
    return (
        <div className='space-y-6'>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input id='email' name='email' type='email' required autoComplete='email' defaultValue={signInDefaultValues.email} />
            </div>
            <div>
                <Label htmlFor="email">Password</Label>
                <Input id='password' name='password' type='password' required autoComplete='password' defaultValue={signInDefaultValues.password} />
            </div>
            <Button className="w-full" variant='default'>SignIn</Button>
        </div>
    )
}

export default CredentialsSigninForm