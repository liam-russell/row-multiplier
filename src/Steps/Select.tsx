import React from 'react';
import Dropzone from 'react-dropzone'
import { DocumentCsv } from 'grommet-icons';
import { Heading, Text, Markdown, Box, Button, Collapsible } from 'grommet';
import { Step } from '../Store/Step';
import { useStore } from '../Store/Store';
import { observer } from 'mobx-react-lite';

const Select = () => {
    const store = useStore();
    return <Collapsible open={store.step === Step.Select} direction='vertical'>
        <Dropzone onDrop={store.select} multiple={false} maxSize={26214400}>
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                    <Box border={{ size: 'large', color: 'brand' }} pad='large' round='small' margin='small'>
                        <input {...getInputProps()} />
                        <Heading level={2}>
                            <Box align='center'>
                                Step 1
                                <Text size='large' color='dark-2' margin={{ top: 'small' }}>Select your <Markdown>`.csv`</Markdown> file.</Text>
                                <Box pad='small'>
                                    <DocumentCsv size='large' />
                                </Box>
                                <Text size='small' color='dark-2'>(It won't be uploaded)</Text>
                            </Box>
                        </Heading>
                        <Button alignSelf='center' label='select or drop a file' />
                    </Box>
                </div>
            )}
        </Dropzone>
    </Collapsible>;
}

export default observer(Select);