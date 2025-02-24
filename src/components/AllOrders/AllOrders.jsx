import React, { useContext, useEffect } from "react";
import style from "./AllOrders.module.css";
import { AllOrdersContext } from "../../Context/AllOrdersContext";
import { UserContext } from "../../Context/UserContext";

export default function AllOrders() {
  const { userID } = useContext(UserContext);
  const { orders, getUserOrders } = useContext(AllOrdersContext);

  useEffect(() => {
    if (userID) {
      getUserOrders(userID);
    }
  }, [userID]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[80%] mx-auto">
      <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product ID
            </th>
            <th scope="col" className="px-6 py-3">
              Order Price
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {order.id}
              </td>
              <td className="px-6 py-4">{order.totalOrderPrice} EGP</td>
              <td className="px-6 py-4">
                {order.isDelivered ? (
                  <div className="font-bold text-emerald-500">Delivered</div>
                ) : (
                  <div className="font-bold text-red-500">Not Delivered</div>
                )}
                {order.isPaid ? (
                  <div className="font-bold text-emerald-500">Paid</div>
                ) : (
                  <div className="font-bold text-red-500">Not Delivered</div>
                )}
              </td>
              {/* <td className="px-6 py-4 text-right">
                <button className="btn font-semibold">View</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
