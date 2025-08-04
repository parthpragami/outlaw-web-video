// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import routes from '../constants/routes';

export const BASE_URL = routes.HOME;

// const API_URL = 'http://127.0.0.1:8080/'
const API_URL = 'https://jcfk2ktubf.execute-api.ap-south-1.amazonaws.com/default/'

export type MeetingFeatures = {
  Audio: { [key: string]: string };
};

export type CreateMeetingResponse = {
  MeetingFeatures: MeetingFeatures;
  MediaRegion: string;
};

export type JoinMeetingInfo = {
  Meeting: CreateMeetingResponse;
  Attendee: string;
  Attendees: string;
};

interface MeetingResponse {
  JoinInfo: JoinMeetingInfo;
}

interface GetAttendeeResponse {
  name: string;
}

export async function createMeetingAndAttendee(
  title: string,
  token:string,
  // attendeeName?: string,
  // region?: string,
  // echoReductionCapability? = false
): Promise<MeetingResponse> {
  // const body = {
  //   title: encodeURIComponent(title),
  //   attendeeName: encodeURIComponent(attendeeName),
  //   region: encodeURIComponent(region),
  //   ns_es: String(echoReductionCapability),
  // };

  const payload = {
    bookingId: title
  }

  const res = await fetch(API_URL + 'create-meeting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(`Server error: ${data.error}`);
  }

  console.log('data AWS CHIME RESPONSE', data?.body)

  return { JoinInfo: data?.body };
}

export async function getAttendee(title: string, attendeeId: string, attendees: []): Promise<GetAttendeeResponse> {
  const params = {
    title: encodeURIComponent(title),
    attendeeId: encodeURIComponent(attendeeId),
  };

  const findAttendee: undefined = attendees?.find((item: never) => attendeeId === item?.Attendee?.AttendeeId);
  console.log('findAttendee', findAttendee)
  // const res = await fetch(API_URL + 'attendee?' + new URLSearchParams(params), {
  //   method: 'GET',
  // });
  //
  // if (!res.ok) {
  //   throw new Error('Invalid server response');
  // }
  //
  // const data = await res.json();

  return {
    name: findAttendee?.Name || "User name",
  };
}

export async function endMeeting(title: string): Promise<void> {
  const body = {
    title: encodeURIComponent(title),
  };

  const res = await fetch(API_URL + 'end', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('Server error ending meeting');
  }
}

export const createGetAttendeeCallback = (meetingId: string, attendees: []) => (
  chimeAttendeeId: string
): Promise<GetAttendeeResponse> => getAttendee(meetingId, chimeAttendeeId, attendees);
