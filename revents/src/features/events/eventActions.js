import {
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT, 
    FETCH_EVENTS,
    LISTEN_TO_EVENT_CHAT,
    LISTEN_TO_SELECTED_EVENT,
    CLEAR_EVENTS} from './eventConstants';
//import { fetchSampleData } from '../../app/api/mockApi';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../app/async/asyncReducer';
import { fetchEventsFromFirestore, dataFromSnapshot } from '../../app/firestore/firestoreService';

export function fetchEvents(predicate, limit, lastDocSnapshot) {
    return async function(dispatch) {
        dispatch(asyncActionStart());
        try {
            const snapshot = await fetchEventsFromFirestore(predicate, limit, lastDocSnapshot).get();
            const moreEvents = snapshot.docs.length >= limit;
            const lastVisible = snapshot.docs[snapshot.docs.length - 1];
            const events = snapshot.docs.map(doc => dataFromSnapshot(doc));
            dispatch({ type: FETCH_EVENTS, payload: {events, moreEvents} });
            dispatch(asyncActionFinish());
            return lastVisible;
        } catch (error) { dispatch(asyncActionError(error)); }
    };
}
/* export function loadEvents() {
    return async function(dispatch) {
        dispatch(asyncActionStart());
        try {
            const events = await fetchSampleData();
            dispatch({type: FETCH_EVENTS, payload: events});
            dispatch(asyncActionFinish());
        } catch (error) { dispatch(asyncActionError(error)); }
    };
} */

export function listenToEvents(events) {
    return {
        type: FETCH_EVENTS,
        payload: events
    }
}

export function listenToSelectedEvent(event) {
    return {
        type: LISTEN_TO_SELECTED_EVENT,
        payload: event
    };
}

export function createEvent(event) {
    return {
        type: CREATE_EVENT,
        payload: event
    };
}

export function updateEvent(event) {
    return {
        type: UPDATE_EVENT,
        payload: event
    };
}

export function deleteEvent(eventId) {
    return {
        type: DELETE_EVENT,
        payload: eventId
    };
}

export function listenToEventChat(comments) {
    return {
        type: LISTEN_TO_EVENT_CHAT,
        payload: comments
    };
}

export function clearEvents() {
    return {
        type: CLEAR_EVENTS
    };
}
