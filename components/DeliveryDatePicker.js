import React, { useState } from "react";

const DeliveryDatePicker = ({ selectedDays, onDateChange, selectedDeliveryDate }) => {
  const today = new Date();
  const oneYearLater = new Date();
  oneYearLater.setFullYear(today.getFullYear() + 1);

  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(e.target.value);
    onDateChange(newDate); // Update the parent component (Dress.js)
  };

  // Calculate return date
  const returnDate =
    selectedDeliveryDate &&
    new Date(selectedDeliveryDate.getTime() + selectedDays * 24 * 60 * 60 * 1000);

  return (
    <div className="my-7 flex items-center gap-2">
      <label className="block text-lg sm:text-xl font-semibold mb-2">
        Select Delivery Date:
      </label>
    <div className="flex flex-col sm:flex-row">
      <input
        type="date"
        className="border border-[#71c1f6] px-1 sm:px-3 py-1 sm:py-2 rounded-md max-sm:text-base sm:text-lg cursor-pointer"
        min={today.toISOString().split("T")[0]}
        max={oneYearLater.toISOString().split("T")[0]}
        value={selectedDate}
        onChange={handleDateChange}
        onKeyDown={(e) => e.preventDefault()} // Prevent manual input
      />

      {/* Display selected delivery & return dates */}
      {selectedDeliveryDate && (
        <div className="text-xs sm:text-base">
          <p>
            Delivery Date:{" "}
            <strong>{selectedDeliveryDate.toLocaleDateString("en-GB")}</strong>
          </p>
          <p>
            Return Date:{" "}
            <strong>{returnDate.toLocaleDateString("en-GB")}</strong>
          </p>
        </div>
      )}
      </div>
    </div>
  );
};

export default DeliveryDatePicker;
