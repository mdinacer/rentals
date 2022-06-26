export default function UserStats() {
  return (
    <div className='grid lg:grid-flow-col gap-5 max-w-md w-full py-5'>
      <div className=' items-center flex lg:flex-col gap-3'>
        <div className=' w-16 h-16 rounded-full border-white border-4 flex items-center justify-center'>
          <p className=' font-Oswald text-2xl font-thin'>3</p>
        </div>
        <p className=' uppercase text-sm font-Oswald font-thin'>Houses</p>
      </div>
      <div className=' items-center flex lg:flex-col gap-3'>
        <div className=' w-16 h-16 rounded-full border-white border-4 flex items-center justify-center'>
          <p className=' font-Oswald text-2xl font-thin'>15</p>
        </div>
        <p className=' uppercase text-sm font-Oswald font-thin'>Requests</p>
      </div>
      <div className=' items-center flex lg:flex-col gap-3'>
        <div className=' w-16 h-16 rounded-full border-white border-4 flex items-center justify-center'>
          <p className=' font-Oswald text-2xl font-thin'>6/10</p>
        </div>
        <p className=' uppercase text-sm font-Oswald font-thin'>Rate</p>
      </div>
    </div>
  );
}
