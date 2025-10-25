// frontend/src/pages/TurfDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import turfService from '../services/turfService';
import bookingService from '../services/bookingService';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';


const timeSlots = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];


const TurfDetailsPage = () => {
  const [turf, setTurf] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();


  // The 'useParams' hook reads the dynamic params from the URL (e.g., the ':id')
  const { id  } = useParams();

  useEffect(() => {
    const fetchTurf = async () => {
      try {
        const data = await turfService.getTurfById(id);
        setTurf(data);
      } catch (error) {
        console.error("FULL ERROR DETAILS:", error);
        toast.error('Could not fetch turf details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTurf();
  }, [id]); // Re-run the effect if the id in the URL changes

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (id && selectedDate) { // <--- FIX 1
        try {
          const data = await bookingService.getBookedSlots(id, selectedDate); // <--- FIX 2
          setBookedSlots(data);
          setSelectedSlot(null);
        } catch (error) {
          toast.error('Could not fetch booked slots');
        }
      }
    };
    fetchBookedSlots();
  }, [id, selectedDate]);;

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!turf) {
    return <h2>Turf not found</h2>;
  }

  const handleProceedToPayment = async () => {
    try {
      // 1. Get user from local storage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || !storedUser.token) {
        toast.error('You must be logged in to book.');
        navigate('/login');
        return;
      }
      
      // 2. Create Razorpay order
      const orderData = await bookingService.createOrder(turf.pricePerHour, storedUser.token);
      const { data: order } = orderData;

      // 3. Configure Razorpay options
      const options = {
        key: 'rzp_test_RXRoJIjxs9QmrJ', // Replace with your Key ID from the backend .env (it's safe to expose the ID)
        amount: order.amount,
        currency: order.currency,
        name: "Turf Finder",
        description: `Booking for ${turf.name}`,
        order_id: order.id,
        // 4. This handler function is called after payment
        handler: async function (response) {
  // --- START: CORRECTED TIME LOGIC ---
  const startTime = new Date(selectedDate);
  const [hours] = selectedSlot.split(':');
  
  // Explicitly set hours, and ZERO out minutes, seconds, and milliseconds
  startTime.setHours(parseInt(hours, 10), 0, 0, 0);

  const endTime = new Date(startTime);
  endTime.setHours(startTime.getHours() + 1);

          const bookingDetails = {
            ...response,
            id,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            totalPrice: turf.pricePerHour,
          };
          
          try {
    await bookingService.verifyPaymentAndBook(bookingDetails, storedUser.token);
    
    // This code will ONLY run if the above line succeeds
    toast.success("Booking confirmed successfully!");
    
    // Refetch booked slots to update the UI
    setBookedSlots(prevBookedSlots => [...prevBookedSlots, selectedSlot]);
    setSelectedSlot(null);
  } catch (verificationError) {
    console.error("Verification API call failed:", verificationError);
    toast.error(verificationError.response?.data?.message || "Booking verification failed.");
  }
        },
        prefill: {
          name: storedUser.name,
          email: storedUser.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      // 5. Open the Razorpay payment modal
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      const message = error.response?.data?.message || "Payment failed. Please try again.";
      toast.error(message);
    }
  };


  return (
    <div className="turf-details-container" style={{ padding: '20px' }}>
      <h1>{turf.name}</h1>
      <p><strong>Location:</strong> {turf.location}</p>
      <p><strong>Type:</strong> {turf.turfType}</p>
      <p><strong>Amenities:</strong> {turf.amenities.join(', ')}</p>
      <h2>Price: ₹{turf.pricePerHour} / hour</h2>
      
      <hr style={{ margin: '20px 0' }} />


      <div className="booking-section">
        <h2>Select a Date</h2>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          minDate={new Date()} // Prevent booking past dates
        />
    </div>
    <div className="time-slots-section" style={{ marginTop: '20px' }}>
        <h3>Available Slots for: {selectedDate.toDateString()}</h3>
        <div className="slots-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {timeSlots.map(slot => {
            const isBooked = bookedSlots.includes(slot);
            const isSelected = selectedSlot === slot;

            return (
              <button
                key={slot}
                className="slot-button"
                onClick={() => handleSlotClick(slot)}
                disabled={isBooked}
                style={{
                  padding: '10px 20px',
                  cursor: isBooked ? 'not-allowed' : 'pointer',
                  backgroundColor: isSelected ? '#28a745' : isBooked ? '#dc3545' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>
      {selectedSlot && (
        <div className="booking-summary" style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f0f0' }}>
          <h2>Booking Summary</h2>
          <p><strong>Turf:</strong> {turf.name}</p>
          <p><strong>Date:</strong> {selectedDate.toDateString()}</p>
          <p><strong>Time:</strong> {selectedSlot} - {parseInt(selectedSlot) + 1}:00</p>
          <p><strong>Price:</strong> ₹{turf.pricePerHour}</p>
          <button style={{ padding: '10px 20px', fontSize: '1.2rem', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
            Proceed to Payment
          </button>
          <button onClick={handleProceedToPayment} /* ... */>
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};
// frontend/src/pages/TurfDetailsPage.jsx


export default TurfDetailsPage;