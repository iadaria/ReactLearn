import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityDetailedHeader from './activity-detailed-header';
import ActivityDetailedInfo from './activity-detailed-info';
import ActivityDetailedChat from './activity-detailed-chat';
import ActivityDetailedSidebar from './activity-detailed-sidebar';

interface DetailParams {
    id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history }) => {
    const activityStore = useContext(ActivityStore);
    const {activity, loadActivity, loadingInitial} = activityStore;

    useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity, match.params.id]);

    if(loadingInitial || !activity) return <LoadingComponent content='Loading activity...'/>;

    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat />
            </Grid>
            <Grid item sm={4} xs={12}>
                <ActivityDetailedSidebar />
            </Grid>
        </Grid>
    );
};

export default observer(ActivityDetails);