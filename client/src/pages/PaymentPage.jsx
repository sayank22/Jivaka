import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState('upi');

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">Payment Options</h1>

      <Card className="max-w-2xl mx-auto p-6">
        <Tabs defaultValue="upi" className="w-full" onValueChange={setSelectedMethod}>
          <TabsList className="grid grid-cols-4 gap-2 mb-4">
            <TabsTrigger value="upi">UPI</TabsTrigger>
            <TabsTrigger value="card">Card</TabsTrigger>
            <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
            <TabsTrigger value="apps">UPI Apps</TabsTrigger>
          </TabsList>

          <TabsContent value="upi">
            <h2 className="text-lg font-semibold mb-2">Pay via UPI ID</h2>
            <Input placeholder="Enter your UPI ID (e.g. name@upi)" className="mb-4" />
            <Button className="w-full">Pay ₹500</Button>
          </TabsContent>

          <TabsContent value="card">
            <h2 className="text-lg font-semibold mb-2">Pay via Card</h2>
            <Input placeholder="Card Number" className="mb-2" />
            <div className="flex gap-2 mb-2">
              <Input placeholder="MM/YY" className="w-1/2" />
              <Input placeholder="CVV" className="w-1/2" />
            </div>
            <Input placeholder="Cardholder Name" className="mb-4" />
            <Button className="w-full">Pay ₹500</Button>
          </TabsContent>

          <TabsContent value="netbanking">
            <h2 className="text-lg font-semibold mb-2">Net Banking</h2>
            <select className="w-full p-2 border rounded mb-4">
              <option value="">Select Your Bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
            </select>
            <Button className="w-full">Proceed to Pay</Button>
          </TabsContent>

          <TabsContent value="apps">
            <h2 className="text-lg font-semibold mb-4">Choose a UPI App</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <img src="/images/gpay.png" alt="GPay" className="w-16 mx-auto" />
              <img src="/images/phonepe.png" alt="PhonePe" className="w-16 mx-auto" />
              <img src="/images/paytm.png" alt="Paytm" className="w-16 mx-auto" />
            </div>
            <Button className="w-full">Open App to Pay</Button>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

export default PaymentPage;