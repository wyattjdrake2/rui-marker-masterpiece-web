
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash, X, Plus, Minus } from "lucide-react";
import { Product } from "./ProductCard";
import { Input } from "@/components/ui/input";
import { Currency } from '@/pages/Index';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  currency?: Currency;
}

const CartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
  clearCart,
  updateQuantity,
  currency = "CAD"
}: CartDrawerProps) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // Fixed shipping cost
  const shipping = cartItems.length > 0 ? 0 : 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-5">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center text-2xl font-bold">
              <ShoppingCart className="mr-2 h-5 w-5" /> Your Cart
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-gray-100 pb-5"
                >
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-50 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-base">{item.name}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="h-6 w-6"
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      {item.colors} Colors
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, (item.quantity || 1) - 1)
                            )
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <Input
                          type="text"
                          value={item.quantity || 1}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val) && val > 0) {
                              updateQuantity(item.id, val);
                            }
                          }}
                          className="h-8 w-12 text-center border-0"
                        />

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              (item.quantity || 1) + 1
                            )
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="font-medium">
                        {currency} ${(
                          item.price * (item.quantity || 1)
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>{currency} ${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span>{shipping === 0 ? "FREE" : `${currency} $${shipping.toFixed(2)}`}</span>
              </div>

              <div className="border-t pt-4 flex justify-between font-medium">
                <span>Total</span>
                <span>{currency} ${total.toFixed(2)}</span>
              </div>

              <Button className="w-full bg-marker-green hover:bg-marker-green/90">
                Checkout
              </Button>

              <div className="text-center">
                <Button
                  variant="link"
                  className="text-sm text-gray-500"
                  onClick={clearCart}
                >
                  Clear cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
