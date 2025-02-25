import React, { useState, useEffect } from 'react';
import { Card, Button, Spin, message, Steps, Form, Input, Select, Table, Tag } from 'antd';
import axios from 'axios';
import emailjs from 'emailjs-com'; // For sending email receipts
import { loadStripe } from '@stripe/stripe-js'; // Optional: For currency conversion
import { useTranslation } from 'react-i18next'; // For localization
import { v4 as uuidv4 } from 'uuid'; // For unique transaction IDs

const { Step } = Steps;
const { Option } = Select;

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [totalAmount, setTotalAmount] = useState(50000); // Amount in paise
  const [currency, setCurrency] = useState('INR');
  const { t } = useTranslation(); // Localization hook

  // Load payment history from localStorage (or API)
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('paymentHistory')) || [];
    setPaymentHistory(history);
  }, []);

  // Load Razorpay script dynamically
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle discount code application
  const applyDiscount = () => {
    if (discountCode === 'STUDENT10') {
      setTotalAmount(totalAmount * 0.9); // 10% discount
      setDiscountApplied(true);
      message.success(t('discountApplied'));
    } else {
      message.error(t('invalidDiscount'));
    }
  };

  // Handle payment submission
  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/create-order', {
        amount: totalAmount,
        currency: currency,
      });

      const { id: orderId, amount, currency: orderCurrency } = res.data;

      const isScriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!isScriptLoaded) {
        throw new Error(t('razorpayLoadError'));
      }

      const options = {
        key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
        amount: amount,
        currency: orderCurrency,
        name: 'Student Fees Payment',
        description: 'Payment for Student Fees',
        order_id: orderId,
        handler: async function (response) {
          try {
            const result = await axios.post('/api/verify-payment', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (result.data.success) {
              setPaymentSuccess(true);
              message.success(t('paymentSuccess'));
              sendEmailReceipt(response.razorpay_payment_id);
              updatePaymentHistory(response.razorpay_payment_id);
            } else {
              message.error(t('paymentVerificationFailed'));
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            message.error(t('paymentVerificationFailed'));
          }
        },
        prefill: {
          name: 'Student Name',
          email: 'student@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      message.error(t('paymentFailed'));
    } finally {
      setLoading(false);
    }
  };

  // Send email receipt
  const sendEmailReceipt = (paymentId) => {
    emailjs.send('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', {
      to_email: 'student@example.com',
      payment_id: paymentId,
      amount: totalAmount / 100,
      currency: currency,
    }, 'YOUR_EMAILJS_USER_ID')
      .then(() => message.success(t('receiptSent')))
      .catch(() => message.error(t('receiptFailed')));
  };

  // Update payment history
  const updatePaymentHistory = (paymentId) => {
    const newPayment = {
      id: uuidv4(),
      paymentId,
      amount: totalAmount / 100,
      currency,
      date: new Date().toLocaleString(),
      status: 'Success',
    };
    const updatedHistory = [newPayment, ...paymentHistory];
    setPaymentHistory(updatedHistory);
    localStorage.setItem('paymentHistory', JSON.stringify(updatedHistory));
  };

  // Render payment history table
  const paymentHistoryColumns = [
    {
      title: t('paymentId'),
      dataIndex: 'paymentId',
      key: 'paymentId',
    },
    {
      title: t('amount'),
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `${amount} ${currency}`,
    },
    {
      title: t('date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Success' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">{t('studentFeesPayment')}</h1>
      <Steps current={currentStep} className="mb-8">
        <Step title={t('studentDetails')} />
        <Step title={t('paymentDetails')} />
        <Step title={t('confirmation')} />
      </Steps>

      {currentStep === 0 && (
        <Card>
          <Form layout="vertical">
            <Form.Item label={t('fullName')} name="name">
              <Input placeholder={t('enterFullName')} />
            </Form.Item>
            <Form.Item label={t('email')} name="email">
              <Input placeholder={t('enterEmail')} />
            </Form.Item>
            <Form.Item label={t('phone')} name="phone">
              <Input placeholder={t('enterPhone')} />
            </Form.Item>
            <Button type="primary" onClick={() => setCurrentStep(1)}>
              {t('next')}
            </Button>
          </Form>
        </Card>
      )}

      {currentStep === 1 && (
        <Card>
          <p className="mb-4 text-lg">
            {t('totalAmountDue')}: {totalAmount / 100} {currency}
          </p>
          <Input
            placeholder={t('enterDiscountCode')}
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="mb-4"
          />
          <Button onClick={applyDiscount} disabled={discountApplied}>
            {t('applyDiscount')}
          </Button>
          <Button type="primary" onClick={handlePayment} loading={loading} className="ml-4">
            {t('payNow')}
          </Button>
        </Card>
      )}

      {currentStep === 2 && paymentSuccess && (
        <Card>
          <h2 className="text-2xl font-bold mb-4">{t('paymentSuccessful')}</h2>
          <p>{t('thankYouForPayment')}</p>
        </Card>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">{t('paymentHistory')}</h2>
      <Table dataSource={paymentHistory} columns={paymentHistoryColumns} rowKey="id" />
    </div>
  );
};

export default Payment;