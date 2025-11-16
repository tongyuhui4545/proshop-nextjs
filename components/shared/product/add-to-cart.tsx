'use client'

import { CartItem, Cart } from "@/types";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import { Plus, Minus } from 'lucide-react'
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { toast } from 'sonner'
import { useTransition } from 'react'
import {Loader} from "lucide-react"


const AddToCart = ({ cart, item }: { cart?: Cart, item: CartItem }) => {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    //Check if item is in cart
    const existItem = cart && cart.items.find((x) => x.productId === item.productId);

    const handleAddToCart = async () => {
        startTransition(async () => {
            const res = await addItemToCart(item);

            if (!res.success) {
                toast.error(res.message ?? res.message);
                return
            }

            //Handle success add to cart
            toast.success(`${item.name} added to cart`, {
                action: {
                    label: 'Go To Cart',
                    onClick: () => router.push('/cart')
                }
            });
        })
    }

    //Handle remove from cart
    const handleRemoveFromCart = async () => {
        startTransition(async () => {
            const res = await removeItemFromCart(item.productId);

            toast(res.message, {
                description: res.success ? "Success" : "Error",
            });
        })
    }

    return (
        existItem ? (
            <div>
                <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
                    {isPending ? (<Loader className='w-4 h4 animate-spin' />) : (
                        <Minus className='h4 w-4' />
                    )}
                </Button>
                <span className="px-2">{existItem.qty}</span>
            </div>
        ) : (
            <Button className='w-full' type='button' onClick={handleAddToCart}>
                {isPending ? (
                    <Loader className="w-4 h-4 animate-spin" />
                ) : (
                    <>
                        <Plus />Add To Cart
                    </>
                )}

            </Button>

        ))
}

export default AddToCart