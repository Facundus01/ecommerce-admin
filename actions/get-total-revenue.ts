import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string)=>{
  const paidOrdes = await prismadb.order.findMany({
    where:{
        storeId,
        isPaid: true
    },
    include:{
        orderItems:{
            include:{
                product: true
            }
        }
    }
  });

  const totalRevenue = paidOrdes.reduce((total, order)=>{
     const orderTotal = order.orderItems.reduce((orderSum, item)=>{
        return orderSum + item.product.price.toNumber();
     },0);

     return total + orderTotal;
  },0);

  return totalRevenue
}