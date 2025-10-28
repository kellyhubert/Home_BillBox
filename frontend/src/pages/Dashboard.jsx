import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calendar, ChevronRight, AlertCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { BillCard } from '../components/BillCard';
import { PaymentForm } from '../components/PaymentForm';
import { StatCard } from '../components/StatCard';
import { formatCurrency } from '../utils/formatters';

export const Dashboard = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [user, setUser] = useState({ name: 'Fabrice Ishimwe' });
  
  const [bills, setBills] = useState([
    {
      id: 1,
      name: 'Electricity (SmartVolt)',
      type: 'electricity',
      amount: 15420,
      dueDate: '2025-10-10',
      status: 'pending',
      isEssential: true,
      meterNumber: 'ELC-2847-9201'
    },
    {
      id: 2,
      name: 'Water (HydroTrack)',
      type: 'water',
      amount: 8500,
      dueDate: '2025-10-12',
      status: 'pending',
      isEssential: true,
      meterNumber: 'WTR-1034-5678'
    },
    {
      id: 3,
      name: 'Mutuelle de Santé',
      type: 'mutuelle',
      amount: 3000,
      dueDate: '2025-10-15',
      status: 'paid',
      isEssential: true,
      accountNumber: 'MUT-847392'
    },
    {
      id: 4,
      name: 'Security & Cleanliness',
      type: 'security',
      amount: 5000,
      dueDate: '2025-10-08',
      status: 'overdue',
      isEssential: true,
      accountNumber: 'SEC-92847'
    },
    {
      id: 5,
      name: 'Wi-Fi Subscription',
      type: 'wifi',
      amount: 25000,
      dueDate: '2025-10-20',
      status: 'pending',
      isEssential: false,
      accountNumber: 'WIFI-20394'
    }
  ]);

  const handlePayClick = (bill) => {
    setSelectedBill(bill);
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = (paymentData) => {
    console.log('Payment submitted:', paymentData);
    
    setBills(bills.map(bill => 
      bill.id === paymentData.billId 
        ? { ...bill, status: 'paid' }
        : bill
    ));
    
    setShowPaymentForm(false);
    setSelectedBill(null);
  };

  const totalPending = bills
    .filter(b => b.status !== 'paid')
    .reduce((sum, b) => sum + b.amount, 0);

  const totalPaid = bills
    .filter(b => b.status === 'paid')
    .reduce((sum, b) => sum + b.amount, 0);

  const overdueCount = bills.filter(b => b.status === 'overdue').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} overdueCount={overdueCount} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h2>
          <p className="text-gray-600 mt-1">Here's your billing overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Pending"
            value={formatCurrency(totalPending)}
            subtitle={`${bills.filter(b => b.status !== 'paid').length} unpaid bills`}
            icon={DollarSign}
            iconColor="text-orange-500"
          />
          <StatCard
            title="Paid This Month"
            value={formatCurrency(totalPaid)}
            subtitle={`${bills.filter(b => b.status === 'paid').length} bills paid`}
            icon={TrendingUp}
            iconColor="text-green-500"
          />
          <StatCard
            title="Next Due"
            value="Oct 8"
            subtitle="Security & Cleanliness"
            icon={Calendar}
            iconColor="text-blue-500"
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Bills</h2>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              Essential Bills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bills.filter(b => b.isEssential).map(bill => (
                <BillCard key={bill.id} bill={bill} onPayClick={handlePayClick} />
              ))}
            </div>
          </div>

          {bills.some(b => !b.isEssential) && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Optional Subscriptions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bills.filter(b => !b.isEssential).map(bill => (
                  <BillCard key={bill.id} bill={bill} onPayClick={handlePayClick} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {showPaymentForm && selectedBill && (
        <PaymentForm
          bill={selectedBill}
          onClose={() => {
            setShowPaymentForm(false);
            setSelectedBill(null);
          }}
          onSubmit={handlePaymentSubmit}
        />
      )}
    </div>
  );
};