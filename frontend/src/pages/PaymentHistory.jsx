import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { CreditCard, Calendar, Check, X, Download } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

export const PaymentHistory = () => {
  const [user] = useState({ name: 'Fabrice Ishimwe' });
  const [payments] = useState([
    {
      id: 1,
      billName: 'Electricity (SmartVolt)',
      amount: 15420,
      date: '2025-09-15',
      status: 'completed',
      method: 'MTN MoMo',
      transactionId: 'TXN-2025091501'
    },
    {
      id: 2,
      billName: 'Water (HydroTrack)',
      amount: 8500,
      date: '2025-09-12',
      status: 'completed',
      method: 'Agent Payment',
      transactionId: 'TXN-2025091202'
    },
    {
      id: 3,
      billName: 'Mutuelle de Santé',
      amount: 3000,
      date: '2025-09-10',
      status: 'completed',
      method: 'MTN MoMo',
      transactionId: 'TXN-2025091003'
    },
    {
      id: 4,
      billName: 'Wi-Fi Subscription',
      amount: 25000,
      date: '2025-08-20',
      status: 'completed',
      method: 'MTN MoMo',
      transactionId: 'TXN-2025082004'
    },
    {
      id: 5,
      billName: 'Security & Cleanliness',
      amount: 5000,
      date: '2025-08-08',
      status: 'failed',
      method: 'MTN MoMo',
      transactionId: 'TXN-2025080805'
    }
  ]);

  const totalPaid = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Payment History</h2>
            <p className="text-gray-600 mt-1">View all your past transactions</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Paid</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPaid)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Successful Payments</p>
              <p className="text-2xl font-bold text-green-600">{payments.filter(p => p.status === 'completed').length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Failed Payments</p>
              <p className="text-2xl font-bold text-red-600">{payments.filter(p => p.status === 'failed').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bill
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        {payment.method}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {payment.status === 'completed' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Check className="w-3 h-3" />
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <X className="w-3 h-3" />
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {payment.transactionId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};