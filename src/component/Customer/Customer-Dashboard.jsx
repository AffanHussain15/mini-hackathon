import React, { useState, useEffect } from 'react';
import supabase from '../Supabase/supabase'; // Adjust path to your Supabase config
import './Customer-Dashboard.css';

// const CustomerDashboard = () => {

//   const [user, setUser] = useState(null);
//   const [events, setEvents] = useState([]);
//   const [newEvent, setNewEvent] = useState({ name: '', date: '', venue: '' });

//   useEffect(() => {
//     async function fetchData() {
//       // Fetch user
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError) {
//         console.error('User fetch error:', userError.message);
//         alert('Error fetching user');
//         return;
//       }
//       setUser(user);

//       // Fetch user's events
//       if (user) {
//         const { data: eventsData, error: eventsError } = await supabase
//           .from('events')
//           .select('*')
//           .eq('user_id', user.id);
//         if (eventsError) {
//           console.error('Events fetch error:', eventsError.message);
//           alert('Error fetching events');
//         } else {
//           setEvents(eventsData || []);
//         }
//       }
//     }
//     fetchData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleBookEvent = async (e) => {
//     e.preventDefault();
//     if (!newEvent.name || !newEvent.date || !newEvent.venue) {
//       alert('Please fill all fields');
//       return;
//     }

//     try {
//       const { error } = await supabase.from('events').insert([
//         {
//           name: newEvent.name,
//           date: newEvent.date,
//           venue: newEvent.venue,
//           user_id: user.id,
//         },
//       ]);
//       if (error) {
//         console.error('Event insert error:', error.message);
//         alert(`Error: ${error.message}`);
//       } else {
//         alert('Event booked successfully');
//         setNewEvent({ name: '', date: '', venue: '' });
//         // Refresh events
//         const { data: eventsData } = await supabase
//           .from('events')
//           .select('*')
//           .eq('user_id', user.id);
//         setEvents(eventsData || []);
//       }
//     } catch (err) {
//       console.error('Unexpected error:', err);
//       alert('An unexpected error occurred');
//     }
//   };

//   const handleCancelEvent = async (eventId) => {
//     try {
//       const { error } = await supabase.from('events').delete().eq('id', eventId);
//       if (error) {
//         console.error('Event delete error:', error.message);
//         alert(`Error: ${error.message}`);
//       } else {
//         alert('Event cancelled successfully');
//         setEvents(events.filter((event) => event.id !== eventId));
//       }
//     } catch (err) {
//       console.error('Unexpected error:', err);
//       alert('An unexpected error occurred');
//     }
//   };

//   return (
//     <div className="customer-dashboard-container">
//       <div className="customer-dashboard-content">
//         <h1 className="customer-dashboard-heading">
//           Welcome, {user ? user.user_metadata.username : 'User'}
//         </h1>
//         <div className="customer-dashboard-book-event">
//           <h2 className="customer-dashboard-subheading">Book New Event</h2>
//           <form onSubmit={handleBookEvent}>
//             <div className="customer-dashboard-form-group">
//               <label className="customer-dashboard-label">Event Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={newEvent.name}
//                 onChange={handleInputChange}
//                 placeholder="Enter event name"
//                 className="customer-dashboard-form-control"
//               />
//             </div>
//             <div className="customer-dashboard-form-group">
//               <label className="customer-dashboard-label">Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={newEvent.date}
//                 onChange={handleInputChange}
//                 className="customer-dashboard-form-control"
//               />
//             </div>
//             <div className="customer-dashboard-form-group">
//               <label className="customer-dashboard-label">Venue</label>
//               <input
//                 type="text"
//                 name="venue"
//                 value={newEvent.venue}
//                 onChange={handleInputChange}
//                 placeholder="Enter venue"
//                 className="customer-dashboard-form-control"
//               />
//             </div>
//             <button type="submit" className="customer-dashboard-button">
//               Book Event
//             </button>
//           </form>
//         </div>
//         <div className="customer-dashboard-events">
//           <h2 className="customer-dashboard-subheading">Your Events</h2>
//           {events.length === 0 ? (
//             <p className="customer-dashboard-no-events">No events booked yet.</p>
//           ) : (
//             <div className="customer-dashboard-event-list">
//               {events.map((event) => (
//                 <div key={event.id} className="customer-dashboard-event-card">
//                   <h3 className="customer-dashboard-event-title">{event.name}</h3>
//                   <p className="customer-dashboard-event-detail">
//                     Date: {event.date}
//                   </p>
//                   <p className="customer-dashboard-event-detail">
//                     Venue: {event.venue}
//                   </p>
//                   <button
//                     onClick={() => handleCancelEvent(event.id)}
//                     className="customer-dashboard-cancel-button"
//                   >
//                     Cancel Event
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;




const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', venue: '', description: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Fetch user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('User fetch error:', userError.message);
        alert('Error fetching user');
        setLoading(false);
        return;
      }
      setUser(user);

      // Fetch user's events
      if (user) {
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .eq('user_id', user.id);

          console.log('eventsData',eventsData);
          
        if (eventsError) {
          console.error('Events fetch error:', eventsError.message);
          alert('Error fetching events');
        } else {
          setEvents(eventsData || []);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  // const handleBookEvent = async (e) => {
  //   e.preventDefault();
  //   if (!newEvent.name || !newEvent.date || !newEvent.venue || !newEvent.description) {
  //     alert('Please fill all fields');
  //     return;
  //   }

  //   try {
  //     const { error } = await supabase.from('events').insert([
  //       {
  //         name: newEvent.name,
  //         date: newEvent.date,
  //         venue: newEvent.venue,
  //         description: newEvent.description,
  //         user_id: user.id,
  //         status: 'pending',
  //       },
  //     ]);
  //     if (error) {
  //       console.error('Event insert error:', error.message);
  //       alert(`Error: ${error.message}`);
  //     } else {
  //       alert('Event booked successfully');
  //       setNewEvent({ name: '', date: '', venue: '', description: '' });
  //       // Refresh events
  //       const { data: eventsData } = await supabase
  //         .from('events')
  //         .select('*')
  //         .eq('user_id', user.id);
  //       setEvents(eventsData || []);
  //     }
  //   } catch (err) {
  //     console.error('Unexpected error:', err);
  //     alert('An unexpected error occurred');
  //   }
  // };

  const handleBookEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.name || !newEvent.date || !newEvent.venue || !newEvent.description) {
      alert('Please fill all fields');
      return;
    }
  
    try {
      const { error } = await supabase.from('events').insert([
        {
          name: newEvent.name,
          date: newEvent.date,
          venue: newEvent.venue,
          description: newEvent.description,
          user_id: user.id,
          status: 'pending', 
        },
      ]);
      if (error) {
        console.error('Event insert error:', error.message);
        alert(`Error: ${error.message}`);
      } else {
        alert('Event booked successfully');
        setNewEvent({ name: '', date: '', venue: '', description: '' });
        const { data: eventsData } = await supabase
          .from('events')
          .select('*')
          .eq('user_id', user.id);
        setEvents(eventsData || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred');
    }
  };
  
  const handleCancelEvent = async (eventId) => {
    try {
      const { error } = await supabase.from('events').delete().eq('id', eventId);
      if (error) {
        console.error('Event delete error:', error.message);
        alert(`Error: ${error.message}`);
      } else {
        alert('Event cancelled successfully');
        setEvents(events.filter((event) => event.id !== eventId));
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred');
    }
  };

  if (loading) return <div className="customer-dashboard-loading">Loading...</div>;

  return (
    <div className="customer-dashboard-container">
      <div className="customer-dashboard-content">
        <div className="customer-dashboard-header">
          <h1 className="customer-dashboard-heading">
            Welcome, {user ? user.user_metadata.username : 'User'} (Customer)
          </h1>
        </div>
        <div className="customer-dashboard-book-event">
          <h2 className="customer-dashboard-subheading">Book a New Event</h2>
          <form onSubmit={handleBookEvent}>
            <div className="customer-dashboard-form-group">
              <label className="customer-dashboard-label">Event Name</label>
              <input
                type="text"
                name="name"
                value={newEvent.name}
                onChange={handleInputChange}
                placeholder="Enter event name"
                className="customer-dashboard-form-control"
              />
            </div>
            <div className="customer-dashboard-form-group">
              <label className="customer-dashboard-label">Date</label>
              <input
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleInputChange}
                className="customer-dashboard-form-control"
              />
            </div>
            <div className="customer-dashboard-form-group">
              <label className="customer-dashboard-label">Venue</label>
              <input
                type="text"
                name="venue"
                value={newEvent.venue}
                onChange={handleInputChange}
                placeholder="Enter venue"
                className="customer-dashboard-form-control"
              />
            </div>
            <div className="customer-dashboard-form-group">
              <label className="customer-dashboard-label">Description</label>
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                placeholder="Enter event description"
                className="customer-dashboard-form-control customer-dashboard-textarea"
              />
            </div>
            <button type="submit" className="customer-dashboard-button">Book Event</button>
          </form>
        </div>
        <div className="customer-dashboard-events">
          <h2 className="customer-dashboard-subheading">Your Events</h2>
          {events.length === 0 ? (
            <p className="customer-dashboard-no-events">No events booked yet.</p>
          ) : (
            <div className="customer-dashboard-event-list">
              {events.map((event) => (
                <div key={event.id} className="customer-dashboard-event-card">
                  <div className="customer-dashboard-event-header">
                    <span className="customer-dashboard-event-icon">📅</span>
                    <h3 className="customer-dashboard-event-title">{event.name}</h3>
                  </div>
                  <p className="customer-dashboard-event-detail">
                    <strong>Date:</strong> {event.date}
                  </p>
                  <p className="customer-dashboard-event-detail">
                    <strong>Venue:</strong> {event.venue}
                  </p>
                  <p className="customer-dashboard-event-detail">
                    <strong>Description:</strong> {event.description || 'No description provided'}
                  </p>
                  <p className="customer-dashboard-event-detail">
                    <strong>Status:</strong> {event.status || 'No description provided'}
                  </p>
                  <div className="customer-dashboard-event-actions">
                    <button
                      onClick={() => alert(`Event Details:\nName: ${event.name}\nDate: ${event.date}\nVenue: ${event.venue}\nDescription: ${event.description}`)}
                      className="customer-dashboard-view-button"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleCancelEvent(event.id)}
                      className="customer-dashboard-cancel-button"
                    >
                      Cancel Event
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

