import './App.css';
import React, { useEffect, useState } from 'react';

function getEvents(cats) {
  let arr = [];
  for (let i in cats)
    for (let j in cats[i].events)
      arr.push(cats[i].events[j])

  console.log(arr)
  return arr;
}

function getTotalreg(uevents, curevent) {
  let a = 0;
  for (let i in uevents) {
    if (uevents[i].event === curevent && uevents[i].teamMembers.length)
      a = a + 1;
  }
  return a;

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
  }, [])
  useEffect(() => {
    if (user.token) {
      fetch(backendURI + "user-event-details", {
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
  }, [user.token])
  return (
    <div className="App">
      <header className="App-header">
        <h4>Ragam Admin</h4>
        {user.token && <button onClick={() => { localStorage.removeItem("user"); setUser({}) }}>Logout</button>}
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
        {(user.token && page === "events") && <div>
          <h4> Logged in as {user.email}</h4>
          <div className="events-page">
            <h4 className="page-heading">Events</h4>
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
        {(user.token && page === "insideevent") && <div >
          <button style={{ marginTop: "15px" }} onClick={() => { setPage("events") }}>Back to events</button>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <div style={{ height: "100vh", overflowY: "scroll" }} ><h4>Registrations</h4>
              {<h4>Total Registrations:{getTotalreg(userEvents, currevent)} </h4>}
              {userEvents.map((val, idx) => {
                if (val.event === currevent && val.teamMembers.length)
                  return (<div key={val.id} style={{ border: "1px solid black", padding: "5px" }}>
                    <h4> Status</h4>
                    {val.status}
                    <h4>teamMembers</h4>
                    {val.teamMembers.map((val1, idx1) => { return (<div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", marginTop: "10px" }}><h5 className="nomargin">{val1.name}</h5><h5 className="nomargin">{val1.collegeName}</h5><h5 className="nomargin">{val1.ragamID}</h5><h5 className="nomargin">{val1.phoneNumber}</h5></div>) })}
                    <h4>Metavalues</h4>
                    {val.metaValues?.map((val2, idx) => {
                      return (<div>
                        {val2}
                      </div>)
                    })}
                    <h4>Submissions</h4>
                    { val.submissions.length ? val.submissions.map((val, idx) => {
                      return (
                        <a style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }} href={backendURI.slice(0, -1) + val.url}>
                          <h4>{val.name}</h4>
                        </a>
                      )
                    }) : <h4>No submissions by this team</h4>}
                  </div>)
              })}
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
