import React from 'react';
import MeetingForm from '../MeetingForm';
import { useTheme } from 'styled-components';

const MeetingFormSelector: React.FC = () => {
    const theme = useTheme();

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                backgroundColor: theme.colors.secondary.main,
            }}
        >
            <div
                style={{
                    background: theme.colors.secondary.main,
                    padding: '3rem 2rem',
                    borderRadius: '16px',
                    width: '500px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                }}
            >
                <h1
                    style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        marginBottom: '2rem',
                        color: theme.colors.primary.main,
                        fontFamily: 'ProximaNovaBold, sans-serif',
                        textAlign: 'center',
                    }}
                >
                    Outlaw
                </h1>

                <MeetingForm />
            </div>
        </div>
    );
};

export default MeetingFormSelector;
