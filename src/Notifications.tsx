import React from 'react';

import { FormClose, StatusGood, StatusWarning } from 'grommet-icons';

import { Box, Button, Layer, Text } from 'grommet';
import { useStore } from './Store/Store';
import { observer } from 'mobx-react-lite';

const Notifications = () => {
    const store = useStore();
    if (store.notifications.length !== 0) {
        return <Layer
            position='top-left'
            modal={false}
            margin={{ vertical: 'medium', horizontal: 'small' }}
            responsive={false}
            plain
        >
            {
                store.notifications.map(n => <Box
                    align='center'
                    direction='row'
                    gap='small'
                    justify='between'
                    round='medium'
                    elevation='medium'
                    pad={{ vertical: 'xsmall', horizontal: 'small' }}
                    background={n.style === 'good' ? 'status-ok' : 'status-error'}
                    margin={{ bottom: 'small' }}
                    key={n.id}
                >
                    <Box align='center' direction='row' gap='xsmall'>
                        {n.style === 'good' && <StatusGood color='light-1' />}
                        {n.style === 'bad' && <StatusWarning color='light-1' />}
                        <Text margin={{left: 'xsmall'}} color='light-1'>{n.message}</Text>
                    </Box>
                    <Button icon={<FormClose color='light-1' />} onClick={() => store.notificationClicked(n.id)} plain />
                </Box>)
            }
        </Layer>
    }

    return null;
};

export default observer(Notifications);
