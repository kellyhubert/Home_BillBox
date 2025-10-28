import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const PaymentForm = ({ bill, onClose, onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    if (paymentMethod === 'momo' && !phoneNumber) return;
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit({
      billId: bill.id,
      amount: bill.amount,
      method: paymentMethod,
      phoneNumber: phoneNumber
    });
    
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pay Bill</h2>
          <p className="text-gray-600">Complete payment for {bill.name}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Bill Amount</span>
            <span className="text-2xl font-bold text-gray-900">{formatCurrency(bill.amount)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Transaction Fee</span>
            <span className="text-gray-900">Free</span>
          </div>
          <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
            <span className="font-medium text-gray-900">Total</span>
            <span className="text-xl font-bold text-blue-600">{formatCurrency(bill.amount)}</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Payment Method
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('momo')}
              className={`p-4 border-2 rounded-lg text-center transition-all ${
                paymentMethod === 'momo'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900">MTN MoMo</div>
              <div className="text-xs text-gray-500 mt-1">Mobile Money</div>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('agent')}
              className={`p-4 border-2 rounded-lg text-center transition-all ${
                paymentMethod === 'agent'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900">Agent</div>
              <div className="text-xs text-gray-500 mt-1">Cash Payment</div>
            </button>
          </div>
        </div>

        {paymentMethod === 'momo' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Money Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="078XXXXXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-2">
              You will receive a prompt on your phone to approve the payment
            </p>
          </div>
        )}

        {paymentMethod === 'agent' && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Visit any BillBox agent with your account number: <strong>{bill.accountNumber}</strong>
            </p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isProcessing || (paymentMethod === 'momo' && !phoneNumber)}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              {paymentMethod === 'momo' ? 'Pay with MoMo' : 'Generate Payment Code'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};