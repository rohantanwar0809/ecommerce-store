"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

interface SummaryProps {}

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAllItems = useCart((state) => state.removeAllItems);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment successful");
      removeAllItems();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong");
    }
  }, [searchParams, removeAllItems]);

  const totalPrice = items.reduce((acc, item) => {
    return acc + Number(item.price);
  }, 0);

  const onCheckoutHandler = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
        }
      );

      window.location = response.data.url;
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        disabled={items.length === 0}
        className="w-full mt-6"
        onClick={onCheckoutHandler}
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
