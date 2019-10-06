import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DayListItem from "../src/components/DayListItem.js"
import DayList from "../src/components/DayList.js"
import InterviewerListItem from "../src/components/InterviewerListItem.js"
import InterviewerList from "../src/components/InterviewerList.js"
import Appointment from "../src/components/Appointment/index.js"
import Header from "../src/components/Appointment/Header.js"
import Empty from "../src/components/Appointment/Empty.js"
import Show from "../src/components/Appointment/Show.js"
import Confirm from "../src/components/Appointment/Confirm.js"
import Status from "../src/components/Appointment/Status.js"
import Error from "../src/components/Appointment/Error.js"
import Form from "../src/components/Appointment/Form.js"
import Button from "components/Button";
import "index.scss";



const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const interviewers = [
        { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
        { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
        { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
        { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
        { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
      ];
      
    const interviewer = {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    };

    const appointments = [
      {
        id: 1,
        time: "12pm",
      },
      {
        id: 2,
        time: "1pm",
        interview: {
          student: "Lydia Miller-Jones",
          interviewer: {
            id: 2,
            name: "Tori Malcolm",
            avatar: "https://i.imgur.com/Nmx0Qxo.png",
          }
        }
      },
      {
        id: 3,
        time: "2pm",
        interview: {
          student: "Paul",
          interviewer: {
            id: 3,
            name: "Mildred Nazir",
            avatar: "https://i.imgur.com/T2WwVfS.png",
          }
        }
      },
      {
        id: 4,
        time: "3pm",
        interview: {
          student: "John Smith",
          interviewer: {
            id: 1,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/LpaY82x.png",
          }
        }
      },
      {
        id: 5,
        time: "4pm",
        interview: {
          student: "Mallory Minchau",
          interviewer: {
            id: 1,
            name: "Sven Jones",
            avatar: "https://i.imgur.com/twYrpay.jpg",
          }
        }
      },
    ];

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <button className="button button--confirm">Confirm</button>  )
  .add("Danger", () => <button class="button button--danger">Danger</button>  )
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

  storiesOf("DayListItem", module) 
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) 
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) 
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />) 
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> 
  ));


  
  
  storiesOf("DayList", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
    })
    .add("Monday", () => (
      <DayList days={days} day={"Monday"} setDay={action("setDay")} />
    ))
    .add("Tuesday", () => (
      <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
    ));
  


    
    storiesOf("InterviewerListItem", module)
      .addParameters({
        backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
      })
      .add("Unselected", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
        />
      ))
      .add("Selected", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected
        />
      ))
      .add("Clickable", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          setInterviewer={action("setInterviewer")}
        />
      ))
      .add("Clickable", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          setInterviewer={event => action("setInterviewer")(interviewer.id)}
        />
      ));


      
      storiesOf("InterviewerList", module)
        .addParameters({
          backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
        })
        .add("Initial", () => (
          <InterviewerList
            interviewers={interviewers}
            setInterviewer={action("setInterviewer")}
          />
        ))
        .add("Preselected", () => (
          <InterviewerList
            interviewers={interviewers}
            interviewer={3}
            setInterviewer={action("setInterviewer")}
          />
        ));

  storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment with Time", () => <Appointment time="12pm" />)
  .add("Header", () => <Header time="12pm"/>)
  .add("Empty", () => <Empty onAdd={action("onAdd")} />)
  .add("Show", () => <Show onEdit={action("onEdit")}/>)
  .add("Confirm", () => <Confirm />)
  .add("Status", () => <Status />)
  .add("Error", () => <Error />)
  .add("Form Create", () => <Form interviewers={interviewers} onCancel = {action("onCancel")} />)
  .add("Form Edit", () => <Form interviewers={interviewers} onSave = {action("onSave")} />)
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="12pm" />
      <Appointment id="last" time="1pm" />
    </Fragment>
  ))
  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="12pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment id="last" time="1pm" />
    </Fragment>
  ))