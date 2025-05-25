import React, { useState, useEffect } from "react";
import supabase from "../../component/Supabase/supabase"; // Path as provided
import "./AdminDashboard.css";

// const AdminDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [usernames, setUsernames] = useState({});
//   const [eventsData1, setEventData] = useState([]);

//   useEffect(() => {
//     async function fetchAdminData() {
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError) {
//         console.error('User fetch error:', userError.message);
//         setLoading(false);
//         return;
//       }
//       setUser(user);

//       const { data: eventsData, error: eventsError } = await supabase
//         .from('events')
//         .select();

//       if (eventsError) {
//         console.error('Error fetching events:', eventsError.message);
//         alert('Error loading events');
//       } else {
//         console.log(eventsData);
//         setEventData(eventsData);
//         console.log(eventsData1);
//         console.log(eventsData1);
//         // Fetch usernames for each event's user_id
//         const userIds = [...new Set(eventsData.map(event => event.user_id))];
//         const usernamesObj = {};
//         for (const userId of userIds) {
//           const { data: userData, error: userFetchError } = await supabase
//             .from('users')
//             .select('id, user_metadata')
//             .eq('id', userId)
//             .single();
//           if (!userFetchError && userData) {
//             usernamesObj[userId] = userData.user_metadata?.username || 'Unknown User';
//           } else {
//             usernamesObj[userId] = 'Unknown User';
//           }
//         }
//         setUsernames(usernamesObj);
//       }
//       setLoading(false);
//     }

//     fetchAdminData();
//   }, []);

//   const updateEventStatus = async (id, status) => {
//     const { error } = await supabase
//       .from('events')
//       .update({ status })
//       .eq('id', id);

//     if (error) {
//       alert('Error updating status');
//     } else {
//       const { data } = await supabase.from('events').select();
//       setEvents(data || []);
//     }
//   };

//   const filteredEvents = (status) => events.filter((event) => event.status === status);

//   const renderEventSection = (status) => {
//     const eventsForStatus = filteredEvents(status);
//     return (
//       <div className={`admin-dashboard-section admin-dashboard-${status}`}>
//         <h2 className="admin-dashboard-subheading">
//           {status.charAt(0).toUpperCase() + status.slice(1)} Events
//         </h2>
//         {eventsForStatus.length === 0 ? (
//           <p className="admin-dashboard-no-events">No {status} events.</p>
//         ) : (
//           <div className="admin-dashboard-event-list">
//             {eventsData1.map((event) => (
//               <div key={event.id} className="admin-dashboard-event-card">
//                 <div className="admin-dashboard-event-header">
//                   <span className="admin-dashboard-event-icon">📌</span>
//                   <h3 className="admin-dashboard-event-title">{event.name}</h3>
//                 </div>
//                 <p className="admin-dashboard-event-detail">
//                   <strong>Created by:</strong> {usernames[event.user_id] || 'Unknown'}
//                 </p>
//                 <p className="admin-dashboard-event-detail">
//                   <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
//                 </p>
//                 <p className="admin-dashboard-event-detail">
//                   <strong>Venue:</strong> {event.venue}
//                 </p>
//                 <p className="admin-dashboard-event-detail">
//                   <strong>Description:</strong> {event.description || 'N/A'}
//                 </p>
//                 <p className={`admin-dashboard-event-status admin-dashboard-status-${status}`}>
//                   <strong>Status:</strong> {status.charAt(0).toUpperCase() + status.slice(1)}
//                 </p>
//                 {status === 'pending' && (
//                   <div className="admin-dashboard-event-actions">
//                     <button
//                       className="admin-dashboard-approve"
//                       onClick={() => updateEventStatus(event.id, 'approved')}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       className="admin-dashboard-reject"
//                       onClick={() => updateEventStatus(event.id, 'rejected')}
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   if (loading) return <div className="admin-dashboard-loading">Loading...</div>;

//   return (
//     <div className="admin-dashboard-container">
//       <div className="admin-dashboard-content">
//         <h1 className="admin-dashboard-heading">
//           Welcome, {user?.user_metadata?.username || 'Admin'} (Admin)
//         </h1>
//         {renderEventSection('pending')}
//         {renderEventSection('approved')}
//         {renderEventSection('rejected')}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usernames, setUsernames] = useState({});

  console.log("events", events);

  useEffect(() => {
    async function fetchAdminData() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) {
        console.error("User fetch error:", userError.message);
        setLoading(false);
        return;
      }
      setUser(user);

      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select();
      if (eventsError) {
        console.error("Error fetching events:", eventsError.message);
        alert("Error loading events");
      } else {
        console.log(eventsData); // Verify data
        setEvents(eventsData || []); // Set events state with fetched data
        // Fetch usernames for each event's user_id
        const userIds = [...new Set(eventsData.map((event) => event.user_id))];
        const usernamesObj = {};
        for (const userId of userIds) {
          const { data: userData, error: userFetchError } = await supabase
            .from("users")
            .select("id, user_metadata")
            .eq("id", userId)
            .single();
          if (!userFetchError && userData) {
            usernamesObj[userId] =
              userData.user_metadata?.username || "Unknown User";
          } else {
            usernamesObj[userId] = "Unknown User";
          }
        }
        setUsernames(usernamesObj);
      }
      setLoading(false);
    }

    fetchAdminData();
  }, []);

  const updateEventStatus = async (id, status) => {
    const { error } = await supabase
      .from("events")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert("Error updating status");
    } else {
      const { data } = await supabase.from("events").select();
      setEvents(data || []);
    }
  };

  const filteredEvents = (status) =>
    events.filter((event) => event.status === status);
  console.log(status);

  console.log("Events state:", events);
  // const renderEventSection = (status) => {
  //   console.log('status',status);

  //   const eventsForStatus = filteredEvents(status);
  //   console.log(eventsForStatus);
  //   return (
  //     <div className={`admin-dashboard-section admin-dashboard-${status}`}>
  //       <h2 className="admin-dashboard-subheading">
  //         {status.charAt(0).toUpperCase() + status.slice(1)} Events
  //       </h2>
  //       {events.length === 0 ? (
  //         <p className="admin-dashboard-no-events">No {status} events.</p>
  //       ) : (
  //         // eventsForStatus.map()
  //         <div className="admin-dashboard-event-list">
  //         {events.map((event) => (
  //           <div key={event.id} className="admin-dashboard-event-card">
  //             <div className="admin-dashboard-event-header">
  //               <span className="admin-dashboard-event-icon">📌</span>
  //               <h3 className="admin-dashboard-event-title">{event.name}</h3>
  //             </div>
  //             <p className="admin-dashboard-event-detail">
  //               <strong>Created by:</strong> {usernames[event.user_id] || 'Unknown'}
  //             </p>
  //             <p className="admin-dashboard-event-detail">
  //               <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
  //             </p>
  //             <p className="admin-dashboard-event-detail">
  //               <strong>Venue:</strong> {event.venue}
  //             </p>
  //             <p className="admin-dashboard-event-detail">
  //               <strong>Description:</strong> {event.description || 'N/A'}
  //             </p>
  //             <p className={`admin-dashboard-event-status admin-dashboard-status-${status}`}>
  //               <strong>Status:</strong> {status.charAt(0).toUpperCase() + status.slice(1)}
  //             </p>
  //             {status === 'pending' && (
  //               <div className="admin-dashboard-event-actions">
  //                 <button
  //                   className="admin-dashboard-approve"
  //                   onClick={() => updateEventStatus(event.id, 'approved')}
  //                 >
  //                   Approve
  //                 </button>
  //                 <button
  //                   className="admin-dashboard-reject"
  //                   onClick={() => updateEventStatus(event.id, 'rejected')}
  //                 >
  //                   Reject
  //                 </button>
  //               </div>
  //             )}
  //           </div>
  //         ))}
  //       </div>
  //       )}
  //     </div>
  //   );
  // };

  if (loading) return <div className="admin-dashboard-loading">Loading...</div>;

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-content">
        <h1 className="admin-dashboard-heading">
          Welcome, {user?.user_metadata?.username || "Admin"} (Admin)
        </h1>
        {events.map((event) => (
          <div key={event.id} className="admin-dashboard-event-card">
            <div className="admin-dashboard-event-header">
              <span className="admin-dashboard-event-icon">📌</span>
              <h3 className="admin-dashboard-event-title">{event.name}</h3>
            </div>
            <p className="admin-dashboard-event-detail">
              <strong>Created by:</strong>{" "}
              {usernames[event.user_id] || "Unknown"}
            </p>
            <p className="admin-dashboard-event-detail">
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="admin-dashboard-event-detail">
              <strong>Venue:</strong> {event.venue}
            </p>
            <p className="admin-dashboard-event-detail">
              <strong>Description:</strong> {event.description || "N/A"}
            </p>
            <p
              className={`admin-dashboard-event-status admin-dashboard-status-${status}`}
            >
              <strong>Status: </strong>
          {event?.status}
              {/* {status.charAt(0).toUpperCase() + status.slice(1)} */}
            </p>
            {event.status === "pending" && (
              <div className="admin-dashboard-event-actions">
                <button
                  className="admin-dashboard-approve"
                  onClick={() => updateEventStatus(event.id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="admin-dashboard-reject"
                  onClick={() => updateEventStatus(event.id, "rejected")}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}

        {/* {renderEventSection()} */}
        {/* {renderEventSection('approved')}
        {renderEventSection('rejected')} */}
      </div>
    </div>
  );
};

export default AdminDashboard;
