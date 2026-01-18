'use client';

import { ShippingAddress } from "@/types";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import { Form, FormField, FormItem, FormMessage, FormLabel, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useTransition } from 'react';
import { shippingAddressSchema } from '@/lib/validator'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { shippingAddressDefaultValues } from "@/lib/constants";
import { ArrowRight, Loader } from "lucide-react";


const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof shippingAddressSchema>>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: address || shippingAddressDefaultValues,
    })

    const [isPending, startTransition] = useTransition();

    const onSubmit = () => {
        return
    }
    return (
        <>
            <div className="max-w-dm max-auto space-y-4">
                <h1 className="h2-bold mt-4">Shipping Address</h1>
                <p className="text-sm text-muted-foreground">
                    Please enter an address to ship to
                </p>
                <Form {...form}>
                    <form method="post" className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                        {/* full name */}
                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Full Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Address */}
                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField
                                control={form.control}
                                name="streetAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Postal Code */}
                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField
                                control={form.control}
                                name="postalCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Postal Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Postal Code" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Country */}
                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Country" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? (
                                    <Loader className='w-4 h-4 animate-spi' />

                                ) : (
                                    <ArrowRight className='w-4 h-4' />
                                )} {" "}
                                Continue...
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default ShippingAddressForm