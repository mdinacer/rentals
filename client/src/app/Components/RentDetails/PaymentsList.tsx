import { format } from 'date-fns';
import { Payment } from '../../models/payment';

interface Props {
  payments: Payment[];
}

export default function PaymentsList({ payments = [] }: Props) {
  return (
    <div className='grid gap-y-2'>
      {payments.map((payment, index) => (
        <PaymentListItem key={index} payment={payment} />
      ))}
    </div>
  );
}

function PaymentListItem({ payment }: { payment: Payment }) {
  return (
    <div className='grid grid-cols-5 bg-gray-200  dark:bg-black  pl-5 py-1 rounded-md'>
      <div className=' w-full flex flex-row justify-between items-end col-span-4'>
        <p className=' font-Oswald font-thin text-lg'>
          {format(new Date(payment.paymentDate), 'PP')}
        </p>
        <p className=' font-Montserrat text-xl'>
          {payment.amount.toFixed(2)} DA
        </p>
      </div>
      <p
        className={`font-Oswald text-lg font-thin uppercase text-center ${
          payment.received ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {payment.received ? 'Paid' : 'Unpaid'}
      </p>
    </div>
  );
}
