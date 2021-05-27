import React, { Component } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import { Button, Form, Modal } from 'semantic-ui-react';
import scheduler from '../apis/scheduler';

import '../static/calendar.css';

const style = <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css'/>

class SchedulerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekendsVisible: true,
            currentEvents: [],
            modalIsOpen: false,
            currentData: {
                id: null,
                title: '',
                location: '',
                startDate: '',
                endDate: '',
                notes: '',
                allDay: false,
                calendarApi: null
            },
        };
        this.customStyles = {
            width: '100%',

        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handle_change = this.handle_change.bind(this);
        this.addSchedule = this.addSchedule.bind(this);
    }

    openModal() {
        this.setState({
            modalIsOpen: true,
        })
    }
    
    closeModal() {
        this.setState({
            modalIsOpen: false
        })
    }

    handle_change = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState(prevstate => ({
			...prevstate,
            currentData: {
                ...prevstate.currentData,
                [name]: value,
            }
		}));
	};

    render() {
        return (
            <div className="demo-app">
                <div className="demo-app-main">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={this.state.weekendsVisible}
                    initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                    select={this.handleDateSelect}
                    eventContent={renderEventContent} // custom render function
                    eventClick={this.handleEventClick}
                    eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                    /* you can update a remote database when these fire:
                    eventAdd={function(){}}
                    eventChange={function(){}}
                    eventRemove={function(){}}
                    */
                />
                </div>
                <div>
                <Modal
                    style={{ height: '60%' }}
                    onClose={this.closeModal}
                    onOpen={this.openModal}
                    open={this.state.modalIsOpen}
                > 
                    <Modal.Header>스케줄 추가하기</Modal.Header>
                    <Modal.Content>
                        <Form.Input
                            label="제목"
                            style={this.customStyles}
                            type="text"
                            name="title"
                            value={this.state.currentData.title}
                            onChange={this.handle_change}
                        />
                        <Form.Input
                            label="위치"
                            style={this.customStyles}
                            type="text"
                            name="location"
                            value={this.state.currentData.location}
                            onChange={this.handle_change}
                        />
                        <Form.TextArea 
                            label='노트' 
                            style={this.customStyles}
                            name="notes"
                            value={this.state.currentData.notes}
                            onChange={this.handle_change}
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.closeModal}>
                        취소
                        </Button>
                        <Button
                            content="저장하기"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={this.addSchedule}
                            positive
                        />
                    </Modal.Actions>
                </Modal>
                </div>
            </div>
        );
    }

    handleWeekendsToggle = () => {
        this.setState({
        weekendsVisible: !this.state.weekendsVisible,
        });
    };

    handleDateSelect = (selectInfo) => {
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection

        this.openModal();
        this.setState(prevState => ({
            ...prevState,
            currentData: {
                ...prevState.currentData,
                id: createEventId(),
                startDate: selectInfo.startStr,
                endDate: selectInfo.endStr,
                allDay: selectInfo.allDay,
                selectInfo: selectInfo
            }
            
        }))
        /*
        if (title) {

        }*/
    };

    handleEventClick = (clickInfo) => {
        if (false) {
            clickInfo.event.remove();
        }
    };

    handleEvents = (events) => {
        this.setState({
            currentEvents: events,
        });
    };

    async addSchedule() {
        const { currentData } = this.state;
        const calendarApi = currentData.selectInfo.view.calendar;
        console.log(calendarApi);

        calendarApi.addEvent({
            id: currentData.id,
            title: currentData.title,
            start: currentData.startDate,
            end: currentData.endDate,
            allDay: currentData.allDay,
        });

        const commitData = {
            user: Number(localStorage.getItem('pk')),
            title: currentData.title,
            startDate: currentData.startDate,
            endDate: currentData.endDate,
            location: currentData.location,
            notes: currentData.notes
        }

        console.log(commitData);
        const response = await scheduler.post('add/', commitData);
        if(response) {
            console.log(response);
            alert('추가되었습니다.');
        }
        this.closeModal();


    }
}

    function renderEventContent(eventInfo) {
    return (
        <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        </>
    );
    }

const StyledScheduler = () => (<div>{style}<SchedulerPage /></div>)
export default StyledScheduler