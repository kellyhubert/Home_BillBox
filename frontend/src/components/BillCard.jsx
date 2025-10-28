import React from 'react';
import { Zap, Droplet, Heart, Shield, Wifi, CreditCard, Check, AlertCircle } from 'lucide-react';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const BillCard = ({ bill, onPayClick }) => {
  const getIcon = (type) => {
    const icons = {
      electricity: <Zap className="w-6 h-6" />,
      water: <Droplet className="w-6 h-6" />,
      mutuelle: <Heart className="w-6 h-6" />,
      security: <Shield className="w-6 h-6" />,
      wifi: <Wifi className="w-6 h-6" />,
    };
    return icons[type] || <CreditCard className="w-6 h-6" />;
  };

  const getStatusColor = (status) => {
    const colors = {
      paid: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      overdue: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status] || colors.pending;
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDue = getDaysUntilDue(bill.dueDate);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${bill.isEssential ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
            {getIcon(bill.type)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{bill.name}</h3>
            <p className="text-sm text-gray-500">
              {bill.accountNumber ? `Account: ${bill.accountNumber}` : bill.meterNumber}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(bill.status)}`}>
          {bill.status === 'paid' ? 'Paid' : bill.status === 'overdue' ? 'Overdue' : 'Pending'}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Amount Due</span>
          <span className="text-2xl font-bold text-gray-900">{formatCurrency(bill.amount)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Due Date</span>
          <div className="text-right">
            <span className="text-sm font-medium text-gray-900">{bill.dueDate}</span>
            {bill.status !== 'paid' && (
              <p className={`text-xs mt-1 ${daysUntilDue < 3 ? 'text-red-600' : 'text-gray-500'}`}>
                {daysUntilDue > 0 ? `${daysUntilDue} days left` : `${Math.abs(daysUntilDue)} days overdue`}
              </p>
            )}
          </div>
        </div>
      </div>

      {bill.isEssential && (
        <div className="mb-4 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>Essential bill - Required by law</span>
          </p>
        </div>
      )}

      {bill.status !== 'paid' && (
        <button
          onClick={() => onPayClick(bill)}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <CreditCard className="w-4 h-4" />
          Pay Now
        </button>
      )}
      
      {bill.status === 'paid' && (
        <div className="flex items-center justify-center gap-2 text-green-600 py-2.5">
          <Check className="w-5 h-5" />
          <span className="font-medium">Payment Complete</span>
        </div>
      )}
    </div>
  );
};
