/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useRef } from 'react';
import { Heading, Text, Box, Button, Collapsible, } from 'grommet';
import { Step } from '../Store/Step';
import { useStore } from '../Store/Store';
import { observer } from 'mobx-react-lite';
import { DocumentCsv } from 'grommet-icons';

const Download = () => {
    const store = useStore();
    const downloadRef = useRef<HTMLAnchorElement>(null);

    const handleClick = () => {
        downloadRef.current?.click();
        store.nextStep();
    }

    return <Collapsible open={store.step === Step.Download} direction='vertical'>
        <Box border={{ size: 'large', color: 'brand' }} pad='large' round='small' margin='small'>
            <Heading level={2}>
                <Box align='center'>
                    Step 4
                    <Text size='large' color='dark-2' margin={{ top: 'small' }}>Get your file</Text>
                </Box>
            </Heading>
            <Box align='center' margin={{ bottom: 'medium' }}>
                <DocumentCsv size='xlarge' />
            </Box>
            <a href={store.downloadUrl} style={{ display: 'none' }} ref={downloadRef} download='multiplied.csv' />
            <Button alignSelf='center' label='click to download file' onClick={handleClick} />
        </Box>
    </Collapsible>;
}

export default observer(Download);