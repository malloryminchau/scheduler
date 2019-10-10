import React from "react";
import "components/InterviewerList.scss";
import classNames from "classnames/bind"
import { format } from "path";
import InterviewerListItem from "components/InterviewerListItem.js"
import PropTypes from 'prop-types'

export default function InterviewerList(props) {



  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={event => props.setInterviewer(interviewer.id)}
      />
    );
  });

    return (

         <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">{interviewers}</ul>
          </section>
  
    )

}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};