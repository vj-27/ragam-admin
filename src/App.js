import './App.css';
import React, { useEffect, useState } from 'react';

function getEvents(cats) {
  let arr = [];
  for (let i in cats)
    for (let j in cats[i].events)
      arr.push(cats[i].events[j])

  arr.sort((a,b) => a.name > b.name);
  return arr;
}

function getEventName(events, id) {
  return events.find((ev) => ev.id === id).name;
}

function getTotalreg(uevents, curevent) {
  let a = 0;
  let peeps = 0;
  for (let i in uevents) {
    if (uevents[i].event === curevent && uevents[i].teamMembers.length) {
      a = a + 1;
      peeps += uevents[i].teamMembers.length;
    }
  }
  if(a == peeps) {
    return a + "regs. ";
  } else {
    return a + " teams. " + peeps + " members.";
  }
}

function App() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const backendURI = "https://api.ragam.live/";
  const [pass, setPass] = useState("");
  const [rpass, setRPass] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({});
  const [page, setPage] = useState("login");
  const [categories, setCategories] = useState({});
  const [userEvents, setuserEvents] = useState([]);
  const [currevent, setcurrevent] = useState("");

  useEffect(() => {
    let museer = localStorage.getItem("user");
    museer = JSON.parse(museer);

    if (museer) {
      setPage("events");
      setUser(museer);
    }

    fetch(backendURI + "categories")
      .then((response) => {
        if (response.ok) return response.json();
        else alert("Some error Occurred. Please try again later.")
      })
      .then((json) => {
        console.log(json);
        setCategories(json);
      });
  }, []);

  useEffect(() => {
    if (user.token) {
      fetch(backendURI + "user-event-details?_limit=999999", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
        .then((response) => {
          if (response.ok) return response.json();
          else alert("Some error Occurred.Contact Technical Team.")
        })
        .then((json) => {
          console.log(json);
          setuserEvents(json);
        });
    }
  }, [user.token]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-left">
          {(page === "login") && <h4 className="page-heading">Login</h4>}
          {(page === "events") && <h4 className="page-heading">Events</h4>}
          {(page === "insideevent") && <h4 className="page-heading">Event Details</h4>}
          <div className="heading-extra">{user.email}</div>
        </div>
        {user.token &&
          <button class="inverted" onClick={() => { localStorage.removeItem("user"); setUser({}); setPage("login") }}>Logout</button>}
      </header>
      <div>
        {(page === "login") &&
          <div className="login-page">
            <h4 className="page-heading">Login</h4>
            <form className="form" onSubmit={(event) => {
              event.preventDefault();
              fetch(backendURI + "auth/local", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "identifier": email, "password": pass })
              }).then((res) => { res.json().then(data => { if (data.statusCode) setErr("Username or Password invalid"); else { let user1 = data.user; user1.token = data.jwt; localStorage.setItem("user", JSON.stringify(user1)); setUser(user1); setPage("events") } }) }, (err) => { console.log(err) });
            }}>
              <div className="field">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" onChange={(e) => { setEmail(e.target.value) }} />
              </div>
              <div className="field">
                <label htmlFor="pass">Password:</label>
                <input type="password" id="pass" name="pass" onChange={(e) => { setPass(e.target.value) }} />
              </div>
              {err !== "" && <h4>{err}</h4>}
              <input type="submit" value="Login" />
              {/* <button onClick={() => { setPage("register") }}>Register</button> */}
            </form>
          </div>
        }
        {(page === "register" && !user.token) && <div><h4>Register</h4>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" onChange={(e) => { setEmail(e.target.value) }} />
          <label htmlFor="email">Username:</label>
          <input type="text" id="username" name="username" onChange={(e) => { setUsername(e.target.value) }} />
          <label htmlFor="pass">Password:</label>
          <input type="password" id="pass" name="pass" onChange={(e) => { setPass(e.target.value) }} />
          <label htmlFor="pass">Repeat Password:</label>
          <input type="password" id="rpass" name="rpass" onChange={(e) => { setRPass(e.target.value) }} />
          <h4>{err}</h4>
          <input type="button" value="Submit" onClick={() => {
            if (pass === rpass)
              fetch(backendURI + "auth/local/register", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "username": username, "email": email, "password": pass })
              }).then((res) => { res.json().then(data => { if (data.statusCode) setErr(data?.data[0]?.messages[0]?.message); else setErr("Registered succcessfully. PLease login.") }) }, (err) => { console.log(err) });
            else setErr("password doesn't match")
          }} />
          <button onClick={() => { setPage("login") }}>Login</button>
        </div>}
        {(user.token && page === "events") &&
          <div>
            {/* <h4> Logged in as {user.email}</h4> */}
            <div className="events-page">
              {/* <h4 className="page-heading">Events</h4> */}
              {categories.length &&
                <div className="events-list">
                  {getEvents(categories).map((val, idx) => {
                    return <div key={val.name} className="events-list-item" onClick={() => { setcurrevent(val.id); setPage("insideevent"); console.log("eventId", val.id) }}>
                      {val.name}
                    </div>
                  })}
                </div>}
            </div>
          </div>}
        {(user.token && page === "insideevent") &&
          <div className="event-details-page">
              <div style={{ padding: "0 1rem", display: "flex", gap: "1em", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4 className="page-sub-heading">{getEventName(getEvents(categories), currevent)}</h4>
                {<div className="heading-extra">{getTotalreg(userEvents, currevent)} </div>}
              </div>
                <div style={{flexShrink: 0}}>
                    <button style={{marginRight: "1rem"}} onClick={() => { window.print(); }}>PDF</button>
                    <button onClick={() => { setPage("events") }}>Back to events</button>
                </div>
            </div>
            <div className="event-reg-list">
              {userEvents.map((val, idx) => {
                if (val.event === currevent && val.teamMembers.length)
                  return (
                    <div key={val.id} className="event-reg-list-item">
                      <div class="event-reg-detail">
                        <label className="event-reg-label">Ref No.</label>
                        <div>{val.id}</div>
                      </div>
                      <div class="event-reg-detail">
                        <label className="event-reg-label">Status</label>
                        <div>{val.status}</div>
                      </div>
                      <div class="event-reg-detail">
                        <label className="event-reg-label">Team Members</label>
                          {val.teamMembers.map((val1, idx1) => {
                            return (
                                <div className="team-member-details" >
                                <div style={{ textDecoration: "underline" }}>{val1.ragamID}</div>
                                <div>{val1.name}</div>
                                <div>{val1.collegeName}</div>
                                <div>{val1.phoneNumber}</div>
                                <div>{val1.email}</div>
                                    <div style={{display: "flex", gap: "0.5em", marginTop: "0.5em"}}>
                                    <a style={{flexGrow: 1}} class="button" href={"tel:"+val1.phoneNumber}>Call</a>
                                    <a style={{flexGrow: 1}} class="button" href={"mailto:"+val1.email}>Mail</a>
                                </div>
                                </div>
                            )
                          })}
                      </div>
                      {val.metaValues &&
                        <div class="event-reg-detail">
                          <label className="event-reg-label">Metavalues</label>
                          {val.metaValues?.map((val2, idx) => {
                            return (<div>
                              {val2}
                            </div>)
                          })}
                        </div>}

                      <div class="event-reg-detail">
                        <label className="event-reg-label">Submissions</label>
                        {val.submissions.length ? val.submissions.map((val, idx) => {
                          return (
                            <a style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis"
                            }} href={backendURI.slice(0, -1) + val.url}>
                              {val.name}
                            </a>
                          )
                        }) : <div>No submissions by this team</div>}
                      </div>
                    </div>)
              })}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
