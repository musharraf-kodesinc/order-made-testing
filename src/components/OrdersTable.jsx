"use client";
import { sampleOrders } from "@/constants/mappedData";
import React, { useEffect, useState, useMemo } from "react";
import { LogoHeader } from "./LogoHeader";

export const OrdersTable = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [subDomain, setSubDomain] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const itemsPerPage = 10;

  const getSubDomain = () => {
    const company = window.location.hostname.split(".");
    return company?.[0];
  };

  useEffect(() => {
    const URLDomain = getSubDomain();
    setSubDomain(URLDomain);
    const orders = sampleOrders[URLDomain] || [];
    setOrdersData(orders);
  }, []);

  // Sorting function
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return ordersData;

    return [...ordersData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [ordersData, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <LogoHeader subdomain={subDomain}/>
      <div className="shadow-lg rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              {["orderId", "customerName", "amount", "status"].map((key) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort(key)}
                >
                  {key.replace(/([A-Z])/g, " $1").trim()} {getSortIndicator(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map(({ orderId, customerName, amount, status }) => (
              <tr
                key={orderId}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      status === "completed"
                        ? "bg-green-100 text-green-800"
                        : status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 bg-gray-50 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
