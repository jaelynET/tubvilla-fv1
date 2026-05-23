import CustomerOrders from "@/app/_components/CustomerOrders";
import SignOutButton from "@/app/_components/SignOutButton";
import { getOrders } from "@/app/_lib/data-service";
import { createClient } from "@/app/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  const userId = data.user.id;
  const orders = await getOrders(userId);

  // const { fullName } = data.user.user_metadata;
  // const firstName = fullName.split(" ").at(0);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Header / Welcome Section */}
      <div className="w-full h-24 flex items-center px-6 mb-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
        {/* <h2 className="text-2xl font-bold text-gray-800">
          Welcome back, <span>{firstName}!</span>
        </h2> */}
      </div>
      <div className="flex justify-between items-end mb-4 px-2">
        <h3 className="text-lg font-semibold text-gray-700 uppercase tracking-wider">
          Your Orders
        </h3>
        <span className="text-sm text-gray-500">
          {orders.length} items found
        </span>
      </div>
      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.order_number}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-100">
                <span className="text-xs font-mono text-gray-500">
                  #{order.order_number}
                </span>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.status}
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-gray-100">
                {order.order_items.map((product) => (
                  <Link
                    href={`account/order/${order.order_number}`}
                    key={product.id}
                    className="block hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-4">
                      <CustomerOrders orders={product} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State Section */
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
          <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            {/* Simple Shopping Bag Icon */}
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-gray-800">No orders yet</h4>
          <p className="text-gray-500 mt-2 mb-6">
            Looks like you haven&apos;t made your first purchase.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-button text-white font-semibold rounded-lg hover:bg-[#4d4238 transition-colors shadow-md"
          >
            Start Shopping
          </Link>
        </div>
      )}
      ;{/* Footer Actions */}
      <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col gap-4 items-center">
        <SignOutButton />
      </div>
    </div>
  );
}
export default Page;
