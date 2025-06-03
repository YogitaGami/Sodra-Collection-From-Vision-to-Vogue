import React from 'react'

const DisplayPriceDetails = ({ priceDetails }) => {
    if (!priceDetails) return null;
  return (
    <div className="priceDetails px-8 w-full lg:w-[70%]">
              <h3 className="text-sm font-semibold my-2">
                PRICE DETAILS ({priceDetails.selectedItemQuantity} item)
              </h3>
              <div className="flex justify-between py-3">
                <div className="heading">Total Rent</div>
                <div>{priceDetails.selectedItemPrice}</div>
              </div>
              <div className="flex justify-between py-3">
                <div className="heading">Total Deposit</div>
                <div>{priceDetails.selectedItemDeposit}</div>
              </div>
              <div className="flex justify-between py-3">
                <div className="heading">Platform Fee</div>
                <div>Rs.10</div>
              </div>
              <div className="flex justify-between py-3">
                <div className="heading">Shipping Fee</div>
                <div>Rs.80</div>
              </div>
              <hr className='border-[#54b7fa]'/>
              <div className="flex justify-between py-3">
                <div className="uppercase font-semibold">Total</div>
                <div className="font-semibold">{priceDetails.totalAmount}</div>
              </div>
            </div>
  )
}

export default DisplayPriceDetails
