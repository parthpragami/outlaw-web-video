// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0


import { StyledWrapper, StyledAudioGroup, StyledVideoGroup } from './Styled';
import MicrophoneDevices from './MicrophoneDevices';
import SpeakerDevices from './SpeakerDevices';
import CameraDevices from './CameraDevices';

const DeviceSelection = () => (
  <StyledWrapper>
    <StyledAudioGroup>
      <MicrophoneDevices />
      <SpeakerDevices />
    </StyledAudioGroup>
    <StyledVideoGroup>
      <CameraDevices />
    </StyledVideoGroup>
  </StyledWrapper>
);

export default DeviceSelection;
