import React from 'react';
import { Query } from '@apollo/react-components';
import ProgressBar from '../../../utils/ProgressBar';
import OrganizationMeetingView from '../OrganizationMeetingView/OrganizationMeetingView';

import { GET_MEETING } from '../../../../actions/organizationsQueries';

function MeetingViewWrapper() {
    const meetingId = window.location.pathname.split('/')[2];
    return (
        <Query
            query={GET_MEETING}
            variables={{
                id: meetingId
            }}
        >
            {({ data, loading, refetch }) => {
                if (loading) {
                    return <ProgressBar />;
                }

                return (
                    <OrganizationMeetingView meeting={data.getMeeting} refetchMeeting={refetch} />
                );
            }}
        </Query>
    );
}
export default MeetingViewWrapper;
