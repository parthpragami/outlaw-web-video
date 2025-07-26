// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';

import MeetingFormSelector from '../../containers/MeetingFormSelector';
import { StyledLayout } from './Styled';
import {useAppState} from "../../providers/AppStateProvider.tsx";

const Home: React.FC = () => {
const { theme, toggleTheme, layout, setLayout, priorityBasedPolicy } = useAppState();
    return (
        <StyledLayout>
            <MeetingFormSelector />
        </StyledLayout>
        )

};

export default Home;
