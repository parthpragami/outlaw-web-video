// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, {type ChangeEvent, useContext, useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {
  Checkbox,
  DeviceLabels,
  Flex,
  FormField,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  PrimaryButton,
  Select,
  useMeetingManager,
} from 'amazon-chime-sdk-component-library-react';
import { DefaultBrowserBehavior, MeetingSessionConfiguration } from 'amazon-chime-sdk-js';

import { getErrorContext } from '../../providers/ErrorProvider';
import routes from '../../constants/routes';
import Card from '../../components/Card';
import Spinner from '../../components/icons/Spinner';
import DevicePermissionPrompt from '../DevicePermissionPrompt';
import RegionSelection from './RegionSelection';
import { createGetAttendeeCallback, createMeetingAndAttendee } from '../../utils/api';
import { useAppState } from '../../providers/AppStateProvider';
import { MeetingMode, VideoFiltersCpuUtilization } from '../../types';
import type {MeetingManagerJoinOptions} from 'amazon-chime-sdk-component-library-react';
import meetingConfig from '../../meetingConfig';

const VIDEO_TRANSFORM_FILTER_OPTIONS = [
  { value: VideoFiltersCpuUtilization.Disabled, label: 'Disable Video Filter' },
  { value: VideoFiltersCpuUtilization.CPU10Percent, label: 'Video Filter CPU 10%' },
  { value: VideoFiltersCpuUtilization.CPU20Percent, label: 'Video Filter CPU 20%' },
  { value: VideoFiltersCpuUtilization.CPU40Percent, label: 'Video Filter CPU 40%' },
];

const MeetingForm: React.FC = () => {
  const meetingManager = useMeetingManager();
  const {
    region,
    meetingId,
    localUserName,
    meetingMode,
    enableSimulcast,
    priorityBasedPolicy,
    keepLastFrameWhenPaused,
    isWebAudioEnabled,
    videoTransformCpuUtilization: videoTransformCpuUtilization,
    setJoinInfo,
    isEchoReductionEnabled,
    enableMaxContentShares,
    toggleEchoReduction,
    toggleWebAudio,
    toggleSimulcast,
    togglePriorityBasedPolicy,
    toggleKeepLastFrameWhenPaused,
    toggleMaxContentShares,
    setMeetingMode,
    setMeetingId,
    setLocalUserName,
    setRegion,
    setCpuUtilization,
    skipDeviceSelection,
    toggleMeetingJoinDeviceSelection,
  } = useAppState();
  const [token, setToken] = useState<string | null>(null);
  const [meetingErr, setMeetingErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [tokenErr, setTokenErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { errorMessage, updateErrorMessage } = useContext(getErrorContext());
  const navigate = useNavigate();
  const browserBehavior = new DefaultBrowserBehavior();
  const [searchParams] = useSearchParams();


  const handleJoinMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = meetingId.trim().toLocaleLowerCase();
    // const attendeeName = localUserName.trim();

    if (!id || !token) {
      // if (!attendeeName) {
      //   setNameErr(true);
      // }

      if (!id) {
        setMeetingErr(true);
      }

      if(!token) {
        setTokenErr(true);
      }

      return;
    }

    setIsLoading(true);
    meetingManager.getAttendee = createGetAttendeeCallback(id);

    try {
      const { JoinInfo }  = await createMeetingAndAttendee(id, token);
      console.log('JoinInfo', JoinInfo)
      setJoinInfo(JoinInfo);
      const meetingSessionConfiguration = new MeetingSessionConfiguration(JoinInfo?.Meeting, JoinInfo?.Attendee);
      if (
          meetingConfig.postLogger &&
          meetingSessionConfiguration.meetingId &&
          meetingSessionConfiguration.credentials &&
          meetingSessionConfiguration.credentials.attendeeId
      ) {
        const existingMetadata = meetingConfig.postLogger.metadata;
        meetingConfig.postLogger.metadata = {
          ...existingMetadata,
          meetingId: meetingSessionConfiguration.meetingId,
          attendeeId: meetingSessionConfiguration.credentials.attendeeId,
        };
      }

      setRegion(JoinInfo.Meeting.MediaRegion);
      meetingSessionConfiguration.enableSimulcastForUnifiedPlanChromiumBasedBrowsers = enableSimulcast;
      if (priorityBasedPolicy) {
        meetingSessionConfiguration.videoDownlinkBandwidthPolicy = priorityBasedPolicy;
      }
      meetingSessionConfiguration.keepLastFrameWhenPaused = keepLastFrameWhenPaused;
      const options: MeetingManagerJoinOptions = {
        deviceLabels: meetingMode === MeetingMode.Spectator ? DeviceLabels.None : DeviceLabels.AudioAndVideo,
        enableWebAudio: isWebAudioEnabled,
        skipDeviceSelection,
      };

      console.log('options', options);
      console.log('meetingSessionConfiguration', meetingSessionConfiguration)

      await meetingManager.join(meetingSessionConfiguration as never, options);
      if (meetingMode === MeetingMode.Spectator) {
        await meetingManager.start();
        navigate(`${routes.MEETING}/${meetingId}`);
      } else {
        await meetingManager.start();
        navigate(`${routes.MEETING}/${meetingId}`);
        // setMeetingMode(MeetingMode.Attendee);
        // navigate(routes.DEVICE);
      }
    } catch (error) {
      console.log('handleJoinMeeting error', error);
      updateErrorMessage((error as Error).message);
    }
  };

  const closeError = (): void => {
    updateErrorMessage('');
    setMeetingId('');
    setLocalUserName('');
    setIsLoading(false);
  };

  useEffect(() => {
    const bookingId = searchParams.get('bookingId');
    const token = searchParams.get('token');
    console.log('hello',
        {bookingId, token},
    )
    if(token && bookingId) {
      setMeetingId(bookingId);
      setToken(token);
    }
  }, [searchParams]);

  const bookingId = searchParams.get('bookingId');

  return (
      <form>
        {/*<Heading tag="h1" level={4} css="margin-bottom: 1rem">*/}
        {/*  Join a meeting*/}
        {/*</Heading>*/}
        <div style={{ display: 'none' }}>
        <FormField
            field={Input}
            label="Meeting Id"
            value={meetingId}
            // infoText="Anyone with access to the meeting ID can join"
            fieldProps={{
              name: 'meetingId',
              placeholder: 'Enter Meeting Id',
            }}
            errorText="Please enter a valid meeting ID"
            error={meetingErr}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
              setMeetingId(e.target.value);
              if (meetingErr) {
                setMeetingErr(false);
              }
            }}
        />
        <FormField
            field={Input}
            label="Token"
            value={token}
            fieldProps={{
              name: 'token',
              placeholder: 'Enter Your token',
            }}
            errorText="Please enter a valid token"
            error={tokenErr}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
              setToken(e.target.value);
              if (nameErr) {
                setToken(false);
              }
            }}
        />
        </div>
        <Flex container  style={{ marginTop: '2.5rem', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {
            bookingId ? (
                isLoading ? <Spinner /> : <PrimaryButton label="Join now" onClick={handleJoinMeeting} style={{ width: '100%' }} />
            ) : (
                <div style={{ textAlign: 'center' }}>
                  <h1>Not able to find the meeting ID or the meeting has been ended try go back to the Web app of outlaw!</h1>
                </div>
            )
          }
        </Flex>
        {errorMessage && (
            <Modal size="md" onClose={closeError}>
              <ModalHeader title={`Meeting ID: ${meetingId}`} />
              <ModalBody>
                <Card
                    title="Unable to join meeting"
                    description="There was an issue finding that meeting. The meeting may have already ended, or your authorization may have expired."
                    smallText={errorMessage}
                />
              </ModalBody>
            </Modal>
        )}
        <DevicePermissionPrompt />
      </form>
  );
};

export default MeetingForm;
