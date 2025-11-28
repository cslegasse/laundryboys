"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";

type Order = {
  id: string;
  customer_name: string;
  status: "pending" | "completed" | "cancelled";
  total: number;
  created_at: string;
};

type DailyVolume = {
  date: string;
  count: number;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.5 },
  }),
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [dailyVolume, setDailyVolume] = useState<DailyVolume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const response = await axios.get<{ orders: Order[] }>("/admin/orders");
        const fetchedOrders = response.data.orders;
        setOrders(fetchedOrders);

        // Calculate daily volume
        const volumeMap: Record<string, number> = {};
        fetchedOrders.forEach((order) => {
          const date = new Date(order.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          volumeMap[date] = (volumeMap[date] || 0) + 1;
        });

        const volume = Object.entries(volumeMap)
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
          });

        setDailyVolume(volume);
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const maxVolume = Math.max(...dailyVolume.map((d) => d.count), 1);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case "cancelled":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Package className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "cancelled":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-32 pb-16">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2aDRWMTBoLTR2Nk0yMCAzNmg0djZoLTR2LTZNMzYgMzZoNHY2aC00di02Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

        <div className="absolute -top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-blob animation-delay-2000" />

        <div className="relative container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6 px-6 py-2 glass-card rounded-full">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold flex items-center gap-2 justify-center">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                Order Management
              </span>
            </div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight"
            >
              Orders & Analytics
            </motion.h1>
          </motion.div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            {[
              {
                label: "Total Orders",
                value: totalOrders,
                icon: Package,
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                label: "Pending",
                value: pendingOrders,
                icon: Clock,
                gradient: "from-yellow-500 to-orange-500",
              },

              {
                label: "Total Revenue",
                value: `$${totalRevenue.toFixed(2)}`,
                icon: TrendingUp,
                gradient: "from-purple-500 to-pink-500",
              },
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={idx}
                className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${metric.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300`}
                  >
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
                  <p className="text-3xl font-bold text-white">{metric.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Orders Table */}
          {loading ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-center py-12"
            >
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-blue-500" />
              </div>
              <p className="text-gray-300 mt-4">Loading orders...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-red-500/20 border border-red-500/50 rounded-2xl p-6 text-red-300 text-center"
            >
              {error}
            </motion.div>
          ) : orders.length === 0 ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-center py-12"
            >
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
              <p className="text-gray-400 text-lg">No orders yet</p>
            </motion.div>
          ) : (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-white font-semibold">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders
                      .sort(
                        (a, b) =>
                          new Date(b.created_at).getTime() -
                          new Date(a.created_at).getTime()
                      )
                      .map((order, idx) => (
                        <motion.tr
                          key={order.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="border-b border-white/10 hover:bg-white/5 transition-colors duration-300"
                        >
                          <td className="px-6 py-4 text-gray-300 font-mono text-sm">
                            {order.id.slice(0, 8)}...
                          </td>
                          <td className="px-6 py-4 text-gray-200">
                            {order.customer_name}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(order.status)}
                              <span
                                className={`capitalize font-semibold ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right text-white font-semibold">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-sm">
                            {new Date(order.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </td>
                        </motion.tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
