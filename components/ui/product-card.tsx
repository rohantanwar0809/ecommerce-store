"use client";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Product } from "@/types";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const previewModal = usePreviewModal();
  const cart = useCart();

  const clickHandler = () => {
    router.push(`/product/${product?.id}`);
  };

  const onPreviewHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    previewModal.onOpen(product);
  };

  const onAddToCartHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    cart.addItem(product);
  };
  return (
    <div
      onClick={clickHandler}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Images and Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={product?.images?.[0]?.url}
          fill
          alt="Product Image"
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transistion absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreviewHandler}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCartHandler}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Product Info */}
      <div className="space-y-2">
        <h4 className="font-bold text-lg">{product.name}</h4>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">{product.category.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <Currency value={product.price} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
