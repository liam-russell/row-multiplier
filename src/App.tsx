import React, { Suspense, lazy } from 'react';
import { Grommet, Main, Heading, Sidebar, Box, Paragraph, Markdown } from 'grommet';
import Notifications from './Notifications';

function App() {
    const theme = {
        global: {
            font: {
                family: 'Didact Gothic',
                size: '18px',
                height: '20px',
            },
        },
        table: {
            body: {
                border: 'all'
            }
        }
    };

    const Select = lazy(() => import('./Steps/Select'));
    const Settings = lazy(() => import('./Steps/Settings'));
    const Confirm = lazy(() => import('./Steps/Confirm'));
    const Download = lazy(() => import('./Steps/Download'));
    const Donate = lazy(() => import('./Steps/Donate'));

    return (
        <Grommet theme={theme} full>
            <Box direction="row" height={{ min: "100%" }}>
                <Main pad="large" align='center' flex='grow' height={{ min: "100%" }}>
                    <Heading>Multiply your rows</Heading>
                    <Box round='small' background='accent-1' pad={{ horizontal: 'medium', vertical: 'small' }}>
                        <Paragraph size='small'>
                            <strong>What does this do?</strong><br/>
                            Row multiplier is simple tool to create copies of every row in a <Markdown>`.csv`</Markdown> spreadsheet. 
                            Simply select a file, select your settings, and you're done!
                        </Paragraph>
                    </Box>
                    <Suspense fallback={'Loading...'}>
                        <Select />
                        <Settings />
                        <Confirm />
                        <Download />
                        <Donate />
                    </Suspense>
                </Main>
                <Sidebar width='300px' background='accent-1'>
                    Ads
                </Sidebar>
            </Box>
            <Notifications />
        </Grommet >
    );
}

export default App;
